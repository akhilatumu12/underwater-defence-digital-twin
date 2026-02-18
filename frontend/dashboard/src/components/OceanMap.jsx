import React from 'react';
import { Radar, AlertTriangle, Ship, User, Fish, Bomb } from 'lucide-react';

const OceanMap = ({ objects, sonarConfig, threats, predictions, fullScreen = false }) => {
  const gridSize = 100;
  const cellSize = fullScreen ? 6 : 4;

  const getThreatLevel = (objectId) => {
    const threat = threats.find(t => t.id === objectId);
    return threat?.threat_level || 'UNKNOWN';
  };

  const getObjectIcon = (type, threatLevel) => {
    const iconClass = fullScreen ? "w-4 h-4" : "w-3 h-3";
    const threatClass = threatLevel === 'HIGH' ? 'text-red-500' : 
                       threatLevel === 'MEDIUM' ? 'text-orange-500' : 
                       threatLevel === 'LOW' ? 'text-green-500' : 'text-gray-500';

    switch (type) {
      case 'submarine':
        return <Ship className={`${iconClass} ${threatClass}`} />;
      case 'diver':
        return <User className={`${iconClass} ${threatClass}`} />;
      case 'fish':
        return <Fish className={`${iconClass} ${threatClass}`} />;
      case 'mine':
        return <Bomb className={`${iconClass} ${threatClass}`} />;
      default:
        return <AlertTriangle className={`${iconClass} ${threatClass}`} />;
    }
  };

  const renderObject = (obj, isPrediction = false) => {
    const x = (obj.x / gridSize) * 100;
    const y = (obj.y / gridSize) * 100;
    const threatLevel = getThreatLevel(obj.id);
    
    return (
      <div
        key={`${obj.id}-${isPrediction ? 'pred' : 'real'}`}
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          isPrediction ? 'opacity-50' : ''
        }`}
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
      >
        <div className={`relative ${
          threatLevel === 'HIGH' ? 'threat-high' :
          threatLevel === 'MEDIUM' ? 'threat-medium' :
          threatLevel === 'LOW' ? 'threat-low' : ''
        } p-1 rounded-full`}>
          {getObjectIcon(obj.type, threatLevel)}
          {isPrediction && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          )}
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap">
          {obj.type} {isPrediction && '(pred)'}
        </div>
      </div>
    );
  };

  return (
    <div className={`${fullScreen ? 'w-full h-full' : 'bg-slate-800 rounded-xl p-6 border border-slate-700'}`}>
      {/* Header */}
      {!fullScreen && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Radar className="w-5 h-5 mr-2 text-blue-400" />
            Ocean Map
          </h2>
          <div className="text-sm text-gray-400">
            Grid: {gridSize}x{gridSize}m
          </div>
        </div>
      )}
      
      <div className="relative ocean-grid bg-slate-900 rounded-lg overflow-hidden" style={{ height: fullScreen ? '100%' : '400px' }}>
        {/* Sonar Range */}
        {sonarConfig && (
          <div
            className="absolute sonar-range rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(sonarConfig.position.x / gridSize) * 100}%`,
              top: `${(sonarConfig.position.y / gridSize) * 100}%`,
              width: `${(sonarConfig.range / gridSize) * 100 * 2}%`,
              height: `${(sonarConfig.range / gridSize) * 100 * 2}%`,
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Radar className="w-6 h-6 text-green-400" />
            </div>
          </div>
        )}
        
        {/* Objects */}
        {objects.map(obj => renderObject(obj))}
        
        {/* Predictions */}
        {predictions.map(pred => renderObject(pred, true))}
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid grid-cols-10 grid-rows-10 h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-slate-800 border-opacity-30"></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <div>Grid Size: {gridSize}x{gridSize} meters</div>
        <div>Active Objects: {objects.length}</div>
        <div>Predictions: {predictions.length}</div>
      </div>
    </div>
  );
};

export default OceanMap;
