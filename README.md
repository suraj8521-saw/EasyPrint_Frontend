# EasyPrint local project (frontend + backend)

This folder contains both the React frontend and the Spring Boot backend from the supplied backend ZIP, with frontend-to-backend guest, signup/login, and print-job upload wiring.

## Start locally

### 1) Requirements
- Node.js 20+
- Java JDK 24 (the supplied Gradle project targets Java 24)
- MongoDB connection (the backend reads `MONGO_URI`)
- Cloudinary credentials for the supplied backend's existing signed-upload flow

### 2) Start backend
Open a terminal in `backend/EasyPrint_Backend` (folder may be named `EasyPrint_Backend` in the extracted bundle). In PowerShell set:
```powershell
$env:MONGO_URI="mongodb://localhost:27017/easyprint"
$env:CLOUDINARY_CLOUD_NAME="YOUR_CLOUD_NAME"
$env:CLOUDINARY_API_KEY="YOUR_API_KEY"
$env:CLOUDINARY_API_SECRET="YOUR_API_SECRET"
.\gradlew.bat bootRun
```
Use your actual MongoDB URI and Cloudinary credentials. MongoDB must be running. The backend listens on http://localhost:8080.

**Document storage note:** the supplied backend's upload design sends document bytes to Cloudinary, not just to the local backend. If you do not want documents sent to an external service, do not click Upload to Backend until the upload flow is changed to local-disk storage. The ZIP itself does not need to be uploaded to any hosting service.

### 3) Start frontend
Open a second terminal in `frontend/EasyPrint_Frontend`:
```powershell
npm install
Copy-Item .env.example .env
npm run dev
```
Set `VITE_API_BASE_URL=http://localhost:8080` and `VITE_CLOUDINARY_CLOUD_NAME` in `.env`. Open the URL printed by Vite.

## Integrated endpoints
- `POST /api/v1/auth/guest` — server issues a guest ID
- `POST /api/v1/auth/register` — stores a user in MongoDB with BCrypt-hashed password
- `POST /api/v1/auth/login` — validates email/password against MongoDB
- `POST /api/v1/user/jobs/init` — creates a pending print job
- `GET /api/v1/user/jobs/upload-signature?publicId=...` — signs the Cloudinary upload
- Frontend posts the selected file to Cloudinary using that signature
- `POST /api/v1/user/jobs/confirm` — confirms upload and updates print-job status
- `POST /api/v1/guest/orders/track-receipt` — guest order receipt lookup

## Notes / limitations
- Google OAuth is not configured in the supplied backend; its button remains an explanatory placeholder.
- The backend still has permissive API security (`anyRequest().permitAll()`). Frontend route protection is not a substitute for server-side authorization; do not deploy publicly without adding authenticated API authorization and rate limiting.
- Shop listing, order history, pricing, and support APIs are not present in the supplied backend; those screens remain frontend placeholders.
- Browser editor controls provide preview adjustments; the supplied backend does not convert every edit into a transformed print-ready PDF.
- On mobile, the landing-page hamburger and dashboard sidebar menu have open/close states and responsive dropdown/side navigation.
