import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use – Viewmark",
  description: "Viewmark LTD Terms of Use & Acceptable Conduct (For Clippers)",
};

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-page-gradient flex flex-col">

      {/* Header/Nav */}
      <header className="header">
        <div className="header-container">
          {/* Logo Tag */}
          <div className="logo-tag-container">
            <Link href="/" className="logo-link">
              <svg
                width="40"
                height="18"
                viewBox="0 0 20 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-tag"
                aria-label="Viewmark Logo"
              >
                <path d="M1.63 4.02979V8.04979H0V4.02979" fill="black"/>
                <path d="M1.62988 4.03V0H3.25988V4.03" fill="black"/>
                <path d="M1.62988 8.04979L3.25988 4.02979H4.87988L3.25988 8.04979" fill="black"/>
                <path d="M4.87988 4.03L6.50988 0H8.13988L6.50988 4.03" fill="black"/>
                <path d="M17.9194 4.03V0H19.5494V4.03" fill="black"/>
                <path d="M17.9195 4.02979V8.04979H16.2896V4.02979" fill="black"/>
                <path d="M17.9197 0L16.2897 4.03H14.6597L16.2897 0" fill="black"/>
                <path d="M14.6597 4.02979L13.0397 8.04979H11.4097L13.0397 4.02979" fill="black"/>
                <path d="M11.4097 4.03V0H13.0397V4.03" fill="black"/>
                <path d="M11.4098 4.02979V8.04979H9.77979V4.02979" fill="black"/>
                <path d="M11.4099 0L9.7799 4.03H8.1499L9.7799 0" fill="black"/>
                <path d="M8.1499 4.02979L6.5299 8.04979H4.8999L6.5299 4.02979" fill="black"/>
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Link href="/" aria-label="Join waitlist">
              <button className="header-waitlist-button">Join waitlist</button>
            </Link>
          </div>
        </div>
        {/* Blur & fade layer (structural overlay like Cluely) */}
        <div className="header-blur" aria-hidden="true"></div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container" style={{ alignItems: 'flex-start', paddingTop: 48, paddingBottom: 64 }}>
          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h1
              style={{
                fontSize: "2.5rem",
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                margin: 0,
                fontFamily: 'neueSingular-D-SemiBold, sans-serif',
                color: '#000000',
              }}
            >
              Terms of Use &amp; Acceptable Conduct
            </h1>
            <p
              style={{
                color: '#8A8A8A',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1.25rem",
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              Last updated on 8th of September, 2025
            </p>
          </div>
          {/* Content */}
          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              This Agreement is entered into between you (“You[r]” or “Clipper”), an independent contractor and content creator, and Viewmark Ltd, doing business as “Viewmark” (“We” “Us” and/or “Viewmark”) and governs your access to and use of our website, platform, and related services (collectively, the “Services”). Viewmark reserves the right to amend this Agreement from time to time with or without notice to You.
            </p>

            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              1. Age and Eligibility
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy as amended on the Effective Date stated above. Your continued use of the Services will constitute acceptance of any amendment to this Agreement so we encourage you to review these on a routine basis. If you do not agree with any part of these Terms or You believe that these Terms might be inapplicable to You, You must immediately discontinue your use of the Services.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              2. Age and Eligibility Requirements
            </h2>
            
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Use of the Services is prohibited for individuals under the age of 14 in the United Kingdom, or if outside the United Kingdom, individuals under the minimum age required to use social media platforms in their jurisdiction of residence. You must also meet all eligibility requirements set forth in this Agreement as well as those imposed by applicable social media platforms (e.g., Discord, TikTok, Instagram, YouTube, or X/Twitter) to maintain an account, which are subject to change from time to time with or without notice. By using the Services, you confirm that you satisfy these requirements. If you do not meet these criteria, you are not permitted to access or use the Services.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We reserve the right to, without limitation, terminate your account, ban your account and/or refuse Services to you for any circumvention or attempted circumvention of these policies.
            </p>
          </div>
          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              3. Account Creation and Security
            </h2>
            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              a. Registration
            </h3>
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Certain features of the Services may require you to establish an account through third-party platforms (such as Discord). By registering, you represent that you are legally entitled to enter into this Agreement and that all information you provide is accurate and current.
            </p>
            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              b. Verification Process
            </h3>
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              To validate Your account, You must affirm Your ownership of Your associated social media profiles (e.g., Discord, TikTok, X/Twitter, Meta, etc.). We reserve the right to review and, at our discretion, deny account registration to Viewmark for any non-discriminatory reason. Additionally, you may be asked to undergo further identity verification, including checks via third-party sources or documentation as determined appropriate by Viewmark for continued use of Our Services. You hereby authorize Viewmark to conduct any necessary verification regarding your identity, location, or associated accounts. If you are located in or are a citizen/resident of jurisdictions deemed high risk by Viewmark, any third-party acting on behalf of Viewmark, or governmental agency (including, without limitation, Cuba, Iran, North Korea, Syria, or the Crimea/Donetsk/Luhansk regions) or if You appear on any restricted-persons list maintained by the United Nations or any agency thereof, You are expressly prohibited from using the Services.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              c. Security Obligations
            </h3>
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              You are solely responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. Should You suspect any unauthorized access to Your Account, you must promptly notify us at <a href="mailto:help@viewmark.co" className="link-inline">help@viewmark.co</a>. Viewmark expressly disclaims any liability for any loss or damage resulting from unauthorized use of Your account.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              d. Documentation Requests
            </h3>
            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              From time to time, We may request additional documentation to comply with legal or partner obligations. Failure to furnish such documentation may result in suspension or termination of your account.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              4. Use of the Services and Content
            </h2>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              a. Intellectual Property and Ownership
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <strong style={{ fontWeight: 600 }}>Our Content:</strong> All content displayed on the Services—including text, graphics, videos, software, and designs—is protected by intellectual property laws. You may not utilize our trademarks, logos, or proprietary content except as expressly permitted under a separate campaign agreement or by Our prior written consent.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <strong style={{ fontWeight: 600 }}>Your Content:</strong> Viewmark makes no claim of ownership to Any original content you create and upload (&quot;Clipper Content&quot;) remains your property, whether or not protected. You are solely responsible for protection of any intellectual property in Your Clipper Content, and to the extent necessary, Viewmark will reasonable comply with any requests for assistance in protecting these rights at Your sole expense.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              As consideration for your use of the Services, by submitting Your Clipper Content to Our Services platform, you grant Us a worldwide, perpetual, non-revocable, non-exclusive, royalty-free license to display, reference, and use your content for promotional and related purposes.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <strong style={{ fontWeight: 600 }}>Third-Party Content:</strong> You hereby affirm that any submission of Clipper Content to Our Platform does not violate, infringe, or otherwise encumber the intellectual property rights of any third-party. You are solely responsible for ensuring that any and all of your Clipper Content is free from third-party intellectual property infringement. In accordance with Section 11 below, You agree to indemnify, defend (with attorney&rsquo;s fees), and hold harmless Viewmark from and against any claims (whether or not filed), actions, demands, or other liabilities resulting from intellectual property used in Your Clipper Content.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              b. Intellectual Property Right Infringement Claims
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We recognize the effort and expense that You put into your work and, accordingly, the action that must be taken to protect it from infringement. We reserve the right to take any action, as we deem necessary and in compliance with any applicable laws (including the UK Copyright, Designs and Patents Act) to ensure the protection of intellectual property resulting from our Services.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 0.75rem 0',
              }}
            >
              If you believe that any material on the Services infringes your copyright, please send a notification to <a href="mailto:help@viewmark.co" className="link-inline">help@viewmark.co</a> with &quot;DMCA Takedown Notice&quot; in the subject line. Please include, at a minimum, the following:
            </p>

            <div
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <p style={{ margin: '8px 0' }}>
                <strong style={{ fontWeight: 600 }}>i.</strong> Your contact information, including Name, Address, Phone Number (with country/area code) and Email, and whether you are the owner of the copyright or a person authorized to act on behalf of the owner of the copyright.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ fontWeight: 600 }}>ii.</strong> Identification of the protected/infringed material, including any relevant evidence to where the material is being displayed.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ fontWeight: 600 }}>iii.</strong> Identification of the allegedly infringing material, a link to its location, and any other relevant information that can reasonably support an inquiry.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ fontWeight: 600 }}>iv.</strong> A statement that the owner of the copyrighted material, or person authorized to act on behalf of the copyright owner, in good faith, believes the material to be used in violation of the law and/or without the permission of the copyright owner or its agent. This statement must be made under the penalty of perjury.
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ fontWeight: 600 }}>v.</strong> The notice must contain an original or digital signature of the person making the statement as the owner of the copyright or person authorized to act on behalf of the copyright owner.
              </p>
            </div>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              c. Third-Party Materials
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We do not control third-party content accessible through the Services and assume no responsibility for such material. While we do not pre-screen third-party content, we reserve the right to remove any material that violates these Terms or is deemed objectionable in Our Sole discretion.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              5. Privacy
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Your privacy is important to us. Please review our Privacy Policy, available on our website, which explains how we collect, use, and share your personal information. By using the Services, you consent to the practices described therein.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              6. Communications
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              By establishing an account with us, you agree to receive communications—including emails, SMS messages, and in-app notifications—pertaining to transactions, promotions, and administrative updates. While you may opt out of certain promotional messages, you acknowledge that essential communications (such as account-related notices) are necessary for your use of our Services and therefore cannot be declined. We encourage you to save all communications that we send to you. We may or may not maintain records of any communications to or from you, nor hold any duty to provide You with the same.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              7. Payments and Compensation
            </h2>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              a. Payment Structure
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We offer performance-based compensation (for example, on a cost-per-impression basis) as determined on a per-campaign basis, including specific eligibility criteria, payout rates, and minimum thresholds. We retain the right to verify performance metrics (including the engagement of third-parties as necessary) and adjust or withhold payments if we discover fraudulent activities (such as bot traffic or artificially inflated engagement). You will be provided notice and an opportunity to respond if such payment is being withheld, but We will only withhold those amounts in dispute from payment.
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Viewmark is a facilitator between Clients and Clippers (You). Accordingly, all payment for work performed by You is expressly contingent on payment from the Client to Viewmark. Our agreements with Clients stipulate certain payment obligations, but we do not guarantee that Clients will remit the full amounts. Viewmark will make every reasonable effort to collect payment from its Client, however, Viewmark disclaims any liability for unpaid works. In the event of non-payment by a Client and exhaustion of reasonable efforts to collect by Viewmark, You can pursue any available remedies under the law to recover any amounts owed.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              b. Processing of Payments
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Payments are handled through PayPal or another designated processor. By using our Services, you agree to adhere to any related terms set forth by these payment processors, including any conditions under PayPal. You further authorize Viewmark to share necessary account and transaction details with the payment processor. Payments are typically issued on a Net 30 basis from the end of each campaign, subject to meeting campaign-specific requirements and minimum payout thresholds as agreed upon by the parties. We are not responsible for delays or errors resulting from incorrect bank details or third-party processing issues.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              c. Tax Responsibilities
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              As an independent contractor, you are solely responsible for all taxes, fees, or other governmental charges applicable to your earnings under this Agreement in the UK.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              8. Prohibited Conduct
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 0.75rem 0',
              }}
            >
              You agree not to engage in any activity that disrupts or compromises the integrity or security of the Services, including but not limited to:
            </p>

            <div
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <p style={{ margin: '0 0 0 0' }}>
                • Unauthorized attempts to access or interfere with the Services (e.g., hacking, password cracking).
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Impersonating others or falsifying your identity or information.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Reverse engineering, decompiling, disassembling, or otherwise modifying the Services without explicit permission.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Uploading, transmitting, or storing harmful software, viruses, or corrupted files.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Utilizing automated tools to scrape, index, or mine data from the Services in a manner that imposes an undue burden.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Removing or altering proprietary notices on our content.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Disclosing confidential information relating to campaign strategies, payment details, or performance data to unauthorized parties.
              </p>
            </div>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Your conduct must always be professional, respectful, and in full compliance with all applicable laws and platform guidelines. This includes, but is not limited to, compliance with the UK Advertising Standards Authority regulations on the endorsement of products and services.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              9. Disclaimer of Warranties
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              THE SERVICES AND ALL ASSOCIATED CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY EXPRESS, IMPLIED, OR STATUTORY WARRANTIES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING, WITHOUT LIMITATION, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY IMPLIED WARRANTIES ARISING FROM USAGE OR COURSE OF DEALING. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE ERROR-FREE, TIMELY, SECURE, OR UNINTERRUPTED. YOU ACKNOWLEDGE AND ACCEPT THE RISKS ASSOCIATED WITH ONLINE ACTIVITIES, AND WE SHALL NOT BE LIABLE FOR ANY SECURITY BREACHES, EXCEPT WHERE CAUSED BY GROSS NEGLIGENCE. FURTHER, WE MAKE NO WARRANTIES REGARDING CLIENT OR ARTIST SERVICES, AND YOU ASSUME ALL RISKS WHEN ENGAGING WITH THIRD-PARTY CLIENTS OR PARTNERS.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              10. Limitation of Liability
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              TO THE EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION, NEITHER VIEWMARK NOR ANY OF ITS OFFICERS, EMPLOYEES, OR AGENTS SHALL BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES ARISING FROM LOSS OF REVENUE, PROFITS, BUSINESS, DATA, GOODWILL, OR OPPORTUNITIES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE GREATER OF £100 OR THE AMOUNT PAID TO OR BY YOU FOR THE SERVICES THAT GAVE RISE TO THE CLAIM.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              11. Indemnification
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 0.75rem 0',
              }}
            >
              You agree to indemnify, defend, and hold harmless Viewmark, its affiliates, and their respective directors, officers, employees, and agents (&quot;Indemnified Parties&quot;) from and against any claims, losses, damages, or expenses (including reasonable attorneys&rsquo; fees) arising out of or relating to:
            </p>

            <div
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              <p style={{ margin: '0 0 0 0' }}>
                • Your use or misuse of the Services.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Your negligence, intentional misconduct, or fraudulent actions.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Any content or feedback you submit.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Any breach of these Terms or infringement of third-party rights.
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                • Disputes arising from your status as an independent contractor.
              </p>
            </div>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              You agree to promptly notify us of any such claims and to cooperate fully in their defense. We reserve the right to assume exclusive control over the defense of any claim for which indemnification is sought.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              12. Termination
            </h2>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              a. Voluntary Termination
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              You may terminate your account and discontinue use of the Services at any time. Continued use following termination will be deemed as acceptance of these Terms.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              b. Termination by Viewmark
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We reserve the unilateral right to suspend or terminate your account or access to the Services at any time and for any reason, including, without limitation, if we suspect fraudulent or unlawful activity.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              c. Consequences of Termination
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Upon termination, your access to account-restricted areas of the Services will cease, and we may remove any data associated with your account, except as required by law.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              13. Dispute Resolution
            </h2>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              Mediation
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Any dispute must first be submitted to mediation under the Commercial Mediation procedures administered by the Centre for Effective Dispute Resolution (CEDR) or a similar UK body. If a resolution is not reached within two (2) months following the appointment of a mediator, the dispute shall proceed to arbitration.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              Arbitration
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              The arbitration or mediation shall take place at CEDR or the nearest UK location convenient to our principal location, conducted in English, and presided over by an arbitrator experienced in intellectual property or advertising law. Claims under £10,000 may be resolved in the small claims court in England and Wales on an individual basis. All disputes must be pursued individually; by accepting these Terms, you waive your right to participate in any class or collective action, as well as the right to a jury trial.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              Fees and Costs
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Each party is responsible for its own expenses. Mediator or arbitrator fees will be split equally, with any non-refundable filing fees borne by the party initiating the dispute. The prevailing party in arbitration may be awarded reasonable attorney fees.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              Enforcement
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Any award rendered by arbitration may be enforced in any court of competent jurisdiction. This section does not preclude our right to pursue collection of amounts due, seek injunctive relief, or otherwise enforce our rights.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              14. General Provisions
            </h2>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              a. Entire Agreement
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              This Agreement, together with our Privacy Policy and any additional guidelines referenced herein, constitutes the entire understanding between you and Viewmark with respect to the Services, superseding all prior discussions or agreements.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              b. No Third-Party Beneficiaries
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Except for the Indemnified Parties expressly identified herein, no third party shall have any rights to enforce the provisions of these Terms.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              c. Independent Contractor Status
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Your relationship with the Company is that of an independent contractor, and nothing in this Agreement is intended to, or should be construed to, create a partnership, agency, joint venture or employment relationship. You shall not be entitled to any of the benefits that the Company may make available to its employees, including, but not limited to, group health or life insurance, profit sharing, or retirement benefits, except as expressly stated in this Agreement or any subsequent writing signed by You and Viewmark. You are not authorized to make any representation, contract, or commitment on behalf of the Company unless specifically requested or authorized in writing to do so by Viewmark. You are solely responsible for, and will file, on a timely basis, all tax returns and payments required to be filed with, or made to, any federal, state, or local tax authority with respect to the performance of services and receipt of fees under this Agreement. You are solely responsible for, and must maintain adequate records of, expenses incurred in the course of performing services under this Agreement. Viewmark will not withhold for the payment of any social security, federal, state, or any other employee payroll taxes payable on Your behalf. The Company will, as applicable, regularly report amounts paid to the Independent Contractor by filing required forms with UK authorities as necessary.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              d. Severability
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Should any provision of these Terms be found invalid or unenforceable, that provision shall be modified only to the extent necessary to render it enforceable, with the remainder of the Agreement remaining in full effect.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              e. Non-Waiver
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Our failure to enforce any provision of these Terms shall not be construed as a waiver of our right to subsequently enforce such provision.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              f. Governing Law and Venue
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              Except as provided under the Dispute Resolution section, any legal action relating to these Terms shall be brought exclusively in the courts of England and Wales, and you consent to personal jurisdiction therein.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              g. Notices
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              We may communicate with you via email, postings on the Services, or other reasonable methods. It is your responsibility to maintain current contact information. Any notice is deemed effective upon dispatch.
            </p>

            <h3
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: "1.375rem",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              h. Assignment
            </h3>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              You may not assign or transfer any rights or obligations under these Terms without our prior written consent. We reserve the right to assign these Terms at our discretion, including in connection with any merger, acquisition, or sale of assets.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <h2
              style={{
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: "1.625rem",
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                margin: '1.75rem 0 0.5rem 0',
              }}
            >
              Contact Us
            </h2>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              If you have any questions about this Agreement, please contact us at: <a href="mailto:help@viewmark.co" className="link-inline">help@viewmark.co</a>
            </p>

            <p
              style={{
                color: '#2D2D2D',
                fontFamily: 'Inter, sans-serif',
                fontSize: "1rem",
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                margin: '0 0 1rem 0',
              }}
            >
              By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by the terms set forth in this Agreement and our Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-border"></div>
        <div className="footer-container">
          <div className="footer-content">
            {/* Copyright */}
            <div className="copyright">
              © 2025 Viewmark. All rights reserved.
            </div>
            {/* Social media icons */}
            <div className="social-links">
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
              <a 
                href="https://www.instagram.com/viewmarkco/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.21173C12.5365 2.21173 12.837 2.22123 13.8389 2.267C14.4411 2.27427 15.0377 2.38499 15.6024 2.59432C16.0151 2.74662 16.3884 2.9895 16.6949 3.30509C17.0105 3.61156 17.2534 3.98488 17.4057 4.39759C17.615 4.96235 17.7257 5.55888 17.733 6.16114C17.7788 7.16295 17.7883 7.4635 17.7883 10C17.7883 12.5365 17.7788 12.837 17.733 13.8389C17.7257 14.4411 17.615 15.0377 17.4057 15.6024C17.2476 16.0122 17.0055 16.3844 16.6949 16.6949C16.3844 17.0055 16.0122 17.2476 15.6024 17.4057C15.0377 17.615 14.4411 17.7257 13.8389 17.733C12.837 17.7788 12.5365 17.7883 10 17.7883C7.4635 17.7883 7.16295 17.7788 6.16114 17.733C5.55859 17.7258 4.96176 17.6151 4.39673 17.4057C3.98433 17.2533 3.61132 17.0104 3.30509 16.6949C2.9895 16.3884 2.74662 16.0151 2.59432 15.6024C2.38499 15.0377 2.27427 14.4411 2.267 13.8389C2.22123 12.837 2.21173 12.5365 2.21173 10C2.21173 7.4635 2.22123 7.16295 2.267 6.16114C2.27427 5.55888 2.38499 5.03765 2.59432 4.39759C2.74662 3.98488 2.9895 3.61156 3.30509 3.30509C3.61156 2.9895 3.98488 2.74662 4.39759 2.59432C4.96235 2.38499 5.55888 2.27427 6.16114 2.267C7.16295 2.22123 7.4635 2.21173 10 2.21173ZM10 0.5C7.42032 0.5 7.09645 0.51123 6.08341 0.557C5.29535 0.57272 4.51567 0.72194 3.7775 0.99832C3.1433 1.2371 2.56886 1.61141 2.09427 2.09514C1.61096 2.56956 1.23695 3.14369 0.99832 3.7775C0.72224 4.51572 0.57331 5.2954 0.55786 6.08341C0.51036 7.09645 0.5 7.42032 0.5 10C0.5 12.5797 0.51123 12.9035 0.557 13.9166C0.57272 14.7046 0.72194 15.4843 0.99832 16.2225C1.2371 16.8567 1.61141 17.4311 2.09514 17.9057C2.56956 18.389 3.14369 18.763 3.7775 19.0017C4.51572 19.2778 5.2954 19.4267 6.08341 19.4421C7.09645 19.4896 7.42032 19.5 10 19.5C12.5797 19.5 12.9035 19.4888 13.9166 19.443C14.7046 19.4273 15.4843 19.2781 16.2225 19.0017C16.8538 18.7576 17.4271 18.3843 17.9057 17.9057C18.3843 17.4271 18.7576 16.8538 19.0017 16.2225C19.2778 15.4843 19.4267 14.7046 19.4421 13.9166C19.4896 12.9035 19.5 12.5797 19.5 10C19.5 7.42032 19.4888 7.09645 19.443 6.08341C19.4273 5.29535 19.2781 4.51567 19.0017 3.7775C18.7629 3.1433 18.3886 2.56886 17.9049 2.09427C17.4304 1.61096 16.8563 1.23695 16.2225 0.99832C15.4843 0.72224 14.7046 0.57331 13.9166 0.55786C12.9035 0.51036 12.5797 0.5 10 0.5ZM10 5.12132C9.0351 5.12132 8.0918 5.40745 7.28955 5.94352C6.48725 6.4796 5.86194 7.24155 5.49269 8.133C5.12343 9.0245 5.02682 10.0054 5.21506 10.9518C5.40331 11.8982 5.86796 12.7675 6.55025 13.4497C7.23255 14.132 8.1018 14.5967 9.0482 14.7849C9.9946 14.9732 10.9755 14.8766 11.867 14.5073C12.7585 14.1381 13.5204 13.5127 14.0565 12.7105C14.5926 11.9082 14.8787 10.9649 14.8787 10C14.8787 8.7061 14.3647 7.46518 13.4497 6.55025C12.5348 5.63532 11.2939 5.12132 10 5.12132ZM10 13.167C9.3736 13.167 8.7613 12.9812 8.2405 12.6332C7.71973 12.2852 7.31382 11.7906 7.07412 11.2119C6.83442 10.6333 6.7717 9.9965 6.8939 9.3822C7.0161 8.7678 7.31772 8.2035 7.76063 7.76063C8.2035 7.31772 8.7678 7.0161 9.3822 6.8939C9.9965 6.7717 10.6333 6.83442 11.2119 7.07412C11.7906 7.31382 12.2852 7.71973 12.6332 8.2405C12.9812 8.7613 13.167 9.3736 13.167 10C13.167 10.8399 12.8333 11.6455 12.2394 12.2394C11.6455 12.8333 10.8399 13.167 10 13.167ZM15.0713 3.78873C14.8458 3.78873 14.6254 3.85559 14.4379 3.98085C14.2505 4.10612 14.1043 4.28416 14.0181 4.49247C13.9318 4.70078 13.9092 4.92999 13.9532 5.15113C13.9972 5.37227 14.1057 5.5754 14.2652 5.73483C14.4246 5.89426 14.6277 6.00284 14.8489 6.04682C15.07 6.09081 15.2992 6.06823 15.5075 5.98195C15.7158 5.89567 15.8939 5.74955 16.0191 5.56208C16.1444 5.37461 16.2113 5.1542 16.2113 4.92873C16.2113 4.62638 16.0912 4.33642 15.8774 4.12263C15.6636 3.90883 15.3736 3.78873 15.0713 3.78873Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


