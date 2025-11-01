import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Sidvia",
    description: "Sidvia is a smart, voice-interactive interview simulator that uses real-time AI to conduct mock interviews and provide instant feedback.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="icon" type="image/svg+xml" href="favicon.svg" />
                <meta name="google-site-verification" content="I9zK1PvZxT0MdjW2WlwZwfBxy4D20jKz5E2KWbgwf2U" />
            </head>
            <body
                className={`${monaSans.className} antialiased`}
            >
                <Toaster />
                {children}
            </body>
        </html>
    );
}
