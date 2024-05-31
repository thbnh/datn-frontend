import axios from '../axios';

const getDetailInforApi = (
    detailId,
    serviceId,
    petId,
    userId,
    price,
    phoneNumber,
    time,
    date,
    startTime,
    endTime,
) => {
    return axios.get('/api/detail-information', {
        id: detailId,
        serviceId: serviceId,
        petId: petId,
        userId: userId,
        price: price,
        phoneNumber: phoneNumber,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

const handleAddDetailApi = (
    serviceId,
    petId,
    userId,
    price,
    phoneNumber,
    time,
    date,
    startTime,
    endTime,
) => {
    return axios.post('/api/add-detail', {
        serviceId: serviceId,
        petId: petId,
        userId: userId,
        price: price,
        phoneNumber: phoneNumber,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

const handleUpdateDetailApi = (detailId, detailData) => {
    return axios.put(`/api/update-detail/${detailId}`, detailData);
};

const handleGetDetailByUserIdApi = (userId) => {
    return axios.get(`/api/get-detail/${userId}`);
}

export { handleAddDetailApi, getDetailInforApi, handleGetDetailByUserIdApi, handleUpdateDetailApi };
