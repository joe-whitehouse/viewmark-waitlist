'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Platform configuration - easily modifiable for different campaigns
const PLATFORM_CONFIG = {
  'TikTok': {
    domains: ['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com'],
    patterns: ['/@', '/video/'],
    name: 'TikTok'
  },
  'Instagram': {
    domains: ['instagram.com', 'www.instagram.com', 'instagr.am'],
    patterns: ['/p/', '/reel/'],
    name: 'Instagram'
  },
  'YouTube Shorts': {
    domains: ['youtube.com', 'www.youtube.com', 'youtu.be'],
    patterns: ['/shorts/'],
    name: 'YouTube Shorts'
  }
};

export default function SubmitVideoForm() {
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [videoUrl, setVideoUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [platformError, setPlatformError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);

  // Mock campaign data - in real app this would come from API
  const campaigns = [
    {
      id: 1,
      name: 'Summer Product Launch',
      description: 'Promote our new summer collection with lifestyle content',
      status: 'active',
      startDate: '2024-06-01',
      currentViews: 1250000,
      targetViews: 2000000,
      progressPercentage: 62.5,
              platforms: ['TikTok', 'Instagram'],
        // Creator-specific data
        creatorViews: 450000,
        creatorTargetViews: 800000,
        creatorProgressPercentage: 56.25
    },
    {
      id: 2,
      name: 'Holiday Campaign',
      description: 'Festive content for the holiday season',
      status: 'active',
      startDate: '2024-11-15',
      currentViews: 450000,
      targetViews: 1000000,
      progressPercentage: 45,
      platforms: ['TikTok']
    }
  ];

  useEffect(() => {
    const selectedCampaign = campaigns.find(c => c.id.toString() === campaignId);
    setCampaign(selectedCampaign);
  }, [campaignId]);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffDays < 1) return 'Just now';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
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

  const validateUrl = (url: string): { isValid: boolean; error: string } => {
    if (!url.trim()) {
      return { isValid: false, error: 'Video URL is required' };
    }

    // Basic URL format validation
    try {
      const urlObj = new URL(url);
      if (!urlObj.protocol || !urlObj.hostname) {
        return { isValid: false, error: 'Please enter a valid URL' };
      }
    } catch {
      return { isValid: false, error: 'Please enter a valid URL' };
    }

    return { isValid: true, error: '' };
  };

  const detectPlatform = (url: string): string => {
    if (!url) return '';
    
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      const pathname = urlObj.pathname.toLowerCase();
      
      // Check each platform configuration
      for (const [platformName, config] of Object.entries(PLATFORM_CONFIG)) {
        // Check if domain matches
        const domainMatches = config.domains.some(domain => hostname === domain);
        
        if (domainMatches) {
          // Check if pathname contains required patterns
          const patternMatches = config.patterns.every(pattern => pathname.includes(pattern));
          
          if (patternMatches) {
            return platformName;
          }
        }
      }
      
      return '';
    } catch {
      return '';
    }
  };

  const validatePlatform = (detectedPlatform: string, campaignPlatforms: string[]) => {
    if (!detectedPlatform) {
      const supportedPlatforms = Object.keys(PLATFORM_CONFIG).join(', ');
      return `Please enter a valid video URL from: ${supportedPlatforms}`;
    }
    if (!campaignPlatforms.includes(detectedPlatform)) {
      return `This campaign only accepts videos from: ${campaignPlatforms.join(', ')}. Your video appears to be from ${detectedPlatform}.`;
    }
    return '';
  };

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    
    // Clear previous errors
    setUrlError('');
    setPlatformError('');
    
    // Validate URL format first
    const urlValidation = validateUrl(url);
    if (!urlValidation.isValid) {
      setUrlError(urlValidation.error);
      setPlatform('');
      return;
    }
    
    // Detect platform from valid URL
    const detectedPlatform = detectPlatform(url);
    setPlatform(detectedPlatform);
    
    // Validate platform against campaign requirements
    if (campaign && detectedPlatform) {
      const error = validatePlatform(detectedPlatform, campaign.platforms);
      setPlatformError(error);
    } else if (campaign && !detectedPlatform && url.trim()) {
      const supportedPlatforms = Object.keys(PLATFORM_CONFIG).join(', ');
      setPlatformError(`Please enter a valid video URL from: ${supportedPlatforms}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL format
    const urlValidation = validateUrl(videoUrl);
    if (!urlValidation.isValid) {
      setUrlError(urlValidation.error);
      return;
    }
    
    // Validate platform
    const detectedPlatform = detectPlatform(videoUrl);
    if (!detectedPlatform) {
      const supportedPlatforms = Object.keys(PLATFORM_CONFIG).join(', ');
      setPlatformError(`Please enter a valid video URL from: ${supportedPlatforms}`);
      return;
    }
    
    // Validate platform against campaign requirements
    if (campaign) {
      const error = validatePlatform(detectedPlatform, campaign.platforms);
      if (error) {
        setPlatformError(error);
        return;
      }
    }
    
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmissionSuccess(true);
          setVideoUrl('');
      setPlatform('');
      setPlatformError('');
      setUrlError('');

    // Reset success message after 5 seconds
    setTimeout(() => setSubmissionSuccess(false), 5000);
  };

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#dde2ee' }}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Campaign not found</h2>
            <p className="text-gray-600 mb-4">The selected campaign could not be found.</p>
            <a 
              href="/platform/clipper/submit"
              className="view-details-button"
            >
              Back to Campaigns
            </a>
          </div>
        </div>
      </div>
    );
  }

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
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <a 
            href="/platform/clipper/submit"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to campaigns
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Submit Video</h1>
          <p className="text-sm text-gray-600">Submit your video link for review and approval</p>
        </div>

        {/* Campaign Info - Exact same component as client platform */}
        <div 
          className="backdrop-blur-sm p-4 border border-white/20 mb-8 transition-all duration-300" 
          style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
                                <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-normal" style={{color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
                      {campaign.name}
                    </h2>
                    <span className={`px-3 py-1 text-sm font-medium`} style={{
                      borderRadius: '0.75rem',
                      background: campaign.progressPercentage >= 100
                        ? 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)'
                        : 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)',
                      color: campaign.progressPercentage >= 100
                        ? 'rgb(21, 128, 61)'
                        : 'rgb(21, 128, 61)',
                      boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                      border: campaign.progressPercentage >= 100
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                      {campaign.progressPercentage >= 100 ? 'Complete' : 'Active'}
                    </span>
                  </div>
                  
                  {/* Platform Labels */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-gray-500">Platforms:</span>
                    {campaign.platforms.map((platform, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-md"
                        style={{
                          background: 'linear-gradient(145deg, rgb(243, 244, 246) 0%, rgb(229, 231, 235) 100%)',
                          color: 'rgb(55, 65, 81)',
                          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                          border: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
              <p className="text-gray-600">
                {campaign.progressPercentage >= 100
                  ? `Finished ${getRelativeTime('2025-08-12')}` // 5 days ago for completed example
                  : `Launched ${getRelativeTime(campaign.startDate)}`
                }
              </p>
            </div>
          </div>

                     {/* Progress Bar - Bottom Element */}
           <div>
             <div className="flex justify-between text-sm text-gray-600 mb-3">
               <span className="font-medium">Campaign progress:</span>
               <span className="font-medium">
                 {campaign.currentViews.toLocaleString()} / {campaign.targetViews.toLocaleString()} views
                 <span className={`ml-2 ${campaign.progressPercentage >= 100 ? 'text-green-600' : 'text-blue-600'}`}>
                   ({Math.round(campaign.progressPercentage)}% complete)
                 </span>
               </span>
             </div>
             <div className="w-full h-8 relative overflow-hidden" style={{
               borderRadius: '0.75rem',
               background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
               boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
               border: '1px solid rgba(0, 0, 0, 0.1)'
             }}>
               {/* Main Campaign Progress Bar */}
               <div 
                 className="h-full transition-all duration-300 ease-out relative overflow-hidden"
                 style={{ 
                   width: `${Math.min(campaign.progressPercentage, 100)}%`,
                   borderRadius: '0.75rem',
                   background: campaign.progressPercentage >= 100
                     ? 'linear-gradient(145deg, rgba(134, 239, 172, 0.8) 0%, rgba(74, 222, 128, 0.7) 50%, rgba(34, 197, 94, 0.6) 100%)'
                     : 'linear-gradient(145deg, rgba(147, 197, 253, 0.8) 0%, rgba(96, 165, 250, 0.7) 50%, rgba(59, 130, 246, 0.6) 100%)',
                   boxShadow: campaign.progressPercentage >= 100
                     ? 'rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(34, 197, 94, 0.2) 0px 2px 8px 0px'
                     : 'rgba(255, 255, 255, 0.6) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px -1px 0px 0px inset, rgba(59, 130, 246, 0.2) 0px 2px 8px 0px',
                   border: campaign.progressPercentage >= 100
                     ? '1px solid rgba(34, 197, 94, 0.2)'
                     : '1px solid rgba(59, 130, 246, 0.2)',
                   backdropFilter: 'blur(10px)'
                 }}
               >
                 <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${campaign.progressPercentage >= 100 ? 'animate-pulse' : ''}`}></div>
                 
                                   {/* Creator Progress Overlay - Glassy Effect */}
                  <div 
                    className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
                    style={{ 
                      width: `${Math.min(campaign.creatorProgressPercentage, 100)}%`,
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)',
                      boxShadow: 'rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px 0px inset',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(8px)',
                      zIndex: 10
                    }}
                  >
                    {/* Subtle purple tint overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(126, 34, 206, 0.08) 100%)',
                        borderRadius: '0.75rem'
                      }}
                    ></div>
                    {/* Glassy highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  
                  {/* Creator Progress Extension (when over 100%) - Glassy Effect */}
                  {campaign.creatorProgressPercentage > 100 && (
                    <div 
                      className="absolute top-0 h-full transition-all duration-300 ease-out"
                      style={{ 
                        left: '100%',
                        width: `${Math.min(campaign.creatorProgressPercentage - 100, 50)}%`,
                        borderRadius: '0.75rem',
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)',
                        boxShadow: 'rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -1px 0px 0px inset',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 10
                      }}
                    >
                      {/* Subtle purple tint overlay */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(126, 34, 206, 0.08) 100%)',
                          borderRadius: '0.75rem'
                        }}
                      ></div>
                      {/* Glassy highlight */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                  )}
               </div>
             </div>
             
             {/* Creator Progress Label */}
             <div className="flex justify-between text-xs text-gray-500 mt-2">
               <span>Your contribution: {campaign.creatorViews.toLocaleString()} views</span>
               <span className={`font-medium ${campaign.creatorProgressPercentage >= 100 ? 'text-green-600' : 'text-purple-600'}`}>
                 ({Math.round(campaign.creatorProgressPercentage)}% of {campaign.creatorTargetViews.toLocaleString()} target)
               </span>
             </div>
           </div>
        </div>

        {/* Submission Form */}
        <div className="backdrop-blur-sm p-8 border border-white/20 rounded-2xl" style={{
          background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Video URL Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Video URL *
              </label>
              <div className="input-group">
                <div className={`input-wrapper ${platformError || urlError ? 'input-error' : ''}`}>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder={`https://tiktok.com/@username/video/123456789`}
                    className="url-input"
                  />
                </div>
              </div>
              <p className={`error-message ${platformError || urlError ? 'error-visible' : 'error-hidden'}`} role="alert">
                {urlError || platformError || ' '}
              </p>
            </div>



            {/* Submission Guidelines */}
            <div className="p-4 rounded-xl" style={{
              background: 'linear-gradient(145deg, rgb(254, 243, 199) 0%, rgb(253, 230, 138) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h4 className="text-sm font-semibold text-amber-900 mb-2">Submission Guidelines</h4>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Video must be from: {campaign?.platforms.join(', ')}</li>
                <li>• Video must be original content created by you</li>
                <li>• Video should be relevant to the selected campaign</li>
                <li>• Video must include the Viewmark logo/branding</li>
                <li>• Video should be posted within the last 30 days</li>
                <li>• We'll review your submission within 24-48 hours</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-white font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isSubmitting 
                    ? 'linear-gradient(145deg, rgb(107, 114, 128) 0%, rgb(75, 85, 99) 100%)'
                    : 'linear-gradient(145deg, rgb(23, 25, 28) 0%, rgb(29, 32, 32) 100%)',
                  boxShadow: 'rgba(0, 0, 0, 0.5) 0px -4px 0px 0px inset, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px 3px 6px 0px',
                  border: '1px solid rgba(0, 0, 0, 0.5)'
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Video for Review'
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {submissionSuccess && (
            <div className="mt-6 p-4 rounded-xl" style={{
              background: 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-green-900">Video Submitted Successfully!</h4>
                  <p className="text-xs text-green-700 mt-1">
                    We'll review your submission and notify you within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}
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
