import './booking.scss';
import Buttons from '../../Components/Button/button';
import { useState, useEffect } from 'react';
import { getServiceInforApi } from '../../service/servService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getPetsByUserIdApi } from '../../service/petService';
import { handleAddBookingApi } from '../../service/booking';

function Booking() {
    const [userId, setUserId] = useState('');
    const [services, setServices] = useState([]);
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [booking, setBooking] = useState({
        serviceId: '',
        serviceName: '',
        userId: '',
        userName: '',
        petId: '',
        time: '',
        date: '',
        startTime: '',
        endTime: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [activeForm, setActiveForm] = useState(null);

    const navigate = useNavigate();

    const handleShowForm = (serviceId) => {
        if (activeForm === serviceId) {
            setActiveForm(null); // Đóng bảng nếu nhấn lại bảng hiện tại
        } else {
            setActiveForm(serviceId); // Mở bảng nếu nhấn vào bảng mới
            setBooking((prevBooking) => ({
                ...prevBooking,
                serviceId,
                userId,
            }));
        }
    };

    // Function để tạo danh sách các ngày trong tuần
    const generateDayOptions = () => {
        const days = [
            'Thứ hai',
            'Thứ ba',
            'Thú tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
            'Chủ nhật',
        ];
        return days.map((day) => <option key={day}>{day}</option>);
    };
    // Function để tạo danh sách các giờ trong ngày
    const generateHourOptions = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return hours.map((hour) => <option key={hour}>{hour}</option>);
    };

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

    useEffect(() => {
        if (userId) {
            const getPetsByUserId = async () => {
                try {
                    const data = await getPetsByUserIdApi(userId);
                    setPets(data);
                    console.log(data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách thú nuôi:', error);
                }
            };
            getPetsByUserId();
        }
    }, [userId]);

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const storedUser = localStorage.getItem('user');
        setUsers(storedUser);
        console.log(storedUser);
        if (storedUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));

        if (name === 'serviceName') {
            const selectedService = services.find(
                (service) => service.serviceName === value,
            );
            if (selectedService) {
                setBooking((prevBooking) => ({
                    ...prevBooking,
                    serviceId: selectedService.id,
                }));
            }
        }

        if (name === 'fullName') {
            const selectedUser = users.find((user) => user.fullName === value);
            if (selectedUser) {
                setBooking((prevBooking) => ({
                    ...prevBooking,
                    userId: selectedUser.id,
                }));
            }
        }
    };

    const handleAddBooking = async () => {
        try {
            const data = await handleAddBookingApi(
                booking.serviceId,
                booking.userId,
                booking.petId,
                booking.time,
                booking.date,
                booking.startTime,
                booking.endTime,
            );
            if (data && data.status === '200') {
                console.log('Thêm thành công');
                toast.success('Thêm thành công!');
            } else {
                console.error('Thêm thất bại:', data?.data?.errMessage);

                toast.error('Thêm thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm Lịch:', error);

            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="booking-container">
            {!isLoggedIn ? (
                <div>
                    <ToastContainer />
                    {toast.error('Vui lòng đăng nhập để đặt dịch vụ')}
                    {navigate('/login')}
                </div>
            ) : (
                <div className="booking-wrapper">
                    <div className="content-left col-3">
                        {services.map((service) => (
                            <div key={service.id}>
                                <Buttons
                                    className="content-btn"
                                    onClick={() => handleShowForm(service.id)}
                                >
                                    {service.serviceName}
                                </Buttons>
                                <hr key={`hr-${service.id}`} />
                            </div>
                        ))}
                    </div>
                    <ToastContainer />
                    <div className="content-right col-7">
                        {activeForm && (
                            <>
                                {services.map((service) => (
                                    <>
                                        {activeForm === service.id && (
                                            <>
                                                <h1 key={service.id}>
                                                    {service.serviceName}
                                                </h1>
                                                <div className="first">
                                                    <div className="first-group">
                                                        <label>
                                                            Tên dịch vụ
                                                        </label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="serviceName"
                                                                value={
                                                                    booking.serviceName
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="first-group">
                                                        <label>
                                                            Tên người dùng
                                                        </label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="userName"
                                                                value={
                                                                    booking.userName
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="second">
                                                    <div className="second-group">
                                                        <label>
                                                            Tên vật nuôi
                                                        </label>
                                                        <div className="input-group">
                                                            <select
                                                                name="petId"
                                                                value={
                                                                    booking.petId
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                            >
                                                                <option value="">
                                                                    Chọn vật
                                                                    nuôi
                                                                </option>
                                                                {pets.map(
                                                                    (pet) => (
                                                                        <option
                                                                            key={
                                                                                pet.id
                                                                            }
                                                                            value={
                                                                                pet.id
                                                                            }
                                                                        >
                                                                            {
                                                                                pet.petName
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="second-group">
                                                        <label>Thời gian</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                name="time"
                                                                value={
                                                                    booking.time
                                                                }
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="second">
                                                    <div className="second-group">
                                                        <label>
                                                            Thời gian bắt đầu
                                                        </label>
                                                        <div className="input-group">
                                                            <select
                                                                name="startTime" // Đặt name là "startTime"
                                                                value={
                                                                    booking.startTime
                                                                } // Giá trị được chọn sẽ được lưu trong trạng thái của component
                                                                onChange={
                                                                    handleInputChange
                                                                } // Gọi handleInputChange khi thay đổi giá trị
                                                            >
                                                                <option value="">
                                                                    Chọn giờ bắt
                                                                    đầu
                                                                </option>
                                                                {generateHourOptions()}{' '}
                                                                {/* Gọi hàm generateHourOptions để tạo danh sách các giờ */}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="second-group">
                                                        <label>
                                                            Thời gian kết thúc
                                                        </label>
                                                        <div className="input-group">
                                                            <select
                                                                name="endTime" // Đặt name là "endTime"
                                                                value={
                                                                    booking.endTime
                                                                } // Giá trị được chọn sẽ được lưu trong trạng thái của component
                                                                onChange={
                                                                    handleInputChange
                                                                } // Gọi handleInputChange khi thay đổi giá trị
                                                            >
                                                                <option value="">
                                                                    Chọn giờ kết
                                                                    thúc
                                                                </option>
                                                                {generateHourOptions()}{' '}
                                                                {/* Gọi hàm generateHourOptions để tạo danh sách các giờ */}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="second-group">
                                                    <label>Ngày</label>
                                                    <div className="input-group">
                                                        <select
                                                            name="date" // Đặt name là "date"
                                                            value={booking.date} // Giá trị được chọn sẽ được lưu trong trạng thái của component
                                                            onChange={
                                                                handleInputChange
                                                            } // Gọi handleInputChange khi thay đổi giá trị
                                                        >
                                                            <option value="">
                                                                Chọn ngày
                                                            </option>
                                                            {generateDayOptions()}{' '}
                                                            {/* Gọi hàm generateDayOptions để tạo danh sách các ngày */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Buttons
                                                        className="booking-btn"
                                                        mainbtn
                                                        onClick={
                                                            handleAddBooking
                                                        }
                                                    >
                                                        Đặt dịch vụ
                                                    </Buttons>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
