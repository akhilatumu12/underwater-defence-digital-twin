import React from 'react';
import { Activity, Users, Ship, Fish, Bomb, Target } from 'lucide-react';

const StatsPanel = ({ environment, threats, stepCount }) => {
  const getObjectStats = () => {
    if (!environment) return { submarine: 0, diver: 0, fish: 0, mine: 0 };
    
    return {
      submarine: environment.object_types?.includes('submarine') ? 1 : 0,
      diver: environment.object_types?.includes('diver') ? 1 : 0,
      fish: environment.object_types?.includes('fish') ? 1 : 0,
      mine: environment.object_types?.includes('mine') ? 1 : 0,
    };
  };

  const getThreatStats = () => {
    const high = threats.filter(t => t.threat_level === 'HIGH').length;
    const medium = threats.filter(t => t.threat_level === 'MEDIUM').length;
    const low = threats.filter(t => t.threat_level === 'LOW').length;
    
    return { high, medium, low };
  };

  const objectStats = getObjectStats();
  const threatStats = getThreatStats();
  const totalRiskScore = threatStats.high * 100 + threatStats.medium * 50 + threatStats.low * 10;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-cyan-400" />
        System Statistics
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Simulation Step */}
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">{stepCount}</div>
          <div className="text-xs text-gray-400">Steps</div>
        </div>

        {/* Total Objects */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{environment?.object_count || 0}</div>
          <div className="text-xs text-gray-400">Objects</div>
        </div>

        {/* Total Threats */}
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{threats.length}</div>
          <div className="text-xs text-gray-400">Threats</div>
        </div>

        {/* Risk Score */}
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{totalRiskScore}</div>
          <div className="text-xs text-gray-400">Risk Score</div>
        </div>

        {/* Grid Size */}
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {environment?.grid_size?.width || 100}x{environment?.grid_size?.height || 100}
          </div>
          <div className="text-xs text-gray-400">Grid (m)</div>
        </div>

        {/* Detection Rate */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {environment?.object_count > 0 ? Math.round((threats.length / environment.object_count) * 100) : 0}%
          </div>
          <div className="text-xs text-gray-400">Detection</div>
        </div>
      </div>

      {/* Object Type Distribution */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Object Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Ship className="w-4 h-4 text-red-400" />
            <div>
              <div className="text-sm font-medium">Submarines</div>
              <div className="text-xs text-gray-400">{objectStats.submarine} active</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-sm font-medium">Divers</div>
              <div className="text-xs text-gray-400">{objectStats.diver} active</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Fish className="w-4 h-4 text-green-400" />
            <div>
              <div className="text-sm font-medium">Marine Life</div>
              <div className="text-xs text-gray-400">{objectStats.fish} active</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Bomb className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-sm font-medium">Mines</div>
              <div className="text-xs text-gray-400">{objectStats.mine} active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Level Distribution */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Threat Levels</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">High Threat</span>
              <span className="text-xs font-medium text-red-400">{threatStats.high}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${threats.length > 0 ? (threatStats.high / threats.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Medium Threat</span>
              <span className="text-xs font-medium text-orange-400">{threatStats.medium}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${threats.length > 0 ? (threatStats.medium / threats.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Low Threat</span>
              <span className="text-xs font-medium text-green-400">{threatStats.low}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${threats.length > 0 ? (threatStats.low / threats.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
