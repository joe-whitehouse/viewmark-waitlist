# Viewmark.co Deployment Guide

## 🚀 Deploy to Netlify with Custom Domain

### **Step 1: Push to GitHub**

1. **Create GitHub Repository:**
   ```bash
   git add .
   git commit -m "Initial commit - Viewmark waitlist site"
   ```

2. **Create new repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `viewmark-waitlist`
   - Make it public
   - Don't initialize with README

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/viewmark-waitlist.git
   git branch -M main
   git push -u origin main
   ```

### **Step 2: Deploy to Netlify**

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New site from Git"**
4. **Choose GitHub** and select your repository
5. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18 (or latest LTS)

### **Step 3: Add Environment Variables**

In Netlify dashboard:
1. **Go to Site settings** → **Environment variables**
2. **Add these variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://nnwcfuatdogqxzdggbog.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ud2NmdWF0ZG9ncXh6ZGdnYm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNzMzMjUsImV4cCI6MjA3MDk0OTMyNX0.WAetsVVwg9yytjggUV1dVD8QIAimuyjBTTQij0aDhdM
   ```

### **Step 4: Configure Custom Domain**

1. **In Netlify dashboard:**
   - Go to **Domain settings**
   - Click **Add custom domain**
   - Enter: `viewmark.co`

2. **Configure DNS:**
   - Go to your domain registrar (where you bought viewmark.co)
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     
     Type: CNAME
     Name: www
     Value: your-site-name.netlify.app
     ```

3. **Wait for DNS propagation** (can take up to 24 hours)

### **Step 5: Test Everything**

1. **Visit viewmark.co** (once DNS is propagated)
2. **Test the email form**
3. **Check Supabase dashboard** for submissions
4. **Verify favicon** appears in browser tab

## 🔧 Post-Deployment

### **SSL Certificate**
- Netlify automatically provides SSL certificates
- Your site will be available at `https://viewmark.co`

### **Performance**
- Netlify CDN ensures fast loading worldwide
- Automatic image optimization
- Edge functions for API routes

### **Monitoring**
- Check Netlify analytics for traffic
- Monitor Supabase for email submissions
- Set up notifications if needed

## 🎯 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Site deployed on Netlify
- [ ] Environment variables configured
- [ ] Custom domain (viewmark.co) working
- [ ] SSL certificate active
- [ ] Email form working
- [ ] Favicon displaying
- [ ] Mobile responsive
- [ ] Supabase collecting emails

## 🚨 Troubleshooting

### **Build Fails:**
- Check environment variables in Netlify
- Verify all dependencies are in package.json

### **Domain Not Working:**
- Check DNS records
- Wait for propagation (up to 24 hours)
- Verify domain is added in Netlify

### **Form Not Working:**
- Check Supabase environment variables
- Verify Supabase table exists
- Check browser console for errors

**Your site will be live at https://viewmark.co once deployed!** 🚀
