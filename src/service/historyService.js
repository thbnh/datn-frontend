import axios from "axios";

const handleAddHistoryApi = (
    serviceId,
    petId,
    userId,
    price,
    phoneNumber,
    time,
    date,
) => {
    return axios.post('/api/add-history', {
        serviceId: serviceId,
        petId: petId,
        userId: userId,
        price: price,
        phoneNumber: phoneNumber,
        time: time,
        date: date,
    });
};

export {handleAddHistoryApi}