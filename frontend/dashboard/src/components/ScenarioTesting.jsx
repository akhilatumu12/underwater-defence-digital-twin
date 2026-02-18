import React, { useState } from 'react';
import { Play, RotateCcw, Save, Upload, Target, Zap, Shield } from 'lucide-react';

const ScenarioTesting = ({ onScenarioLoad, onScenarioSave }) => {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Submarine Attack',
      description: 'Multiple submarines approaching from different directions',
      objects: [
        { type: 'submarine', x: 10, y: 20, speed: 2.5 },
        { type: 'submarine', x: 90, y: 80, speed: 2.0 },
        { type: 'submarine', x: 50, y: 10, speed: 3.0 }
      ],
      sonarConfig: { x: 50, y: 50, range: 40 }
    },
    {
      id: 2,
      name: 'Mine Field',
      description: 'Dense mine field with diver intrusion',
      objects: [
        { type: 'mine', x: 30, y: 30, speed: 0 },
        { type: 'mine', x: 35, y: 35, speed: 0 },
        { type: 'mine', x: 40, y: 30, speed: 0 },
        { type: 'mine', x: 45, y: 35, speed: 0 },
        { type: 'diver', x: 20, y: 50, speed: 1.0 }
      ],
      sonarConfig: { x: 50, y: 50, range: 30 }
    },
    {
      id: 3,
      name: 'Marine Life Confusion',
      description: 'Large school of fish hiding potential threats',
      objects: [
        { type: 'fish', x: 25, y: 25, speed: 1.5 },
        { type: 'fish', x: 30, y: 30, speed: 1.2 },
        { type: 'fish', x: 35, y: 25, speed: 1.8 },
        { type: 'fish', x: 40, y: 30, speed: 1.0 },
        { type: 'submarine', x: 50, y: 50, speed: 2.0 }
      ],
      sonarConfig: { x: 50, y: 50, range: 35 }
    },
    {
      id: 4,
      name: 'Coordinated Attack',
      description: 'Simultaneous submarine and diver attack',
      objects: [
        { type: 'submarine', x: 15, y: 15, speed: 2.5 },
        { type: 'diver', x: 85, y: 15, speed: 1.2 },
        { type: 'diver', x: 85, y: 85, speed: 1.0 },
        { type: 'mine', x: 50, y: 50, speed: 0 }
      ],
      sonarConfig: { x: 50, y: 50, range: 45 }
    }
  ]);

  const [customScenario, setCustomScenario] = useState({
    name: '',
    description: '',
    objects: [],
    sonarConfig: { x: 50, y: 50, range: 30 }
  });

  const [showCustomForm, setShowCustomForm] = useState(false);

  const loadScenario = (scenario) => {
    if (onScenarioLoad) {
      onScenarioLoad(scenario);
    }
  };

  const saveCustomScenario = () => {
    if (customScenario.name && customScenario.objects.length > 0) {
      const newScenario = {
        ...customScenario,
        id: Date.now()
      };
      setScenarios([...scenarios, newScenario]);
      if (onScenarioSave) {
        onScenarioSave(newScenario);
      }
      setCustomScenario({
        name: '',
        description: '',
        objects: [],
        sonarConfig: { x: 50, y: 50, range: 30 }
      });
      setShowCustomForm(false);
    }
  };

  const addObjectToCustom = (type) => {
    const newObject = {
      type,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      speed: type === 'mine' ? 0 : Math.random() * 2 + 0.5
    };
    setCustomScenario({
      ...customScenario,
      objects: [...customScenario.objects, newObject]
    });
  };

  const removeObjectFromCustom = (index) => {
    setCustomScenario({
      ...customScenario,
      objects: customScenario.objects.filter((_, i) => i !== index)
    });
  };

  const getScenarioIcon = (name) => {
    if (name.toLowerCase().includes('submarine')) return <Target className="w-4 h-4" />;
    if (name.toLowerCase().includes('mine')) return <Zap className="w-4 h-4" />;
    if (name.toLowerCase().includes('marine')) return <Shield className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Play className="w-5 h-5 mr-2 text-purple-400" />
          What-If Scenarios
        </h2>
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
        >
          <Save className="w-4 h-4" />
          <span>Create Scenario</span>
        </button>
      </div>

      {/* Predefined Scenarios */}
      <div className="space-y-3 mb-4">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="p-4 bg-slate-900 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getScenarioIcon(scenario.name)}
                  <h3 className="font-medium">{scenario.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">{scenario.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Objects: {scenario.objects.length}</span>
                  <span>Sonar Range: {scenario.sonarConfig.range}m</span>
                  <div className="flex space-x-1">
                    {Array.from(new Set(scenario.objects.map(o => o.type))).map(type => (
                      <span key={type} className="px-2 py-1 bg-slate-800 rounded text-xs capitalize">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => loadScenario(scenario)}
                className="ml-4 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <Play className="w-4 h-4" />
                <span>Load</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scenario Form */}
      {showCustomForm && (
        <div className="p-4 bg-slate-900 rounded-lg border border-purple-500">
          <h3 className="font-medium mb-3">Create Custom Scenario</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Scenario Name</label>
              <input
                type="text"
                value={customScenario.name}
                onChange={(e) => setCustomScenario({...customScenario, name: e.target.value})}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                placeholder="Enter scenario name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={customScenario.description}
                onChange={(e) => setCustomScenario({...customScenario, description: e.target.value})}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                placeholder="Describe the scenario"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Add Objects</label>
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => addObjectToCustom('submarine')}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
                >
                  + Submarine
                </button>
                <button
                  onClick={() => addObjectToCustom('mine')}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs transition-colors"
                >
                  + Mine
                </button>
                <button
                  onClick={() => addObjectToCustom('diver')}
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-xs transition-colors"
                >
                  + Diver
                </button>
                <button
                  onClick={() => addObjectToCustom('fish')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                >
                  + Fish
                </button>
              </div>

              {customScenario.objects.length > 0 && (
                <div className="space-y-1">
                  {customScenario.objects.map((obj, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-slate-800 p-2 rounded">
                      <span className="capitalize">
                        {obj.type} at ({obj.x}, {obj.y}) - Speed: {obj.speed.toFixed(1)}
                      </span>
                      <button
                        onClick={() => removeObjectFromCustom(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={saveCustomScenario}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>Save Scenario</span>
              </button>
              <button
                onClick={() => setShowCustomForm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioTesting;
