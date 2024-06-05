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

    const handleShowForm = (serviceId, serviceName) => {
        setActiveForm((prevForm) =>
            prevForm === serviceId ? null : serviceId,
        );
        setBooking((prevBooking) => ({
            ...prevBooking,
            serviceId,
            serviceName,
            userId,
        }));
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
            for (let minute = 0; minute < 60; minute += 30) {
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
    // Lấy thông tin dịch vụ qua API
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
    // Lấy thông tin vật nuôi của người dùng qua API
    useEffect(() => {
        if (userId) {
            const getPetsByUserId = async () => {
                try {
                    const data = await getPetsByUserIdApi(userId);
                    setPets(data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách thú nuôi:', error);
                }
            };
            getPetsByUserId();
        }
    }, [userId]);
    // Lấy thông tin người dùng đã đăng nhập
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
            setBooking((prevBooking) => ({
                ...prevBooking,
                userName: user.name,
                userId: user.id,
            }));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    // Sự kiện nhân dữ liệu khi nhập Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
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
                                    onClick={() =>
                                        handleShowForm(
                                            service.id,
                                            service.serviceName,
                                        )
                                    }
                                >
                                    {service.serviceName}
                                </Buttons>
                                <hr key={`hr-${service.id}`} />
                            </div>
                        ))}
                    </div>
                    <ToastContainer />
                    <div className="content-right col-7">
                        {activeForm &&
                            services.map((service) => (
                                <div key={service.id} className='block'>
                                    {activeForm === service.id && (
                                        <>
                                            <h1>{service.serviceName}</h1>
                                            <div className="first">
                                                <div className="first-group">
                                                    <label>Tên dịch vụ</label>
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
                                                            readOnly
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
                                                    <label>Tên vật nuôi</label>
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
                                                                Chọn vật nuôi
                                                            </option>
                                                            {pets.map((pet) => (
                                                                <option
                                                                    key={pet.id}
                                                                    value={
                                                                        pet.id
                                                                    }
                                                                >
                                                                    {
                                                                        pet.petName
                                                                    }
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="second-group">
                                                    <label>Thời gian (ngày)</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            name="time"
                                                            value={booking.time}
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
                                                            name="startTime"
                                                            value={
                                                                booking.startTime
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        >
                                                            <option value="">
                                                                Chọn giờ bắt đầu
                                                            </option>
                                                            {generateTimeOptions().map(
                                                                (time) => (
                                                                    <option
                                                                        key={
                                                                            time
                                                                        }
                                                                        value={
                                                                            time
                                                                        }
                                                                    >
                                                                        {time}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="second-group">
                                                    <label>
                                                        Thời gian kết thúc
                                                    </label>
                                                    <div className="input-group">
                                                        <select
                                                            name="endTime"
                                                            value={
                                                                booking.endTime
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        >
                                                            <option value="">
                                                                Chọn giờ kết
                                                                thúc
                                                            </option>
                                                            {generateEndTimeOptions(
                                                                booking.startTime,
                                                            ).map((time) => (
                                                                <option
                                                                    key={time}
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="second-group">
                                                <label>Ngày</label>
                                                <div className="input-group">
                                                    <select
                                                        name="date"
                                                        value={booking.date}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn ngày
                                                        </option>
                                                        {generateDateOptions()}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <Buttons
                                                    className="booking-btn"
                                                    mainbtn
                                                    onClick={handleAddBooking}
                                                >
                                                    Đặt dịch vụ
                                                </Buttons>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
