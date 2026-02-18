import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const DefenceResponse = ({ responses }) => {
  const getResponseIcon = (action) => {
    if (action.includes('ALERT') || action.includes('WARNING')) {
      return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    } else if (action.includes('DEPLOY') || action.includes('ENGAGE')) {
      return <Shield className="w-4 h-4 text-red-500" />;
    } else if (action.includes('MONITOR') || action.includes('TRACK')) {
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    } else {
      return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getResponseColor = (action) => {
    if (action.includes('ALERT') || action.includes('WARNING')) {
      return 'border-orange-500 bg-orange-500/10';
    } else if (action.includes('DEPLOY') || action.includes('ENGAGE')) {
      return 'border-red-500 bg-red-500/10';
    } else if (action.includes('MONITOR') || action.includes('TRACK')) {
      return 'border-blue-500 bg-blue-500/10';
    } else {
      return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-400 bg-red-500/20 border border-red-500/30';
      case 'MEDIUM':
        return 'text-orange-400 bg-orange-500/20 border border-orange-500/30';
      case 'LOW':
        return 'text-green-400 bg-green-500/20 border border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border border-gray-500/30';
    }
  };

  return (
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl w-80">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center">
          <Shield className="w-4 h-4 mr-2 text-green-400" />
          Defence Response
        </h2>
        <div className="px-2 py-1 bg-green-600 text-white rounded-lg text-xs font-bold">
          {responses.length} Active
        </div>
      </div>

      {/* Response Summary */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Immediate</div>
          <div className="text-sm font-bold text-red-400">
            {responses.filter(r => r.priority === 'HIGH').length}
          </div>
        </div>
        <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
          <div className="text-xs text-gray-400">Monitoring</div>
          <div className="text-sm font-bold text-yellow-400">
            {responses.filter(r => r.priority === 'MEDIUM').length}
          </div>
        </div>
      </div>

      {/* Response List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {responses.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No defence actions required
          </div>
        ) : (
          responses.map(response => (
            <div key={response.id} className="p-2 bg-slate-900 rounded-lg border border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium capitalize">{response.type}</span>
                    <span className="text-xs text-gray-400">#{response.id}</span>
                  </div>
                  <div className="text-xs text-gray-300">{response.action}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  response.priority === 'HIGH' ? 'bg-red-600 text-white' :
                  response.priority === 'MEDIUM' ? 'bg-orange-600 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {response.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-sm text-gray-400 mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-medium transition-colors">
            Deploy Countermeasures
          </button>
          <button className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-xs font-medium transition-colors">
            Send Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefenceResponse;
