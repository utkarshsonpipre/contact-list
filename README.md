# Contact List Application

A modern, responsive single-page React application for managing contacts with real-time search, add contact functionality, and MongoDB persistence.

## Features

✅ **View Contacts**: Display a list of 7-8 seeded temporary contacts on the front page (immediate load).  
✅ **Search**: Filter contacts by name, email, or phone in real-time (smooth filtering without fluttering).  
✅ **Add Contact**: Create new contacts with phone number validation and optional avatar upload via Cloudinary (or default avatar if skipped).  
✅ **Phone Validation**: Smart validation that accepts international phone formats (10-15 digits).  
✅ **Modal Contact View**: Click any contact to see detailed information and action links.  
✅ **Delete Contact**: Remove individual contacts with confirmation dialog.  
✅ **Persistence**: MongoDB backend with duplicate detection (email/phone).  
✅ **Offline Support**: LocalStorage fallback when server is unreachable.  
✅ **Optimistic UI**: New contacts appear instantly without waiting for server response.  
✅ **Responsive Design**: Works on desktop and mobile browsers.  
✅ **Animations**: Smooth transitions and micro-interactions using Framer Motion.

---

## Tech Stack

### Frontend
- **React** 18+ with Hooks
- **Vite** — fast build tool and dev server
- **Framer Motion** — animations and transitions
- **CSS** — component-scoped styling

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — persistent data storage
- **Cloudinary** — image upload and hosting (optional)
- **Multer** — multipart file handling

### Environment
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js v14+ and npm v6+
- MongoDB Atlas account (free tier works)
- Cloudinary account (optional, for avatar uploads)

---

## Project Structure

```
contact-list-app/
├── server/
│   ├── index.js                  # Express server, MongoDB models, endpoints
│   ├── .env                      # Environment variables (MONGODB_URI, Cloudinary config)
│   ├── package.json
│   └── node_modules/
├── src/
│   ├── components/
│   │   ├── ContactList.jsx       # Main page container, list, seeding, merge logic
│   │   ├── ContactCard.jsx       # Individual contact card UI
│   │   ├── SearchBar.jsx         # Debounced search input
│   │   ├── AddContactForm.jsx    # Form to add new contact + avatar upload
│   │   ├── SkeletonCard.jsx      # Loading skeleton UI
│   │   ├── Toast.jsx             # Toast notifications
│   │   ├── ConnectionStatus.jsx  # Online/offline indicator
│   │   └── *.css                 # Component styles
│   ├── services/
│   │   └── contactService.js     # API wrapper, localStorage fallback, seeding
│   ├── data/
│   │   └── mockContacts.js       # 8 seeded initial contacts
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── public/
├── vite.config.js
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Prerequisites

- **Node.js** v14 or later ([download](https://nodejs.org/))
- **npm** v6 or later (comes with Node.js)
- **MongoDB Atlas** account (free tier): [sign up](https://www.mongodb.com/cloud/atlas)
  - Create a cluster and get your connection string (format: `mongodb+srv://user:password@cluster.mongodb.net/contacts?retryWrites=true&w=majority`)
- **Cloudinary** account (optional, for avatar uploads): [sign up](https://cloudinary.com/)
  - Get your Cloud Name, API Key, and API Secret from the dashboard

### 2. Clone or Extract the Project

Navigate to the project directory:
```bash
cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Server Dependencies

```bash
cd server
npm install
cd ..
```

### 5. Configure Environment Variables

**Server Configuration** (`server/.env`):

```properties
# MongoDB connection string (update with your Atlas credentials)
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/contacts?retryWrites=true&w=majority

# Server port
PORT=4000

# Cloudinary (optional, for avatar uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Steps to get Cloudinary credentials** (if you want avatar upload):
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy **Cloud Name**, **API Key**, and **API Secret**
4. Paste them into `server/.env`

If Cloudinary is not configured, the app will still work — it will use default avatars (ui-avatars.com).

---

## How to Run Locally

### Terminal 1: Start the Backend Server

```bash
cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app\server
npm run dev
```

Expected output:
```
Server listening on port 4000
Connected to MongoDB
```

If you see MongoDB connection errors, verify:
- Your `MONGODB_URI` in `server/.env` is correct
- Your IP is whitelisted in MongoDB Atlas (or set to 0.0.0.0/0 for development)
- Your internet connection is active

### Terminal 2: Start the Frontend Dev Server

```bash
cd C:\Users\utkar\Videos\Assignment_tria\contact-list-app
npm run dev
```

Expected output:
```
ROLLDOWN-VITE v7.1.14 ready in XXXms

➜  Local:   http://localhost:5173/
```

### 3. Open the Application

Visit **http://localhost:5173/** in your browser.

---

## Usage Guide

### View Contacts
- The app loads instantly with 7–8 seeded temporary contacts.
- If the server is running, server contacts are merged with the seed (server entries take precedence).
- If the server is unreachable, you'll see a notification and the app continues with local contacts.

### View Contact Details
- **Click any contact card** to open a modal popup.
- The modal displays contact information and action options.

### Search Contacts
- Type a name, email, or phone number in the **Search** bar.
- Results update in real-time as you type (debounced for performance).
- Cards smoothly filter without fluttering.
- Clear the search box to see all contacts again.

### Add a New Contact
1. Click **"Add New Contact"** button.
2. Fill in:
   - **Name** (required, minimum 2 characters)
   - **Email** (required, must be valid format)
   - **Phone** (required, must be 10-15 digits — accepts international formats)
     - Accepted formats: `+1 (555) 123-4567`, `555-123-4567`, `5551234567`, `+91 9876543210`
     - Invalid: `123` (too short), `12345678901234567` (too long)
   - **Avatar** (optional image file — will be uploaded to Cloudinary if configured, else default avatar used)
3. Click **"Add Contact"**.
   - The contact appears at the top of the list immediately (optimistic insert).
   - If validation fails, error messages guide you to fix issues.
   - If the server is reachable, the contact is also saved to MongoDB.
   - If a duplicate email or phone exists on the server, you'll see an error toast.

### Delete a Contact
1. Click any contact card to open the modal.
2. Click the **"Delete"** button in the modal.
3. Confirm deletion in the popup dialog.
4. Contact is removed and the list updates.

### Phone Number Validation
- Phone numbers must have **10-15 digits** (international standard).
- Non-digit characters (spaces, dashes, parentheses, plus sign) are automatically ignored.
- Examples that work:
  - ✅ `+1 (555) 123-4567` → 10 digits
  - ✅ `555-123-4567` → 10 digits
  - ✅ `5551234567` → 10 digits
  - ✅ `+91 98765 43210` → 10 digits
  - ❌ `123` → too short (3 digits)
  - ❌ `1234567890123456789` → too long (19 digits)

### Duplicate Detection
- The server checks for duplicate **email** or **phone** numbers.
- If you try to add a contact with an existing email/phone, the server returns a 409 error and displays a toast notification.

### Offline Mode
- If the server is unreachable, the app continues to work with local contacts from localStorage.
- New contacts added offline are stored in localStorage and can be synced when the server comes back online (future enhancement).
- Click the **"Sync"** button (in the connection status) to manually retry connecting to the server.

---

## API Endpoints

### GET /contacts
Fetch all contacts or search by query.

**Request:**
```
GET http://localhost:4000/contacts?q=john
```

**Response:**
```json
[
  {
    "_id": "65abc123def456",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 123-4567",
    "avatar": "https://ui-avatars.com/api/?name=John+Doe&background=random&color=fff",
    "createdAt": "2025-10-24T10:30:00.000Z",
    "updatedAt": "2025-10-24T10:30:00.000Z"
  }
]
```

### POST /contacts
Create a new contact.

**Request:**
```json
POST http://localhost:4000/contacts
Content-Type: application/json

{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "+1 (555) 987-6543",
  "avatar": "https://cloudinary.com/images/..."  // optional
}
```

**Response (201):**
```json
{
  "_id": "65abc124def456",
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "+1 (555) 987-6543",
  "avatar": "https://cloudinary.com/images/...",
  "createdAt": "2025-10-24T11:00:00.000Z",
  "updatedAt": "2025-10-24T11:00:00.000Z"
}
```

**Response (409) — Duplicate:**
```json
{
  "error": "Contact with this email or phone already exists",
  "existing": { /* existing contact record */ }
}
```

### POST /upload
Upload an image and get Cloudinary URL.

**Request:**
```
POST http://localhost:4000/upload
Content-Type: multipart/form-data

Form field: avatar (file)
```

**Response (200):**
```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v123456/contact_list_app/abc123.jpg"
}
```

### GET /health
Health check.

**Request:**
```
GET http://localhost:4000/health
```

**Response:**
```json
{ "ok": true }
```

---

## Build & Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deploy to Vercel (Recommended for Frontend)

1. **Sign up** at [vercel.com](https://vercel.com/) with your GitHub account.
2. **Link your repository** (if using GitHub) or connect your local project.
3. **Environment variables**: Add VITE_API_BASE (if needed) in Vercel dashboard.
4. **Deploy**: Push to GitHub or run `vercel deploy` — Vercel auto-builds and deploys.

### Deploy Backend to a Service (e.g., Railway, Heroku, Fly.io)

**Example with Railway.app:**
1. Create account at [railway.app](https://railway.app/)
2. Connect GitHub repo or upload local code.
3. Add environment variables in dashboard:
   - `MONGODB_URI`
   - `PORT` (default 4000)
   - Cloudinary credentials
4. Deploy — Railway auto-starts the Node server.

---

## Design Choices & Assumptions

### Why LocalStorage Fallback?
- **Resilience**: If the MongoDB server goes down, users can still see their contacts.
- **Offline Support**: Users can add contacts offline; they sync when the server comes back online.
- **Seeding**: 7–8 temporary seed contacts are auto-populated on first load to ensure the front page is never empty.

### Why Cloudinary for Avatar Upload?
- **No server storage needed**: Images hosted on Cloudinary's CDN (fast, distributed).
- **Security**: No risk of malicious files on your server; Cloudinary handles validation.
- **Optional**: If not configured, default avatars work fine, so the app remains functional.

### Deduplication Strategy
- **By Email and Phone**: Email and phone are checked for uniqueness on the server (MongoDB unique indexes).
- **Case-insensitive Email**: Emails are normalized to lowercase to catch duplicates like `John@example.com` and `john@example.com`.
- **Server-side Validation**: The server returns 409 Conflict if a duplicate is detected; the UI shows a toast and prevents the add.

### Optimistic Add
- **Immediate UI Update**: New contacts appear at the top of the list instantly without waiting for the server.
- **Deduplication on Insert**: If a local contact with the same email/phone is already shown, it's removed before the new one is added to prevent overlaps.
- **Fallback Handling**: If the server is unreachable, the optimistic contact is stored in localStorage and persists even after a page refresh.

### Animations & Performance
- Removed per-card entrance/exit animations to prevent fluttering when the list updates.
- Hover transforms are CSS-based (no JavaScript) to reduce repaints.
- Search is debounced (250ms) to avoid excessive API calls.

### Why React + Vite?
- **React**: Component-based, great for interactive UIs; hooks for state management.
- **Vite**: Fast dev server with HMR (hot module reload); optimized production builds.
- **Framer Motion**: Smooth, performant animations.

---

## Testing the App

### Smoke Test (Quick Verification)
1. Load the app: see 8 seeded contacts.
2. Search: type "John" → list filters to show only John contacts.
3. Add: click "Add New Contact", fill form, submit → contact appears at top.
4. Duplicate: try adding a contact with an existing email → see error toast.
5. Offline: stop the server, reload page → see "Using local contacts" notification, app still works.

### Test Avatar Upload
1. Click "Add New Contact".
2. Select a small image file (< 5MB) for Avatar.
3. Fill other fields and submit.
4. If Cloudinary is configured, the image uploads and displays in the contact card.
5. If Cloudinary not configured, a default avatar is used.

---

## Troubleshooting

### "MongoDB connection error"
- Check `MONGODB_URI` in `server/.env` — ensure it's correct.
- Verify your IP is whitelisted in MongoDB Atlas (Settings → Network Access).
- Ensure your firewall allows outbound HTTPS (port 443).

### "Cloudinary upload failed"
- Check `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `server/.env`.
- If any are empty or incorrect, the upload endpoint returns 500.
- Verify the image file is < 100MB and is a valid image format.

### Frontend not connecting to backend
- Verify the backend is running on port 4000 (check `npm run dev` output).
- Check browser console (F12 → Console tab) for fetch errors.
- Ensure CORS is enabled on the server (it is — `app.use(cors())`).

### Contacts disappearing after refresh
- Check browser localStorage: Open DevTools → Application → LocalStorage → look for key `contacts_local_v1`.
- If that key is present, local data is persisted and will re-load on refresh.
- If it's missing, try adding a contact again (it will be seeded fresh).

---

## Libraries Used & Why

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18+ | UI framework, component model |
| Vite | 7+ | Build tool, dev server, HMR |
| Framer Motion | 11+ | Smooth animations, spring physics |
| Mongoose | 7.5+ | MongoDB ODM, schema validation |
| Express | 4.18+ | HTTP server framework |
| Multer | 1.4+ | Multipart form data (file uploads) |
| Cloudinary | 2.0+ | Image hosting and CDN |
| CORS | 2.8+ | Cross-origin request handling |

---

## Known Limitations & Future Enhancements

### Current Limitations
- **No Sync UI**: Local-only contacts (seeded or added offline) are not auto-uploaded to the server when it comes back online.
- **No Edit/Delete**: Contacts can only be added; editing or deleting requires manual API calls or MongoDB updates.
- **No Authentication**: Anyone with the backend URL can add/view contacts. In production, add JWT or OAuth.

### Planned Enhancements
- [ ] "Upload Local Contacts" button to push offline contacts to MongoDB.
- [ ] Edit/Delete contact features.
- [ ] Contact details view and phone call/email quick links.
- [ ] Mark local-only contacts with a badge in the UI.
- [ ] Image preview and upload progress in Add form.
- [ ] Authentication (sign in / sign up).
- [ ] Dark mode toggle.
- [ ] Mobile app (React Native or PWA).

---

## Support & Questions

- **Code Issues**: Check the browser console (F12) for error logs.
- **API Issues**: Use Postman or curl to test endpoints directly.
- **Server Logs**: Check the terminal running `npm run dev` in the server folder for MongoDB/Express logs.

---

## License

MIT License — feel free to use and modify for your own projects.

---

## Assignment Checklist

✅ **View the list of contacts** — Done. Front page shows 7–8 seeded contacts.  
✅ **Search contact by name** — Done. SearchBar filters by name, email, phone in real-time.  
✅ **Add a new contact (Optional)** — Done. AddContactForm with optional avatar upload.  
✅ **Persistence** — Done. MongoDB backend with duplicate email/phone checks.  
✅ **API Interaction** — Done. Client uses fetch API to call Express endpoints.  
✅ **React Framework** — Done. React 18 with Hooks.  
✅ **Component Design** — Done. Modular components (ContactList, ContactCard, SearchBar, AddContactForm, etc.).  
✅ **README & Setup Instructions** — Done. This file.  
✅ **Deployment Ready** — Done. Can deploy frontend to Vercel and backend to Railway, Heroku, or similar.

---

**Last Updated**: October 24, 2025  
**Project Status**: Complete and ready for submission.
