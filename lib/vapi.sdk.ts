import Vapi from "@vapi-ai/web";

// Create VAPI instance with enhanced error handling
// Avoid instantiation on server-side to prevent "module factory not available" or window undefined errors
export const vapi = typeof window !== 'undefined' ? new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!) : (null as any);

// Cache for device enumeration to avoid repeated calls
let deviceEnumerationCache: MediaDeviceInfo[] | null = null;
let deviceEnumerationPromise: Promise<MediaDeviceInfo[]> | null = null;

// Override console.warn to filter out expected VAPI device enumeration warnings
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const message = args.join(' ');

  // Filter out expected VAPI device enumeration warnings
  if (message.includes('enumerateDevices took longer than expected') ||
    message.includes('Ignoring settings for browser- or platform-unsupported input processor')) {
    // Log as info instead of warning for these expected cases
    console.info('[VAPI Info]', ...args);
    return;
  }

  // Pass through all other warnings
  originalWarn.apply(console, args);
};

// Cached device enumeration to prevent multiple simultaneous calls
export const getCachedAudioDevices = async (): Promise<MediaDeviceInfo[]> => {
  // Return cached result if available and recent (within 30 seconds)
  if (deviceEnumerationCache) {
    return deviceEnumerationCache.filter(device => device.kind === 'audioinput');
  }

  // If there's already a pending enumeration, wait for it
  if (deviceEnumerationPromise) {
    const devices = await deviceEnumerationPromise;
    return devices.filter(device => device.kind === 'audioinput');
  }

  // Start new enumeration
  deviceEnumerationPromise = navigator.mediaDevices.enumerateDevices();

  try {
    const devices = await deviceEnumerationPromise;
    deviceEnumerationCache = devices;

    // Clear cache after 30 seconds
    setTimeout(() => {
      deviceEnumerationCache = null;
      deviceEnumerationPromise = null;
    }, 30000);

    return devices.filter(device => device.kind === 'audioinput');
  } catch (error) {
    deviceEnumerationPromise = null;
    throw error;
  }
};

// Enhanced audio constraints for better device compatibility
export const audioConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  // Set sample rate to common supported values
  sampleRate: { ideal: 48000, min: 16000, max: 48000 },
  // Set channel count
  channelCount: { ideal: 1, min: 1, max: 2 }
};

// Utility function to handle device enumeration with timeout and retries
export const enumerateAudioDevicesWithRetry = async (timeoutMs = 5000, maxRetries = 3): Promise<MediaDeviceInfo[]> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const deviceCheckPromise = getCachedAudioDevices();
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Device enumeration timeout after ${timeoutMs}ms`)), timeoutMs)
      );

      const audioDevices = await Promise.race([deviceCheckPromise, timeoutPromise]);
      return audioDevices;
    } catch (error) {
      console.warn(`Audio device enumeration attempt ${attempt}/${maxRetries} failed:`, error);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return [];
};

// Pre-warm device enumeration to reduce VAPI startup time
export const preWarmAudioDevices = async (): Promise<void> => {
  try {
    // Pre-enumerate devices to cache them
    await navigator.mediaDevices.enumerateDevices();

    // Pre-request microphone permission to avoid delays during VAPI start
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        ...audioConstraints,
        // Use minimal constraints for pre-warming
        sampleRate: 16000,
        channelCount: 1
      }
    });

    // Immediately stop the stream
    stream.getTracks().forEach(track => track.stop());

    console.info('[VAPI] Audio devices pre-warmed successfully');
  } catch (error) {
    console.info('[VAPI] Audio pre-warming failed (this is expected if no microphone is available):', error);
  }
};
