"use client";

import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-900 px-6">
      {/* blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 max-w-lg rounded-3xl bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex justify-center">
          <Image
            src="/default_images/sad.png"
            alt="Sad mascot"
            width={160}
            height={160}
            className="w-52 h-52 object-contain"
          />
        </div>

        <h1 className="mb-2 text-4xl font-extrabold text-white">
          Something went wrong
        </h1>

        <p className="mb-6 text-white/80">
          Our little mascot pressed the wrong button 😢
        </p>

        <div className="mb-8 rounded-xl bg-black/30 p-4 text-left text-sm text-red-300">
          <p className="font-semibold">Error details:</p>
          <p>{error.message || "Unknown error"}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-full bg-white/20 px-6 py-3 font-semibold text-white hover:bg-white/30"
          >
            Try again
          </button>

          <a
            href="/"
            className="rounded-full bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
