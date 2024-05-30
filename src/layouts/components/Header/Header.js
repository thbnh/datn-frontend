import '../Header/header.scss';
import Buttons from '../../../Components/Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faSignIn,
    faSignOut,
    faHome,
    faUser,
    faUserTie,
    faBell,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Notice from '../../../Components/Notice/notice';
import { useState, useEffect } from 'react';
import { handleGetDetailByUserIdApi } from '../../../service/detailService';

function Header() {
    const [details, setDetails] = useState([]);
    const [userId, setUserId] = useState('');
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
                    console.error(
                        'Lỗi khi lấy danh sách lịch hẹn của bạn:',
                        error,
                    );
                    setDetails([]);
                }
            };
            getDetailByUserId();
        }
    }, [userId]);

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
                                            <FontAwesomeIcon icon={faUser} />
                                        </Buttons>
                                        {renderRole(
                                            JSON.parse(inforUser).roleId,
                                        ) === 'Admin' ? (
                                            <Buttons
                                                to={'/admin'}
                                                className="role-btn"
                                                leftIcon={
                                                    <FontAwesomeIcon
                                                        icon={faUserTie}
                                                    />
                                                }
                                            >
                                                Admin
                                            </Buttons>
                                        ) : renderRole(
                                              JSON.parse(inforUser).roleId,
                                          ) === 'Nhân viên' ? (
                                            <Buttons
                                                className="role-btn"
                                                leftIcon={
                                                    <FontAwesomeIcon
                                                        icon={faUserTie}
                                                    />
                                                }
                                            >
                                                Nhân viên
                                            </Buttons>
                                        ) : (
                                            <Notice count={details.length}>
                                                <div>
                                                    <Buttons className="bell-btn">
                                                        <FontAwesomeIcon
                                                            icon={faBell}
                                                        />
                                                        {details.length > 0 && (
                                                            <span className="badge">
                                                                {details.length}
                                                            </span>
                                                        )}
                                                    </Buttons>
                                                </div>
                                            </Notice>
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
