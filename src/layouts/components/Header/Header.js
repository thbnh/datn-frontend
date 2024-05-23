import '../Header/header.scss';
import Buttons from '../../../Components/Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faSignIn,
    faSignOut,
    faHome,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
        // Show logout toast
        toast.success('Đăng xuất thành công!');
    };

    const isLoggedIn = localStorage.getItem('token');

    const inforUser = localStorage.getItem('user');

    const renderRole = (roleId) => {
        if (roleId === '0') return 'Admin';
        if (roleId === '1') return 'Nhân viên';
        return null;
    };

    return (
        <header className="header">
            <div className="container">
                <div className="left">
                    <Buttons
                    to={'/'}
                        headerbtn
                        className="home-btn"
                        rightIcon={<FontAwesomeIcon icon={faHome} />}
                    ></Buttons>
                </div>
                <div className="right">
                    {!isLoggedIn && (
                        <div>
                            <Buttons
                                to={'/login'}
                                className="right-btn"
                                headerbtn
                                leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                            >
                                Đăng ký
                            </Buttons>
                        </div>
                    )}
                    {!isLoggedIn && (
                        <div>
                            <Buttons
                                to={'/login'}
                                className="right-btn"
                                headerbtn
                                leftIcon={<FontAwesomeIcon icon={faSignIn} />}
                            >
                                Đăng nhập
                            </Buttons>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className="right-user">
                            <div className="userinfor">
                                {inforUser && (
                                    <>
                                        <Buttons
                                            to={'/user-information'}
                                            className="user-btn"
                                        >
                                            {JSON.parse(inforUser).fullName}
                                        </Buttons>
                                        {renderRole(JSON.parse(inforUser).roleId) && (
                                            <p>{renderRole(JSON.parse(inforUser).roleId)}</p>
                                        )}
                                    </>
                                )}
                            </div>
                            <Buttons
                                className="right-btn"
                                headerbtn
                                onClick={handleLogout}
                                leftIcon={<FontAwesomeIcon icon={faSignOut} />}
                            >
                                Đăng xuất
                            </Buttons>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
