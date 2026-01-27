"use client"

import { cn } from "@/lib/utils"
import { vapi, enumerateAudioDevicesWithRetry, audioConstraints, preWarmAudioDevices } from "@/lib/vapi.sdk"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Mic, MicOff, Phone, PhoneOff, AlertTriangle } from "lucide-react"
import { createFeedback } from "@/lib/actions/general.action"
import { interviewer } from "@/constants"
import { toast } from "sonner"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string
  userId: string
  interviewId?: string
  type?: string
  questions?: string[]
}

interface SavedMessage {
  role: "user" | "system" | "assistant"
  content: string
}

export default function Agent({ userName, userId, interviewId, type, questions = [] }: AgentProps) {
  const router = useRouter()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null)
  const [audioDevicesAvailable, setAudioDevicesAvailable] = useState<boolean | null>(null)

  // Check audio permissions and devices on component mount
  useEffect(() => {
    const checkAudioCapabilities = async () => {
      try {
        // Check if mediaDevices API is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          setAudioDevicesAvailable(false)
          setAudioPermission(false)
          return
        }

        // Pre-warm audio devices to reduce VAPI enumeration time
        await preWarmAudioDevices()

        // Check for audio input devices with enhanced retry logic
        try {
          const audioInputDevices = await enumerateAudioDevicesWithRetry(5000, 3)
          setAudioDevicesAvailable(audioInputDevices.length > 0)
        } catch (enumerateError) {
          console.warn('Audio device enumeration failed after retries:', enumerateError)
          setAudioDevicesAvailable(false)
        }

        // Check microphone permission with enhanced audio constraints
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints })
          setAudioPermission(true)
          // Clean up the stream
          stream.getTracks().forEach(track => track.stop())
        } catch (permissionError) {
          console.warn('Microphone permission denied:', permissionError)
          setAudioPermission(false)
        }
      } catch (error) {
        console.error('Audio capability check failed:', error)
        setAudioPermission(false)
        setAudioDevicesAvailable(false)
      }
    }

    checkAudioCapabilities()
  }, [])

  // Event binding (GenerationAgent style)
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage])
      }
    }

    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)
    const onError = (error: Error) => {
      console.error("VAPI Error:", error)
      toast.error("Audio connection error. Please check your microphone/internet and try again.")
    }

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)
    vapi.on("error", onError)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
      vapi.off("error", onError)
    }
  }, [])

  // Feedback after interview
  const handleGenerateFeedback = async (msgs: SavedMessage[]) => {
    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: msgs,
    })

    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`)
    } else {
      console.log("Error saving feedback")
      router.push("/")
    }
  }

  // Navigation after call finishes
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/")
      } else {
        handleGenerateFeedback(messages)
      }
    }
  }, [callStatus, messages, type])

  // Start / End call handlers
  const handleCall = async () => {
    // Check audio capabilities before starting call
    if (audioPermission === false) {
      toast.error("Microphone permission is required for the interview. Please allow microphone access and refresh the page.")
      return
    }

    if (audioDevicesAvailable === false) {
      toast.error("No audio input devices found. Please connect a microphone and refresh the page.")
      return
    }

    setCallStatus(CallStatus.CONNECTING)

    try {
      // Always use the interviewer config from constants instead of workflow
      const formattedQuestions = questions.length ? questions.map((q) => `- ${q}`).join("\n") : ""
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
          username: userName,
          userid: userId,
        },
      })
    } catch (error) {
      console.error("Failed to start call:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"

      if (errorMessage.includes("permission") || errorMessage.includes("microphone")) {
        toast.error("Microphone access denied. Please allow microphone permission and try again.")
      } else if (errorMessage.includes("device") || errorMessage.includes("audio")) {
        toast.error("Audio device error. Please check your microphone connection.")
      } else {
        toast.error("Failed to start interview. Please check your internet connection and try again.")
      }

      setCallStatus(CallStatus.INACTIVE)
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  const latestMessage = messages[messages.length - 1]?.content
  const isCallIdle = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED

  return (
    <section className="w-full space-y-8">
      {/* Audio Status Warning */}
      {(audioPermission === false || audioDevicesAvailable === false) && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-600 dark:text-yellow-400 mb-1">Audio Setup Required</p>
              {audioPermission === false && (
                <p className="text-yellow-600/80 dark:text-yellow-400/80">
                  Microphone permission is required for the interview. Please allow access when prompted.
                </p>
              )}
              {audioDevicesAvailable === false && (
                <p className="text-yellow-600/80 dark:text-yellow-400/80">
                  No microphone detected. Please connect an audio input device.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call Interface */}
      <div className="call-view">
        {/* AI Interviewer */}
        <div className="card-interviewer">
          <div className="avatar">
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <svg width={85} height={85} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="m32 10 8 14 -8 14 -8 -14Z" fill="white" />
                <path d="m32 54 -8 -14 8 -14 8 14Z" fill="white" opacity={0.7} />
                <path
                  cx={16}
                  cy={16}
                  r={4}
                  fill="white"
                  opacity={0.5}
                  d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z"
                />
                <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="white" strokeWidth={2} fill="none" />
              </svg>
            </div>
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">Sidvia AI</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              {isSpeaking ? (
                <>
                  <Mic className="w-4 h-4 text-primary" />
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Listening</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="card-border">
          <div className="card-content">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-100/20 rounded-full blur-xl opacity-50" />
              <Image
                src="/user-avatar.png"
                alt="User profile"
                width={140}
                height={140}
                className="relative rounded-full object-cover size-[140px] border-4 border-border/50 shadow-2xl"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">{userName}</h3>
              <div className="text-sm text-muted-foreground">
                {callStatus === CallStatus.ACTIVE ? "In Interview" : "Ready to Start"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transcript */}
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn("transition-all duration-500 opacity-0", "animate-fadeIn opacity-100")}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className={cn(
              "btn-call relative overflow-hidden",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
              (audioPermission === false || audioDevicesAvailable === false) && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING || audioPermission === false || audioDevicesAvailable === false}
          >
            {callStatus === CallStatus.CONNECTING && (
              <span className="absolute animate-ping rounded-full opacity-75 size-full bg-emerald-400/30" />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {audioPermission === null || audioDevicesAvailable === null
                ? "Checking Audio..."
                : isCallIdle
                  ? "Start Interview"
                  : "Connecting..."
              }
            </span>
          </button>
        ) : (
          <button className="btn-disconnect flex flex-row" onClick={handleDisconnect}>
            <PhoneOff className="w-5 h-5 mr-2" />
            End Interview
          </button>
        )}
      </div>

      {/* Status Indicator */}
      <div className="text-center -mt-5">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium",
            callStatus === CallStatus.ACTIVE && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
            callStatus === CallStatus.CONNECTING && "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            callStatus === CallStatus.INACTIVE && "bg-muted/50 text-muted-foreground border border-border/30",
          )}
        >
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              callStatus === CallStatus.ACTIVE && "bg-emerald-400 animate-pulse",
              callStatus === CallStatus.CONNECTING && "bg-yellow-400 animate-pulse",
              callStatus === CallStatus.INACTIVE && "bg-foreground",
            )}
          />
          {callStatus === CallStatus.ACTIVE && "Interview in Progress"}
          {callStatus === CallStatus.CONNECTING && "Connecting to AI..."}
          {callStatus === CallStatus.INACTIVE && "Ready to Start"}
        </div>
      </div>
    </section>
  )
}
