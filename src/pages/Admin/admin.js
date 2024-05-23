import './admin.scss';
import Buttons from '../../Components/Button/button';
import {
    getUserInforApi,
    handleDeleteUserApi,
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
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { getBookingInforApi } from '../../service/booking';

function Admin() {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [bookings, setbookings] = useState([]);

    const [valueUser, setValueUser] = useState(null);
    const [valuePet, setValuePet] = useState(null);
    const [valueService, setValueService] = useState(null);

    const [activeTable, setActiveTable] = useState('');
    const [newService, setNewService] = useState({
        serviceName: '',
        price: '',
        description: '',
    });

    // Trạng thái để hiển thị Edit form
    const [showEditUserForm, setShowEditUserForm] = useState(false);
    // Trạng thái để hiển thị Service form
    const [showServiceForm, setShowServiceForm] = useState(false);

    const [showEditPetForm, setShowEditPetForm] = useState(false);

    const [showEditServiceForm, setShowEditServiceForm] = useState(false);

    // Sự kiện đóng mở bảng dữ liệu
    const handleShowTable = (table) => {
        setActiveTable(activeTable === table ? '' : table);
    };
    // Sư kiện hiển thị của Edit User form
    const handleShowEditUserForm = () => {
        setShowEditUserForm(!showEditUserForm);
    };
    const handleShowEditPetForm = () => {
        setShowEditPetForm(!showEditPetForm);
    };
    const handleShowEditServiceForm = () => {
        setShowEditServiceForm(!showEditServiceForm);
    };
    // Sư kiện hiển thị của Service form
    const handleShowServiceForm = () => {
        setShowServiceForm(!showServiceForm);
    };

    const editUserFormRef = useRef(null);
    const editPetFormRef = useRef(null);
    const editServiceFormRef = useRef(null);
    const serviceFormRef = useRef(null);

    // Sư kiện Click ra ngoài thoát overlay
    const handleOutClick = (event) => {
        if (
            serviceFormRef.current &&
            !serviceFormRef.current.contains(event.target)
        ) {
            setShowServiceForm(false);
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

        setNewService((prevService) => ({
            ...prevService,
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

    // Lấy dữ liệu người dùng bằng API
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
    // Xóa người dùng với API
    const handleDeleteUser = async (userId) => {
        try {
            const data = await handleDeleteUserApi(userId);
            if (data.status === '200') {
                // Xóa người dùng khỏi state
                setUsers(users.filter((user) => user.id !== userId));
                // Hiển thị toast thành công
                toast.success(`${data.errMessage}`);
            } else {
                // Hiển thị toast thông báo lỗi từ server
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            // Xử lý lỗi từ phía client
            console.error('Lỗi khi xóa người dùng:', error);
            toast.error('Đã xảy ra lỗi khi xóa người dùng');
        }
    };
    // Sửa thông tin người dùng với API
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

    // Lấy dữ liệu dịch vụ bằng API
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
    // Thêm thông tin dịch vụ bằng API
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
    //
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
                // Xóa dịch vụ khỏi state
                setServices(
                    services.filter((service) => service.id !== serviceId),
                );
                // Hiển thị toast thành công
                toast.success(`${data.errMessage}`);
            } else {
                // Hiển thị toast thông báo lỗi từ server
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            // Xử lý lỗi từ phía client
            console.error('Lỗi khi xóa dịch vụ:', error);
            toast.error('Đã xảy ra lỗi khi xóa dịch vụ');
        }
    };
    // Lấy dữ liệu vật nuôi bằng API
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
    // Sửa thông tin vật nuôi với API
    const handleUpdatePet = async () => {
        try {
            const data = await handleUpdatePetApi(valuePet.id, valuePet);
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
                // Xóa Vật nuôi khỏi state
                setPets(pets.filter((pet) => pet.id !== petId));
                // Hiển thị toast thành công
                toast.success(`${data.errMessage}`);
            } else {
                // Hiển thị toast thông báo lỗi từ server
                toast.error(`Xóa không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            // Xử lý lỗi từ phía client
            console.error('Lỗi khi xóa Vật nuôi:', error);
            toast.error('Đã xảy ra lỗi khi xóa Vật nuôi');
        }
    };

    useEffect(() => {
        const getBookingInfor = async () => {
            try {
                const bookingData = await getBookingInforApi();
                setbookings(bookingData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đặt lịch:', error);
            }
        };
        getBookingInfor();
    }, []);

    return (
        <div onClick={handleOutClick} className="wrapper-content">
            <div
                className="content-admin"
                style={{
                    display:
                        showEditUserForm ||
                        showEditPetForm ||
                        showEditServiceForm ||
                        showServiceForm
                            ? 'none'
                            : 'flex',
                }}
            >
                <div className="content-left col-3">
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('user')}
                    >
                        Data người dùng
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('pet')}
                    >
                        Data thú nuôi
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('service')}
                    >
                        Data dịch vụ
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowTable('booking')}
                    >
                        Data đặt dịch vụ
                    </Buttons>
                </div>
                <ToastContainer />
                <div className="content-right col-9">
                    {/* Bảng người dùng */}
                    {activeTable === 'user' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div></div>
                        </>
                    )}

                    {/* Bảng thú nuôi */}
                    {activeTable === 'pet' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Tên thú nuôi</th>
                                        <th>Loài</th>
                                        <th>Cân nặng (kg)</th>
                                        <th>Mã người dùng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet.id}>
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

                    {/* Bảng dịch vụ */}
                    {activeTable === 'service' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Tên dịch vụ</th>
                                        <th>Giá</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service) => (
                                        <tr key={service.id}>
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

                    {/* Bảng lịch các dịch vụ được đặt */}
                    {activeTable === 'booking' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Mã dịch vụ</th>
                                        <th>Mã người dùng</th>
                                        <th>Mã thú nuôi</th>
                                        <th>Thời gian</th>
                                        <th>Thứ</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.serviceId}</td>
                                            <td>{booking.ownerId}</td>
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
                            <div></div>
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
                                <label>Giới tính</label>
                                <div className="input-group">
                                    <select
                                        name="gender"
                                        value={valueUser.gender}
                                        onChange={handleInputChange}
                                    >
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
        </div>
    );
}

export default Admin;
