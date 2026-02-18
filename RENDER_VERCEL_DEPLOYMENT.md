# 🚀 Render + Vercel Deployment Guide

## 📋 Prerequisites
- GitHub account with repository
- Render account (free tier available)
- Vercel account (free tier available)

---

## 🖥️ BACKEND DEPLOYMENT - RENDER

### Step 1: Prepare Backend
```bash
# 1. Push backend to GitHub
cd c:\Users\Akhila\underwater-digital-twin
git init
git add .
git commit -m "Initial commit - underwater defence backend"
git branch -M main
git remote add origin https://github.com/yourusername/underwater-defence-digital-twin.git
git push -u origin main
```

### Step 2: Deploy to Render
1. **Go to**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → "Web Service"
4. **Connect GitHub repository**
5. **Select your underwater-defence-digital-twin repo**
6. **Configure service**:
   - **Name**: underwater-defence-backend
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free (Free tier)
7. **Click "Create Web Service"**

### Step 3: Configure Backend
```bash
# After deployment, your backend will be available at:
https://underwater-defence-backend.onrender.com

# Test health endpoint:
https://underwater-defence-backend.onrender.com/health
```

---

## 🌐 FRONTEND DEPLOYMENT - VERCEL

### Step 1: Prepare Frontend
```bash
# 1. Update API URL in frontend
cd c:\Users\Akhila\underwater-digital-twin\frontend\dashboard

# 2. Create production environment file
# Already created: .env.production
# Update with your Render backend URL

# 3. Build frontend
npm run build
```

### Step 2: Deploy to Vercel
1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import Git Repository**
5. **Select your underwater-defence-digital-twin repo**
6. **Configure project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend/dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: `https://underwater-defence-backend.onrender.com`
7. **Click "Deploy"**

### Step 3: Configure Frontend
```bash
# After deployment, your frontend will be available at:
https://underwater-defence-frontend.vercel.app

# Test access:
https://underwater-defence-frontend.vercel.app
```

---

## 🔧 Configuration Updates Needed

### Backend CORS Configuration
Update your backend to allow Vercel frontend:

```python
# In api.py, update CORS middleware:
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://underwater-defence-frontend.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend API Configuration
Update frontend to use production API:

```javascript
// In services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

---

## 🚀 QUICK DEPLOYMENT STEPS

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render + Vercel deployment"
git push origin main
```

### 2. Deploy Backend (Render)
- Go to render.com → New Web Service
- Connect GitHub repo
- Use `backend` folder as root
- Auto-deploy on push

### 3. Deploy Frontend (Vercel)
- Go to vercel.com → New Project
- Connect same GitHub repo
- Use `frontend/dashboard` folder as root
- Set environment variable for API URL

---

## 📱 Access Your Deployed App

### Production URLs
- **Backend**: https://underwater-defence-backend.onrender.com
- **Frontend**: https://underwater-defence-frontend.vercel.app
- **API Docs**: https://underwater-defence-backend.onrender.com/docs

### Environment Variables
- Backend gets Render environment automatically
- Frontend needs `REACT_APP_API_URL` set to backend URL

---

## 🔍 Testing Deployment

### Health Checks
```bash
# Test backend
curl https://underwater-defence-backend.onrender.com/health

# Test frontend
curl https://underwater-defence-frontend.vercel.app
```

### Functionality Tests
1. ✅ Frontend loads correctly
2. ✅ API calls work
3. ✅ Simulation runs
4. ✅ Ocean map displays
5. ✅ All panels show data

---

## 🛠️ Troubleshooting

### Common Issues
1. **CORS errors**: Update backend CORS settings
2. **API URL wrong**: Check environment variables
3. **Build fails**: Check node_modules and dependencies
4. **Deployment fails**: Check logs on Render/Vercel

### Log Locations
- **Render logs**: Dashboard → Service → Logs
- **Vercel logs**: Dashboard → Functions → Logs

---

## 📈 Monitoring

### Render (Backend)
- Free tier: 750 hours/month
- Auto-sleep after 15 minutes inactivity
- Metrics in dashboard

### Vercel (Frontend)
- Free tier: 100GB bandwidth/month
- Real-time logs
- Performance analytics

---

## 🎯 Deployment Checklist

- [ ] Backend pushed to GitHub
- [ ] Frontend pushed to GitHub
- [ ] Render service created
- [ ] Vercel project created
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Health endpoints tested
- [ ] Full functionality tested
- [ ] Domain configured (optional)
- [ ] SSL verified (automatic)

---

**🚀 Your underwater defence digital twin is ready for cloud deployment!**

**Next Steps:**
1. Push code to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Test full application
5. Share your deployed app! 🎉
