import Tippy from '@tippyjs/react/headless';
import './notice.scss';
import { handleGetDetailByUserIdApi } from '../../service/detailService';
import { useState, useEffect } from 'react';
import { getPetInforApi } from '../../service/petService';
import { getServiceInforApi } from '../../service/servService';
import Buttons from '../Button/button';

function Notice({ children }) {
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [details, setDetails] = useState([]);
    const [user, setUser] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Lấy user từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user && user.id) {
            const getDetails = async () => {
                try {
                    const data = await handleGetDetailByUserIdApi(user.id);
                    if (data && Array.isArray(data)) {
                        setDetails(data);
                    } else {
                        setDetails([]);
                    }
                } catch (error) {
                    console.error(
                        'Lỗi khi lấy danh sách lịch hẹn của bạn:',
                        error,
                    );
                    setDetails([]);
                }
            };
            getDetails();
        }
    }, [user]);

    useEffect(() => {
        const getPetInfo = async () => {
            try {
                const petData = await getPetInforApi();
                setPets(petData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu thú nuôi:', error);
            }
        };

        const getServiceInfo = async () => {
            try {
                const serviceData = await getServiceInforApi();
                setServices(serviceData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
            }
        };

        getPetInfo();
        getServiceInfo();
    }, []);

    const getPetName = (petId) => {
        const pet = pets.find((pet) => pet.id === petId);
        return pet ? pet.petName : 'N/A';
    };

    const getServiceName = (serviceId) => {
        const service = services.find((service) => service.id === serviceId);
        return service ? service.serviceName : 'N/A';
    };

    const getUserFullName = () => {
        return user ? user.fullName : 'N/A';
    };

    // Hàm tính toán khoảng thời gian giữa startTime và endTime
    const calculateDuration = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        const diffMs = end - start;
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        return `${diffHrs} giờ ${diffMins} phút`;
    };

    return (
        <div>
            <Tippy
                interactive={true}
                delay={[200, 200]}
                placement="bottom"
                render={(attrs) => {
                    return (
                        <div
                            className="notice-container"
                            tabIndex="-1"
                            {...attrs}
                        >
                            <div className="dropdown-wrapper">
                                <div className="notice-success">
                                    <h3>
                                        {details.length > 0
                                            ? 'Dịch vụ được đặt thành công'
                                            : 'Bạn chưa đặt dịch vụ thành công'}
                                    </h3>
                                    <hr />
                                    <div
                                        className="notice-wrapper"
                                        style={{ maxHeight: isExpanded ? '400px' : '120px', overflowY: isExpanded ? 'auto' : 'hidden' }}
                                    >
                                        {details.length > 0 &&
                                            details
                                                .slice(
                                                    0,
                                                    isExpanded
                                                        ? details.length
                                                        : 1,
                                                )
                                                .map((detail) => (
                                                    <div
                                                        key={detail.id}
                                                        className="notice-detail"
                                                    >
                                                        <p>
                                                            Dịch vụ:{' '}
                                                            {getServiceName(
                                                                detail.serviceId,
                                                            )}
                                                        </p>
                                                        <p>
                                                            Tên thú nuôi:{' '}
                                                            {getPetName(
                                                                detail.petId,
                                                            )}
                                                        </p>
                                                        <p>
                                                            Tên người dùng:{' '}
                                                            {getUserFullName()}
                                                        </p>
                                                        <p>
                                                            Giá: {detail.price}đ
                                                        </p>
                                                        <p>
                                                            Ngày:{' '}
                                                            {new Date(
                                                                detail.date,
                                                            ).toLocaleDateString()}
                                                        </p>
                                                        <p>
                                                            Thời gian:{' '}
                                                            {calculateDuration(
                                                                detail.startTime,
                                                                detail.endTime,
                                                            )}
                                                        </p>
                                                    </div>
                                                ))}
                                    </div>
                                    {details.length > 1 && (
                                        <Buttons
                                            className="dropdown-btn"
                                            onClick={() =>
                                                setIsExpanded(!isExpanded)
                                            }
                                        >
                                            {isExpanded
                                                ? 'Thu gọn'
                                                : 'Xem thêm'}
                                        </Buttons>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Notice;
