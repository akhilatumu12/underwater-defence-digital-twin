# 🌊 Underwater Defence Digital Twin

A real-time digital twin platform that simulates underwater defence systems using AI to detect, predict, and respond to underwater threats.

## 🎯 Problem Statement

Traditional underwater defence systems are expensive, hardware-dependent, and difficult to test in real conditions. This system provides a software-based digital twin that can simulate underwater environments, detect threats, and evaluate defence strategies safely and efficiently.

## 💡 Solution Overview

The system builds a real-time digital twin that:
- Simulates underwater sensor data
- Identifies and classifies objects using AI
- Predicts threat movement
- Visualizes defence responses
- Allows "what-if" scenario testing

## 🏗️ System Architecture

```
Underwater Environment Simulator
            |
            v
     Sonar Digital Twin
            |
            v
     Sensor Data Stream
            |
            v
    AI Threat Detection
            |
            v
 Prediction & Decision Engine
            |
            v
   Digital Twin Dashboard
```

## 🛠️ Technology Stack

### Backend
- **Python** - Core programming language
- **FastAPI** - REST API framework
- **NumPy/SciPy** - Scientific computing
- **Scikit-learn** - Machine learning models
- **TensorFlow** - Deep learning for sonar image processing

### Frontend
- **React + Vite** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Axios** - HTTP client

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/dashboard
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 📊 Features

### 🌊 Underwater Environment Simulator
- Simulates water depth, sound propagation, and noise levels
- Generates synthetic sonar data
- Real-time object movement simulation

### 📡 Sonar Digital Twin
- Virtual sonar stations with configurable position and range
- Simulated echo returns with noise filtering
- Real-time detection visualization

### 🚢 Threat Models
- **Enemy Submarine** - High threat, fast movement
- **Underwater Mines** - High threat, stationary
- **Diver Intrusion** - Medium threat, slow movement
- **Marine Animals** - Low threat, ethical detection

### 🧠 AI Threat Detection
- **Rule-based classification** for immediate threat assessment
- **CNN models** for sonar image processing (ready for enhancement)
- **Random Forest/SVM** for signal feature classification
- Risk scoring and threat level assignment

### 🔮 Prediction & Decision Engine
- Movement path prediction based on historical data
- Time-to-impact estimation
- Automated defence response recommendations

### 📊 Command Dashboard
- Live underwater map with real-time object tracking
- Sonar coverage zones and detection visualization
- Threat trajectories and alert system
- Comprehensive statistics and metrics

## 🔄 System Flow

1. **Start Simulation** → Initialize environment and objects
2. **Generate Underwater Environment** → Create ocean grid and place objects
3. **Simulate Sonar Signals** → Detect objects within sonar range
4. **Detect Objects Using AI** → Classify threats vs marine life
5. **Predict Movement** → Calculate future positions
6. **Trigger Alert/Response** → Generate defence recommendations
7. **Update Digital Twin View** → Refresh dashboard visualization
8. **Loop** → Continue real-time monitoring

## 📡 API Endpoints

### Environment
- `GET /environment` - Get current environment status
- `GET /objects` - Get all objects in the environment
- `POST /objects/add` - Add new object
- `DELETE /objects/{id}` - Remove object

### Sonar
- `GET /sonar` - Get sonar configuration
- `POST /sonar/configure` - Configure sonar position and range

### Simulation
- `GET /simulation/step` - Run one simulation step
- `GET /simulation/reset` - Reset simulation
- `GET /history` - Get detection history

### Threat Assessment
- `GET /threats` - Get current threat assessment
- `GET /defence` - Get defence response recommendations

## 🎮 Dashboard Controls

### Simulation Controls
- **Start/Pause** - Toggle automatic simulation
- **Step** - Run single simulation step
- **Reset** - Reset simulation to initial state

### Visualization Features
- **Ocean Grid** - Real-time 2D underwater map
- **Threat Indicators** - Color-coded threat levels
- **Sonar Range** - Visual representation of detection area
- **Movement Predictions** - Future position estimates

## 🔧 Configuration

### Sonar Configuration
- Position: (x, y) coordinates
- Range: Detection radius in meters
- Status: Active/Inactive

### Environment Settings
- Grid size: 100x100 meters (configurable)
- Object types: submarine, diver, fish, mine
- Update frequency: 2 seconds (configurable)

## 🚀 Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Advanced ML models for threat classification
- [ ] 3D visualization support
- [ ] Multi-sensor fusion
- [ ] Historical analysis and replay mode
- [ ] Export functionality for simulation data
- [ ] Integration with real sonar hardware

## 📝 License

This project is part of the Underwater Defence Digital Twin hackathon project.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the project documentation or contact the development team.
