import Tippy from '@tippyjs/react/headless';
import './notice.scss';
import {
    
    handleGetDetailByUserIdApi,
} from '../../service/detailService';
import { useState, useEffect } from 'react';
import { getPetInforApi } from '../../service/petService';
import { getServiceInforApi } from '../../service/servService';

function Notice({ children }) {
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [details, setDetails] = useState([]);
    const [userId, setUserId] = useState('');

    // Lấy userId từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const getDetailByUserId = async () => {
                try {
                    const data = await handleGetDetailByUserIdApi(userId);
                    // Kiểm tra xem dữ liệu trả về có hợp lệ không
                    if (data && Array.isArray(data)) {
                        setDetails(data);
                    } else {
                        setDetails([]);
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách lịch hẹn của bạn:', error);
                    setDetails([]);
                }
            }
            getDetailByUserId();
        }
    }, [userId]);
    
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

    const getPetName = (petId) => {
        const pet = pets.find((pet) => pet.id === petId);
        return pet ? pet.petName : 'N/A';
    };

    const getServiceName = (serviceId) => {
        const service = services.find((service) => service.id === serviceId);
        return service ? service.serviceName : 'N/A';
    };

    const getUserFullName = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.fullName;
        }
        return 'N/A';
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
                            <h3>{details.length > 0 ? 'Bạn đã đặt dịch vụ thành công' : 'Bạn chưa đặt dịch vụ'}</h3>
                                <hr />
                                <div className="notice-wrapper">
                                    {details.length > 0 && details.map((detail) => (
                                        <div key={detail.id}>
                                            <p>
                                                Dịch vụ:{' '}
                                                {getServiceName(
                                                    detail.serviceId,
                                                )}
                                            </p>
                                            <p>
                                                Tên thú nuôi:{' '}
                                                {getPetName(detail.petId)}
                                            </p>
                                            <p>
                                                Tên người dùng:{' '}
                                                {getUserFullName()}
                                            </p>
                                            <p>Giá: {detail.price}đ</p>
                                            <p>
                                                Ngày:{' '}
                                                {new Date(
                                                    detail.date,
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>Thời gian: {calculateDuration(detail.startTime, detail.endTime)}</p>
                                        </div>
                                    ))}
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
