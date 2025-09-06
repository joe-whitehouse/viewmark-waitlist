import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'abc-oracle': ['ABCOracle-Book', 'sans-serif'],
        'abc-oracle-light': ['ABCOracle-Light', 'sans-serif'],
        'abc-favorit-mono': ['ABCFavoritMono', 'monospace'],
      },
    },
  },
  plugins: [],
  safelist: [
    'top-banner',
    'banner-text',
    'header',
    'header-container',
    'logo-container',
    'logo',
    'contact-button',
    'header-waitlist-button',
    'main-content',
    'content-container',
    'headline',
    'headline-primary',
    'headline-secondary',
    'subheader',
    'form-container',
    'email-form',
    'form-hidden',
    'input-group',
    'input-wrapper',
    'input-error',
    'email-input',
    'submit-button',
    'loading',
    'loading-spinner',
    'error-message',
    'success-message',
    'success-content',
    'footer',
    'footer-container',
    'footer-content',
    'copyright',
    'social-links',
    'social-link',
    'tracking--2',
    'leading-plus4',
    'bg-page-gradient',
  ]
}

export default config
