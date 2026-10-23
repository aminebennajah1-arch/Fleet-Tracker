import api from './api';

export const getVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const addVehicle = async (plate, model) => {
  const response = await api.post('/vehicles', { 
    plate: plate, 
    model: model,
    status: 'actif'
  });
  return response.data;
};

// Ajout de la fonction manquante pour faire disparaître l'erreur
export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

const vehicleService = {
  getVehicles,
  addVehicle,
  deleteVehicle
};

export default vehicleService;