import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-page-gradient px-4">
      <div className="max-w-sm w-full text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-light text-gray-900" style={{ fontFamily: 'neueSingular-D-Medium, sans-serif' }}>
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-6">
          <p className="text-xl text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter_18pt-Regular, sans-serif' }}>
            The page you&apos;re looking for doesn&apos;t<br />
            exist or has been moved.
          </p>
        </div>

        {/* Back to Home Button */}
        <div>
          <Link 
            href="/"
            className="not-found-button inline-block text-white px-8 py-4 text-lg font-normal focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            style={{ 
              fontFamily: 'Inter_18pt-Regular, sans-serif', 
              borderRadius: '0.75rem'
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
