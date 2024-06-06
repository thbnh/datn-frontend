import axios from '../axios';

const getBookingInforApi = (bookingId, serviceId, userId, petId, time, date, startTime, endTime) => {
    return axios.get('/api/booking-information', {
        id: bookingId,
        serviceId: serviceId,
        userId: userId,
        petId: petId,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

const handleAddBookingApi = (serviceId, userId, petId, time, date, startTime, endTime) => {
    return axios.post('/api/add-booking', {
        serviceId: serviceId,
        userId: userId,
        petId: petId,
        time: time,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
};

const handleUpdateBookingApi = (bookingtId, bookingData) => {
    return axios.put(`/api/update-booking/${bookingtId}`, bookingData);
};
const handleDeleteBookingApi = (bookingtId) => {
    return axios.delete(`/api/delete-booking/${bookingtId}`);
};

const getBookingByUserIdApi = (userId) => {
    return axios.get(`/api/get-booking/${userId}`);
};

export { getBookingInforApi, handleAddBookingApi, handleUpdateBookingApi, handleDeleteBookingApi, getBookingByUserIdApi };
