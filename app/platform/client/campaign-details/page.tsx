'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export default function CampaignDetailsPage() {
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', '7d', '28d', '60d', '365d'
  
  // Mock campaign data - in real app this would come from props/params
  const campaign = {
    id: 1,
    title: "Summer Product Launch",
    startDate: "2025-01-20",
    targetViews: 5000000,
    currentViews: 15420000,
    budget: 50000,
    status: "Complete",
    description: "Launch campaign for our new summer product line featuring lifestyle content and product demonstrations.",
    performanceData: [
      { date: "2025-01-20", views: 180000 },
      { date: "2025-01-21", views: 450000 },
      { date: "2025-01-22", views: 1200000 },
      { date: "2025-01-23", views: 2800000 },
      { date: "2025-01-24", views: 5200000 },
      { date: "2025-01-25", views: 8900000 },
      { date: "2025-01-26", views: 7200000 },
      { date: "2025-01-27", views: 10500000 },
      { date: "2025-01-28", views: 13200000 },
      { date: "2025-01-29", views: 11800000 },
      { date: "2025-01-30", views: 14800000 },
      { date: "2025-01-31", views: 15420000 }
    ],
    videos: [
      {
        id: 1,
        title: "Product Demo Video",
        platform: "TikTok",
        url: "https://www.tiktok.com/@hesselhersmiss/video/7427489612190207264",
        views: 2500000,
        postedDate: "2025-01-20",
        clipper: "alexchen",
        status: "approved",
        thumbnail: "https://picsum.photos/300/400", // Placeholder
        caption: "Just tried this amazing new product and I'm obsessed! The quality is incredible and it's perfect for my daily routine. Highly recommend checking it out! #productdemo #amazing #recommended"
      },
      {
        id: 2,
        title: "Lifestyle Showcase",
        platform: "Instagram",
        url: "https://instagram.com/p/example",
        views: 1800000,
        postedDate: "2025-01-22",
        clipper: "sarahkim",
        status: "approved",
        thumbnail: "https://picsum.photos/300/400", // Placeholder
        caption: "Living my best life with this incredible product! The transformation is real and I can't believe how much it's improved my daily routine. #lifestyle #transformation #amazing"
      },
      {
        id: 3,
        title: "Behind the Scenes",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example",
        views: 3200000,
        postedDate: "2025-01-25",
        clipper: "mikejohnson",
        status: "approved",
        thumbnail: "https://picsum.photos/300/400", // Placeholder
        caption: "You won't believe what goes into making this product! Here's a behind-the-scenes look at the quality and craftsmanship that makes it so special. #behindthescenes #quality #craftsmanship"
      },
      {
        id: 4,
        title: "Customer Testimonial",
        platform: "TikTok",
        url: "https://tiktok.com/@user/video/example",
        views: 950000,
        postedDate: "2025-01-28",
        clipper: "emmawilson",
        status: "approved",
        thumbnail: "https://picsum.photos/300/400", // Placeholder
        caption: "Honest review time! This product has completely changed my life and I had to share my experience. The results speak for themselves! #honestreview #lifesaver #amazing"
      },
      {
        id: 5,
        title: "Unboxing Experience",
        platform: "YouTube",
        url: "https://youtube.com/shorts/example",
        views: 1500000,
        postedDate: "2025-01-30",
        clipper: "davidlee",
        status: "approved",
        thumbnail: "https://picsum.photos/300/400", // Placeholder
        caption: "Unboxing this incredible product was such a treat! The packaging is beautiful and the product itself is even better than expected. #unboxing #beautiful #exceededexpectations"
      }
    ]
  };

  const progressPercentage = (campaign.currentViews / campaign.targetViews) * 100;
  const isCompleted = progressPercentage >= 100;

  // Filter data based on time filter
  const getFilteredData = () => {
    const now = new Date();
    const filterDays = {
      '7d': 7,
      '28d': 28,
      '60d': 60,
      '365d': 365,
      'all': Infinity
    };
    
    const daysToShow = filterDays[timeFilter as keyof typeof filterDays];
    const cutoffDate = new Date(now.getTime() - (daysToShow * 24 * 60 * 60 * 1000));
    
    // Filter data based on actual dates for real-time use
    const filteredData = campaign.performanceData
      .filter(point => new Date(point.date) >= cutoffDate);
    
    // Dynamic date formatting based on time range
    const getDateLabel = (dateString: string) => {
      const date = new Date(dateString);
      
      if (daysToShow <= 7) {
        // For short periods: show day names
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (daysToShow <= 28) {
        // For medium periods: show day numbers
        return date.toLocaleDateString('en-US', { day: 'numeric' });
      } else if (daysToShow <= 90) {
        // For longer periods: show month + day
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // For very long periods: show month + year
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }
    };
    
    return filteredData.map(point => ({
      date: getDateLabel(point.date),
      views: point.views,
    }));
  };

  const chartData = getFilteredData();
  
  // Calculate total views for the selected time period
  const getFilteredTotalViews = () => {
    const now = new Date();
    const filterDays = {
      '7d': 7,
      '28d': 28,
      '60d': 60,
      '365d': 365,
      'all': Infinity
    };
    
    const daysToShow = filterDays[timeFilter as keyof typeof filterDays];
    const cutoffDate = new Date(now.getTime() - (daysToShow * 24 * 60 * 60 * 1000));
    
    // Filter data based on actual dates for real-time use
    const filteredData = campaign.performanceData
      .filter(point => new Date(point.date) >= cutoffDate);
    
    if (timeFilter === 'all') {
      return campaign.currentViews; // All time shows campaign total
    } else {
      return filteredData.reduce((sum, point) => sum + point.views, 0);
    }
  };
  
  const filteredTotalViews = getFilteredTotalViews();
  
  // Get date range label for the selected time period
  const getDateRangeLabel = () => {
    const now = new Date();
    const filterDays = {
      '7d': 7,
      '28d': 28,
      '60d': 60,
      '365d': 365,
      'all': Infinity
    };
    
    const daysToShow = filterDays[timeFilter as keyof typeof filterDays];
    
    if (timeFilter === 'all') {
      return 'All Time';
    }
    
    const endDate = new Date(now);
    const startDate = new Date(now.getTime() - (daysToShow * 24 * 60 * 60 * 1000));
    
    const formatDate = (date: Date) => {
      if (daysToShow <= 7) {
        // For short periods: show month + day
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (daysToShow <= 28) {
        // For medium periods: show month + day
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else if (daysToShow <= 90) {
        // For longer periods: show month + day
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        // For very long periods: show month + day + year
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };
  
  const dateRangeLabel = getDateRangeLabel();

  // Professional glass tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'linear-gradient(145deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.08) 0px 8px 24px 0px',
          backdropFilter: 'blur(12px)',
          borderWidth: '1px',
          position: 'relative',
        }}>
          {/* Glass highlight */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
            borderRadius: '16px 16px 0 0',
          }} />
          
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 0.7)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            {label}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '16px',
            fontWeight: '700',
            color: 'rgba(59, 130, 246, 0.9)',
            letterSpacing: '-0.01em'
          }}>
            {payload[0].value.toLocaleString()} views
          </p>
        </div>
      );
    }
    return null;
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

  const handleReportVideo = (videoId: number) => {
    alert(`Video ${videoId} reported. We'll review it shortly.`);
  };

  // Format numbers like social media platforms
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

  // Calculate metrics
  const totalGrowth = campaign.performanceData[campaign.performanceData.length - 1]?.views - campaign.performanceData[0]?.views;
  const growthRate = Math.round((campaign.performanceData[campaign.performanceData.length - 1]?.views / campaign.performanceData[0]?.views - 1) * 100);
  const avgDailyViews = Math.round(campaign.performanceData.reduce((sum, point) => sum + point.views, 0) / campaign.performanceData.length);

           return (
           <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#dde2ee' }}>
             <style jsx>{`
               .chart-container * {
                 outline: none !important;
               }
               .chart-container svg {
                 outline: none !important;
               }
               .chart-container svg * {
                 outline: none !important;
               }
             `}</style>
      {/* Header (copied from main page) */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="black"/>
                <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <a 
            href="/platform/client"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to campaigns
          </a>
        </div>

        {/* Campaign Header (similar to CampaignCard but expanded) */}
        <div className="backdrop-blur-sm p-6 border border-white/20 mb-8" style={{
          borderRadius: '1.5rem',
          background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {campaign.title}
                </h1>
                <span className={`px-3 py-1 text-sm font-medium`} style={{
                  borderRadius: '0.75rem',
                  background: isCompleted 
                    ? 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)'
                    : 'linear-gradient(145deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)',
                  color: isCompleted 
                    ? 'rgb(21, 128, 61)'
                    : 'rgb(37, 99, 235)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                  border: isCompleted 
                    ? '1px solid rgba(34, 197, 94, 0.3)'
                    : '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  {isCompleted ? 'Complete' : campaign.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {isCompleted 
                  ? `Finished ${getRelativeTime('2025-08-12')}`
                  : `Launched ${getRelativeTime(campaign.startDate)}`
                }
              </p>
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {campaign.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span className="font-medium">Campaign progress:</span>
              <span className="font-medium">
                {campaign.currentViews.toLocaleString()} / {campaign.targetViews.toLocaleString()} views
                <span className={`ml-2 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
                  ({Math.round(progressPercentage)}% complete)
                </span>
              </span>
            </div>
            <div className="w-full h-8 relative overflow-hidden" style={{
              borderRadius: '0.75rem',
              background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
              boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <div 
                className="h-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ 
                  width: `${Math.min(progressPercentage, 100)}%`,
                  borderRadius: '0.75rem',
                  background: isCompleted 
                    ? 'linear-gradient(145deg, rgba(134, 239, 172, 0.8) 0%, rgba(74, 222, 128, 0.7) 50%, rgba(34, 197, 94, 0.6) 100%)'
                    : 'linear-gradient(145deg, rgba(147, 197, 253, 0.8) 0%, rgba(96, 165, 250, 0.7) 50%, rgba(59, 130, 246, 0.6) 100%)',
                  boxShadow: isCompleted
                    ? 'rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(34, 197, 94, 0.2) 0px 2px 8px 0px'
                    : 'rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(59, 130, 246, 0.2) 0px 2px 8px 0px',
                  border: isCompleted
                    ? '1px solid rgba(34, 197, 94, 0.2)'
                    : '1px solid rgba(59, 130, 246, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${isCompleted ? 'animate-pulse' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Graph */}
        <div className="mb-8">
          <div className="backdrop-blur-sm p-6 border border-white/20" style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            {/* Header with better hierarchy */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Performance Overview</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Daily view progression over campaign duration</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {filteredTotalViews.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {dateRangeLabel}
                </div>
              </div>
            </div>
            
            {/* Time Filter Buttons */}
            <div className="flex justify-start mb-8">
              <div className="flex space-x-1 p-1" style={{
                background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
                borderRadius: '0.75rem',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                {[
                  { key: '7d', label: '7 Days' },
                  { key: '28d', label: '28 Days' },
                  { key: '60d', label: '60 Days' },
                  { key: '365d', label: '1 Year' },
                  { key: 'all', label: 'All Time' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setTimeFilter(filter.key)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      timeFilter === filter.key
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={{
                      background: timeFilter === filter.key
                        ? 'linear-gradient(145deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)'
                        : 'transparent',
                      boxShadow: timeFilter === filter.key
                        ? 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset'
                        : 'none',
                      border: timeFilter === filter.key
                        ? '1px solid rgba(59, 130, 246, 0.3)'
                        : '1px solid transparent'
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chart Container */}
            <div className="chart-container h-72 w-full relative focus:outline-none" style={{ outline: 'none' }}>
              <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
                <AreaChart data={chartData} style={{ outline: 'none' }}>
                  <defs>
                    {/* Optimized line gradient */}
                    <linearGradient id="premiumLineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgb(37, 99, 235)" />
                      <stop offset="30%" stopColor="rgb(59, 130, 246)" />
                      <stop offset="60%" stopColor="rgb(96, 165, 250)" />
                      <stop offset="100%" stopColor="rgb(147, 197, 253)" />
                    </linearGradient>
                    
                    {/* Drop shadow filter */}
                    <filter id="glassShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.1)"/>
                      <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(59, 130, 246, 0.2)"/>
                    </filter>
                  </defs>
                  
                  {/* Visible horizontal grid lines */}
                  <CartesianGrid 
                    strokeDasharray="2 4" 
                    stroke="rgba(0, 0, 0, 0.08)"
                    strokeWidth={1}
                    horizontal={true}
                    vertical={false}
                  />
                  
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fontSize: 11, 
                      fill: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
                    }}
                    padding={{ left: 20, right: 20 }}
                    dy={8}
                  />
                  
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fontSize: 11, 
                      fill: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 500,
                      letterSpacing: '0.02em'
                    }}
                    dx={-8}
                    tickFormatter={(value) => {
                      if (value >= 1000000) {
                        return (value / 1000000).toFixed(1) + 'M';
                      } else if (value >= 1000) {
                        return (value / 1000).toFixed(1) + 'K';
                      }
                      return value.toString();
                    }}
                  />
                  
                  {/* Subtle border frame */}
                  <defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.06)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      rx="8"
                    />
                  </defs>
                  
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Optimized smooth line */}
                  <Line
                    type="natural"
                    dataKey="views"
                    stroke="url(#premiumLineGradient)"
                    strokeWidth={3}
                    fill="none"
                    style={{
                      filter: 'url(#glassShadow)',
                      strokeLinecap: 'round',
                      outline: 'none'
                    }}
                    dot={false}
                    activeDot={{
                      fill: 'rgba(255, 255, 255, 0.95)',
                      stroke: 'rgba(37, 99, 235, 0.9)',
                      strokeWidth: 2,
                      r: 5,
                      style: {
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
                        backdropFilter: 'blur(4px)'
                      }
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            

          </div>
        </div>

        {/* Videos Section - Table View */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Campaign Videos</h2>
              <p className="text-sm text-gray-600">All videos created for this campaign</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {campaign.videos.length}
              </div>
              <div className="text-xs text-gray-500">Total Videos</div>
            </div>
          </div>
          
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
                <div className="col-span-2">Platform</div>
                <div className="col-span-2">Views</div>
                <div className="col-span-2">Posted</div>
                <div className="col-span-1">Creator</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {campaign.videos.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full" style={{
                    background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}>
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
                  <p className="text-sm text-gray-600">Videos will appear here once they're created for this campaign.</p>
                </div>
              ) : (
                campaign.videos.map((video) => (
                <div 
                  key={video.id}
                  className="px-6 py-6 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
                >
                  <div className="grid grid-cols-12 gap-4 items-start">
                    {/* Video Thumbnail & Caption */}
                    <div className="col-span-4">
                      <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                          {video.thumbnail ? (
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-20 h-36 object-cover rounded-xl"
                              style={{ aspectRatio: '9/16' }}
                            />
                          ) : (
                            <div 
                              className="w-20 h-36 rounded-xl flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                aspectRatio: '9/16'
                              }}
                            >
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                          <p className="text-sm font-medium text-gray-900 leading-relaxed line-clamp-3">{video.caption}</p>
                        </div>
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {video.platform}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm font-semibold text-gray-900">{formatViews(video.views)}</span>
                    </div>

                    {/* Posted Date */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-600">{getRelativeTime(video.postedDate)}</span>
                    </div>

                    {/* Creator */}
                    <div className="col-span-1 flex items-center">
                      <span className="text-sm text-gray-600 truncate">@{video.clipper}</span>
                    </div>

                    {/* Report Button */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleReportVideo(video.id);
                        }}
                        className="px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded-lg"
                        style={{
                          background: 'linear-gradient(145deg, rgb(254, 242, 242) 0%, rgb(252, 248, 248) 100%)',
                          color: 'rgb(220, 38, 38)',
                          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                          border: '1px solid rgba(220, 38, 38, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(145deg, rgb(254, 226, 226) 0%, rgb(252, 232, 232) 100%)';
                          e.currentTarget.style.color = 'rgb(185, 28, 28)';
                          e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px -2px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 2px 0px 0px inset, rgba(220, 38, 38, 0.15) 0px 2px 4px 0px';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(145deg, rgb(254, 242, 242) 0%, rgb(252, 248, 248) 100%)';
                          e.currentTarget.style.color = 'rgb(220, 38, 38)';
                          e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset';
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(145deg, rgb(252, 232, 232) 0%, rgb(248, 226, 226) 100%)';
                          e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.05) 0px 0px 0px 0px inset, rgba(255, 255, 255, 0.5) 0px 1px 0px 0px inset';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(145deg, rgb(254, 242, 242) 0%, rgb(252, 248, 248) 100%)';
                          e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset';
                        }}
                        title="Report this video"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer (copied from main page) */}
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
