# Viewmark Waitlist Site

A modern, performant waitlist website built with Next.js, TypeScript, and Tailwind CSS. Designed to collect email addresses for the Viewmark platform launch.

## 🚀 Features

- **Modern Design**: Clean, minimalist interface with skeuomorphic elements
- **Performance Optimized**: Fast loading with optimized fonts and static generation
- **Mobile Responsive**: Fully responsive design across all devices
- **Email Collection**: Secure email submission with validation and error handling
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter Card support
- **Security**: Comprehensive security headers and input validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Netlify Functions with Supabase
- **Database**: Supabase PostgreSQL
- **Deployment**: Netlify (static hosting + serverless functions)
- **Fonts**: Custom Viewmark fonts + Inter font family

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- Supabase account and project
- Netlify account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd viewmark-site-v5.1
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp env-template.txt .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Run the SQL schema in your Supabase project:

```sql
-- Create waitlist emails table
CREATE TABLE waitlist_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_waitlist_emails_email ON waitlist_emails(email);
CREATE INDEX idx_waitlist_emails_created_at ON waitlist_emails(created_at);
```

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### 5. Build and Test

```bash
npm run build
npm run lint
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect Repository**: Connect your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: `netlify/functions`
3. **Environment Variables**: Add your Supabase credentials in Netlify dashboard
4. **Deploy**: Netlify will automatically deploy on every push to main branch

### Manual Deployment

```bash
npm run build
netlify deploy --prod --dir=out
```

## 🔧 Configuration

### Fonts

The site uses custom fonts loaded from the `public/` directory:
- `Viewmark-SemiBold.woff` - Brand logo and headings
- `Inter_18pt-*.woff2` - Body text and UI elements
- `IBMPlexMono-Regular.woff2` - Input fields

### Security Headers

Security headers are configured in `netlify.toml`:
- Content Security Policy
- X-Frame-Options
- X-XSS-Protection
- HSTS
- Permissions Policy

## 📱 Customization

### Colors and Styling

The design system uses CSS custom properties defined in `app/globals.css`. Key variables:
- `--primary-text`: Main text color
- `--button-bg`: Button background
- `--input-bg`: Input field background

### Content

Update the main content in `app/page.tsx`:
- Headline and subheader text
- Contact email
- Social media links
- Copyright information

## 🧪 Testing

### Linting
```bash
npm run lint
```

### Build Testing
```bash
npm run build
```

### Local Function Testing
```bash
npm run dev:functions
```

## 🔍 Performance

The site is optimized for performance:
- Static generation with Next.js
- Optimized font loading with `font-display: swap`
- Minimal JavaScript bundle
- Efficient CSS with Tailwind
- Image optimization disabled for static export

## 🚨 Troubleshooting

### Common Issues

1. **Font Loading Issues**: Ensure all font files are in the `public/` directory
2. **Build Errors**: Check that all environment variables are set
3. **Function Errors**: Verify Supabase credentials and database schema
4. **Styling Issues**: Clear browser cache and rebuild

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment.

## 📈 Analytics and Monitoring

The site includes:
- Console error logging for debugging
- Form submission tracking
- Performance monitoring through Netlify

## 🔒 Security

- Input validation and sanitization
- CSRF protection through proper headers
- Secure email submission handling
- Environment variable protection

## 📞 Support

For technical support or questions:
- Email: hello@viewmark.co
- GitHub Issues: [Repository Issues](https://github.com/your-repo/issues)

## 📄 License

© 2025 Viewmark. All rights reserved.

---

**Built with ❤️ by the Viewmark team**
