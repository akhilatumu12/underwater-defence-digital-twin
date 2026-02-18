import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Target, AlertTriangle } from 'lucide-react';

const AnalyticsPanel = ({ simulationData }) => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // This would fetch from API in real implementation
    if (simulationData) {
      setAnalytics({
        detectionRate: 0.85,
        threatDetectionRate: 0.92,
        falsePositiveRate: 0.05,
        systemUptime: simulationData.step * 2,
        averageDetectionTime: 1.2,
        sonarEfficiency: 0.88
      });
    }
  }, [simulationData]);

  const threatData = [
    { name: 'High Threat', value: 35, color: '#ef4444' },
    { name: 'Medium Threat', value: 25, color: '#f97316' },
    { name: 'Low Threat', value: 40, color: '#22c55e' }
  ];

  const performanceData = [
    { metric: 'Detection Rate', value: 85, fill: '#3b82f6' },
    { metric: 'Threat Detection', value: 92, fill: '#10b981' },
    { metric: 'System Efficiency', value: 88, fill: '#8b5cf6' },
    { metric: 'Accuracy', value: 95, fill: '#f59e0b' }
  ];

  const timeSeriesData = [
    { time: '00:00', detections: 2, threats: 1 },
    { time: '00:30', detections: 3, threats: 2 },
    { time: '01:00', detections: 1, threats: 0 },
    { time: '01:30', detections: 4, threats: 3 },
    { time: '02:00', detections: 2, threats: 1 },
    { time: '02:30', detections: 5, threats: 4 },
    { time: '03:00', detections: 3, threats: 2 }
  ];

  if (!analytics) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
          Performance Analytics
        </h2>
        <div className="text-center text-gray-400 py-8">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
        Performance Analytics
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Detection Rate</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {(analytics.detectionRate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Objects detected</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Threat Rate</span>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {(analytics.threatDetectionRate * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Threats identified</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Efficiency</span>
            <Activity className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {(analytics.sonarEfficiency * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">System performance</div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Uptime</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {Math.floor(analytics.systemUptime / 60)}m
          </div>
          <div className="text-xs text-gray-400">System running</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution Pie Chart */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-medium mb-4">Threat Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={threatData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {threatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-2">
            {threatData.map((item) => (
              <div key={item.name} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="mt-6 bg-slate-900 rounded-lg p-4 border border-slate-700">
        <h3 className="text-lg font-medium mb-4">Detection Timeline</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="detections" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="text-gray-400">Avg Detection Time</div>
          <div className="text-lg font-bold text-cyan-400">{analytics.averageDetectionTime}s</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400">False Positive Rate</div>
          <div className="text-lg font-bold text-yellow-400">{(analytics.falsePositiveRate * 100).toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400">Total Scans</div>
          <div className="text-lg font-bold text-purple-400">{simulationData?.step || 0}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400">System Status</div>
          <div className="text-lg font-bold text-green-400">Optimal</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
