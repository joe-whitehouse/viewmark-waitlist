import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-light text-gray-900 mb-4" style={{ fontFamily: 'ABCOracle-Light, sans-serif' }}>
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-normal text-gray-700 mb-4" style={{ fontFamily: 'ABCOracle-Book, sans-serif' }}>
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'ABCOracle-Book, sans-serif' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg font-normal transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            style={{ fontFamily: 'ABCOracle-Book, sans-serif' }}
          >
            Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500" style={{ fontFamily: 'ABCFavoritMono, monospace', letterSpacing: '0.1em' }}>
            © 2025 VIEWMARK. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
