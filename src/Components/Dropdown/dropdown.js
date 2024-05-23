import Tippy from '@tippyjs/react/headless';
import './dropdown.scss';
import Buttons from '../Button/button';

function Dropdown({children}) {
    return (
        <div>
            <Tippy
                interactive={true}
                delay={[200, 200]}
                placement="bottom"
                render={(attrs) => {
                    return (
                        <div className='dropdown-container' tabIndex="-1" {...attrs}>
                            <div className='dropdown-wrapper'>
                                <Buttons className='dropdown-btn'>Tắm cho thú</Buttons>
                                <hr />
                                <Buttons className='dropdown-btn'>Cắt, tỉa lông</Buttons>
                                <hr />
                                <Buttons className='dropdown-btn'>Trông nom thú</Buttons>
                            </div>
                        </div>
                    );
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Dropdown;
