import './Nav.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Components/logo';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faSignIn,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Buttons from '../../../Components/Button/button';
import Navmenu from './Components/navmenu';

function Nav(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (show) {
            handleClose();
        } else {
            setShow(true);
        }
    };

    const navigate = useNavigate();

    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const closeNavbar = () => {
        setNavbarOpen(false);
    };
    // Sự kiện xử lý khi Menu được chọn
    const handleMenuItemClick = (path) => {
        navigate(path); // Chuyển trang đến đường dẫn được chọn
        handleClose(); // Đóng off-canvas menu
    };

    const [isScrolled, setIsScrolled] = useState(false);

    // Hiệu ứng khi cuộn Navbar
    useEffect(() => {
        let prevScrollPosition = window.scrollY;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 5) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            if (scrollPosition > prevScrollPosition && isNavbarOpen) {
                closeNavbar(); // Cuộn xuống, đóng thanh Navbar
            } else if (scrollPosition <= prevScrollPosition && !isNavbarOpen) {
                setNavbarOpen(true); // Cuộn lên, mở thanh Navbar
            }

            prevScrollPosition = scrollPosition;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isNavbarOpen]);

    return (
        <nav
            className={`navbar ${isScrolled ? 'active' : ''} ${
                isNavbarOpen ? 'open' : ''
            }`}
        >
            <div className={`wrapper ${isScrolled ? 'scrolled' : ''}`}>
                <Logo />
                <Navmenu />
            </div>
            <Button className="bar-btn" variant="none" onClick={handleShow}>
                <FontAwesomeIcon icon={faBars} className="bar-icon" />
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="sidebar-header" closeButton>
                    <Offcanvas.Title>
                        <div onClick={() => handleMenuItemClick('/')}>
                            <Logo />
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Navmenu />
                    <div className="form-btn">
                        <Buttons
                            to={'/signup'}
                            className="login-btn"
                            navbtn
                            leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                        >
                            Đăng ký
                        </Buttons>
                        <Buttons
                            className="login-btn"
                            navbtn
                            leftIcon={<FontAwesomeIcon icon={faSignIn} />}
                        >
                            Đăng nhập
                        </Buttons>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </nav>
    );
}

export default Nav;
