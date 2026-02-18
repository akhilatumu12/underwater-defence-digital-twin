import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

const ThreatPanel = ({ threats }) => {
  const getThreatIcon = (level) => {
    switch (level) {
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'MEDIUM':
        return <Shield className="w-5 h-5 text-orange-500" />;
      case 'LOW':
        return <Activity className="w-5 h-5 text-green-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'HIGH':
        return 'border-red-500 bg-red-500/10';
      case 'MEDIUM':
        return 'border-orange-500 bg-orange-500/10';
      case 'LOW':
        return 'border-green-500 bg-green-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const highThreats = threats.filter(t => t.threat_level === 'HIGH');
  const mediumThreats = threats.filter(t => t.threat_level === 'MEDIUM');
  const lowThreats = threats.filter(t => t.threat_level === 'LOW');
  const riskScore = highThreats.length * 100 + mediumThreats.length * 50 + lowThreats.length * 10;

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl w-80">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-orange-400" />
          Threats
        </h2>
        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
          riskScore > 70 ? 'bg-red-600 text-white' :
          riskScore > 40 ? 'bg-orange-600 text-white' :
          'bg-green-600 text-white'
        }`}>
          {riskScore}% Risk
        </div>
      </div>

      {/* Threat Summary */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center p-2 bg-slate-900 rounded-lg border border-slate-700">
          <div className="text-lg font-bold text-red-400">{highThreats.length}</div>
          <div className="text-xs text-gray-400">High</div>
        </div>
        <div className="text-center p-2 bg-slate-900 rounded-lg border border-slate-700">
          <div className="text-lg font-bold text-orange-400">{mediumThreats.length}</div>
          <div className="text-xs text-gray-400">Medium</div>
        </div>
        <div className="text-center p-2 bg-slate-900 rounded-lg border border-slate-700">
          <div className="text-lg font-bold text-green-400">{lowThreats.length}</div>
          <div className="text-xs text-gray-400">Low</div>
        </div>
      </div>

      {/* Threat List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {threats.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No threats detected
          </div>
        ) : (
          threats.map(threat => (
            <div key={threat.id} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  threat.threat_level === 'HIGH' ? 'bg-red-500' :
                  threat.threat_level === 'MEDIUM' ? 'bg-orange-500' :
                  'bg-green-500'
                }`} />
                <span className="text-sm font-medium capitalize">{threat.type}</span>
                <span className="text-xs text-gray-400">#{threat.id}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                threat.threat_level === 'HIGH' ? 'bg-red-600 text-white' :
                threat.threat_level === 'MEDIUM' ? 'bg-orange-600 text-white' :
                'bg-green-600 text-white'
              }`}>
                {threat.threat_level}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ThreatPanel;
