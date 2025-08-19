'use client';

import React, { useState } from 'react';

export default function SubmissionHistory() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const submissions = [
    {
      id: 1,
      videoUrl: "https://tiktok.com/@alexchen/video/123456789",
      platform: "TikTok",
      status: "approved",
      views: 2500000,
      earnings: 612.50,
      submittedDate: "2025-01-15",
      approvedDate: "2025-01-16",
      campaign: "Summer Product Launch",
      caption: "Check out this amazing new product! 🔥 #summer #product #viral"
    },
    {
      id: 2,
      videoUrl: "https://instagram.com/p/example123",
      platform: "Instagram",
      status: "pending",
      views: 0,
      earnings: 0,
      submittedDate: "2025-01-20",
      approvedDate: null,
      campaign: "Summer Product Launch",
      caption: "Behind the scenes of our latest shoot 📸 #behindthescenes #content"
    },
    {
      id: 3,
      videoUrl: "https://youtube.com/shorts/example456",
      platform: "YouTube",
      status: "approved",
      views: 1800000,
      earnings: 441.00,
      submittedDate: "2025-01-10",
      approvedDate: "2025-01-11",
      campaign: "Summer Product Launch",
      caption: "Quick tutorial on how to use this product! 🎥 #tutorial #howto"
    },
    {
      id: 4,
      videoUrl: "https://tiktok.com/@alexchen/video/987654321",
      platform: "TikTok",
      status: "rejected",
      views: 0,
      earnings: 0,
      submittedDate: "2025-01-18",
      approvedDate: null,
      campaign: "Holiday Special",
      caption: "Holiday vibes with our special collection! 🎄 #holiday #special"
    },
    {
      id: 5,
      videoUrl: "https://instagram.com/p/example789",
      platform: "Instagram",
      status: "approved",
      views: 3200000,
      earnings: 784.00,
      submittedDate: "2025-01-12",
      approvedDate: "2025-01-13",
      campaign: "Brand Awareness",
      caption: "Why our brand is different from the rest! 💡 #brand #awareness"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          background: 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)',
          color: 'rgb(21, 128, 61)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        };
      case 'pending':
        return {
          background: 'linear-gradient(145deg, rgb(254, 243, 199) 0%, rgb(253, 230, 138) 100%)',
          color: 'rgb(161, 98, 7)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        };
      case 'rejected':
        return {
          background: 'linear-gradient(145deg, rgb(254, 226, 226) 0%, rgb(252, 232, 232) 100%)',
          color: 'rgb(185, 28, 28)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        };
      default:
        return {
          background: 'linear-gradient(145deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)',
          color: 'rgb(37, 99, 235)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatViews = (views: number) => {
    if (views < 10000) {
      return views.toLocaleString();
    } else if (views < 1000000) {
      const thousands = views / 1000;
      return thousands >= 100 ? `${Math.round(thousands)}K` : `${thousands.toFixed(1)}K`;
    } else {
      const millions = views / 1000000;
      return millions >= 10 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (statusFilter === 'all') return true;
    return submission.status === statusFilter;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case 'views':
        return b.views - a.views;
      case 'earnings':
        return b.earnings - a.earnings;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#dde2ee' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="black"/>
                <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-gray-600">Clipper dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:help@viewmark.co"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Help
              </a>
              <button className="sign-out-button">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <a
            href="/platform/clipper"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Submission History</h1>
          <p className="text-sm text-gray-600">View all your video submissions and their performance</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-sm transition-all duration-200 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                color: 'rgb(107, 114, 128)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm transition-all duration-200 rounded-lg"
              style={{
                background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                color: 'rgb(107, 114, 128)',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <option value="date">Date</option>
              <option value="views">Views</option>
              <option value="earnings">Earnings</option>
            </select>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden" style={{
          background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-gray-200" style={{
            background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 0px 0px inset'
          }}>
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-4">Video</div>
              <div className="col-span-1">Platform</div>
              <div className="col-span-1">Views</div>
              <div className="col-span-1">Earnings</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Submitted</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {sortedSubmissions.map((submission) => (
              <div 
                key={submission.id}
                className="px-6 py-5 hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* Video Info */}
                  <div className="col-span-4">
                    <div 
                      className="cursor-pointer"
                      onClick={() => window.open(submission.videoUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">
                        {submission.videoUrl}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        {submission.campaign}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {submission.caption}
                      </div>
                    </div>
                  </div>

                  {/* Platform */}
                  <div className="col-span-1">
                    <span className="text-sm font-medium text-gray-700">
                      {submission.platform}
                    </span>
                  </div>

                  {/* Views */}
                  <div className="col-span-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatViews(submission.views)}
                    </span>
                  </div>

                  {/* Earnings */}
                  <div className="col-span-1">
                    <span className="text-sm font-semibold text-gray-900">
                      ${submission.earnings.toFixed(2)}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className="px-3 py-1.5 text-xs font-medium rounded-lg" style={getStatusColor(submission.status)}>
                      {getStatusText(submission.status)}
                    </span>
                  </div>

                  {/* Submitted Date */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-700">
                      {getRelativeTime(submission.submittedDate)}
                    </div>
                    {submission.approvedDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Approved: {getRelativeTime(submission.approvedDate)}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(submission.videoUrl, '_blank', 'noopener,noreferrer')}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                        title="View video"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {submission.status === 'rejected' && (
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50"
                          title="View rejection reason"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedSubmissions.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {statusFilter === 'all' 
                  ? "You haven't submitted any videos yet."
                  : `No ${statusFilter} submissions found.`
                }
              </p>
              {statusFilter !== 'all' && (
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View all submissions
                </button>
              )}
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="backdrop-blur-sm p-6 border border-white/20 rounded-xl" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {submissions.length}
            </div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20 rounded-xl" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {submissions.filter(s => s.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20 rounded-xl" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              ${submissions.reduce((sum, s) => sum + s.earnings, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20 rounded-xl" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {formatViews(submissions.reduce((sum, s) => sum + s.views, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Copyright */}
            <div className="copyright">
              © 2025 VIEWMARK. ALL RIGHTS RESERVED.
            </div>
            
            {/* Social media icons */}
            <div className="social-links">
              {/* X (Twitter) icon */}
              <a 
                href="https://x.com/viewmarkco" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on X (Twitter)"
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4033 0.5H18.2852L11.989 7.701L19.396 17.5H13.5964L9.054 11.557L3.85637 17.5H0.972692L7.70709 9.7977L0.601562 0.5H6.54839L10.6544 5.93215L15.4033 0.5ZM14.3918 15.7738H15.9887L5.68067 2.13549H3.96702L14.3918 15.7738Z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* Instagram icon */}
              <a 
                href="https://instagram.com/viewmark.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.21173C12.5365 2.21173 12.837 2.22123 13.8389 2.267C14.4411 2.27427 15.0377 2.38499 15.6024 2.59432C16.0151 2.74662 16.3884 2.9895 16.6949 3.30509C17.0105 3.61156 17.2534 3.98488 17.4057 4.39759C17.615 4.96235 17.7257 5.55888 17.733 6.16114C17.7788 7.16295 17.7883 7.4635 17.7883 10C17.7883 12.5365 17.7788 12.837 17.733 13.8389C17.7257 14.4411 17.615 15.0377 17.4057 15.6024C17.2476 16.0122 17.0055 16.3844 16.6949 16.6949C16.3844 17.0055 16.0122 17.2476 15.6024 17.4057C15.0377 17.615 14.4411 17.7257 13.8389 17.733C12.837 17.7788 12.5365 17.7883 10 17.7883C7.4635 17.7883 7.16295 17.7788 6.16114 17.733C5.55859 17.7258 4.96176 17.6151 4.39673 17.4057C3.98433 17.2533 3.61132 17.0104 3.30509 16.6949C2.9895 16.3884 2.74662 16.0151 2.59432 15.6024C2.38499 15.0377 2.27427 14.4411 2.267 13.8389C2.22123 12.837 2.21173 12.5365 2.21173 10C2.21173 7.4635 2.22123 7.16295 2.267 6.16114C2.27427 5.55888 2.38499 4.96235 2.59432 4.39759C2.74662 3.98488 2.9895 3.61156 3.30509 3.30509C3.61156 2.9895 3.98488 2.74662 4.39759 2.59432C4.96235 2.38499 5.55888 2.27427 6.16114 2.267C7.16295 2.22123 7.4635 2.21173 10 2.21173ZM10 0.5C7.42032 0.5 7.09645 0.51123 6.08341 0.557C5.29535 0.57272 4.51567 0.72194 3.7775 0.99832C3.1433 1.2371 2.56886 1.61141 2.09427 2.09514C1.61096 2.56956 1.23695 3.14369 0.99832 3.7775C0.72224 4.51572 0.57331 5.2954 0.55786 6.08341C0.51036 7.09645 0.5 7.42032 0.5 10C0.5 12.5797 0.51123 12.9035 0.557 13.9166C0.57272 14.7046 0.72194 15.4843 0.99832 16.2225C1.2371 16.8567 1.61141 17.4311 2.09514 17.9057C2.56956 18.389 3.14369 18.763 3.7775 19.0017C4.51572 19.2778 5.2954 19.4267 6.08341 19.4421C7.09645 19.4896 7.42032 19.5 10 19.5C12.5797 19.5 12.9035 19.4888 13.9166 19.443C14.7046 19.4273 15.4843 19.2781 16.2225 19.0017C16.8538 18.7576 17.4271 18.3843 17.9057 17.9057C18.3843 17.4271 18.7576 16.8538 19.0017 16.2225C19.2778 15.4843 19.4267 14.7046 19.4421 13.9166C19.4896 12.9035 19.5 12.5797 19.5 10C19.5 7.42032 19.4888 7.09645 19.443 6.08341C19.4273 5.29535 19.2781 4.51567 19.0017 3.7775C18.7629 3.1433 18.3886 2.56886 17.9049 2.09427C17.4304 1.61096 16.8563 1.23695 16.2225 0.99832C15.4843 0.72224 14.7046 0.57331 13.9166 0.55786C12.9035 0.51036 12.5797 0.5 10 0.5ZM10 5.12132C9.0351 5.12132 8.0918 5.40745 7.28955 5.94352C6.48725 6.4796 5.86194 7.24155 5.49269 8.133C5.12343 9.0245 5.02682 10.0054 5.21506 10.9518C5.40331 11.8982 5.86796 12.7675 6.55025 13.4497C7.23255 14.132 8.1018 14.5967 9.0482 14.7849C9.9946 14.9732 10.9755 14.8766 11.867 14.5073C12.7585 14.1381 13.5204 13.5127 14.0565 12.7105C14.5926 11.9082 14.8787 10.9649 14.8787 10C14.8787 8.7061 14.3647 7.46518 13.4497 6.55025C12.5348 5.63532 11.2939 5.12132 10 5.12132ZM10 13.167C9.3736 13.167 8.7613 12.9812 8.2405 12.6332C7.71973 12.2852 7.31382 11.7906 7.07412 11.2119C6.83442 10.6333 6.7717 9.9965 6.8939 9.3822C7.0161 8.7678 7.31772 8.2035 7.76063 7.76063C8.2035 7.31772 8.7678 7.0161 9.3822 6.8939C9.9965 6.7717 10.6333 6.83442 11.2119 7.07412C11.7906 7.31382 12.2852 7.71973 12.6332 8.2405C12.9812 8.7613 13.167 9.3736 13.167 10C13.167 10.8399 12.8333 11.6455 12.2394 12.2394C11.6455 12.8333 10.8399 13.167 10 13.167ZM15.0713 3.78873C14.8458 3.78873 14.6254 3.85559 14.4379 3.98085C14.2505 4.10612 14.1043 4.28416 14.0181 4.49247C13.9318 4.70078 13.9092 4.92999 13.9532 5.15113C13.9972 5.37227 14.1057 5.5754 14.2652 5.73483C14.4246 5.89426 14.6277 6.00284 14.8489 6.04682C15.07 6.09081 15.2992 6.06823 15.5075 5.98195C15.7158 5.89567 15.8939 5.74955 16.0191 5.56208C16.1444 5.37461 16.2113 5.1542 16.2113 4.92873C16.2113 4.62638 16.0912 4.33642 15.8774 4.12263C15.6636 3.90883 15.3736 3.78873 15.0713 3.78873Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
