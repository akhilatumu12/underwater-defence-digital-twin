import React, { useState } from 'react';
import { Settings, Download, Upload, Play, Pause, RotateCcw, Zap, Target } from 'lucide-react';

const AdvancedControls = ({ 
  isRunning, 
  onToggleSimulation, 
  onStepSimulation, 
  onResetSimulation,
  onExportData,
  onImportData,
  simulationData,
  sonarConfig
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [sonarSettings, setSonarSettings] = useState({
    x: sonarConfig?.position?.x || 50,
    y: sonarConfig?.position?.y || 50,
    range: sonarConfig?.range || 30,
    power: sonarConfig?.power || 100,
    frequency: sonarConfig?.frequency || 50
  });

  const handleSonarConfig = () => {
    // This would connect to API to configure sonar
    console.log('Configuring sonar:', sonarSettings);
    setShowSettings(false);
  };

  const handleExport = () => {
    if (onExportData) {
      const dataStr = JSON.stringify(simulationData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `simulation-export-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file && onImportData) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onImportData(data);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Settings className="w-4 h-4 mr-2 text-purple-400" />
          Advanced Controls
        </h2>

        {/* Main Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleSimulation}
            className={`px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' 
                : 'bg-green-600 hover:bg-green-700 shadow-green-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3 h-3 inline mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-3 h-3 inline mr-1" />
                Start
              </>
            )}
          </button>

          <button
            onClick={onStepSimulation}
            disabled={isRunning}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all transform hover:scale-105 shadow-blue-600/20"
          >
            <Target className="w-3 h-3 inline mr-1" />
            Step
          </button>

          <button
            onClick={onResetSimulation}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            Reset
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium transition-colors"
          >
            <Download className="w-3 h-3 inline mr-1" />
            Export
          </button>

          <label className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-colors cursor-pointer">
            <Upload className="w-3 h-3 inline mr-1" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvancedControls;
