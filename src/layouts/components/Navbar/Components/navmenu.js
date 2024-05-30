import { faCalendarDays, faHouse, faPaw } from '@fortawesome/free-solid-svg-icons';
import Buttons from '../../../../Components/Button/button';
import './component.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../../../../Components/Dropdown/dropdown';

function Navmenu() {
    return (
        <div className="nav-menu">
            <Buttons
                to = {'/'}
                navbtn
                className="nav-item"
                leftIcon={<FontAwesomeIcon icon={faHouse} />}
            >
                Trang chủ
            </Buttons>
            <Dropdown>
                <div>
                    <Buttons to={'/service'} navbtn className="nav-item" leftIcon={<FontAwesomeIcon icon={faPaw}/>}>
                        Các dịch vụ
                    </Buttons>
                </div>
            </Dropdown>
            <Buttons to={'/booking'} navbtn className="nav-item" leftIcon={<FontAwesomeIcon icon={faCalendarDays}/>}>
                Đặt dịch vụ
            </Buttons>
            <Buttons to navbtn className="nav-item">
                Thông tin của cúng tôi
            </Buttons>
        </div>
    );
}

export default Navmenu;
