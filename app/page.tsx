"use client";

import { useState } from "react";
import Link from "next/link";
import type { EmailSubmission, EmailResponse, FormState } from "@/lib/types";

export default function HomePage() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    emailError: "",
    isLoading: false,
    showSuccess: false,
    isResetting: false,
  });

  const { email, emailError, isLoading, showSuccess, isResetting } = formState;

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
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
    
    // Minimum loading time of 2 seconds for better UX
    const startTime = Date.now();
    const minLoadingTime = 2000;
    
    try {
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

      // Ensure minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      updateFormState({ isLoading: false, showSuccess: true });
      
      // Show success message for 3 seconds, then reset
      setTimeout(() => {
        updateFormState({ isResetting: true });
        // Small delay to allow fade out, then reset
        setTimeout(() => {
          updateFormState({
            showSuccess: false,
            email: "",
            emailError: "",
            isResetting: false
          });
        }, 400);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      updateFormState({ isLoading: false });
      updateFormState({ 
        emailError: error instanceof Error ? error.message : "Failed to submit email. Please try again." 
      });
    }
  };

  return (
    <div className="min-h-dvh bg-page-gradient flex flex-col">

      {/* Header/Nav */}
      <header className="header">
        <div className="header-container">
          {/* Logo Tag */}
                           <div className="logo-tag-container">
                   <Link href="/" className="logo-link">
                     <svg
                       width="80"
                       height="13"
                       viewBox="0 0 758 124"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                       className="logo-tag"
                       aria-label="Viewmark Logo"
                   >
                     <path d="M102.614 21.1024V0.193604H120.039V21.1024H102.614ZM102.614 121.194V35.0416H120.039V121.194H102.614Z" fill="black"/>
                     <path d="M156.244 83.8288C157.793 99.8976 166.118 108.803 180.832 108.803C191.481 108.803 199.032 103.382 203.485 93.896L218.393 101.834C211.423 115.192 198.064 123.13 181.026 123.13C153.727 123.13 138.625 105.125 138.625 78.2144C138.625 51.304 154.114 33.2992 179.477 33.2992C204.84 33.2992 220.523 50.9168 220.523 78.2144C220.523 80.5376 220.523 82.28 220.329 84.0224H156.631L156.244 83.8288ZM156.437 70.4704H202.13C200.194 55.5632 192.062 47.432 179.284 47.432C166.505 47.432 158.374 55.3696 156.437 70.4704Z" fill="black"/>
                     <path d="M342.885 35.0416H361.471L331.655 121.194H314.23L292.739 56.5312L271.249 121.194H253.824L224.008 35.0416H242.594L262.73 98.3488L283.64 35.0416H302.226L323.136 98.3488L343.078 35.0416H342.885Z" fill="black"/>
                     <path d="M496.999 62.1456V121.194H479.574V66.0176C479.574 54.0144 472.604 47.8192 462.536 47.8192C451.694 47.8192 444.143 55.3696 444.143 68.1472V121.194H426.718V66.0176C426.718 54.0144 419.748 47.8192 409.681 47.8192C398.838 47.8192 391.288 55.3696 391.288 68.1472V121.194H373.863V35.0416H391.288V48.2064C395.934 39.1072 405.228 33.2992 416.457 33.2992C428.654 33.2992 437.754 39.1072 441.82 48.9808C447.628 38.72 457.115 33.2992 467.957 33.2992C484.995 33.2992 497.193 44.7216 497.193 62.1456H496.999Z" fill="black"/>
                     <path d="M512.294 78.0208C512.294 50.7232 527.009 33.1056 550.242 33.1056C561.665 33.1056 572.314 38.9136 577.347 47.432V34.848H594.772V121H577.347V108.416C572.507 117.128 561.665 122.742 550.242 122.742C527.202 122.742 512.294 105.125 512.294 77.8272V78.0208ZM577.347 78.0208C577.347 59.2416 568.829 47.8192 554.114 47.8192C539.4 47.8192 530.687 59.2416 530.687 78.0208C530.687 96.8 539.593 108.416 554.114 108.416C568.635 108.416 577.347 97.1872 577.347 78.0208Z" fill="black"/>
                     <path d="M737.657 121.194L711.52 81.312L696.418 97.5744V121H678.993V0H696.418V76.472L735.334 34.6544H756.825L723.717 69.5024L757.793 120.806H737.464L737.657 121.194Z" fill="black"/>
                     <path d="M663.698 35.0416H633.882H616.457V50.9168V121.194H633.882V50.9168H663.698V35.0416Z" fill="black"/>
                     <path d="M66.0213 35.0416H84.6079L50.9197 121.194H33.4947L0 35.0416H18.5866L42.2072 100.091L66.0213 35.0416Z" fill="black"/>
                   </svg>
                   </Link>
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
          {/* Sticker Logo - Centered */}
          <div className="sticker-logo-container">
            <svg width="682" height="314" viewBox="0 0 682 314" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_50_3)">
                <path d="M524.491 310.286V181.417H515.419L463.356 310.286H316.067V181.417H307.149L254.914 310.286H3V129.869H55.0632V1H158.674V129.869H167.747L219.81 1H471.741V129.869H480.658L532.894 1H680.165V181.417H628.102V310.286H524.491Z" fill="white"/>
              </g>
              <path d="M80.8364 155.643L80.8364 284.512H28.7734L28.7734 155.643" fill="#1D1C1B"/>
              <path d="M80.8379 155.643L80.8379 26.7739L132.901 26.7739V155.643" fill="#1D1C1B"/>
              <path d="M80.8379 284.512L132.901 155.643H185.136L132.901 284.512" fill="#1D1C1B"/>
              <path d="M185.134 155.643L237.197 26.7739L289.26 26.7739L237.197 155.643" fill="#1D1C1B"/>
              <path d="M602.33 155.643V26.7739L654.393 26.7739V155.643" fill="#1D1C1B"/>
              <path d="M602.328 155.643V284.512H550.265V155.643" fill="#1D1C1B"/>
              <path d="M602.327 26.7739L550.264 155.643H498.029L550.264 26.7739" fill="#1D1C1B"/>
              <path d="M498.03 155.643L445.967 284.512H393.904L445.967 155.643" fill="#1D1C1B"/>
              <path d="M393.903 155.643V26.7739L445.966 26.7739V155.643" fill="#1D1C1B"/>
              <path d="M393.902 155.643V284.512H341.839V155.643" fill="#1D1C1B"/>
              <path d="M393.904 26.7739L341.841 155.643H289.778L341.841 26.7739" fill="#1D1C1B"/>
              <path d="M289.776 155.643L237.542 284.512H185.479L237.542 155.643" fill="#1D1C1B"/>
              <defs>
                <filter id="filter0_d_50_3" x="0" y="0" width="681.165" height="313.286" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="-1" dy="1"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_50_3"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_50_3" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
          
          {/* Headline - Centered */}
          <h1 className="headline">
            <span className="headline-primary">
              Put your brand on <br className="mobile-break" />
              viral videos
            </span>
          </h1>
          
          {/* Subheader - Centered */}
          <p className="subheader">
            Real views. Real audiences. <br className="mobile-break" />
            Zero wasted ad spend.
          </p>
          
          {/* Email Form - Centered */}
          <div className="form-container">
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
                    placeholder="name@work-email.com"
                    aria-label="Work email address"
                    className={`email-input ${isResetting ? 'input-fade-out' : ''}`}
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    inputMode="email"
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
