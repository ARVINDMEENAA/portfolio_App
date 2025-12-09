# Portfolio Full-Stack Application

A full-stack web application for managing and showcasing portfolio projects and client testimonials. Built with React, Node.js, and MongoDB.

## What This Project Does

This application has two main parts:
1. **Public Landing Page** - Visitors can view projects, read client testimonials, submit contact forms, and subscribe to newsletters
2. **Admin Panel** - Manage all content including projects, clients, and view form submissions

## Features

### Landing Page
The landing page includes several key sections:
- **Projects Showcase**: Displays all projects with images, names, and descriptions. Each project has a "Read More" button for future expansion.
- **Client Testimonials**: Shows feedback from happy clients along with their photos, names, designations, and testimonials.
- **Contact Form**: A working contact form where visitors can reach out. All submissions are saved to the database and can be viewed in the admin panel.
- **Newsletter Subscription**: Allows visitors to subscribe to updates by entering their email address.

### Admin Panel
The admin dashboard provides full control over the website content:
- **Manage Projects**: Add new projects by uploading images and entering details. Delete projects when needed.
- **Manage Clients**: Add client testimonials with photos and information. Remove outdated testimonials.
- **View Contact Submissions**: See all messages submitted through the contact form including name, email, phone, and city.
- **View Newsletter Subscribers**: Access the list of all email addresses that have subscribed to the newsletter.

### Technical Implementation
- **Image Processing**: All uploaded images are automatically resized and cropped to 450×350 pixels using the Sharp library. This ensures consistent image sizes across the website.
- **Responsive Design**: Built with TailwindCSS to ensure the site looks great on all devices - desktop, tablet, and mobile.
- **REST API**: The backend provides a clean RESTful API for all CRUD operations.
- **Database**: MongoDB Atlas is used for cloud database storage with Mongoose for schema modeling.

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- TailwindCSS

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (file upload)
- Sharp (image processing)
- CORS
- dotenv

## Project Structure

```
portfolio-app/
├── backend/
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── clientController.js
│   │   ├── contactController.js
│   │   └── newsletterController.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Client.js
│   │   ├── Contact.js
│   │   └── Newsletter.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── clientRoutes.js
│   │   ├── contactRoutes.js
│   │   └── newsletterRoutes.js
│   ├── middleware/
│   │   ├── upload.js
│   │   └── imageProcessor.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ClientCard.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Step 1: Clone or Navigate to Project
```bash
cd C:\portfolio-app
```

### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

### Step 3: Backend Setup

```bash
cd backend
npm install
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Edit `.env` file (already configured):
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Testing the Application

### 1. Test Landing Page
- Open `http://localhost:3000`
- You should see the landing page with hero section

### 2. Test Admin Panel
- Navigate to `http://localhost:3000/admin`
- Add a project:
  - Enter project name
  - Enter description
  - Upload an image (will be auto-cropped to 450×350)
  - Click "Add Project"
- Add a client:
  - Enter client name, description, designation
  - Upload an image
  - Click "Add Client"

### 3. Test Landing Page Features
- Go back to home page
- Projects and clients should now appear
- Fill out the contact form and submit
- Subscribe to newsletter with an email

### 4. Verify Admin Panel Data
- Go to admin panel
- Check "Contacts" tab to see form submissions
- Check "Subscribers" tab to see newsletter emails

## API Endpoints

### Projects
- `POST /api/projects` - Create project (with image upload)
- `GET /api/projects` - Get all projects
- `DELETE /api/projects/:id` - Delete project

### Clients
- `POST /api/clients` - Create client (with image upload)
- `GET /api/clients` - Get all clients
- `DELETE /api/clients/:id` - Delete client

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers

## Deployment Guide

### Deploy Backend (Render)

1. Create account on [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
6. Click "Create Web Service"
7. Copy the deployed URL (e.g., `https://portfolio-backend.onrender.com`)

### Deploy Frontend (Vercel)

1. Create account on [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL + `/api` (e.g., `https://portfolio-backend.onrender.com/api`)
6. Click "Deploy"

### Alternative: Deploy Frontend (Netlify)

1. Create account on [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
5. Add environment variable:
   - `VITE_API_URL`: Your deployed backend URL + `/api`
6. Click "Deploy site"

### Post-Deployment

1. Update frontend `.env` with production backend URL
2. Test all features on production
3. Update CORS settings in backend if needed:

```javascript
// backend/server.js
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app']
}));
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Backend Issues
- **MongoDB connection error**: Check your connection string and IP whitelist
- **Port already in use**: Change PORT in `.env`
- **Image upload fails**: Ensure `uploads` folder exists

### Frontend Issues
- **API calls fail**: Check VITE_API_URL in `.env`
- **Images not showing**: Verify backend URL in image components
- **Build fails**: Delete `node_modules` and run `npm install` again

### Common Issues
- **CORS errors**: Ensure backend CORS is configured correctly
- **Images not cropping**: Check Sharp installation: `npm install sharp`
- **Database not updating**: Check MongoDB Atlas network access

## Features Implemented

✅ Landing page with all sections  
✅ Dynamic projects display  
✅ Dynamic clients display  
✅ Working contact form  
✅ Newsletter subscription  
✅ Admin panel with all features  
✅ Image upload with Multer  
✅ Image cropping to 450×350 with Sharp  
✅ MongoDB Atlas integration  
✅ RESTful API architecture  
✅ Responsive design with TailwindCSS  
✅ Clean folder structure  
✅ Environment variable handling  
✅ Complete documentation  

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
