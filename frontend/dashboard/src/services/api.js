import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  // Environment endpoints
  getEnvironment: () => api.get('/environment').then(res => res.data),
  getEnvironmentalData: () => api.get('/environmental').then(res => res.data),
  updateEnvironmental: () => api.post('/environmental/update').then(res => res.data),
  
  // Objects endpoints
  getObjects: () => api.get('/objects').then(res => res.data),
  addObject: (objType) => api.post(`/objects/add?obj_type=${objType}`).then(res => res.data),
  addObjectAtPosition: (objType, x, y) => 
    api.post(`/objects/add/at-position?obj_type=${objType}&x=${x}&y=${y}`).then(res => res.data),
  removeObject: (objId) => api.delete(`/objects/${objId}`).then(res => res.data),
  getObjectDetails: (objId) => api.get(`/objects/${objId}/details`).then(res => res.data),
  
  // Sonar endpoints
  getSonarConfig: () => api.get('/sonar').then(res => res.data),
  getSonarStatus: () => api.get('/sonar/status').then(res => res.data),
  configureSonar: (x, y, range) => 
    api.post(`/sonar/configure?x=${x}&y=${y}&range_radius=${range}`).then(res => res.data),
  configureSonarAdvanced: (config) => 
    api.post('/sonar/configure/advanced', config).then(res => res.data),
  pingSonar: () => api.post('/sonar/ping').then(res => res.data),
  
  // Simulation endpoints
  stepSimulation: () => api.get('/simulation/step').then(res => res.data),
  resetSimulation: () => api.get('/simulation/reset').then(res => res.data),
  getHistory: (limit = 10) => api.get(`/history?limit=${limit}`).then(res => res.data),
  exportSimulation: () => api.get('/simulation/export').then(res => res.data),
  loadSimulationState: (state) => api.post('/simulation/load-state', state).then(res => res.data),
  
  // Threat endpoints
  getThreats: () => api.get('/threats').then(res => res.data),
  
  // Defence endpoints
  getDefenceResponse: () => api.get('/defence').then(res => res.data),
  
  // Analytics endpoints
  getPerformanceAnalytics: () => api.get('/analytics/performance').then(res => res.data),
  
  // Health check
  healthCheck: () => api.get('/health').then(res => res.data),
};
