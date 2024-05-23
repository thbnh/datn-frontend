import axios from '../axios';

const getBookingInforApi = (bookingId, serviceId, ownerId, petId, time, date, startTime, endTime) => {
    return axios.get('/api/pet-information', {
        id: bookingId,
        serviceId: serviceId,
        userId: ownerId,
        petId: petId,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

const handleAddBookingApi = (serviceId, ownerId, petId, time, date, startTime, endTime) => {
    return axios.post('/api/add-booking', {
        serviceId: serviceId,
        userId: ownerId,
        petId: petId,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

export {
    getBookingInforApi,
    handleAddBookingApi
}