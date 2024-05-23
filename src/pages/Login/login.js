import { useState, useRef } from 'react';
import '../Login/login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { hanldeLoginApi, handleSignupApi } from '../../service/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
// hash Password
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

function Login({ onSuccess }) {
    const [user, setUser] = useState({
        id: '',
        username: '',
        password: '',
        fullName: '',
        address: '',
        gender: '',
        phoneNumber: '',
    });
    const [errMessage, setErrMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [showSignupContainer, setShowSignupContainer] = useState(false);

    const signupRef = useRef(null);

    const navigate = useNavigate();

    // Lắng nghe sự kiện khi nhập vào input
    const handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        // console.log(`Changed ${name}: ${value}`);
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Xử lý đăng nhập với api
    const handleLogin = async () => {
        setErrMessage('');
        try {
            let data = await hanldeLoginApi(user.username, user.password);
            if (data && data.errCode !== 0) {
                setErrMessage(data.message);
            }
            if (data && data.errCode === 0) {
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                const userRole = data.user.roleId;
                if (userRole === '0') {
                    navigate('/admin'); 
                } else {
                    navigate('/'); 
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrMessage(error.response.data.message); // Cập nhật thông báo lỗi
            } else {
                setErrMessage('Đăng nhập thất bại. Vui lòng thử lại.');
            }
            toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    // Xử lý đăng ký với Api
    const handleSignup = async () => {
        try {
            const hashedPassword = await hashPassword(user.password);
            let data = await handleSignupApi(
                user.email,
                hashedPassword,
                user.fullName,
                user.address,
                user.gender,
                user.phoneNumber,
            );
            if (data && data.status === 200) {
                console.log('Đăng ký thành công');
                // Hiển thị thông báo thành công
                toast.success('Đăng ký thành công!');
                // Đóng form đăng ký
                toggleSignupContainer();
            } else {
                // Xử lý khi đăng ký thất bại
                // console.log(data)
                console.error('Đăng ký thất bại:', data?.data?.message);
                // Hiển thị thông báo lỗi
                toast.error('Đăng ký thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
            // Hiển thị thông báo lỗi
            toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    

    const handleHideShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleSignupContainer = () => {
        setShowSignupContainer(!showSignupContainer);
    };

    const handleOutsideClick = (event) => {
        if (signupRef.current && !signupRef.current.contains(event.target)) {
            setShowSignupContainer(false); // Hide signup-container
        }
    };

    return (
        <div className="login" onClick={handleOutsideClick}>
            
            <div
                className="login-container"
                style={{ display: showSignupContainer ? 'none' : 'flex' }}
            >
                <div className="content-left">
                    <div className="brand">
                        <h1>PETCARE</h1>
                    </div>
                    <div className="detail">
                        <p>Đăng nhập để sử dụng dịch vụ</p>
                    </div>
                </div>
                <div className="content-right">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email"
                            name="username"
                            value={user.username}
                            onChange={handleOnChangeInput}
                            autoComplete="username"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            name="password"
                            value={user.password}
                            onChange={handleOnChangeInput}
                            autoComplete="current-password"
                        />
                        <button
                            className="input-icon"
                            onClick={handleHideShowPassword}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                            />
                        </button>
                    </div>
                    <div style={{ color: 'red' }}>
                        {errMessage}
                        {}
                    </div>
                    <button className="btn-login" onClick={handleLogin}>
                        Đăng nhập
                    </button>
                    <p className="text">Quên mật khẩu ?</p>
                    <hr />
                    <button
                        className="btn-signup"
                        onClick={toggleSignupContainer}
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
            <ToastContainer className="login-alert" />
            {showSignupContainer && (
                <div className="signup-container">
                    <div className="signup-content" ref={signupRef}>
                        <div className="signup-form">
                            <label>Email</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                            <label>Mật khẩu</label>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    value={user.password}
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                            <label>Họ và tên</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                            <label>Số điện thoại</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                            <label>Địa chỉ</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    name="address"
                                    value={user.address}
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                            <label>Giới tính</label>
                            <div
                                className="input-group"
                                style={{ marginBottom: '40px' }}
                            >
                                <select
                                    name="gender"
                                    value={user.gender}
                                    onChange={handleOnChangeInput}
                                >
                                    <option value="0">Nam</option>
                                    <option value="1">Nữ</option>
                                </select>
                            </div>
                            <hr />
                            <div className="group-btn">
                                <button
                                    className="btnsignup"
                                    onClick={handleSignup}
                                >
                                    Đăng Ký
                                </button>
                                <button
                                    className="btnlogin"
                                    onClick={toggleSignupContainer}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
