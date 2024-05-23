import './component.scss';
import logo from '../../../../assets/img/logo.png';
import { Link } from 'react-router-dom';

function Logo () {
    return (
        <Link to={'/'}>
            <img src={logo} alt='logo' className='logo' />
        </Link>
    )
}

export default Logo;