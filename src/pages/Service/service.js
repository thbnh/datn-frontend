import './service.scss';
import Buttons from '../../Components/Button/button';
import { service } from '../../assets/image';

function Service() {
    return (
        <div className="container-service">
            <div className="content-service">
                <div className="content-menu">
                    <h1 className="content-title">Dịch vụ thú cưng</h1>
                    <div className="content-text">
                        <div className="col-md-7">
                            <img src={service.ser1} alt="tắm" className="img" />
                        </div>
                        <div className="col-md-5 right">
                            <h1>Tắm Spa cho thú</h1>
                            <p>Dịch vụ trọn gói:</p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <Buttons className="booking-btn" mainbtn>
                                Đặt dịch vụ
                            </Buttons>
                        </div>
                    </div>
                    <div className="content-text">
                        <div className="col-md-5 right">
                            <h1>Tắm Spa cho thú</h1>
                            <p>Dịch vụ trọn gói:</p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <Buttons className="booking-btn" mainbtn>
                                Đặt dịch vụ
                            </Buttons>
                        </div>
                        <div className="col-md-7">
                            <img src={service.ser1} alt="tắm" className="img" />
                        </div>
                    </div>

                    <div className="content-text">
                        <div className="col-md-7">
                            <img src={service.ser1} alt="tắm" className="img" />
                        </div>
                        <div className="col-md-5 right">
                            <h1>Tắm Spa cho thú</h1>
                            <p>Dịch vụ trọn gói:</p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <p>
                                Tắm, vắt tuyến hôi, sấy khô, chải lông rối, nhổ
                                lông tai, vệ sinh tai,
                            </p>
                            <Buttons className="booking-btn" mainbtn>
                                Đặt dịch vụ
                            </Buttons>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
