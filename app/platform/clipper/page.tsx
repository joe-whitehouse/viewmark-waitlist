"use client";

import { useState } from 'react';

// Mock data for demonstration
const mockAssignedCampaigns = [
  {
    id: 1,
    title: "Summer Product Launch",
    assignedDate: "2025-01-15",
    deadline: "2025-02-15",
    status: "active"
  }
];

const mockVideos = [
  {
    id: 1,
    title: "Product Demo Video",
    url: "https://tiktok.com/@user/video/123456",
    submittedDate: "2025-01-20",
    status: "approved",
    views: 12345,
    rpm: 2.50,
    earnings: 30.86,
    postedDate: "2025-01-22",
    payoutEndDate: "2025-02-22",
    daysRemaining: 15
  },
  {
    id: 2,
    title: "Behind the Scenes",
    url: "https://tiktok.com/@user/video/789012",
    submittedDate: "2025-01-25",
    status: "pending",
    views: 0,
    rpm: 2.50,
    earnings: 0,
    postedDate: null,
    payoutEndDate: null,
    daysRemaining: null
  }
];

export default function ClipperDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'submit'>('overview');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const totalEarnings = mockVideos.reduce((sum, video) => sum + video.earnings, 0);
  const totalViews = mockVideos.reduce((sum, video) => sum + video.views, 0);

  const handleSubmitVideo = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle video submission
    console.log('Submitting video:', { videoUrl, videoTitle });
    setVideoUrl('');
    setVideoTitle('');
  };

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
              <span className="text-sm text-gray-600">Clipper Dashboard</span>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-light mb-6" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
            Your Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                ${totalEarnings.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                {totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                {mockVideos.length}
              </div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                $2.50
              </div>
              <div className="text-sm text-gray-600">Your RPM</div>
            </div>
          </div>
        </div>

        {/* Assigned Campaigns */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <h3 className="text-lg font-medium mb-4" style={{color: "rgba(0, 0, 0, 0.85)"}}>
            Assigned Campaigns
          </h3>
          {mockAssignedCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium mb-1" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                    {campaign.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Assigned: {campaign.assignedDate} • Deadline: {campaign.deadline}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
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
                My Videos ({mockVideos.length})
              </button>
              <button
                onClick={() => setActiveTab('submit')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'submit'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Submit Video
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {mockVideos.slice(0, 3).map((video) => (
                    <div key={video.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium mb-1" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {video.views.toLocaleString()} views • ${video.earnings.toFixed(2)} earned
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          video.status === 'approved' ? 'bg-green-100 text-green-800' :
                          video.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {video.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  My Videos
                </h3>
                <div className="space-y-4">
                  {mockVideos.map((video) => (
                    <div key={video.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium mb-2" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">
                            Submitted: {video.submittedDate}
                          </p>
                          {video.postedDate && (
                            <p className="text-sm text-gray-600 mb-1">
                              Posted: {video.postedDate}
                            </p>
                          )}
                          <a 
                            href={video.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            View Video →
                          </a>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          video.status === 'approved' ? 'bg-green-100 text-green-800' :
                          video.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {video.status}
                        </span>
                      </div>
                      
                      {video.status === 'approved' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                              {video.views.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Views</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                              ${video.earnings.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">Earnings</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                              ${video.rpm}
                            </div>
                            <div className="text-sm text-gray-600">RPM</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-light" style={{fontFamily: "'ABC Oracle Light', sans-serif", color: "rgba(0, 0, 0, 0.85)"}}>
                              {video.daysRemaining}
                            </div>
                            <div className="text-sm text-gray-600">Days Left</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium" style={{color: "rgba(0, 0, 0, 0.85)"}}>
                  Submit New Video
                </h3>
                <form onSubmit={handleSubmitVideo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl py-4 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://tiktok.com/@user/video/..."
                      className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl py-4 px-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 active:scale-95"
                  >
                    Submit Video
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
