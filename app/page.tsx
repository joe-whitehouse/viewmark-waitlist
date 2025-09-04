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
                width="82"
                height="52"
                viewBox="0 0 567 359"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-tag"
                aria-label="Viewmark Logo"
            >
              <rect width="567" height="359" fill="black"/>
              <path d="M75.46 282.93L55 228.34H67.55L77.95 258.71C79.15 262.13 80.18 265.58 81.03 269.06C81.88 272.54 82.76 276.03 83.67 279.51H80.45C81.36 276.03 82.24 272.55 83.09 269.09C83.94 265.62 84.93 262.16 86.07 258.71L96.42 228.34H108.92L88.41 282.93H75.47H75.46Z" fill="white"/>
              <path d="M122.85 220.33C120.93 220.33 119.28 219.68 117.89 218.38C116.51 217.08 115.81 215.5 115.81 213.64C115.81 211.78 116.5 210.21 117.89 208.93C119.27 207.64 120.93 207 122.85 207C124.77 207 126.48 207.64 127.88 208.93C129.28 210.22 129.98 211.79 129.98 213.64C129.98 215.49 129.28 217.03 127.88 218.35C126.48 219.67 124.8 220.33 122.85 220.33ZM116.99 282.93V231.84C116.99 229.91 118.56 228.34 120.49 228.34H125.21C127.14 228.34 128.71 229.91 128.71 231.84V282.93H116.99Z" fill="white"/>
              <path d="M165.5 284.05C160.06 284.05 155.38 282.89 151.46 280.58C147.54 278.27 144.52 275.01 142.4 270.81C140.28 266.61 139.23 261.66 139.23 255.97C139.23 250.28 140.27 245.45 142.35 241.2C144.43 236.95 147.38 233.63 151.19 231.24C155 228.85 159.47 227.65 164.62 227.65C167.84 227.65 170.93 228.17 173.9 229.21C176.86 230.25 179.5 231.88 181.81 234.09C184.12 236.3 185.94 239.15 187.28 242.63C188.61 246.11 189.28 250.28 189.28 255.13V259.04H145.19V250.69H183.37L177.9 253.33C177.9 250.11 177.4 247.28 176.39 244.83C175.38 242.39 173.9 240.48 171.95 239.12C170 237.76 167.57 237.07 164.67 237.07C161.77 237.07 159.25 237.76 157.2 239.15C155.15 240.53 153.59 242.38 152.51 244.69C151.44 247 150.9 249.52 150.9 252.26V257.97C150.9 261.58 151.51 264.63 152.73 267.1C153.95 269.57 155.68 271.45 157.91 272.72C160.14 273.99 162.72 274.62 165.65 274.62C167.57 274.62 169.32 274.34 170.9 273.79C172.48 273.24 173.84 272.41 174.98 271.3C176.12 270.19 176.98 268.83 177.57 267.2L188.46 269.59C187.58 272.49 186.09 275.02 183.99 277.18C181.89 279.35 179.28 281.03 176.15 282.23C173.02 283.43 169.48 284.04 165.51 284.04L165.5 284.05Z" fill="white"/>
              <path d="M208.86 282.93L192.55 228.34H204.85L210.56 250.36C211.41 253.78 212.33 257.58 213.32 261.76C214.31 265.94 215.26 270.62 216.18 275.8H214.57C215.51 270.79 216.49 266.18 217.5 261.98C218.51 257.78 219.47 253.91 220.38 250.36L226.14 228.34H237.57L243.19 250.36C244.07 253.84 245.01 257.68 246.02 261.86C247.03 266.04 247.99 270.69 248.9 275.8H247.29C248.2 270.75 249.14 266.14 250.1 261.96C251.06 257.78 251.98 253.91 252.86 250.36L258.57 228.34H271.02L254.61 282.93H242.79L236.25 260.03C235.6 257.75 234.96 255.32 234.32 252.73C233.68 250.14 233.07 247.51 232.46 244.82C231.86 242.13 231.23 239.51 230.58 236.93H232.87C232.28 239.47 231.67 242.09 231.04 244.79C230.41 247.49 229.78 250.14 229.16 252.75C228.54 255.35 227.89 257.78 227.21 260.03L220.67 282.93H208.85H208.86Z" fill="white"/>
              <path d="M278.44 282.93V228.34H289.52L289.86 241.23H289.03C289.81 238.07 291.02 235.48 292.64 233.44C294.27 231.41 296.18 229.9 298.38 228.92C300.58 227.94 302.86 227.46 305.24 227.46C309.18 227.46 312.37 228.69 314.81 231.15C317.25 233.61 318.93 237.13 319.84 241.72H318.42C319.14 238.6 320.39 235.97 322.18 233.86C323.97 231.74 326.11 230.15 328.6 229.07C331.09 227.99 333.75 227.46 336.58 227.46C339.83 227.46 342.76 228.16 345.37 229.56C347.97 230.96 350.04 233.04 351.57 235.81C353.1 238.58 353.86 242.01 353.86 246.11V282.93H342.14V247.63C342.14 244.11 341.17 241.56 339.23 239.96C337.29 238.37 334.99 237.57 332.32 237.57C330.17 237.57 328.32 238.03 326.75 238.94C325.19 239.85 323.98 241.11 323.14 242.72C322.29 244.33 321.87 246.2 321.87 248.31V282.93H310.4V246.99C310.4 244.13 309.5 241.84 307.71 240.13C305.92 238.42 303.61 237.57 300.78 237.57C298.89 237.57 297.13 238.02 295.51 238.91C293.88 239.81 292.58 241.12 291.6 242.84C290.62 244.57 290.14 246.7 290.14 249.24V282.93H278.42H278.44Z" fill="white"/>
              <path d="M385.01 283.95C380.68 283.95 376.81 282.84 373.41 280.61C370.01 278.38 367.32 275.17 365.35 270.97C363.38 266.77 362.4 261.69 362.4 255.74C362.4 249.79 363.4 244.66 365.4 240.48C367.4 236.3 370.12 233.12 373.55 230.93C376.98 228.75 380.83 227.66 385.1 227.66C388.42 227.66 391.11 228.21 393.18 229.3C395.25 230.39 396.87 231.69 398.04 233.21C399.21 234.73 400.11 236.1 400.73 237.34H401.36V228.36H412.98V282.95H401.41V274.36H400.73C400.11 275.6 399.19 276.97 397.97 278.49C396.75 280.01 395.09 281.3 392.99 282.37C390.89 283.44 388.23 283.98 385.01 283.98V283.95ZM388.04 274.19C390.94 274.19 393.39 273.41 395.41 271.85C397.43 270.29 398.96 268.11 400 265.33C401.04 262.55 401.56 259.33 401.56 255.69C401.56 252.05 401.05 248.81 400.02 246.1C398.99 243.38 397.47 241.27 395.45 239.75C393.43 238.24 390.96 237.48 388.03 237.48C385.1 237.48 382.52 238.27 380.49 239.85C378.46 241.43 376.93 243.59 375.9 246.32C374.87 249.05 374.36 252.18 374.36 255.7C374.36 259.22 374.88 262.37 375.92 265.15C376.96 267.93 378.49 270.14 380.51 271.77C382.53 273.4 385.03 274.21 388.03 274.21L388.04 274.19Z" fill="white"/>
              <path d="M463.73 282.93V210.18H475.45V282.93H463.73ZM474.47 265.11V250.85H476.42L497.03 228.34H510.9L486.49 255H484.29L474.48 265.11H474.47ZM498 282.93L479.4 257.59L487.41 249.29L512.31 282.93H498Z" fill="white"/>
              <path d="M436.67 228.34C430.85 228.34 424.95 233.06 424.95 238.89V282.93H436.67V238.89H455.13V228.34H436.67Z" fill="white"/>
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
              CONTACT
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - Single Column Layout */}
      <div className="main-content">
        <div className="content-container">
          {/* Headline - Centered */}
          <h1 className="headline">
            <span className="headline-primary">
              Put your logo on <br className="mobile-break" />
              viral content
            </span>
          </h1>
          
          {/* Subheader - Centered */}
          <p className="subheader">
            Stop wasting money on ads no one <br className="mobile-break" />
            watches. Get your brand seen by <br className="mobile-break" />
            millions who actually care.
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
