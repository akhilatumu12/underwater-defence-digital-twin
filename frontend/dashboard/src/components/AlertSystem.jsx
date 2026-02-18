import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, X, Volume2, VolumeX } from 'lucide-react';

const AlertSystem = ({ threats, responses, onDismiss }) => {
  const [alerts, setAlerts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  useEffect(() => {
    // Generate alerts based on threats and responses
    const newAlerts = [];
    
    // High threat alerts
    threats.filter(t => t.threat_level === 'HIGH').forEach(threat => {
      newAlerts.push({
        id: `threat-${threat.id}`,
        type: 'threat',
        severity: 'high',
        title: 'High Threat Detected',
        message: `${threat.type} detected - Immediate attention required`,
        timestamp: new Date(),
        data: threat
      });
    });

    // Response alerts
    responses.filter(r => r.action.includes('ALERT')).forEach(response => {
      newAlerts.push({
        id: `response-${response.action}`,
        type: 'response',
        severity: 'medium',
        title: 'Defence Response Activated',
        message: response.action,
        timestamp: new Date(),
        data: response
      });
    });

    // Add new alerts that don't already exist
    setAlerts(prev => {
      const existingIds = prev.map(a => a.id);
      const uniqueNewAlerts = newAlerts.filter(a => !existingIds.includes(a.id));
      return [...uniqueNewAlerts, ...prev].slice(0, 10); // Keep only last 10 alerts
    });

  }, [threats, responses]);

  useEffect(() => {
    // Play sound for high severity alerts
    if (soundEnabled) {
      const highSeverityAlerts = alerts.filter(a => a.severity === 'high');
      if (highSeverityAlerts.length > 0) {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    }
  }, [alerts, soundEnabled]);

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    if (onDismiss) onDismiss(alertId);
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    if (onDismiss) onDismiss('all');
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/10 text-red-400';
      case 'medium':
        return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'low':
        return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'threat':
        return <AlertTriangle className="w-4 h-4" />;
      case 'response':
        return <Bell className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  if (!showNotifications || alerts.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowNotifications(true)}
          className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg border border-slate-600 transition-colors"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-hidden">
      {/* Alert Header */}
      <div className="bg-slate-800 border border-slate-600 rounded-t-lg p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium">Alert System</span>
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {alerts.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1 rounded transition-colors ${
              soundEnabled ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-gray-300'
            }`}
            title={soundEnabled ? 'Mute alerts' : 'Unmute alerts'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={clearAllAlerts}
            className="text-gray-400 hover:text-white transition-colors"
            title="Clear all alerts"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowNotifications(false)}
            className="text-gray-400 hover:text-white transition-colors"
            title="Hide notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-slate-900 border-x border-b border-slate-600 rounded-b-lg max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            No active alerts
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getAlertColor(alert.severity)} transition-all duration-300 animate-pulse`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{alert.title}</div>
                      <div className="text-xs opacity-80 mt-1">{alert.message}</div>
                      <div className="text-xs opacity-60 mt-1">
                        {formatTime(alert.timestamp)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertSystem;
