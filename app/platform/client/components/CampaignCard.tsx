import React, { useState, useEffect } from 'react';

interface CampaignCardProps {
  campaign: {
    id: number;
    title: string;
    startDate: string;
    targetViews: number;
    currentViews: number;
    budget: number;
    status: string;
  };
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [animatedViews, setAnimatedViews] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const progressPercentage = (campaign.currentViews / campaign.targetViews) * 100;

  // Animation for views count and percentage
  useEffect(() => {
    if (hasAnimated) {
      setAnimatedViews(campaign.currentViews);
      setAnimatedPercentage((campaign.currentViews / campaign.targetViews) * 100);
      return;
    }

    const duration = 1200; // Match progress bar duration
    const steps = 60; // Match progress bar steps
    const totalViews = campaign.currentViews;
    const targetViews = campaign.targetViews;
    const finalPercentage = (totalViews / targetViews) * 100;
    
    const increment = totalViews / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalViews) {
        setAnimatedViews(totalViews);
        setAnimatedPercentage(finalPercentage);
        clearInterval(timer);
      } else {
        const currentViews = Math.floor(current);
        setAnimatedViews(currentViews);
        // Percentage animates proportionally
        const currentPercentage = (currentViews / targetViews) * 100;
        setAnimatedPercentage(currentPercentage);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [campaign.currentViews, campaign.targetViews, hasAnimated]);

  // Animation for progress bar
  useEffect(() => {
    if (hasAnimated) {
      setAnimatedProgress(progressPercentage);
      return;
    }

    const duration = 1200;
    const steps = 60;
    const increment = progressPercentage / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= progressPercentage) {
        setAnimatedProgress(progressPercentage);
        clearInterval(timer);
        setHasAnimated(true);
      } else {
        setAnimatedProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [progressPercentage, hasAnimated]);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Industry standard: minutes, hours, then days
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    const weeks = Math.floor(diffDays / 7);
    if (diffDays < 30) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  };

  const isCompleted = progressPercentage >= 100;

  return (
    <div 
      className="backdrop-blur-sm p-4 border border-white/20 mb-8 transition-all duration-300 cursor-pointer group" 
      style={{
        borderRadius: '1.5rem',
        background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 4px 12px 0px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset';
      }}
      onClick={() => window.location.href = '/platform/client/campaign-details'}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${campaign.title} campaign`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = '/platform/client/campaign-details';
        }
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-normal" style={{color: "rgba(0, 0, 0, 0.85)", letterSpacing: "-0.04em"}}>
              {campaign.title}
            </h2>
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
          <p className="text-gray-600">
            {isCompleted 
              ? `Finished ${getRelativeTime('2025-08-12')}` // 5 days ago for completed example
              : `Launched ${getRelativeTime(campaign.startDate)}`
            }
          </p>
        </div>
        <a 
          href="/platform/client/campaign-details"
          className="sign-out-button transition-transform duration-200"
          title="View full campaign details"
        >
          View details
        </a>
      </div>

      {/* Progress Bar - Bottom Element */}
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span className="font-medium">Campaign progress:</span>
          <span className="font-medium">
            {animatedViews.toLocaleString()} / {campaign.targetViews.toLocaleString()} views
            <span className={`ml-2 ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
              ({Math.round(animatedPercentage)}% complete)
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
                width: `${Math.min(animatedProgress, 100)}%`,
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
  );
}
