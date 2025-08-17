"use client";



export default function CompletionPage() {
  return (
    <div className="min-h-dvh bg-page-gradient flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 sm:px-8 text-center">
        <h1 className="text-[32px] font-light leading-[36px] mb-8" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
          Thanks for signing up!
        </h1>
        <p className="text-[18px] leading-[28px] max-w-2xl mx-auto" style={{color: "rgba(0, 0, 0, 0.6)"}}>
          Viewmark is currently full. You&apos;ll hear from us as soon as we&apos;re ready to let more people in.
        </p>
      </div>
    </div>
  );
}
