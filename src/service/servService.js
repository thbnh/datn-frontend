import axios from '../axios';

const getServiceInforApi = (
    serviceId,
    serviceName,
    servicePrice,
    serviceDescription,
) => {
    return axios.get('/api/service-information', {
        id: serviceId,
        serviceName: serviceName,
        price: servicePrice,
        description: serviceDescription,
    });
};

const handleAddServiceApi = (serviceName, servicePrice, serviceDescription) => {
    return axios.post('/api/add-service', {
        serviceName: serviceName,
        price: servicePrice,
        description: serviceDescription,
    })
}

const handleUpdateServiceApi = (serviceId, serviceData) => {
    return axios.put(`/api/update-service/${serviceId}`, serviceData);
};

const handleDeleteServiceApi = (serviceId) => {
    return axios.delete(`/api/delete-service/${serviceId}`)
};

export {
    getServiceInforApi,
    handleAddServiceApi,
    handleUpdateServiceApi,
    handleDeleteServiceApi,
}