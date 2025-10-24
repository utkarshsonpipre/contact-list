# Deployment & Submission Guide

This guide walks you through deploying the Contact List app to production and submitting it for the Tria Assignment.

---

## Quick Start: Deploy for Free

### Option A: Frontend on Vercel + Backend on Railway (Easiest)

#### Step 1: Push Your Code to GitHub

1. **Create a GitHub account** (if you don't have one): [github.com](https://github.com/)
2. **Create a new repository** named `contact-list-app` (or any name you like).
3. **Push your local code**:
   ```bash
   cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app
   git init
   git add .
   git commit -m "Initial commit: Contact List app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/contact-list-app.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

#### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Sign Up"** and choose **"Continue with GitHub"**.
3. Authorize Vercel to access your GitHub repos.
4. Click **"New Project"** and select your `contact-list-app` repository.
5. **Build & Output Settings**:
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Environment Variables** (optional, if using a custom API URL):
   - Add `VITE_API_BASE=https://your-backend-url` (set after backend is deployed)
7. Click **"Deploy"** — Vercel will auto-build and host your frontend.
8. Your frontend URL will look like: `https://contact-list-app-xyz.vercel.app/`

#### Step 3: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app/)
2. Click **"Start a New Project"** and select **"Deploy from GitHub"**.
3. Connect your GitHub account and select your `contact-list-app` repository.
4. **Add a Service**:
   - Choose Node.js (Railway auto-detects it).
5. **Set Environment Variables** in the Railway dashboard:
   - `MONGODB_URI` = your MongoDB connection string
   - `PORT` = 4000
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your API key
   - `CLOUDINARY_API_SECRET` = your API secret
6. **Configure Build & Start Commands** (if needed):
   - Build: `cd server && npm install`
   - Start: `cd server && npm start`
   (Or configure in a `Procfile` at the root or in `server/`)
7. Click **"Deploy"** — Railway will build and host your backend.
8. Your backend URL will look like: `https://contact-list-app-prod-123.up.railway.app/`

#### Step 4: Update Frontend to Point to Backend

1. Back in Vercel, go to your project settings.
2. Add (or update) the environment variable:
   - `VITE_API_BASE=https://contact-list-app-prod-123.up.railway.app` (use your actual Railway URL)
3. Redeploy the frontend (Vercel will auto-rebuild).
4. Test by visiting your Vercel frontend URL — it should now connect to the Railway backend!

---

### Option B: Simplified Deployment (Frontend Only, Backend Mocked)

If you want to deploy just the frontend without backend complexity:

1. The app works offline with seeded contacts.
2. Disable backend calls in `src/services/contactService.js` (set `checkServer()` to always return false).
3. Deploy frontend to Vercel as above.
4. Users see 8 seeded contacts and can add locally (stored in localStorage).

This is great for demo purposes but doesn't show persistence to MongoDB.

---

## Submission Checklist

As per the Tria Assignment requirements:

- [ ] **View the list of contacts** 
  - ✅ Done — front page shows 7–8 seeded contacts + server contacts (if available).

- [ ] **Search contact by name**
  - ✅ Done — SearchBar filters by name, email, phone in real-time.

- [ ] **Add a new contact (Optional)**
  - ✅ Done — AddContactForm with optional image upload via Cloudinary.

- [ ] **React Framework**
  - ✅ Done — built with React 18 + Hooks.

- [ ] **Component Design**
  - ✅ Done — modular components (ContactList, ContactCard, SearchBar, AddContactForm, etc.).

- [ ] **API Interaction**
  - ✅ Done — client calls Express REST API (GET /contacts, POST /contacts, POST /upload).

- [ ] **Persistence**
  - ✅ Done — MongoDB backend (or localStorage fallback if server unavailable).

- [ ] **Error Handling**
  - ✅ Done — duplicate detection, validation, toast notifications.

- [ ] **README.md**
  - ✅ Done — comprehensive setup, run, and design instructions.

- [ ] **Source Code Repository**
  - ✅ Push to GitHub (public repo or grant access).

- [ ] **Deployment**
  - ✅ Deploy frontend to Vercel and/or backend to Railway (or similar).

- [ ] **Public URL**
  - ✅ Provide the Vercel URL for grading.

---

## What to Submit

### 1. Public GitHub Repository
Ensure your repo is **public** and contains:
- `README.md` with setup and run instructions ✅
- `server/` folder with backend code ✅
- `src/` folder with frontend code ✅
- `package.json` files (root and server) ✅
- `.gitignore` (to exclude `node_modules/` and `.env`) ✅

### 2. Live Deployment Link
Provide the **Vercel URL** (e.g., `https://contact-list-app-xyz.vercel.app/`).

### 3. Design & Implementation Notes (in README or separate file)
Document:
- **Tech stack**: React, Vite, Express, MongoDB, Cloudinary, Framer Motion
- **Architecture**: Component-based frontend, REST API backend, localStorage fallback
- **Key decisions**:
  - Seeding with 7–8 temporary contacts for immediate UX
  - Optimistic add to show contacts instantly
  - Cloudinary for avatar upload (optional)
  - LocalStorage fallback for offline support
  - Dedupe by email/phone to prevent duplicates

---

## Local Testing Before Submission

Before pushing to production, test locally:

### 1. Start both servers (as documented in README):
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
npm run dev
```

### 2. Smoke test the app:
- [ ] Load http://localhost:5173/ → see 8 seeded contacts
- [ ] Search: type "John" → list filters correctly
- [ ] Add: create a new contact → appears at top immediately
- [ ] Duplicate: try adding email that exists → see error toast
- [ ] Offline: stop backend, reload → see "Using local contacts" message

### 3. Check for errors:
- Open browser DevTools (F12)
- Check **Console** tab for JavaScript errors
- Check **Network** tab for failed API calls
- Check server terminal for MongoDB/Express logs

---

## Example Submission Format

**To Tria / Assignment Grader:**

> **Contact List Application**
>
> **Live Demo**: https://contact-list-app-xyz.vercel.app/
> 
> **GitHub Repository**: https://github.com/YOUR_USERNAME/contact-list-app
>
> **Features Implemented**:
> - View list of contacts (8 seeded + server contacts)
> - Real-time search by name, email, phone
> - Add new contact with optional avatar upload (Cloudinary)
> - MongoDB persistence with duplicate email/phone checks
> - Offline support with localStorage
> - Smooth animations with Framer Motion
>
> **Tech Stack**:
> - Frontend: React 18, Vite, Framer Motion
> - Backend: Node.js, Express, MongoDB, Cloudinary
>
> **Setup Instructions**: See README.md in the repository.
>
> **Design Decisions**:
> - Seeded 8 temporary contacts for immediate front-page display
> - Optimistic add for instant UI feedback without server lag
> - Cloudinary for secure, CDN-hosted avatar images
> - LocalStorage fallback to ensure app works offline
> - Deduplication by email/phone prevents duplicates in database

---

## Troubleshooting Deployment

### "Module not found" error on Vercel
- Ensure `package.json` has all dependencies listed
- Verify `npm install` runs correctly locally

### "Cannot connect to MongoDB" on Railway
- Check `MONGODB_URI` env var is set correctly
- Verify IP is whitelisted in MongoDB Atlas

### Frontend can't reach backend on production
- Set `VITE_API_BASE` env var on Vercel pointing to your backend URL
- Ensure backend CORS is enabled (`app.use(cors())`)

### Cloudinary upload not working
- Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are set
- Test upload endpoint manually: `POST http://localhost:4000/upload` with a file

---

## Next Steps After Submission

If you want to enhance the app further:

1. **Add Authentication**: User sign-up/sign-in with JWT or OAuth
2. **Implement Sync**: Upload local-only contacts to server, handle conflicts
3. **Edit/Delete**: Allow users to modify or remove contacts
4. **Favorites**: Mark important contacts as favorites
5. **Export/Import**: Bulk add contacts via CSV or vCard
6. **Mobile App**: React Native or PWA version
7. **Tests**: Jest unit tests and Cypress E2E tests

---

**Good luck with your submission!**

For questions or issues, refer to the main README.md or check your backend/frontend terminal logs.
