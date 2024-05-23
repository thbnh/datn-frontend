import { faHouse } from '@fortawesome/free-solid-svg-icons';
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
                    <Buttons to={'/service'} navbtn className="nav-item">
                        Dịch vụ thú cưng
                    </Buttons>
                </div>
            </Dropdown>
            <Buttons to={'/booking'} navbtn className="nav-item">
                Đặt dịch vụ
            </Buttons>
            <Buttons to navbtn className="nav-item">
                About us
            </Buttons>
        </div>
    );
}

export default Navmenu;
