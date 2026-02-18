# 🌊 Underwater Defence Digital Twin - Demo Guide

## 🚀 Quick Demo Setup

### 1. Start Both Services
```bash
# Backend (Terminal 1)
cd backend
python -m uvicorn api:app --host 0.0.0.0 --port 8000 --reload

# Frontend (Terminal 2)  
cd frontend/dashboard
npm run dev
```

### 2. Access Points
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎮 Demo Scenarios

### Scenario 1: Basic Threat Detection
1. **Open Dashboard** → Navigate to http://localhost:3000
2. **Click "Step"** → Run single simulation step
3. **Observe**:
   - Objects appear on ocean map
   - Threats detected in right panel
   - Sonar detection updates
   - Risk score calculated

### Scenario 2: Real-Time Monitoring
1. **Enable WebSocket** → Toggle WebSocket button to ON
2. **Click "Start"** → Begin automatic simulation
3. **Watch Real-Time Updates**:
   - Objects move smoothly across ocean grid
   - Threat levels update instantly
   - Alerts pop up for high threats
   - Statistics refresh automatically

### Scenario 3: What-If Testing
1. **Click "Scenarios"** → Open scenario panel
2. **Try "Submarine Attack"**:
   - Click "Load" 
   - Watch 3 submarines approach from different angles
   - Observe high threat alerts
3. **Try "Mine Field"**:
   - Load scenario
   - See stationary mines with diver intrusion
   - Monitor defence responses

### Scenario 4: Custom Scenario Creation
1. **Click "Create Scenario"**
2. **Add Objects**:
   - Click "+ Submarine" (adds threat)
   - Click "+ Mine" (adds stationary threat)
   - Click "+ Diver" (adds medium threat)
3. **Configure** → Set name and description
4. **Save & Test** → Load your custom scenario

## 🔍 Key Features to Demonstrate

### 📊 Real-Time Ocean Map
- **Grid Visualization**: 100x100 meter ocean grid
- **Object Tracking**: Real-time position updates
- **Threat Indicators**: Color-coded by threat level
- **Sonar Range**: Visual detection area
- **Movement Predictions**: Dotted indicators for future positions

### 🚨 Intelligent Alert System
- **Automatic Alerts**: Pop-up notifications for high threats
- **Sound Alerts**: Audio warnings for critical threats
- **Alert History**: Track all threat events
- **Dismissible**: Clear alerts after action

### 🎯 Threat Assessment
- **Multi-Level Classification**:
  - 🔴 **HIGH**: Submarines, Mines
  - 🟠 **MEDIUM**: Divers
  - 🟢 **LOW**: Marine Life
- **Risk Scoring**: Dynamic risk calculation
- **Threat Distribution**: Visual breakdown

### 📡 Sonar System
- **Configurable Range**: Adjust detection radius
- **Position Control**: Move sonar location
- **Detection Summary**: Objects within range
- **Live Visualization**: Animated sonar display

### 🛡️ Defence Response
- **Automated Recommendations**: AI-driven responses
- **Action Categories**:
  - ALERT: Immediate warnings
  - DEPLOY: Countermeasure activation
  - MONITOR: Continuous tracking
- **Priority Levels**: High/Medium/Low urgency

### 📈 Statistics Dashboard
- **Live Metrics**: Real-time system statistics
- **Object Distribution**: Type breakdown
- **Threat Levels**: Percentage breakdown
- **Detection Rates**: System effectiveness

## 🎛️ Advanced Controls

### WebSocket Mode
- **Toggle ON/OFF**: Switch between HTTP polling and WebSocket
- **Benefits**: Real-time updates, reduced latency
- **Visual Indicator**: Green when connected

### Simulation Controls
- **Start/Pause**: Automatic stepping
- **Step**: Manual single iteration
- **Reset**: Clear and restart
- **Step Counter**: Track simulation progress

## 🧪 Test Cases

### Test Case 1: High Threat Scenario
1. Load "Submarine Attack"
2. Verify: 3 red threat indicators
3. Check: High risk score (>200)
4. Confirm: Alert system triggers

### Test Case 2: Mixed Threat Environment
1. Load "Coordinated Attack"
2. Observe: Multiple threat types
3. Monitor: Different alert levels
4. Track: Defence responses

### Test Case 3: Marine Life Detection
1. Load "Marine Life Confusion"
2. Verify: Fish detected as low threat
3. Confirm: Submarine still identified
4. Check: Ethical filtering works

## 📱 Mobile Responsive
- **Test on Mobile**: Resize browser to mobile width
- **Adaptive Layout**: Components stack vertically
- **Touch Controls**: All buttons work on touch

## 🔧 Troubleshooting

### Common Issues
1. **Backend not running** → Check terminal for errors
2. **Frontend not loading** → Verify npm install completed
3. **WebSocket not connecting** → Check backend port 8000
4. **No objects detected** → Click "Reset" then "Step"

### Performance Tips
- **Disable WebSocket** if using slow connection
- **Reduce simulation speed** for detailed observation
- **Clear browser cache** if UI becomes unresponsive

## 🎯 Success Metrics

### Technical Success
- ✅ Real-time updates (<1s latency)
- ✅ WebSocket connection stable
- ✅ All API endpoints responding
- ✅ No console errors

### Functional Success  
- ✅ Threats detected correctly
- ✅ Alerts trigger appropriately
- ✅ Scenarios load successfully
- ✅ Statistics update accurately

### User Experience
- ✅ Intuitive controls
- ✅ Clear visual feedback
- ✅ Responsive design
- ✅ Smooth animations

## 🚀 Next Steps for Production

1. **Enhanced ML Models**: Implement CNN for sonar images
2. **3D Visualization**: Add depth dimension
3. **Historical Analysis**: Track threat patterns over time
4. **Multi-User**: Support multiple operators
5. **Export Features**: Save simulation data
6. **Hardware Integration**: Connect to real sonar systems

---

**Demo Duration**: 15-20 minutes
**Target Audience**: Technical stakeholders, defence analysts, hackathon judges
**Key Differentiators**: Real-time AI threat detection, ethical marine life filtering, what-if scenario testing
