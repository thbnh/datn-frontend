import './admin.scss';
import Buttons from '../../Components/Button/button';
import {
    getUserInforApi,
    handleDeleteUserApi,
    handleSignupApi,
    handleUpdateUserApi,
} from '../../service/userService';
import {
    getServiceInforApi,
    handleAddServiceApi,
    handleDeleteServiceApi,
    handleUpdateServiceApi,
} from '../../service/servService';
import {
    getPetInforApi,
    handleDeletePetApi,
    handleUpdatePetApi,
} from '../../service/petService';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCheck,
    faPaw,
    faPen,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import {
    getBookingInforApi,
    handleDeleteBookingApi,
    handleUpdateBookingApi,
} from '../../service/booking';
import bcrypt from 'bcryptjs';
import {
    getDetailInforApi,
    handleAddDetailApi,
} from '../../service/detailService';

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

function Admin() {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [details, setDetails] = useState([]);

    const [valueUser, setValueUser] = useState(null);
    const [valuePet, setValuePet] = useState(null);
    const [valueService, setValueService] = useState(null);
    const [valueBooking, setValueBooking] = useState(null);

    const [activeTable, setActiveTable] = useState('');
    const [newUser, setNewUser] = useState({
        id: '',
        email: '',
        password: '',
        fullName: '',
        address: '',
        gender: '',
        phoneNumber: '',
        roleId: '',
    });
    const [newService, setNewService] = useState({
        serviceName: '',
        price: '',
        description: '',
    });
    const [newDetail, setNewDetail] = useState({
        serviceId: '',
        petId: '',
        userId: '',
        price: '',
        phoneNumber: '',
        time: '',
        date: '',
        startTime: '',
        endTime: '',
    });
    // Trạng thái để hiển thị Edit form
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    const [showEditPetForm, setShowEditPetForm] = useState(false);
    const [showEditServiceForm, setShowEditServiceForm] = useState(false);
    const [showEditBookingForm, setShowEditBookingForm] = useState(false);
    // Trạng thái để hiển thị Create form
    const [showUserForm, setShowUserForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [showDetailForm, setShowDetailForm] = useState(false);

    const [servicePrice, setServicePrice] = useState('');
    const [userPhone, setUserPhone] = useState('');
    // Sự kiện đóng mở bảng dữ liệu
    const handleShowTable = (table) => {
        setActiveTable(activeTable === table ? '' : table);
    };
    // Sự kiện hiển thị các Edit form
    const handleShowEditUserForm = () => {
        setShowEditUserForm(!showEditUserForm);
    };
    const handleShowEditPetForm = () => {
        setShowEditPetForm(!showEditPetForm);
    };
    const handleShowEditServiceForm = () => {
        setShowEditServiceForm(!showEditServiceForm);
    };
    const handleShowEditBookingForm = () => {
        setShowEditBookingForm(!showEditBookingForm);
    };
    // Sự kiện hiển thị các Create form
    const handleShowUserForm = () => {
        setShowUserForm(!showUserForm);
    };
    const handleShowServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    };
    const handleShowDetailForm = () => {
        setShowDetailForm(!showDetailForm);
    };

    const editUserFormRef = useRef(null);
    const editPetFormRef = useRef(null);
    const editServiceFormRef = useRef(null);
    const editBookingFormRef = useRef(null);
    const userFormRef = useRef(null);
    const serviceFormRef = useRef(null);
    const detailFormRef = useRef(null);

    // Sư kiện Click ra ngoài thoát overlay
    const handleOutClick = (event) => {
        if (
            serviceFormRef.current &&
            !serviceFormRef.current.contains(event.target)
        ) {
            setShowServiceForm(false);
        }
        if (
            userFormRef.current &&
            !userFormRef.current.contains(event.target)
        ) {
            setShowUserForm(false);
        }
        if (
            detailFormRef.current &&
            !detailFormRef.current.contains(event.target)
        ) {
            setShowDetailForm(false);
        }
        if (
            editUserFormRef.current &&
            !editUserFormRef.current.contains(event.target)
        ) {
            setShowEditUserForm(false);
        }
        if (
            editPetFormRef.current &&
            !editPetFormRef.current.contains(event.target)
        ) {
            setShowEditPetForm(false);
        }
        if (
            editServiceFormRef.current &&
            !editServiceFormRef.current.contains(event.target)
        ) {
            setShowEditServiceForm(false);
        }
        if (
            editBookingFormRef.current &&
            !editBookingFormRef.current.contains(event.target)
        ) {
            setShowEditBookingForm(false);
        }
    };
    // Thay đổi dữ liệu khi nhập input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValueUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setValuePet((prevPet) => ({
            ...prevPet,
            [name]: value,
        }));
        setValueService((prevSer) => ({
            ...prevSer,
            [name]: value,
        }));
        setValueBooking((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
        setNewDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value,
        }));
    };
    // Sự kiện thêm dữ liệu vào from
    const handleValueUser = (user) => {
        setValueUser(user);
        setShowEditUserForm(true);
    };
    const handleValuePet = (pet) => {
        setValuePet(pet);
        setShowEditPetForm(true);
    };
    const handleValueService = (service) => {
        setValueService(service);
        setShowEditServiceForm(true);
    };
    const handleValueBooking = (booking) => {
        setValueBooking(booking);
        setShowEditBookingForm(true);
    };
    const handleValueBookingFrom = (booking) => {
        setValueBooking(booking);
        const service = services.find(
            (service) => service.id === booking.serviceId,
        );
        if (service) {
            setServicePrice(service.price);
        }
        const user = users.find((user) => user.id === booking.userId);
        if (user) {
            setUserPhone(user.phoneNumber);
        }
        setShowDetailForm(true);
    };
    const getUserFullName = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.fullName : 'N/A';
    };
    // Lấy tên vật nuôi từ id
    const getPetName = (petId) => {
        const pet = pets.find((pet) => pet.id === petId);
        return pet ? pet.petName : 'N/A';
    };
    // Lấy tên dịch vụ từ id
    const getServiceName = (serviceId) => {
        const service = services.find((service) => service.id === serviceId);
        return service ? service.serviceName : 'N/A';
    };
    // User
    useEffect(() => {
        const getUserInfor = async () => {
            try {
                const userData = await getUserInforApi();
                setUsers(userData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        };

        getUserInfor();
    }, []);

    const handleAddUser = async () => {
        try {
            const hashedPassword = await hashPassword(newUser.password);
            let data = await handleSignupApi(
                newUser.email,
                hashedPassword,
                newUser.fullName,
                newUser.address,
                newUser.gender,
                newUser.phoneNumber,
                newUser.roleId,
            );
            if (data && data.status === 200) {
                console.log('Thêm người dùng thành công');
                toast.success('Thêm người dùng thành công!');
            } else {
                console.error('Thêm người dùng thất bại:', data?.data?.message);
                toast.error('Thêm người dùng thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm người dùng:', error);
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const data = await handleDeleteUserApi(userId);
            if (data.status === '200') {
                setUsers(users.filter((user) => user.id !== userId));
                toast.success(`${data.errMessage}`);
            } else {
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            toast.error('Đã xảy ra lỗi khi xóa người dùng');
        }
    };

    const handleUpdateUser = async () => {
        try {
            const data = await handleUpdateUserApi(valueUser.id, valueUser);
            if (data.status === '200') {
                setUsers(
                    users.map((user) =>
                        user.id === valueUser.id ? valueUser : user,
                    ),
                );
                setShowEditUserForm(false);
                toast.success('Cập nhật thông tin người dùng thành công');
            } else {
                toast.error(`Cập nhật không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật người dùng');
        }
    };
    // Service
    useEffect(() => {
        const getServiceInfor = async () => {
            try {
                const serviceData = await getServiceInforApi();
                setServices(serviceData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
            }
        };
        getServiceInfor();
    }, []);

    const handleAddService = async () => {
        try {
            const data = await handleAddServiceApi(
                newService.serviceName,
                newService.price,
                newService.description,
            );
            if (data && data.status === '200') {
                console.log('Thêm thành công');
                toast.success('Thêm thành công!');
                handleShowServiceForm();
            } else {
                console.error('Thêm thất bại:', data?.data?.errMessage);
                toast.error('Thêm thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm dịch vụ:', error);
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    const handleUpdateService = async () => {
        try {
            const data = await handleUpdateServiceApi(
                valueService.id,
                valueService,
            );
            if (data.status === '200') {
                setServices(
                    services.map((service) =>
                        service.id === valueService.id ? valueService : service,
                    ),
                );
                setShowEditServiceForm(false);
                toast.success('Cập nhật thông tin dịch vụ thành công');
            } else {
                toast.error(`Cập nhật không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dịch vụ:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật dịch vụ');
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            const data = await handleDeleteServiceApi(serviceId);
            if (data.status === '200') {
                setServices(
                    services.filter((service) => service.id !== serviceId),
                );
                toast.success(`${data.errMessage}`);
            } else {
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi xóa dịch vụ:', error);
            toast.error('Đã xảy ra lỗi khi xóa dịch vụ');
        }
    };
    // Pet
    useEffect(() => {
        const getPetInfor = async () => {
            try {
                const petData = await getPetInforApi();
                setPets(petData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu thú nuôi:', error);
            }
        };
        getPetInfor();
    }, []);

    const handleUpdatePet = async () => {
        try {
            const data = await handleUpdatePetApi(valuePet.id, valuePet);
            console.log(data);
            if (data.status === '200') {
                setPets(
                    pets.map((pet) =>
                        pet.id === valuePet.id ? valuePet : pet,
                    ),
                );
                setShowEditPetForm(false);
                toast.success('Cập nhật thông tin vật nuôi thành công');
            } else {
                toast.error(`Cập nhật không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật vật nuôi:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật vật nuôi');
        }
    };

    const handleDeletePet = async (petId) => {
        try {
            const data = await handleDeletePetApi(petId);
            if (data.status === '200') {
                setPets(pets.filter((pet) => pet.id !== petId));
                toast.success(`${data.errMessage}`);
            } else {
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi xóa Vật nuôi:', error);
            toast.error('Đã xảy ra lỗi khi xóa Vật nuôi');
        }
    };
    // Booking
    useEffect(() => {
        const getBookingInfor = async () => {
            try {
                const bookingData = await getBookingInforApi();
                setBookings(bookingData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đặt lịch:', error);
            }
        };
        getBookingInfor();
    }, []);

    const handleUpdateBooking = async () => {
        try {
            const data = await handleUpdateBookingApi(
                valueBooking.id,
                valueBooking,
            );
            if (data.status === '200') {
                setBookings(
                    bookings.map((booking) =>
                        booking.id === valueBooking.id ? valueBooking : booking,
                    ),
                );
                setShowEditBookingForm(false);
                toast.success('Cập nhật thông tin đặt lịch hẹn thành công');
            } else {
                toast.error(`Cập nhật không thành công: ${data.errMessage}`);
            }
        } catch (error) {}
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            const data = await handleDeleteBookingApi(bookingId);
            if (data.status === '200') {
                setBookings(
                    bookings.filter((booking) => booking.id !== bookingId),
                );
                toast.success(`${data.errMessage}`);
            } else {
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi xóa lịch hẹn:', error);
            toast.error('Đã xảy ra lỗi khi xóa lịch hẹn');
        }
    };
    // Detail
    useEffect(() => {
        const getDetailInfor = async () => {
            try {
                const detailData = await getDetailInforApi();
                setDetails(detailData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu chi tiết dịch vụ:', error);
            }
        };
        getDetailInfor();
    }, []);
    const handleAddDetail = async () => {
        try {
            const data = await handleAddDetailApi(
                (newDetail.serviceId = valueBooking.serviceId),
                (newDetail.petId = valueBooking.petId),
                (newDetail.userId = valueBooking.userId),
                (newDetail.price = servicePrice),
                (newDetail.phoneNumber = userPhone),
                (newDetail.time = valueBooking.time),
                (newDetail.date = valueBooking.date),
                (newDetail.startTime = valueBooking.startTime),
                (newDetail.endTime = valueBooking.endTime),
            );
            if (data && data.status === '200') {
                console.log('Đặt thành công');
                toast.success('Đặt thành công!');
                handleShowDetailForm();
            } else {
                console.error('Đặt thất bại:', data?.data?.errMessage);
                toast.error('Đặt thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi đặt dịch vụ:', error);
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };
    // Hàm để tạo các ngày trong tuần
    const generateDateOptions = () => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            days.push(day.toISOString().split('T')[0]); // Lấy định dạng yyyy-mm-dd
        }
        return days.map((date) => (
            <option key={date} value={date}>
                {date}
            </option>
        ));
    };
    // Hàm để tạo các giờ trong ngày
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 8; hour < 22; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(
                    minute,
                ).padStart(2, '0')}:00`;
                times.push(time);
            }
        }
        return times;
    };
    // Hàm để tạo giờ kết thúc với đk lớn hơn giờ bắt đầu
    const generateEndTimeOptions = (startTime) => {
        if (!startTime) return [];
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const times = generateTimeOptions();
        return times.filter((time) => {
            const [hour, minute] = time.split(':').map(Number);
            return (
                hour > startHour || (hour === startHour && minute > startMinute)
            );
        });
    };

    return (
        <div onClick={handleOutClick} className="wrapper-content">
            <div
                className="content-admin"
                style={{
                    display:
                        showEditUserForm ||
                        showEditPetForm ||
                        showEditServiceForm ||
                        showEditBookingForm ||
                        showUserForm ||
                        showServiceForm ||
                        showDetailForm
                            ? 'none'
                            : 'flex',
                }}
            >
                <div className="content-left col-3">
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('user')}
                    >
                        Thông tin người dùng
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('pet')}
                    >
                        Thông tin thú cưng
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('service')}
                    >
                        Thông tin dịch vụ
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('booking')}
                    >
                        Thông tin dịch vụ được đặt
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('bkdetail')}
                    >
                        Thông tin chi tiết dịch vụ
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('history')}
                    >
                        Lịch sử đặt dịch vụ
                    </Buttons>
                </div>
                <ToastContainer />
                <div className="content-right col-9">
                    {activeTable === 'user' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Mã người dùng</th>
                                        <th>Email</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Quyền</th>
                                        <th>Số điện thoại</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                {user.gender ? 'Nữ' : 'Nam'}
                                            </td>
                                            <td>
                                                {user.roleId === '0'
                                                    ? 'Admin'
                                                    : user.roleId === '1'
                                                    ? 'Nhân viên'
                                                    : user.roleId === '2' ||
                                                      user.roleId === null
                                                    ? 'Người dùng'
                                                    : user.roleId}
                                            </td>
                                            <td>{user.phoneNumber}</td>
                                            <td
                                                style={{
                                                    padding: '0',
                                                    display: 'flex',
                                                    width: '100%',
                                                    border: 'none',
                                                }}
                                            >
                                                <Buttons
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleValueUser(user)
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    }
                                                >
                                                    Sửa
                                                </Buttons>
                                                <Buttons
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user.id,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                        />
                                                    }
                                                >
                                                    Xóa
                                                </Buttons>
                                                <Buttons
                                                    className="add-btn"
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPaw}
                                                        />
                                                    }
                                                >
                                                    Thêm
                                                </Buttons>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <>
                                <Buttons
                                    className="create-service"
                                    onClick={handleShowUserForm}
                                >
                                    Thêm người dùng
                                </Buttons>
                            </>
                        </>
                    )}
                    {activeTable === 'pet' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Mã thú nuôi</th>
                                        <th>Tên thú nuôi</th>
                                        <th>Loài</th>
                                        <th>Cân nặng (kg)</th>
                                        <th>Mã người dùng</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet.id}>
                                            <td>{pet.id}</td>
                                            <td>{pet.petName}</td>
                                            <td>{pet.petType}</td>
                                            <td>{pet.petWeight}</td>
                                            <td>{pet.userId}</td>
                                            <td
                                                style={{
                                                    padding: '0',
                                                    display: 'flex',
                                                    width: '100%',
                                                    border: 'none',
                                                }}
                                            >
                                                <Buttons
                                                    className="edit-btn"
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    }
                                                    onClick={() =>
                                                        handleValuePet(pet)
                                                    }
                                                >
                                                    Sửa
                                                </Buttons>
                                                <Buttons
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDeletePet(pet.id)
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                        />
                                                    }
                                                >
                                                    Xóa
                                                </Buttons>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    {activeTable === 'service' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Mã dịch vụ</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Giá</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.id}</td>
                                            <td>{service.serviceName}</td>
                                            <td>{service.price}</td>
                                            <td
                                                style={{
                                                    width: '300px',
                                                }}
                                            >
                                                {service.description}
                                            </td>
                                            <td
                                                style={{
                                                    padding: '0',
                                                    display: 'flex',
                                                    width: '100%',
                                                    border: 'none',
                                                }}
                                            >
                                                <Buttons
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleValueService(
                                                            service,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    }
                                                >
                                                    Sửa
                                                </Buttons>
                                                <Buttons
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDeleteService(
                                                            service.id,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                        />
                                                    }
                                                >
                                                    Xóa
                                                </Buttons>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <>
                                <Buttons
                                    className="create-service"
                                    onClick={handleShowServiceForm}
                                >
                                    Thêm dịch vụ
                                </Buttons>
                            </>
                        </>
                    )}
                    {activeTable === 'booking' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Mã lịch hẹn</th>
                                        <th>Mã dịch vụ</th>
                                        <th>Mã người dùng</th>
                                        <th>Mã thú nuôi</th>
                                        <th>Thời gian</th>
                                        <th>Ngày</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.serviceId}</td>
                                            <td>{booking.userId}</td>
                                            <td>{booking.petId}</td>
                                            <td>{booking.time}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.startTime}</td>
                                            <td>{booking.endTime}</td>
                                            <td
                                                style={{
                                                    padding: '0',
                                                    display: 'flex',
                                                    width: '100%',
                                                    border: 'none',
                                                }}
                                            >
                                                <Buttons
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleValueBooking(
                                                            booking,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    }
                                                >
                                                    Sửa
                                                </Buttons>
                                                <Buttons
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDeleteBooking(
                                                            booking.id,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                        />
                                                    }
                                                >
                                                    Xóa
                                                </Buttons>
                                                <Buttons
                                                    className="add-btn"
                                                    onClick={() =>
                                                        handleValueBookingFrom(
                                                            booking,
                                                        )
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCalendarDays
                                                            }
                                                        />
                                                    }
                                                >
                                                    Đặt
                                                </Buttons>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div></div>
                        </>
                    )}
                    {activeTable === 'bkdetail' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Tên dịch vụ</th>
                                        <th>Tên vật nuôi</th>
                                        <th>Tên người dùng</th>
                                        <th>Giá</th>
                                        <th>Số điện thoại</th>
                                        <th>Thời gian</th>
                                        <th>Ngày</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((detail) => (
                                        <tr key={detail.id}>
                                        <td>{getServiceName(detail.serviceId)}</td>
                                        <td>{getPetName(detail.petId)}</td>
                                        <td>{getUserFullName(detail.userId)}</td>
                                        <td>{detail.price}</td>
                                        <td>{detail.phoneNumber}</td>
                                        <td>{detail.time}</td>
                                        <td>{detail.date}</td>
                                        <td>{detail.startTime}</td>
                                        <td>{detail.endTime}</td>
                                        <td
                                            style={{
                                                padding: '0',
                                                display: 'flex',
                                                width: '100%',
                                                border: 'none',
                                            }}
                                        >
                                            <Buttons
                                                className="edit-btn"
                                                rightIcon={
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                    />
                                                }
                                            >
                                                Sửa
                                            </Buttons>
                                            <Buttons
                                                className="delete-btn"
                                                rightIcon={
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                }
                                            >
                                                Lưu
                                            </Buttons>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    {activeTable === 'history' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Tên dịch vụ</th>
                                        <th>Tên người dùng</th>
                                        <th>Tên thú nuôi</th>
                                        <th>Giá</th>
                                        <th>Thời gian</th>
                                        <th>Ngày</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tỉa lông cho thú</td>
                                        <td>Bình An</td>
                                        <td>Mèo</td>
                                        <td>100.000đ</td>
                                        <td>1 ngày</td>
                                        <td>2024-06-01</td>
                                        <td>09:45:00</td>
                                        <td>10:30:00</td>
                                        <td
                                            style={{
                                                padding: '0',
                                                display: 'flex',
                                                width: '100%',
                                                border: 'none',
                                            }}
                                        >
                                            <Buttons
                                                className="edit-btn"
                                                rightIcon={
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                    />
                                                }
                                            >
                                                Sửa
                                            </Buttons>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tắm cho thú</td>
                                        <td>Thanh Bình</td>
                                        <td>Chó</td>
                                        <td>150.000đ</td>
                                        <td>trong ngày</td>
                                        <td>2024-06-01</td>
                                        <td>09:45:00</td>
                                        <td>10:30:00</td>
                                        <td
                                            style={{
                                                padding: '0',
                                                display: 'flex',
                                                width: '100%',
                                                border: 'none',
                                            }}
                                        >
                                            <Buttons
                                                className="edit-btn"
                                                rightIcon={
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                    />
                                                }
                                            >
                                                Sửa
                                            </Buttons>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
            {/* Khối background phủ lên */}
            {showEditUserForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={editUserFormRef}>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Email</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="email"
                                            value={valueUser.email}
                                            onChange={handleInputChange}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Họ và tên</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={valueUser.fullName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Quyền</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="roleId"
                                            value={valueUser.roleId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Số điện thoại</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={valueUser.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Địa chỉ</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="address"
                                        value={valueUser.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Giới tính</label>
                                <div className="input-group">
                                    <select
                                        name="gender"
                                        value={valueUser.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">
                                            --Chọn giới tính--
                                        </option>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowEditUserForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleUpdateUser}>
                                    Sửa
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditPetForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={editPetFormRef}>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Tên</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="petName"
                                            value={valuePet.petName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Loài</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="petType"
                                            value={valuePet.petType}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Cân nặng</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="petWeight"
                                            value={valuePet.petWeight}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Mã người dùng</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={valuePet.userId || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowEditPetForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleUpdatePet}>Sửa</Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showServiceForm && (
                <div className="background">
                    <div className="service-container" ref={serviceFormRef}>
                        <h2>Thêm dịch vụ</h2>

                        <div className="service-form">
                            <label>Tên dịch vụ</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={newService.serviceName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label>Giá</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="price"
                                    value={newService.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label>Mô tả</label>
                            <div className="input-group">
                                <textarea
                                    name="description"
                                    value={newService.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowServiceForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleAddService}>
                                    Thêm
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditServiceForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={editServiceFormRef}>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Tên dịch vụ</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="serviceName"
                                            value={valueService.serviceName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Giá</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="price"
                                            value={valueService.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Mô tả</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="description"
                                            value={valueService.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowEditServiceForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleUpdateService}>
                                    Sửa
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditBookingForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={editBookingFormRef}>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Mã dịch vụ</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="serviceId"
                                            value={valueBooking.serviceId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Mã người dùng</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={valueBooking.userId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Mã vật nuôi</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="petId"
                                            value={valueBooking.petId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Thời gian</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="time"
                                            value={valueBooking.time}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Ngày</label>
                                    <div className="input-group">
                                        <select
                                            name="date"
                                            value={valueBooking.date}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Chọn ngày</option>
                                            {generateDateOptions()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Thời gian bắt đầu</label>
                                    <div className="input-group">
                                        <select
                                            name="startTime"
                                            value={valueBooking.startTime}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">
                                                Chọn giờ bắt đầu
                                            </option>
                                            {generateTimeOptions().map(
                                                (time) => (
                                                    <option
                                                        key={time}
                                                        value={time}
                                                    >
                                                        {time}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Thời gian kết thúc</label>
                                    <div className="input-group">
                                        <select
                                            name="endTime"
                                            value={valueBooking.endTime}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">
                                                Chọn giờ kết thúc
                                            </option>
                                            {generateEndTimeOptions(
                                                valueBooking.startTime,
                                            ).map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowEditBookingForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleUpdateBooking}>
                                    Sửa
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showUserForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={userFormRef}>
                        <h2>Thêm người dùng</h2>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Email</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="email"
                                            value={newUser.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Họ và tên</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={newUser.fullName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Mật khẩu</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Địa chỉ</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="address"
                                            value={newUser.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Số điện thoại</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={newUser.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Giới tính</label>
                                <div className="input-group">
                                    <select
                                        name="gender"
                                        value={newUser.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">
                                            --Chọn giới tính--
                                        </option>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>Quyền</label>
                                <div className="input-group">
                                    <select
                                        name="roleId"
                                        value={newUser.roleId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">
                                            --Chọn quyền hạn--
                                        </option>
                                        <option value="0">Admin</option>
                                        <option value="1">Nhân viên</option>
                                        <option value="2">Người dùng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowUserForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleAddUser}>Thêm</Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDetailForm && (
                <div className="edit-background">
                    <div className="edit-container" ref={detailFormRef}>
                        <h2>Chấp nhận dịch vụ</h2>
                        <div className="edit-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Mã dịch vụ</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="serviceId"
                                            value={valueBooking.serviceId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Mã người dùng</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={valueBooking.userId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Mã vật nuôi</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="petId"
                                            value={valueBooking.petId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Thời gian</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="time"
                                            value={valueBooking.time}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Ngày</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="date"
                                            value={valueBooking.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Thời gian bắt đầu</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="startTime"
                                            value={valueBooking.startTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Thời gian kết thúc</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="endTime"
                                            value={valueBooking.endTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Giá</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="price"
                                            value={servicePrice}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Số điện thoại</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={userPhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons className="exit-btn">Hủy</Buttons>
                                <Buttons onClick={handleAddDetail}>Đặt</Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
