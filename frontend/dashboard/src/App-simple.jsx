import React, { useState, useEffect } from 'react';
import OceanMap from './components/OceanMap';
import { Shield, Activity, Radar, AlertTriangle } from 'lucide-react';
import { apiService } from './services/api';

function App() {
  const [simulationData, setSimulationData] = useState(null);
  const [threats, setThreats] = useState([]);
  const [environment, setEnvironment] = useState(null);
  const [sonarConfig, setSonarConfig] = useState(null);
  const [defenceResponses, setDefenceResponses] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const data = await apiService.getSimulationData();
      setSimulationData(data);
      setThreats(data.threats || []);
      setEnvironment(data.environment || {});
      setSonarConfig(data.sonar_config || {});
      setDefenceResponses(data.responses || []);
    } catch (error) {
      console.error('Failed to initialize data:', error);
    }
  };

  const runSimulationStep = async () => {
    try {
      const data = await apiService.stepSimulation();
      setSimulationData(data);
      setThreats(data.threats || []);
      setEnvironment(data.environment || {});
      setDefenceResponses(data.responses || []);
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
      setEnvironment(data.environment || {});
      setDefenceResponses(data.responses || []);
      setStepCount(0);
      setIsRunning(false);
    } catch (error) {
      console.error('Failed to reset simulation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 p-4 shadow-2xl border-b border-cyan-700/50">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🌊 Underwater Defence Digital Twin
            </h1>
            <div className="px-3 py-1 bg-cyan-600/20 border border-cyan-400/30 rounded-lg">
              <span className="text-cyan-300 font-medium">Step: {stepCount}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSimulation}
              className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${
                isRunning 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-red-600/20' 
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-600/20'
              }`}
            >
              {isRunning ? '⏸ Pause' : '▶ Start'}
            </button>

            <button
              onClick={runSimulationStep}
              disabled={isRunning}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all transform hover:scale-105 shadow-blue-600/20"
            >
              ⏭ Step
            </button>

            <button
              onClick={resetSimulation}
              className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Full Screen Ocean Map */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 p-4">
          <OceanMap 
            objects={simulationData?.objects || []}
            sonarConfig={sonarConfig}
            threats={threats}
            predictions={simulationData?.predictions || []}
            fullScreen={true}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
