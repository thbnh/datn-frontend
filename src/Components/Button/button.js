import './button.scss';
import { Link } from 'react-router-dom';

function Buttons({children, to, href, onClick, className, headerbtn = false, navbtn = false, mainbtn = false, leftIcon, rightIcon, ...passProps}) {

    let Btn = 'button';
    let props = {onClick, ...passProps}
    let classes = `${className ? className : ''} ${headerbtn ? 'headerbtn' : ''} ${navbtn ? 'navbtn' : ''} ${mainbtn ? 'mainbtn' : ''} btn-comp`;

    if (to) {
        props.to = to;
        Btn = Link;
    } else if (href) {
        props.href = href;
        Btn = 'a';
    }
    return (
        <Btn className= {classes} {...props}>
            {leftIcon && <span className='left-icon'>{leftIcon}</span>}
            <span className='title'>{children}</span>
            {rightIcon && <span className='right-icon'>{rightIcon}</span>}
        </Btn>
    )
}

export default Buttons;