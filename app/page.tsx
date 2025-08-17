"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setEmailError("");
    
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    // Minimum loading time of 2 seconds for better UX
    const startTime = Date.now();
    const minLoadingTime = 2000;
    
    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }

      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setIsLoading(false);
      setShowSuccess(true);
      
      // Show success message for 5 seconds, with smooth transition
      // Success message fades out at 4.7s, form reappears at 5s
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setEmailError("");
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setIsLoading(false);
      setEmailError("Failed to submit email. Please try again.");
    }
  };

  return (
    <div className="min-h-dvh bg-page-gradient flex flex-col">
      {/* Top Message Bar */}
      <div className="top-banner">
        <p className="banner-text">
          Waitlist Bonus: Join today for $199 credit on your first campaign
        </p>
      </div>

      {/* Header/Nav */}
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-container">
            <svg
              width="40"
              height="28"
              viewBox="0 0 365 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo"
              aria-label="Viewmark Logo"
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
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <a 
              href="/platform"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Platform
            </a>
            <a 
              href="mailto:hello@viewmark.co"
              className="contact-button"
              aria-label="Contact us via email"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - Single Column Layout */}
      <div className="main-content">
        <div className="content-container">
          {/* Headline - Centered */}
          <h1 className="headline">
            <span className="headline-primary">Guerrilla marketing</span>
            <br />
            <span className="headline-secondary">for short form</span>
          </h1>
          
          {/* Subheader - Centered */}
          <p className="subheader">
            <span className="desktop-only">
              Put your brand on viral short-form videos with top creators.
              <br />
              Get seen, sell more, and scale faster.
            </span>
            <span className="mobile-only">
              Put your brand on viral short-form videos
              <br />
              with top creators. Get seen, sell more,
              <br />
              and scale faster.
            </span>
          </p>
          
          {/* Email Form - Centered */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className={`email-form ${showSuccess ? 'form-hidden' : ''}`} noValidate>
              <div className="input-group">
                <div className={`input-wrapper ${emailError ? 'input-error' : ''}`}>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="name@work-email.com"
                    aria-label="Work email address"
                    className="email-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                  aria-label={isLoading ? "Submitting..." : "Join waitlist"}
                >
                  <span className={isLoading ? "invisible" : ""}>Join Waitlist</span>
                  {isLoading && (
                    <div className="loading-spinner" aria-hidden="true"></div>
                  )}
                </button>
              </div>
              
              <p className={`error-message ${emailError ? 'error-visible' : 'error-hidden'}`} role="alert">
                {emailError || ' '}
              </p>
            </form>
            
            {showSuccess && (
              <div className="success-message" role="status">
                <div className="success-content">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="white"/>
                  </svg>
                  <span>You&apos;re on the waitlist!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
