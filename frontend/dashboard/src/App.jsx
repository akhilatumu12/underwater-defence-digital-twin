import React, { useState, useEffect } from 'react';
import OceanMap from './components/OceanMap';
import ThreatPanel from './components/ThreatPanel';
import SonarPanel from './components/SonarPanel';
import DefenceResponse from './components/DefenceResponse';
import StatsPanel from './components/StatsPanel';
import AlertSystem from './components/AlertSystem';
import ScenarioTesting from './components/ScenarioTesting';
import EnvironmentalPanel from './components/EnvironmentalPanel';
import AdvancedControls from './components/AdvancedControls';
import AnalyticsPanel from './components/AnalyticsPanel';
import { Shield, Activity, Radar, AlertTriangle, TestTube, BarChart3 } from 'lucide-react';
import { apiService } from './services/api';
import { websocketService } from './services/websocket';

function App() {
  const [simulationData, setSimulationData] = useState({
    objects: [],
    detected: [],
    predictions: [],
    threats: [],
    responses: []
  });
  const [threats, setThreats] = useState([]);
  const [environment, setEnvironment] = useState({});
  const [sonarConfig, setSonarConfig] = useState({
    position: { x: 50, y: 50 },
    range: 30,
    power: 100,
    frequency: 50,
    status: 'active'
  });
  const [defenceResponses, setDefenceResponses] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [useWebSocket, setUseWebSocket] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [environmentalData, setEnvironmentalData] = useState({
    weather: 'clear',
    temperature: 20,
    visibility: 50,
    time_of_day: 'day'
  });

  useEffect(() => {
    initializeData();
    setupWebSocket();
  }, []);

  const setupWebSocket = () => {
    // Setup WebSocket event listeners
    websocketService.on('simulation_update', (data) => {
      if (useWebSocket) {
        setSimulationData(data);
        setStepCount(data.step);
        setThreats(data.threats || []);
        setDefenceResponses(data.responses || []);
      }
    });

    websocketService.on('step_result', (data) => {
      if (useWebSocket) {
        setSimulationData(data.data);
        setStepCount(data.data.step);
        setThreats(data.data.threats || []);
        setDefenceResponses(data.data.responses || []);
      }
    });

    websocketService.on('auto_update', (data) => {
      if (useWebSocket) {
        setSimulationData(data.data);
        setStepCount(data.data.step);
        setThreats(data.data.threats || []);
        setDefenceResponses(data.data.responses || []);
      }
    });

    // Connect WebSocket
    if (useWebSocket) {
      websocketService.connectSimulation();
    }
  };

  useEffect(() => {
    if (useWebSocket) {
      websocketService.connectSimulation();
    } else {
      websocketService.disconnect();
    }
  }, [useWebSocket]);

  const initializeData = async () => {
    try {
      const [envData, sonarData] = await Promise.all([
        apiService.getEnvironment(),
        apiService.getSonarConfig()
      ]);
      
      setEnvironmentalData(envData);
      setSonarConfig(sonarData);
      
      const simData = await apiService.getSimulationData();
      setSimulationData(simData);
      setThreats(simData.threats || []);
      setDefenceResponses(simData.responses || []);
      setEnvironment(simData.environment || {});
      
    } catch (error) {
      console.error('Failed to initialize data:', error);
    }
  };

  const runSimulationStep = async () => {
    try {
      const data = await apiService.stepSimulation();
      setSimulationData(data);
      setThreats(data.threats || []);
      setDefenceResponses(data.responses || []);
      setEnvironment(data.environment || {});
      setEnvironmentalData(data.environment || {});
      setStepCount(stepCount + 1);
    } catch (error) {
      console.error('Failed to run simulation step:', error);
    }
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = async () => {
    try {
      const data = await apiService.resetSimulation();
      setSimulationData(data);
      setThreats(data.threats || []);
      setDefenceResponses(data.responses || []);
      setEnvironment(data.environment || {});
      setEnvironmentalData(data.environment || {});
      setStepCount(0);
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to reset simulation:', error);
    }
  };

  const handleUpdateEnvironment = async () => {
    try {
      const envData = await apiService.updateEnvironment();
      setEnvironmentalData(envData);
      setEnvironment(envData);
    } catch (error) {
      console.error('Failed to update environment:', error);
    }
  };

  const handleExportData = async () => {
    try {
      const data = await apiService.exportSimulation();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'simulation_data.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  const handleImportData = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await apiService.importSimulation(data);
        await initializeData();
      } catch (error) {
        console.error('Failed to import data:', error);
        alert('Failed to load simulation state');
      }
    }
  };

  const loadScenario = async (scenario) => {
    try {
      const data = await apiService.loadScenario(scenario);
      setSimulationData(data);
      setThreats(data.threats || []);
      setDefenceResponses(data.responses || []);
      setEnvironment(data.environment || {});
      setEnvironmentalData(data.environment || {});
    } catch (error) {
      console.error('Failed to load scenario:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning && !useWebSocket) {
      interval = setInterval(runSimulationStep, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning, useWebSocket]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-cyan-400 flex items-center">
              <span className="text-3xl mr-3">🛡️</span>
              UNDERWATER DEFENCE SYSTEM
            </h1>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-sm">
                <span className="text-gray-400">STEP:</span>
                <span className="text-cyan-400 font-bold ml-1">{stepCount}</span>
              </div>
              <div className="px-3 py-1 bg-green-900/30 border border-green-600/50 rounded text-sm">
                <span className="text-green-400">● SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded font-bold transition-all transform hover:scale-105 border ${
                isRunning 
                  ? 'bg-red-600 hover:bg-red-700 border-red-500' 
                  : 'bg-green-600 hover:bg-green-700 border-green-500'
              }`}
            >
              {isRunning ? '⏸ PAUSE' : '▶ START'}
            </button>

            <button
              onClick={runSimulationStep}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded font-bold transition-all transform hover:scale-105 border border-blue-500"
            >
              ⏭ STEP
            </button>

            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-bold transition-all transform hover:scale-105 border border-gray-500"
            >
              🔄 RESET
            </button>

            <button
              onClick={() => setShowScenarios(!showScenarios)}
              className={`px-4 py-2 rounded font-bold transition-all transform hover:scale-105 border ${
                showScenarios 
                  ? 'bg-purple-600 hover:bg-purple-700 border-purple-500' 
                  : 'bg-gray-700 hover:bg-gray-600 border-gray-500'
              }`}
            >
              🎯 SCENARIOS
            </button>

            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`px-4 py-2 rounded font-bold transition-all transform hover:scale-105 border ${
                showAnalytics 
                  ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-500' 
                  : 'bg-gray-700 hover:bg-gray-600 border-gray-500'
              }`}
            >
              📊 ANALYTICS
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full Screen Ocean Map */}
      <div className="flex-1 relative">
        {/* Full Screen Ocean Map */}
        <div className="absolute inset-0 p-4">
          <OceanMap 
            objects={simulationData?.objects || []}
            sonarConfig={sonarConfig}
            threats={threats}
            predictions={simulationData?.predictions || []}
            fullScreen={true}
          />
        </div>

        {/* Floating Panels */}
        <div className="absolute top-4 left-4 space-y-3 z-50">
          <EnvironmentalPanel 
            environmentalData={environmentalData}
            onUpdate={handleUpdateEnvironment}
          />
        </div>

        <div className="absolute top-4 right-4 space-y-3 z-50">
          <ThreatPanel threats={threats} />
          <SonarPanel 
            detected={simulationData?.detected || []}
            sonarConfig={sonarConfig}
          />
          <DefenceResponse responses={defenceResponses} />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-50">
          <AdvancedControls
            isRunning={isRunning}
            onToggleSimulation={toggleSimulation}
            onStepSimulation={runSimulationStep}
            onResetSimulation={resetSimulation}
            onExportData={handleExportData}
            onImportData={handleImportData}
          />
        </div>

        {/* Analytics Panel */}
        {showAnalytics && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50">
            <AnalyticsPanel 
              simulationData={simulationData}
              threats={threats}
              onClose={() => setShowAnalytics(false)}
            />
          </div>
        )}

        {/* Scenario Testing Panel */}
        {showScenarios && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-50">
            <ScenarioTesting 
              onLoadScenario={loadScenario}
              onClose={() => setShowScenarios(false)}
            />
          </div>
        )}

        {/* Alert System */}
        <AlertSystem 
          threats={threats} 
          responses={defenceResponses}
        />
      </div>
    </div>
  );
}

export default App;
