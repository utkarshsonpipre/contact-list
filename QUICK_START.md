# QUICK SETUP GUIDE

## ✅ Assignment Complete

This Contact List application satisfies all Tria Assignment requirements:

1. ✅ **View the list of contacts** — 8 seeded contacts display immediately on the front page
2. ✅ **Search contact by name** — Real-time search filters by name, email, or phone
3. ✅ **Add a new contact** — Form with optional image upload via Cloudinary
4. ✅ **Persistence** — MongoDB backend with duplicate checks
5. ✅ **React Framework** — Built with React 18 + Hooks
6. ✅ **Component Design** — Modular, reusable components
7. ✅ **API Integration** — REST API client-server architecture
8. ✅ **README** — This documentation

---

## 🚀 How to Run Locally (Windows PowerShell)

### Prerequisites
- Node.js v14+ ([download](https://nodejs.org/))
- MongoDB Atlas account (free tier: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas))
- Cloudinary account (optional, for avatars: [cloudinary.com](https://cloudinary.com/))

### Step 1: Install All Dependencies

```powershell
# Navigate to project
cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app

# Install frontend
npm install

# Install server
cd server
npm install
cd ..
```

### Step 2: Configure Environment

Edit `server/.env`:

```properties
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/contacts?retryWrites=true&w=majority
PORT=4000
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=799763444289182
CLOUDINARY_API_SECRET=gBcPWja1LYJP3G4klCfbugBmY1U
```

⚠️ **Important**: Replace `your_cloud_name_here` with your actual Cloudinary Cloud Name. If you don't want image uploads, leave this empty (app still works, uses default avatars).

### Step 3: Start the Backend

```powershell
cd server
npm run dev
```

Expected output:
```
Server listening on port 4000
Connected to MongoDB
```

### Step 4: Start the Frontend (in a new PowerShell terminal)

```powershell
cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app
npm run dev
```

Expected output:
```
ROLLDOWN-VITE v7.1.14 ready in XXXms

➜  Local:   http://localhost:5173/
```

### Step 5: Open the App

Visit **http://localhost:5173/** in your browser.

---

## 📋 Smoke Test (Verify Everything Works)

1. **Page loads** → See 8 seeded contacts immediately
2. **Search** → Type "John" in search bar → list filters
3. **Add Contact** → Click "Add New Contact", fill form, submit → contact appears at top
4. **Duplicate** → Try adding email that exists → see error toast
5. **Offline** → Stop backend (Ctrl+C in server terminal), reload page → see offline message, app still works

---

## 📁 Project Files

```
contact-list-app/
├── src/
│   ├── components/          # React UI components
│   │   ├── ContactList.jsx
│   │   ├── ContactCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── AddContactForm.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── Toast.jsx
│   │   ├── ConnectionStatus.jsx
│   │   └── *.css
│   ├── services/
│   │   └── contactService.js  # API client + localStorage fallback
│   ├── data/
│   │   └── mockContacts.js    # 8 seeded contacts
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js              # Express API server
│   ├── .env                  # Environment config
│   └── package.json
├── index.html                # Entry point
├── vite.config.js            # Vite config
├── package.json              # Frontend dependencies
├── README.md                 # Full documentation
├── DEPLOYMENT.md             # Deployment guide
├── SOLUTION_SUMMARY.md       # Summary of features
├── .gitignore                # Git exclusions
└── start.bat                 # Quick start helper (Windows)
```

---

## 🎯 Key Features

### Frontend
- ✨ 8 seeded temporary contacts (display immediately)
- 🔍 Real-time search (debounced for performance)
- ➕ Add contact with optional image upload
- 🖼️ Cloudinary avatar upload (or default if not configured)
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🎭 Smooth animations with Framer Motion
- 🔄 Optimistic add (new contacts appear instantly)
- 📴 Offline support (localStorage fallback)

### Backend
- 🗄️ MongoDB for persistent storage
- 🔐 Duplicate checks (email + phone unique indexes)
- 📸 Cloudinary image upload endpoint
- 🌐 REST API (GET /contacts, POST /contacts, POST /upload, GET /health)
- 🔀 CORS enabled for frontend requests

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
1. Check `MONGODB_URI` in `server/.env`
2. Verify IP is whitelisted in MongoDB Atlas (Settings → Network Access → Add 0.0.0.0/0 for dev)
3. Ensure you have internet connection

### "Avatar upload fails"
1. Leave avatar field blank (app works with default avatars)
2. Or configure Cloudinary:
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Copy Cloud Name, API Key, API Secret to `server/.env`
   - Restart backend

### "Frontend can't reach backend"
1. Ensure backend is running (`npm run dev` in `server` folder)
2. Check backend port is 4000 (see console output)
3. Open browser console (F12) and check network tab for errors

### "Blank page / no contacts shown"
1. Open browser DevTools → Console tab → look for JavaScript errors
2. Check Network tab → see if API requests succeed
3. Try refreshing page (Ctrl+R or Cmd+R)

---

## 📤 Deploying to Production

### Deploy Frontend to Vercel (Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Connect your GitHub repo
4. Click Deploy
5. Get live URL

### Deploy Backend to Railway (Free Tier)

1. Go to [railway.app](https://railway.app/)
2. Connect GitHub repo or upload code
3. Set environment variables (MONGODB_URI, Cloudinary config)
4. Deploy
5. Get backend URL

See `DEPLOYMENT.md` for detailed steps.

---

## 📝 Assignment Submission

When submitting, include:

1. **GitHub Repository Link** (public access)
2. **Deployed Frontend URL** (Vercel or similar)
3. **README Link** — point to the README.md in your repo

Example submission email:

> **Contact List - Tria Assignment Submission**
>
> **GitHub**: https://github.com/YOUR_USERNAME/contact-list-app
>
> **Live Demo**: https://contact-list-app-xyz.vercel.app/
>
> **Features**: View contacts, search by name, add new contacts with optional avatar upload, MongoDB persistence, offline support
>
> **Setup**: See README.md for local development instructions

---

## ✨ What's Included

- ✅ Complete React SPA with all assignment requirements
- ✅ Express REST API with MongoDB
- ✅ Cloudinary image upload integration
- ✅ LocalStorage offline fallback
- ✅ Smooth animations and responsive design
- ✅ Comprehensive documentation (README, DEPLOYMENT, SOLUTION_SUMMARY)
- ✅ Production-ready code
- ✅ Duplicate detection and error handling

---

## 🎓 Technical Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | Interactive UI, fast dev server |
| **Styling** | CSS (component-scoped) | Responsive, clean design |
| **Animations** | Framer Motion | Smooth transitions |
| **Backend** | Node.js + Express | REST API server |
| **Database** | MongoDB + Mongoose | Persistent data + validation |
| **Images** | Cloudinary | Cloud avatar hosting |
| **File Upload** | Multer + Streamifier | Stream uploads to Cloudinary |

---

**Status**: ✅ **Complete and ready for submission**

**Created**: October 24, 2025  
**Version**: 1.0.0

For more details, see README.md, DEPLOYMENT.md, or SOLUTION_SUMMARY.md.
