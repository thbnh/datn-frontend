import './home.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide from '../../assets/img/slide.png';
import Buttons from '../../Components/Button/button';
import { service } from '../../assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightLong,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div>
            {/*  */}
            <div className="slide">
                <img src={slide} alt="slide" className="slide-img" />
            </div>

            {/*  */}
            <div className="content">
                <Slider {...settings} className="slide-auto">
                    <div className="content-menu">
                        <Buttons to className="nav-item">
                            Dịch vụ thú cưng
                        </Buttons>
                        <div className="content-service">
                            <div className="col-md-7">
                                <img
                                    src={service.ser1}
                                    alt="tắm"
                                    className="img"
                                />
                            </div>
                            <div className="col-md-5 right">
                                <h1>Tắm Spa cho thú</h1>
                                <p>Dịch vụ trọn gói:</p>
                                <p>
                                    Tắm, vắt tuyến hôi, sấy khô, chải lông rối,
                                    nhổ lông tai, vệ sinh tai,
                                </p>
                                <Buttons to={'/service'} className="detail-btn" mainbtn>
                                    Chi tiết
                                </Buttons>
                            </div>
                        </div>
                    </div>
                    <div className="content-menu">
                        <Buttons to className="nav-item">
                            Dịch vụ thú cưng
                        </Buttons>
                        <div className="content-service">
                            <div className="col-md-7">
                                <img
                                    src={service.ser1}
                                    alt="tắm"
                                    className="img"
                                />
                            </div>
                            <div className="col-md-5 right">
                                <h1>Cắt tỉa lông cho thú</h1>
                                <p>Dịch vụ trọn gói:</p>
                                <p>
                                    Cạo, tỉa lông toàn thân, cắt mài móng chân,
                                    vệ sinh sau khi cắt tỉa
                                </p>
                                <Buttons to={'/service'} className="detail-btn" mainbtn>
                                    Chi tiết
                                </Buttons>
                            </div>
                        </div>
                    </div>
                    <div className="content-menu">
                        <Buttons to className="nav-item">
                            Dịch vụ thú cưng
                        </Buttons>
                        <div className="content-service">
                            <div className="col-md-7">
                                <img
                                    src={service.ser1}
                                    alt="tắm"
                                    className="img"
                                />
                            </div>
                            <div className="col-md-5 right">
                                <h1>Trông coi thú</h1>
                                <p>Dịch vụ trọn gói:</p>
                                <p>
                                    Nhận trông thú, cho ăn đúng bữa, vệ sinh sạch sẽ
                                </p>
                                <Buttons to={'/service'} className="detail-btn" mainbtn>
                                    Chi tiết
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/*  */}
            <div className="booking">
                <div className="commit">
                    <h1 className="commit-header">
                        Cam kết khi bạn sử dụng dịch vụ
                    </h1>
                    <div className="commit-content">
                        <div className="content-item">
                            <h2 className="content-header">
                                Hết mình vì công việc
                            </h2>
                            <p className="content-text">
                                Chúng tôi làm việc hết mình với chữ tâm, trách
                                nhiệm và sự yêu nghề. Thú cưng khỏe mạnh là niềm
                                hạnh phúc của chúng tôi.
                            </p>
                        </div>
                        <div className="content-item">
                            <h2 className="content-header">
                                Giá dịch vụ ưu đãi
                            </h2>
                            <p className="content-text">
                                Chúng tôi cam kết đưa ra mức giá ưu đãi nhất
                                trên thị trường để tất cả thú cưng đều có cơ hội
                                được trải nghiệm dịch vụ của chúng tôi.
                            </p>
                        </div>
                        <div className="content-item">
                            <h2 className="content-header">
                                Chất lượng hàng đầu
                            </h2>
                            <p className="content-text">
                                Chúng tôi không ngừng nâng cao phát triển trình
                                độ kỹ năng của nhân sự để phục vụ thú cưng đem
                                đến kết quả tốt nhất.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="booking-content">
                    <span className="booking-text no-select">
                        Để sử dụng các dịch vụ nhấn
                    </span>
                    <FontAwesomeIcon
                        icon={faRightLong}
                        className="booking-icon"
                    />
                    <Buttons className="booking-btn" mainbtn>
                        Đặt dịch vụ
                    </Buttons>
                </div>
            </div>
        </div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="left-btn" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div className="right-btn" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
}

export default Home;
