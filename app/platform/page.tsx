"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function PlatformPage() {
  const [userType, setUserType] = useState<'client' | 'clipper' | null>(null);

  return (
    <div className="min-h-screen bg-page-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
            Viewmark Platform
          </h1>
          <p className="text-base" style={{color: "rgba(0, 0, 0, 0.6)"}}>
            Access your dashboard
          </p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          {!userType ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-center mb-6" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                I am a...
              </h2>
              
              <button
                onClick={() => setUserType('client')}
                className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 active:scale-95"
              >
                Client
              </button>
              
              <button
                onClick={() => setUserType('clipper')}
                className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium border border-gray-200 transition-all duration-200 hover:bg-gray-50 active:scale-95"
              >
                Clipper
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  {userType === 'client' ? 'Client Login' : 'Clipper Login'}
                </h2>
                <button
                  onClick={() => setUserType(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl py-4 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl py-4 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 active:scale-95"
                >
                  Sign In
                </button>
              </form>
              
              <div className="text-center">
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  ← Back to main site
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Test Navigation Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">🧪 Test Mode - Direct Access:</p>
          <div className="space-y-2">
            <Link 
              href="/platform/client"
              className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              → Test Client Dashboard
            </Link>
            <Link 
              href="/platform/clipper"
              className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              → Test Clipper Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
