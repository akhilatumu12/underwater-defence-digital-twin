import React from 'react';
import { Cloud, Thermometer, Eye, Sun, Moon } from 'lucide-react';

const EnvironmentalPanel = ({ environmentalData, onUpdate }) => {
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'clear':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case 'stormy':
        return <Cloud className="w-5 h-5 text-red-400" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getTimeIcon = (timeOfDay) => {
    return timeOfDay === 'day' ? 
      <Sun className="w-4 h-4 text-yellow-300" /> : 
      <Moon className="w-4 h-4 text-blue-300" />;
  };

  const getVisibilityColor = (visibility) => {
    if (visibility > 70) return 'text-green-400';
    if (visibility > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 18 && temp <= 22) return 'text-green-400';
    if (temp >= 15 && temp <= 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!environmentalData) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Cloud className="w-5 h-5 mr-2 text-blue-400" />
          Environmental Conditions
        </h2>
        <div className="text-center text-gray-400 py-8">
          Loading environmental data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 border border-gray-600 shadow-2xl w-80">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <Cloud className="w-4 h-4 mr-2 text-blue-400" />
          Environmental
        </h2>
        <button
          onClick={onUpdate}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-medium transition-colors"
        >
          Update
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Weather */}
        <div className="bg-gray-900 rounded-lg p-2 border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Weather</span>
            {getWeatherIcon(environmentalData.weather)}
          </div>
          <div className="text-sm font-bold capitalize">{environmentalData.weather}</div>
        </div>

        {/* Time of Day */}
        <div className="bg-gray-900 rounded-lg p-2 border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Time</span>
            {getTimeIcon(environmentalData.time_of_day)}
          </div>
          <div className="text-sm font-bold capitalize">{environmentalData.time_of_day}</div>
        </div>

        {/* Temperature */}
        <div className="bg-gray-900 rounded-lg p-2 border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Temp</span>
            <Thermometer className="w-3 h-3 text-orange-400" />
          </div>
          <div className={`text-sm font-bold ${getTemperatureColor(environmentalData.temperature)}`}>
            {environmentalData.temperature}°C
          </div>
        </div>

        {/* Visibility */}
        <div className="bg-gray-900 rounded-lg p-2 border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Visibility</span>
            <Eye className="w-3 h-3 text-cyan-400" />
          </div>
          <div className={`text-sm font-bold ${getVisibilityColor(environmentalData.visibility)}`}>
            {environmentalData.visibility}m
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalPanel;
