"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { EmailSubmission, EmailResponse, FormState } from "@/lib/types";
import { initAnalytics } from "@/lib/analytics";

export default function HomePage() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    emailError: "",
    isLoading: false,
    showSuccess: false,
    isResetting: false,
    isFadingOut: false,
  });

  const { email, emailError, isLoading, showSuccess, isFadingOut } = formState;

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const resetToOriginalState = () => {
    updateFormState({
      showSuccess: false,
      email: "",
      emailError: "",
      isResetting: false,
      isLoading: false,
      isFadingOut: false
    });
    // Reset scroll position to center on mobile when returning to form
    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateEmail = (email: string) => {
    // More robust email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Additional check for valid TLD (at least 2 characters)
    const tldRegex = /\.[a-zA-Z]{2,}$/;
    
    return emailRegex.test(email) && tldRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    updateFormState({ emailError: "" });
    
    if (!email.trim()) {
      updateFormState({ emailError: "Email is required" });
      return;
    }
    
    if (!validateEmail(email)) {
      updateFormState({ emailError: "Please enter a valid email address" });
      return;
    }
    
    updateFormState({ isLoading: true });
    
    try {
      // Check if we're on localhost for testing
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isLocalhost) {
        // Mock response for localhost testing
        console.log('Localhost detected - using mock response');
        
        // Show "Joining..." for 1 second, then start fade out
        setTimeout(() => {
          updateFormState({ isLoading: false, isFadingOut: true });
          
          // Wait for fade out animation, then show success immediately
          setTimeout(() => {
            updateFormState({ showSuccess: true, isFadingOut: false });
            // Reset scroll position to center on mobile
            if (window.innerWidth <= 768) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 600);
        }, 1000);
      } else {
        // Production API call
        const response = await fetch('/.netlify/functions/submit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() } as EmailSubmission),
        });

        const data: EmailResponse = await response.json();

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 409) {
            throw new Error('This email is already on the waitlist!');
          }
          throw new Error(data.error || 'Failed to submit email');
        }
        
        // Show "Joining..." for 1 second, then start fade out
        setTimeout(() => {
          updateFormState({ isLoading: false, isFadingOut: true });
          
          // Wait for fade out animation, then show success immediately
          setTimeout(() => {
            updateFormState({ showSuccess: true, isFadingOut: false });
            // Reset scroll position to center on mobile
            if (window.innerWidth <= 768) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 600);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      updateFormState({ isLoading: false });
      updateFormState({ 
        emailError: error instanceof Error ? error.message : "Failed to submit email. Please try again." 
      });
    }
  };

  // DEBUG: Check if overlay is being applied
  useEffect(() => {
    const afterElement = window.getComputedStyle(document.body, '::after');
    console.log('Body::after element exists:', afterElement.content !== 'none');
    console.log('Body::after background:', afterElement.background);
    console.log('Body::after z-index:', afterElement.zIndex);
  }, []);

  // Initialize analytics tracking
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="h-dvh flex flex-col relative z-20 overflow-hidden">
      
      {/* Header/Nav */}
      <header className="header">
        <div className="header-container">
          {/* Logo Tag */}
          <div className="logo-tag-container">
            <Link href="/" className="logo-link" onClick={resetToOriginalState}>
              {/* Responsive logo: logomark on mobile, full logo on desktop */}
              <img
                src="/logo-mark.svg"
                alt="Viewmark Logo"
                className="logo-tag logo-mobile"
                width="40"
                height="18"
              />
              <img
                src="/logo-full.svg"
                alt="Viewmark Logo"
                className="logo-tag logo-desktop"
                width="124"
                height="18"
              />
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="header-navigation">
            <a href="mailto:hello@viewmark.co" className="header-contact-text">Contact Us</a>
            <button
              onClick={() => {
                if (showSuccess) {
                  resetToOriginalState();
                } else {
                  const emailInput = document.querySelector('.email-input') as HTMLInputElement;
                  if (emailInput) {
                    emailInput.focus();
                  }
                  // Reset scroll position to center on mobile when clicking Join Waitlist
                  if (window.innerWidth <= 768) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="header-waitlist-button"
              aria-label={showSuccess ? "Return to form" : "Join Waitlist"}
            >
              Join Waitlist
            </button>
          </div>
        </div>
        {/* Blur & fade layer (structural overlay like Cluely) */}
        <div className="header-blur" aria-hidden="true"></div>
      </header>

      {/* Main Content - Single Column Layout */}
      <div className="main-content">
        <div className="content-container">
          
          {!showSuccess ? (
            <>
              {/* Headline - Centered */}
              <h1 className={`headline ${isFadingOut ? 'fade-out-1' : ''}`}>
                <span className="headline-primary gradient-text">
                  Put your brand on <br className="mobile-break" />
                  viral videos
                </span>
              </h1>
              
              {/* Subheader - Centered */}
              <p className={`subheader ${isFadingOut ? 'fade-out-2' : ''}`}>
                Real views. Real audiences. <br className="mobile-break" />
                Zero wasted ad spend.
              </p>
              
              {/* Email Form - Centered */}
              <div className={`form-container ${isFadingOut ? 'fade-out-3' : ''}`}>
                <form onSubmit={handleSubmit} className="email-form" noValidate>
                  <div className={`input-group ${emailError ? 'error' : ''}`}>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          updateFormState({ email: e.target.value });
                          if (emailError) updateFormState({ emailError: "" });
                        }}
                        onFocus={() => {
                          if (emailError) updateFormState({ emailError: "" });
                        }}
                        placeholder="your@email.com"
                        aria-label="Work email address"
                        className="email-input"
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        inputMode="email"
                        disabled={isLoading || isFadingOut}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || showSuccess || isFadingOut}
                      className={`submit-button ${isFadingOut ? 'submitted' : ''}`}
                      aria-label={isLoading || isFadingOut ? "Joining..." : "Join Waitlist"}
                    >
                      <span>{isLoading || isFadingOut ? "Joining..." : "Join Waitlist"}</span>
                    </button>
                    
                    <p className={`error-message ${emailError ? 'error-visible' : 'error-hidden'}`} role="alert">
                      {emailError || ' '}
                    </p>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* Success Headline - Centered */}
              <h1 className="headline success-fade-in">
                <span className="headline-primary success-gradient">
                  Waitlist spot secured
                </span>
              </h1>
              
              {/* Success Subheader - Centered */}
              <p className="subheader success-fade-in">
                Keep an eye on your inbox for updates.
              </p>
              
              {/* Invisible Form Container - Maintains Spacing */}
              <div className="form-container" style={{ visibility: 'hidden', height: 'auto', minHeight: '50px' }}>
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      aria-label="Work email address"
                      className="email-input"
                      disabled
                    />
                  </div>
                  <button
                    type="button"
                    className="submit-button"
                    disabled
                  >
                    <span>Join Waitlist</span>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="socialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6E7E9" />
            <stop offset="50%" stopColor="#9EA3A8" />
            <stop offset="100%" stopColor="#E6E7E9" />
          </linearGradient>
          <linearGradient id="socialGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8F9FA" />
            <stop offset="50%" stopColor="#B8BCC0" />
            <stop offset="100%" stopColor="#F8F9FA" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Pattern */}
      <img 
        alt="" 
        loading="lazy" 
        width="940" 
        height="147" 
        decoding="async" 
        className="bg-pattern-image pointer-events-none absolute left-1/2 bottom-[1px] z-50 max-w-none -translate-x-1/2 dark:block brightness-[200%] lg:brightness-150"
        style={{color: "transparent"}} 
        src="/bg-pattern (1).png"
      />

      {/* Gradient Background */}
        <img 
          alt="" 
          loading="lazy" 
          width="1678" 
          height="685" 
          decoding="async" 
          className="bg-gradient-image pointer-events-none absolute left-1/2 -z-10 max-w-none -translate-x-1/2" 
          style={{color: "transparent"}} 
          src="/d58221aa8f3a4800cd4f60a05760a8bc.svg"
        />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-border"></div>
        <div className="footer-container">
          <div className="footer-content">
            {/* Left side - Copyright */}
            <div className="copyright">
              © 2025 Viewmark. All rights reserved.
            </div>
            
            {/* Right side - Social media icons */}
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
                  <path d="M15.4033 0.5H18.2852L11.989 7.701L19.396 17.5H13.5964L9.054 11.557L3.85637 17.5H0.972692L7.70709 9.7977L0.601562 0.5H6.54839L10.6544 5.93215L15.4033 0.5ZM14.3918 15.7738H15.9887L5.68067 2.13549H3.96702L14.3918 15.7738Z"/>
                </svg>
              </a>
              
              {/* Instagram icon */}
              <a 
                href="https://www.instagram.com/viewmarkco/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.21173C12.5365 2.21173 12.837 2.22123 13.8389 2.267C14.4411 2.27427 15.0377 2.38499 15.6024 2.59432C16.0151 2.74662 16.3884 2.9895 16.6949 3.30509C17.0105 3.61156 17.2534 3.98488 17.4057 4.39759C17.615 4.96235 17.7257 5.55888 17.733 6.16114C17.7788 7.16295 17.7883 7.4635 17.7883 10C17.7883 12.5365 17.7788 12.837 17.733 13.8389C17.7257 14.4411 17.615 15.0377 17.4057 15.6024C17.2476 16.0122 17.0055 16.3844 16.6949 16.6949C16.3844 17.0055 16.0122 17.2476 15.6024 17.4057C15.0377 17.615 14.4411 17.7257 13.8389 17.733C12.837 17.7788 12.5365 17.7883 10 17.7883C7.4635 17.7883 7.16295 17.7788 6.16114 17.733C5.55859 17.7258 4.96176 17.6151 4.39673 17.4057C3.98433 17.2533 3.61132 17.0104 3.30509 16.6949C2.9895 16.3884 2.74662 16.0151 2.59432 15.6024C2.38499 15.0377 2.27427 14.4411 2.267 13.8389C2.22123 12.837 2.21173 12.5365 2.21173 10C2.21173 7.4635 2.22123 7.16295 2.267 6.16114C2.27427 5.55888 2.38499 4.96235 2.59432 4.39759C2.74662 3.98488 2.9895 3.61156 3.30509 3.30509C3.61156 2.9895 3.98488 2.74662 4.39759 2.59432C4.96235 2.38499 5.55888 2.27427 6.16114 2.267C7.16295 2.22123 7.4635 2.21173 10 2.21173ZM10 0.5C7.42032 0.5 7.09645 0.51123 6.08341 0.557C5.29535 0.57272 4.51567 0.72194 3.7775 0.99832C3.1433 1.2371 2.56886 1.61141 2.09427 2.09514C1.61096 2.56956 1.23695 3.14369 0.99832 3.7775C0.72224 4.51572 0.57331 5.2954 0.55786 6.08341C0.51036 7.09645 0.5 7.42032 0.5 10C0.5 12.5797 0.51123 12.9035 0.557 13.9166C0.57272 14.7046 0.72194 15.4843 0.99832 16.2225C1.2371 16.8567 1.61141 17.4311 2.09514 17.9057C2.56956 18.389 3.14369 18.763 3.7775 19.0017C4.51572 19.2778 5.2954 19.4267 6.08341 19.4421C7.09645 19.4896 7.42032 19.5 10 19.5C12.5797 19.5 12.9035 19.4888 13.9166 19.443C14.7046 19.4273 15.4843 19.2781 16.2225 19.0017C16.8538 18.7576 17.4271 18.3843 17.9057 17.9057C18.3843 17.4271 18.7576 16.8538 19.0017 16.2225C19.2778 15.4843 19.4267 14.7046 19.4421 13.9166C19.4896 12.9035 19.5 12.5797 19.5 10C19.5 7.42032 19.4888 7.09645 19.443 6.08341C19.4273 5.29535 19.2781 4.51567 19.0017 3.7775C18.7629 3.1433 18.3886 2.56886 17.9049 2.09427C17.4304 1.61096 16.8563 1.23695 16.2225 0.99832C15.4843 0.72224 14.7046 0.57331 13.9166 0.55786C12.9035 0.51036 12.5797 0.5 10 0.5ZM10 5.12132C9.0351 5.12132 8.0918 5.40745 7.28955 5.94352C6.48725 6.4796 5.86194 7.24155 5.49269 8.133C5.12343 9.0245 5.02682 10.0054 5.21506 10.9518C5.40331 11.8982 5.86796 12.7675 6.55025 13.4497C7.23255 14.132 8.1018 14.5967 9.0482 14.7849C9.9946 14.9732 10.9755 14.8766 11.867 14.5073C12.7585 14.1381 13.5204 13.5127 14.0565 12.7105C14.5926 11.9082 14.8787 10.9649 14.8787 10C14.8787 8.7061 14.3647 7.46518 13.4497 6.55025C12.5348 5.63532 11.2939 5.12132 10 5.12132ZM10 13.167C9.3736 13.167 8.7613 12.9812 8.2405 12.6332C7.71973 12.2852 7.31382 11.7906 7.07412 11.2119C6.83442 10.6333 6.7717 9.9965 6.8939 9.3822C7.0161 8.7678 7.31772 8.2035 7.76063 7.76063C8.2035 7.31772 8.7678 7.0161 9.3822 6.8939C9.9965 6.7717 10.6333 6.83442 11.2119 7.07412C11.7906 7.31382 12.2852 7.71973 12.6332 8.2405C12.9812 8.7613 13.167 9.3736 13.167 10C13.167 10.8399 12.8333 11.6455 12.2394 12.2394C11.6455 12.8333 10.8399 13.167 10 13.167ZM15.0713 3.78873C14.8458 3.78873 14.6254 3.85559 14.4379 3.98085C14.2505 4.10612 14.1043 4.28416 14.0181 4.49247C13.9318 4.70078 13.9092 4.92999 13.9532 5.15113C13.9972 5.37227 14.1057 5.5754 14.2652 5.73483C14.4246 5.89426 14.6277 6.00284 14.8489 6.04682C15.07 6.09081 15.2992 6.06823 15.5075 5.98195C15.7158 5.89567 15.8939 5.74955 16.0191 5.56208C16.1444 5.37461 16.2113 5.1542 16.2113 4.92873C16.2113 4.62638 16.0912 4.33642 15.8774 4.12263C15.6636 3.90883 15.3736 3.78873 15.0713 3.78873Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
