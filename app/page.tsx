"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isResetting, setIsResetting] = useState(false);


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
      
      // Show success message for 3 seconds, then reset
      setTimeout(() => {
        setIsResetting(true);
        // Small delay to allow fade out, then reset
        setTimeout(() => {
          setShowSuccess(false);
          setEmail("");
          setEmailError("");
          setIsResetting(false);
        }, 400);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setIsLoading(false);
      setEmailError("Failed to submit email. Please try again.");
    }
  };

  return (
    <div className="min-h-dvh bg-page-gradient flex flex-col">

      {/* Header/Nav */}
      <header className="header">
        <div className="header-container">
          {/* Logo Tag */}
          <div className="logo-tag-container">
            <a href="/" className="logo-link">
              <svg
                width="82"
                height="43"
                viewBox="0 0 410 217"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-tag"
                aria-label="Viewmark Logo"
            >
              <rect width="410" height="217" fill="black"/>
              <path d="M47.07 124.13L52.33 140.33L56 153.72H56.5L60.17 140.33L65.28 124.13H74.07L61.47 161.72H50.53L38 124.13H47.07Z" fill="white"/>
              <path d="M98.88 161.72H94.42C91.25 161.72 88.84 160.89 87.18 159.24C85.52 157.58 84.7 155.22 84.7 152.15V131.48H79.73V124.14H93.92V154.38H98.89V161.72H98.88ZM83.9 114.05V112.61C83.9 111.22 84.34 110.1 85.23 109.26C86.12 108.42 87.47 108 89.3 108C91.13 108 92.42 108.42 93.33 109.26C94.24 110.1 94.7 111.22 94.7 112.61V114.05C94.7 115.44 94.24 116.56 93.33 117.4C92.42 118.24 91.07 118.66 89.3 118.66C87.53 118.66 86.12 118.24 85.23 117.4C84.34 116.56 83.9 115.44 83.9 114.05Z" fill="white"/>
              <path d="M105.47 153.22C104.05 150.24 103.35 146.79 103.35 142.85C103.35 138.91 104.05 135.54 105.44 132.59C106.83 129.64 108.84 127.35 111.45 125.71C114.07 124.08 117.17 123.26 120.77 123.26C124.37 123.26 127.54 124.08 130.13 125.71C132.72 127.34 134.67 129.59 135.96 132.44C137.26 135.3 137.9 138.55 137.9 142.2V145.22H112.91V146.16C112.91 148.94 113.69 151.15 115.25 152.78C116.81 154.41 119.08 155.23 122.05 155.23C124.21 155.23 126.02 154.79 127.49 153.9C128.95 153.01 130.33 151.75 131.63 150.12L136.6 155.66C135.02 157.87 132.89 159.57 130.23 160.77C127.57 161.97 124.51 162.57 121.05 162.57C117.4 162.57 114.25 161.75 111.58 160.12C108.92 158.49 106.88 156.18 105.46 153.21L105.47 153.22ZM112.92 138.97V139.55H128.33V138.9C128.33 136.26 127.68 134.15 126.39 132.56C125.09 130.98 123.27 130.18 120.92 130.18C118.57 130.18 116.53 131 115.09 132.63C113.65 134.26 112.93 136.37 112.93 138.97H112.92Z" fill="white"/>
              <path d="M157.63 152.5H157.92L161.38 139.61L165.77 124.13H174.12L178.66 139.61L182.19 152.5H182.48L185.43 139.61L189.17 124.13H197.74L187.44 161.72H177.5L172.68 145.16L169.87 134.94H169.65L166.91 145.16L162.16 161.72H152.37L142 124.13H150.86L154.68 139.61L157.63 152.5Z" fill="white"/>
              <path d="M214.22 130.4C215.95 125.65 219.31 123.27 224.3 123.27C226.94 123.27 229.2 123.91 231.07 125.18C232.94 126.45 234.31 128.34 235.17 130.83H235.31C236.03 128.62 237.4 126.81 239.41 125.39C241.42 123.97 243.9 123.27 246.83 123.27C250.53 123.27 253.37 124.54 255.36 127.09C257.35 129.63 258.35 133.26 258.35 137.96V161.72H249.13V138.89C249.13 133.51 247.11 130.83 243.08 130.83C241.11 130.83 239.46 131.37 238.11 132.45C236.77 133.53 236.09 135.01 236.09 136.88V161.72H226.87V138.89C226.87 133.51 224.85 130.83 220.82 130.83C218.95 130.83 217.32 131.38 215.92 132.49C214.53 133.59 213.83 135.06 213.83 136.88V161.72H204.61V124.13H213.83V130.39H214.22V130.4Z" fill="white"/>
              <path d="M289.25 155.24H288.82C288.2 157.64 286.94 159.46 285.04 160.71C283.14 161.96 280.75 162.58 277.87 162.58C274.08 162.58 271.14 161.58 269.05 159.59C266.96 157.6 265.92 154.9 265.92 151.49C265.92 147.65 267.29 144.77 270.02 142.85C272.76 140.93 276.74 139.97 281.97 139.97H288.38V137.23C288.38 132.81 286.05 130.61 281.4 130.61C279.38 130.61 277.7 131.03 276.36 131.87C275.02 132.71 273.84 133.87 272.83 135.36L267.36 130.46C268.85 128.16 270.77 126.38 273.12 125.13C275.47 123.88 278.45 123.26 282.05 123.26C287.09 123.26 290.94 124.41 293.61 126.72C296.28 129.03 297.61 132.34 297.61 136.66V154.37H301.35V161.71H296.24C294.27 161.71 292.69 161.13 291.49 159.98C290.29 158.83 289.55 157.24 289.26 155.23L289.25 155.24ZM288.38 150.49V145.52H282.48C277.68 145.52 275.28 147.06 275.28 150.13V151.35C275.28 154.37 277.18 155.89 280.97 155.89C283.13 155.89 284.91 155.41 286.3 154.45C287.69 153.49 288.39 152.17 288.39 150.49H288.38Z" fill="white"/>
              <path d="M318.4 131.91C318.93 129.61 320.04 127.73 321.75 126.29C323.45 124.85 325.65 124.13 328.34 124.13H330.36V132.84H327.48C324.31 132.84 321.95 133.31 320.39 134.24C318.83 135.18 318.05 136.65 318.05 138.67V161.71H308.83V124.12H318.05V131.9H318.41L318.4 131.91Z" fill="white"/>
              <path d="M346.7 140.55L351.67 133.78L360.09 124.13H370.53L357.57 138.68L371.9 161.72H360.95L351.3 144.87L346.33 150.27V161.72H337.11V108.44H346.33V140.55H346.7Z" fill="white"/>
            </svg>
            </a>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:hello@viewmark.co"
              className="contact-text"
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
            <span className="headline-primary">Put your logo on viral content</span>
          </h1>
          
          {/* Subheader - Centered */}
          <p className="subheader">
            Stop wasting money on ads no one watches. Get your brand or offer seen by millions who actually care.
          </p>
          
          {/* Email Form - Centered */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className="email-form" noValidate>
              <div className={`input-group ${emailError ? 'error' : ''}`}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onFocus={() => {
                      if (emailError) setEmailError("");
                    }}
                    placeholder="name@work-email.com"
                    aria-label="Work email address"
                    className={`email-input ${isResetting ? 'input-fade-out' : ''}`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || showSuccess}
                  className={`submit-button ${isLoading ? 'loading' : ''}`}
                  aria-label={isLoading ? "Submitting..." : showSuccess ? "Done" : "Join waitlist"}
                >
                  <span className={isLoading || isResetting ? "text-fade-out" : ""}>
                    {showSuccess ? "Done" : "Join Waitlist"}
                  </span>
                  {isLoading && (
                    <div className="loading-spinner" aria-hidden="true"></div>
                  )}
                </button>
              </div>
              
              <p className={`error-message ${emailError ? 'error-visible' : 'error-hidden'}`} role="alert">
                {emailError || ' '}
              </p>
            </form>
            

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Copyright */}
            <div className="copyright">
              © 2025 Viewmark. All rights reserved.
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
                href="https://www.instagram.com/viewmarkco/" 
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
