import './service.scss';
import Buttons from '../../Components/Button/button';
import { serviceimg } from '../../assets/image';
import { useState, useEffect } from 'react';
import { getServiceInforApi } from '../../service/servService';

function Service() {
    const [services, setServices] = useState([]);

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
    return (
        <div className="container-service">
            <div className="content-service">
                <div className="content-menu">
                    <h1 className="content-title">Dịch vụ thú cưng</h1>
                    {services.map((service, index) => (
                        <div key={index} className="content-text">
                            <div className="col-md-7">
                            <img src={serviceimg.ser1} alt="tắm" className="img" />
                            </div>
                            <div className="col-md-5 right">
                                <h1>{service.serviceName}</h1>
                                <p>{service.price}</p>
                                <p>{service.description}</p>
                                <Buttons className="booking-btn" mainbtn to={'/booking'}>
                                    Đặt dịch vụ
                                </Buttons>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Service;
