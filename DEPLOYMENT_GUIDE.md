# 🚀 Underwater Defence Digital Twin - Deployment Guide

## 📋 Quick Start Commands

### 🖥️ Backend Deployment
```bash
# Navigate to backend directory
cd c:\Users\Akhila\underwater-digital-twin\backend

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn api:app --host 0.0.0.0 --port 8000 --reload

# Run production server
uvicorn api:app --host 0.0.0.0 --port 8000 --workers 4
```

### 🌐 Frontend Deployment
```bash
# Navigate to frontend directory
cd c:\Users\Akhila\underwater-digital-twin\frontend\dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment (Recommended)

### Build and Run with Docker Compose
```bash
# Navigate to project root
cd c:\Users\Akhila\underwater-digital-twin

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Cloud Deployment Options

### 1. Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend/dashboard
vercel --prod
```

### 2. Heroku (Backend + Frontend)
```bash
# Install Heroku CLI
# Create app.json and Procfile files

# Deploy backend
heroku create your-app-name
git subtree push --prefix backend heroku main
```

### 3. AWS EC2 (Full Stack)
```bash
# Create EC2 instance
# Install Docker and docker-compose
# Clone repository
# Run docker-compose up -d
```

## 🔧 Production Configuration

### Backend Settings
- Environment variables for production
- Database configuration
- CORS settings
- SSL certificates
- Authentication middleware

### Frontend Settings
- API endpoint configuration
- Environment variables
- Build optimization
- Service worker setup

## 📱 Access Your Application

### Local Development
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Production
- Update URLs to your domain
- Configure SSL certificates
- Set up monitoring

## 🛠️ Troubleshooting

### Common Issues
1. **Backend won't start**: Check Python version and dependencies
2. **Frontend build fails**: Clear node_modules and reinstall
3. **CORS errors**: Configure backend CORS settings
4. **Port conflicts**: Change ports in docker-compose.yml

### Health Checks
```bash
# Backend health
curl http://localhost:8000/health

# Frontend access
curl http://localhost:3000
```

## 📊 Monitoring

### Logs
- Backend logs: Check uvicorn output
- Frontend logs: Browser console
- Docker logs: docker-compose logs

### Performance
- Monitor response times
- Check resource usage
- Set up alerting

## 🔒 Security

### Production Security
- Use HTTPS
- Implement authentication
- Rate limiting
- Input validation
- Environment variables for secrets

## 📈 Scaling

### Horizontal Scaling
- Load balancer configuration
- Multiple backend instances
- CDN for frontend assets
- Database replication

## 🚀 Deployment Checklist

- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Database configured
- [ ] SSL certificates installed
- [ ] CORS configured
- [ ] Authentication implemented
- [ ] Monitoring set up
- [ ] Backup strategy
- [ ] Recovery procedures
- [ ] Performance testing
- [ ] Security audit

## 📞 Support

For deployment issues:
1. Check logs for error messages
2. Verify all dependencies are installed
3. Ensure ports are not blocked
4. Test with curl commands
5. Review configuration files

---

**🎯 Your Underwater Defence Digital Twin is ready for deployment!**
