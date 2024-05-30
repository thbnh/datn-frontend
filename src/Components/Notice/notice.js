import Tippy from '@tippyjs/react/headless';
import './notice.scss';

function Notice({children}) {
    return (
        <div>
            <Tippy
                interactive={true}
                delay={[200, 200]}
                placement="bottom"
                render={(attrs) => {
                    return (
                        <div className='notice-container' tabIndex="-1" {...attrs}>
                            <div className='dropdown-wrapper'>
                                <h3>Bạn đã đặt dịch vụ thành công</h3>
                                <hr/>
                                <div className='notice-wrapper'>
                                    <p>Dịch vụ: tắm cho thú</p>
                                    <p>Tên thú nuôi: Chó</p>
                                    <p>Tên người dùng: Thanh Bình</p>
                                    <p>Gía: 100.000đ</p>
                                    <p>Ngày: 27-05-2024</p>
                                </div>
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

export default Notice;