import axios from '../axios';

const getPetInforApi = (petId, petName, petType, petWeight, userId) => {
    return axios.get('/api/pet-information', {
        id: petId,
        petName: petName,
        petType: petType,
        petWeight: petWeight,
        userId: userId,
    });
};

const getPetsByUserIdApi = (userId) => {
    return axios.get(`/api/pet-user/${userId}`);
};

const handleAddPetApi = (petName, petType, petWeight, userId) => {
    return axios.post('/api/add-pet', {
        petName: petName,
        petType: petType,
        petWeight: petWeight,
        userId: userId,
    });
};

const handleUpdatePetApi = (petId, petData) => {
    return axios.put(`/api/update-pet/${petId}`, petData);
};

const handleDeletePetApi = (petId) => {
    return axios.delete(`/api/delete-pet/${petId}`)
};

export {
    getPetInforApi,
    handleAddPetApi,
    getPetsByUserIdApi,
    handleUpdatePetApi,
    handleDeletePetApi
};
