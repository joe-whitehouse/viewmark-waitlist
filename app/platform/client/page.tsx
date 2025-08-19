"use client";

import React, { useState, useEffect } from 'react';
import CampaignCard from './components/CampaignCard';
import SearchAndFilter from './components/SearchAndFilter';
import Link from 'next/link';

// Time indicator component
const TimeIndicator = () => {
  const [timeText, setTimeText] = useState('Updated just now');
  const [lastUpdateTime] = useState(Date.now());

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const diffInMs = now - lastUpdateTime;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 1) {
        setTimeText('Updated just now');
      } else if (diffInMinutes < 60) {
        setTimeText(`Updated ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`);
      } else if (diffInHours < 24) {
        setTimeText(`Updated ${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`);
      } else if (diffInDays === 1) {
        setTimeText('Updated yesterday');
      } else {
        setTimeText(`Updated ${diffInDays} days ago`);
      }
    };

    // Update immediately
    updateTime();
    
    // Update every minute
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  return (
    <div className="text-sm text-gray-600">
      {timeText}
    </div>
  );
};

// Platform detection function
const detectPlatform = (url: string) => {
  if (url.includes('tiktok.com')) return 'TikTok';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
  if (url.includes('instagram.com')) return 'Instagram';
  if (url.includes('facebook.com')) return 'Facebook';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'X';
  return 'Other';
};

// Relative time function
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `uploaded ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  if (diffInHours < 24) return `uploaded ${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

// Mock data
const initialCampaigns = [
  {
    id: 1,
    title: "Summer Product Launch",
    startDate: "2025-01-20",
    targetViews: 5000000,
    currentViews: 15420000,
    budget: 50000,
    status: "Complete"
  },
  {
    id: 2,
    title: "Holiday Collection",
    startDate: "2025-01-25",
    targetViews: 10000000,
    currentViews: 8750000,
    budget: 75000,
    status: "Active"
  },
  {
    id: 3,
    title: "Brand Awareness Campaign",
    startDate: "2025-01-28",
    targetViews: 20000000,
    currentViews: 12500000,
    budget: 100000,
    status: "Active"
  },
  {
    id: 4,
    title: "Product Demo Series",
    startDate: "2025-01-22",
    targetViews: 8000000,
    currentViews: 9200000,
    budget: 60000,
    status: "Complete"
  },
  {
    id: 5,
    title: "Viral Challenge Campaign",
    startDate: "2025-01-30",
    targetViews: 15000000,
    currentViews: 18500000,
    budget: 120000,
    status: "Complete"
  }
];

const mockVideos = [
  {
    id: 1,
    title: "Product Demo Video",
    videoUrl: "https://www.tiktok.com/@hesselhersmiss/video/7427489612190207264?is_from_webapp=1&sender_device=pc&web_id=7450910971671922209",
    postedDate: "2025-01-20",
    duration: "0:45",
    views: 2500000,
    status: "approved",
    clipperName: "@hesselhersmiss"
  },
  {
    id: 2,
    title: "Behind the Scenes",
    videoUrl: "https://youtube.com/watch?v=abc123",
    postedDate: "2025-01-25",
    duration: "1:20",
    views: 1800000,
    status: "approved",
    clipperName: "@sarahkim"
  },
  {
    id: 3,
    title: "Customer Testimonial",
    videoUrl: "https://instagram.com/p/xyz789",
    postedDate: "2025-02-01",
    duration: "0:30",
    views: 950000,
    status: "approved",
    clipperName: "@mikejohnson"
  },
  {
    id: 4,
    title: "Product Showcase",
    videoUrl: "https://tiktok.com/@user/video/789012",
    postedDate: "2025-02-05",
    duration: "0:55",
    views: 3200000,
    status: "approved",
    clipperName: "@emmawilson"
  },
  {
    id: 5,
    title: "Unboxing Experience",
    videoUrl: "https://youtube.com/shorts/def456",
    postedDate: "2025-02-08",
    duration: "0:40",
    views: 1500000,
    status: "approved",
    clipperName: "@davidlee"
  }
];

export default function ClientDashboard() {
  const [reportedVideos, setReportedVideos] = useState<Set<number>>(new Set());
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  // Filter and sort campaigns
  useEffect(() => {
    let filtered = [...campaigns];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'date-asc':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'views-desc':
          return b.currentViews - a.currentViews;
        case 'views-asc':
          return a.currentViews - b.currentViews;
        case 'progress-desc':
          return (b.currentViews / b.targetViews) - (a.currentViews / a.targetViews);
        case 'progress-asc':
          return (a.currentViews / a.targetViews) - (b.currentViews / b.targetViews);
        default:
          return 0;
      }
    });

    setFilteredCampaigns(filtered);
  }, [campaigns, searchQuery, statusFilter, sortBy]);

  const handleReportVideo = (videoId: number) => {
    setReportedVideos(prev => new Set(prev).add(videoId));
    alert(`Video reported. We'll review it shortly.`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#dde2ee' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <svg
                width="40"
                height="28"
                viewBox="0 0 365 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
                aria-label="Viewmark Logo"
                style={{ color: "rgba(0, 0, 0, 0.85)" }}
              >
                <g clipPath="url(#clip0_6_20)">
                  <path d="M30.3 75V150H0V75" fill="currentColor"/>
                  <path d="M30.2998 75V0H60.5998V75" fill="currentColor"/>
                  <path d="M30.2998 150L60.5998 75H90.9998L60.5998 150" fill="currentColor"/>
                  <path d="M91 75L121.3 0H151.6L121.3 75" fill="currentColor"/>
                  <path d="M333.8 75V0H364.1V75" fill="currentColor"/>
                  <path d="M333.8 75V150H303.5V75" fill="currentColor"/>
                  <path d="M333.8 0L303.5 75H273.1L303.5 0" fill="currentColor"/>
                  <path d="M273.1 75L242.8 150H212.5L242.8 75" fill="currentColor"/>
                  <path d="M212.5 75V0H242.8V75" fill="currentColor"/>
                  <path d="M212.5 75V150H182.2V75" fill="currentColor"/>
                  <path d="M212.5 0L182.2 75H151.9L182.2 0" fill="currentColor"/>
                  <path d="M151.9 75L121.5 150H91.2002L121.5 75" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_6_20">
                    <rect width="364.1" height="150" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="text-sm text-gray-600">Client dashboard</span>
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
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Campaigns
              </h1>
            </div>
            <a 
              href="mailto:campaigns@viewmark.co?subject=New Campaign Request"
              className="new-campaign-button"
              title="Request new campaign"
              style={{ minWidth: '160px' }}
            >
              Request new campaign
            </a>
          </div>
        </div>

                {/* Search and Filter Controls */}
        <SearchAndFilter 
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          onSortChange={setSortBy}
        />

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 flex items-center">
            <span>
              Showing <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> of <span className="font-semibold text-gray-900">{campaigns.length}</span> campaigns
            </span>
          </div>
          <TimeIndicator />
        </div>

        {/* Campaign Cards */}
        {filteredCampaigns.length > 0 ? (
          <>
            {filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}

            {/* End of Campaigns Indicator */}
            <div className="mt-12 mb-8 text-center">
              <p className="text-sm text-gray-500">
                You've reached the end of your campaigns
              </p>
            </div>
          </>
                     ) : campaigns.length === 0 ? (
               /* Empty State - No campaigns at all */
               <div className="mt-20 text-center">
                 <div className="max-w-md mx-auto">
                   <div className="mb-6">
                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                       <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                       </svg>
                     </div>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-900 mb-3">
                     No campaigns yet
                   </h3>
                   <p className="text-gray-600 leading-relaxed">
                     Your campaigns will appear here once we've set them up. We're working on getting your first campaign ready - you'll see it here soon!
                   </p>
                 </div>
               </div>
        ) : (
          /* No Search Results Message */
          <div className="mt-40 text-center" style={{ marginTop: 'calc(50vh - 200px)' }}>
            <p className="text-sm text-gray-500 italic">
              No campaigns match your search criteria
            </p>
          </div>
        )}
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
