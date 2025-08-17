"use client";

import { useState } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockCampaign = {
  id: 1,
  title: "Summer Product Launch",
  startDate: "2025-01-15",
  endDate: "2025-03-15",
  targetViews: 100000,
  currentViews: 45678,
  budget: 5000,
  status: "active"
};

const mockVideos = [
  {
    id: 1,
    title: "Product Demo Video",
    thumbnail: "https://via.placeholder.com/300x200",
    postedDate: "2025-01-20",
    duration: "0:45",
    views: 12345,
    status: "approved",
    clipperName: "Alex Chen"
  },
  {
    id: 2,
    title: "Behind the Scenes",
    thumbnail: "https://via.placeholder.com/300x200",
    postedDate: "2025-01-25",
    duration: "1:20",
    views: 8765,
    status: "approved",
    clipperName: "Sarah Kim"
  },
  {
    id: 3,
    title: "Customer Testimonial",
    thumbnail: "https://via.placeholder.com/300x200",
    postedDate: "2025-02-01",
    duration: "0:30",
    views: 5432,
    status: "pending",
    clipperName: "Mike Johnson"
  }
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos'>('overview');

  const progressPercentage = (mockCampaign.currentViews / mockCampaign.targetViews) * 100;

  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
                Viewmark Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Client Dashboard</span>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
                {mockCampaign.title}
              </h2>
              <p className="text-gray-600">
                {mockCampaign.startDate} - {mockCampaign.endDate}
              </p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {mockCampaign.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{mockCampaign.currentViews.toLocaleString()} / {mockCampaign.targetViews.toLocaleString()} views</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-black h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                {mockCampaign.currentViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                {mockVideos.length}
              </div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                ${mockCampaign.budget.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Budget</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'videos'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Videos ({mockVideos.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  Campaign Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">Views This Week</div>
                    <div className="text-2xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                      12,345
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">Engagement Rate</div>
                    <div className="text-2xl font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                      8.2%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  Campaign Videos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.map((video) => (
                    <div key={video.id} className="bg-gray-50 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gray-200 relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-2" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                          {video.title}
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Posted: {video.postedDate}</div>
                          <div>Views: {video.views.toLocaleString()}</div>
                          <div>Clipper: {video.clipperName}</div>
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              video.status === 'approved' ? 'bg-green-500' : 
                              video.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            <span className="capitalize">{video.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
