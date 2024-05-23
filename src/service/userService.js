import axios from '../axios';

const hanldeLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword,
    });
};

const handleSignupApi = (
    userEmail,
    userPassword,
    userFullName,
    userAddress,
    userGender,
    userPhoneNumber,
) => {
    return axios.post('/api/signup', {
        email: userEmail,
        password: userPassword,
        fullName: userFullName,
        address: userAddress,
        gender: userGender,
        phoneNumber: userPhoneNumber,
    });
};

const getUserInforApi = (
    userId,
    userEmail,
    userFullName,
    userAddress,
    userGender,
    userRoleId,
    userPhoneNumber,
) => {
    return axios.get('/api/user-information', {
        id: userId,
        email: userEmail,
        fullName: userFullName,
        address: userAddress,
        gender: userGender,
        roleId: userRoleId,
        phoneNumber: userPhoneNumber,
    });
};

const handleDeleteUserApi = (userId) => {
    return axios.delete(`/api/delete-user/${userId}`)
};

const handleUpdateUserApi = (userId, userData) => {
    return axios.put(`/api/update-user/${userId}`, userData);
};

export {
    hanldeLoginApi,
    handleSignupApi,
    getUserInforApi,
    handleDeleteUserApi,
    handleUpdateUserApi,
};
