import Buttons from '../../../Components/Button/button';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className='footer-infor'>
                        <h4 className='header-infor'>Các dịch vụ</h4>
                        <Buttons className='link-infor'>Tắm Spa cho thú</Buttons>
                        <Buttons className='link-infor'>Cắt tỉa lông cho thú</Buttons>
                        <Buttons className='link-infor'>Trông coi thú</Buttons>
                    </div>
                    <div className='footer-infor'>
                        <h4 className='header-infor'>Thông tin liên hệ</h4>
                        <span className='link-infor'>Thanh Xuân, Hà Nội</span>
                        <span className='link-infor'>SDT: 098-594-8466</span>
                        <span className='link-infor'>Email: ltbinh2609@gmail.com</span>
                    </div>
                </div>
                <div className="banner-right">
                    <div className="main-banner">
                        <Buttons
                            className="banner-icon"
                            href={'https://www.facebook.com/'}
                        >
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Buttons>
                        <Buttons className="banner-icon">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Buttons>
                        <Buttons
                            className="banner-icon"
                            href={'https://www.instagram.com/'}
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </Buttons>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
