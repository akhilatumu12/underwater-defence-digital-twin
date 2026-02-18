import React from 'react';
import { Radar, Waves, Activity } from 'lucide-react';

const SonarPanel = ({ sonarConfig, detected }) => {
  if (!sonarConfig) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Radar className="w-5 h-5 mr-2 text-green-400" />
          Sonar System
        </h2>
        <div className="text-center text-gray-400 py-8">
          <Radar className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <div>Loading sonar configuration...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl w-80">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <Radar className="w-4 h-4 mr-2 text-blue-400" />
          Sonar
        </h2>
        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
          sonarConfig.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
        }`}>
          {sonarConfig.status}
        </div>
      </div>

      {/* Sonar Configuration */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Position</div>
          <div className="text-sm font-bold">
            ({sonarConfig.position.x}, {sonarConfig.position.y})
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Range</div>
          <div className="text-sm font-bold">{sonarConfig.range}m</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Power</div>
          <div className="text-sm font-bold">{sonarConfig.power}%</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Frequency</div>
          <div className="text-sm font-bold">{sonarConfig.frequency} kHz</div>
        </div>
      </div>

      {/* Detection Status */}
      <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
        <div className="text-xs text-gray-400 mb-1">Detected Objects</div>
        <div className="text-lg font-bold text-blue-400">{detected.length}</div>
      </div>

      {/* Sonar Visualization */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="relative h-32 bg-slate-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Sonar circles */}
              <div className="absolute inset-0 border border-green-500/20 rounded-full w-24 h-24"></div>
              <div className="absolute inset-0 border border-green-500/30 rounded-full w-16 h-16"></div>
              <div className="absolute inset-0 border border-green-500/40 rounded-full w-8 h-8"></div>
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full"></div>
              
              {/* Animated pulse */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Detection indicators */}
          {detected.slice(0, 5).map((obj, index) => (
            <div
              key={obj.id}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{
                top: `${20 + (index * 15)}%`,
                left: `${30 + (index * 10)}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SonarPanel;
