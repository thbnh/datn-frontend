import Buttons from '../../Components/Button/button';
import { handleUpdateUserApi } from '../../service/userService';
import { getPetsByUserIdApi, handleAddPetApi } from '../../service/petService';
import './users.scss';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Users() {
    const [userId, setUserId] = useState('');
    const [activeForm, setActiveForm] = useState('');
    const [userInfo, setUserInfo] = useState({
        email: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        gender: '',
    });

    const [pets, setPets] = useState([]);
    const [petInfo, setPetInfo] = useState({
        petName: '',
        petType: '',
        petWeight: '',
        userId: '',
    });
    // Trang thai hien thi form them vat buoi
    const [showCreatePetForm, setShowCreatePetForm] = useState(false);
    // Xử lý viêc đóng mở Form thông tin
    const handleShowForm = (table) => {
        setActiveForm(activeForm === table ? '' : table);
    };

    //
    const handleShowCreatePetForm = () => {
        setShowCreatePetForm(!showCreatePetForm);
    };

    const createPetFormRef = useRef(null);

    const handleOutClick = (event) => {
        if (
            createPetFormRef.current &&
            !createPetFormRef.current.contains(event.target)
        ) {
            setShowCreatePetForm(false);
        }
    };

    // Lấy thông tin người dùng từ LocalStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);
    // Lấy userId từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
        }
    }, []);
    // Trạng thái biến userId từ localStorage thành userId trên pet
    useEffect(() => {
        setPetInfo((prevPetInfo) => ({
            ...prevPetInfo,
            userId: userId,
        }));
    }, [userId]);

    // Thay đổi dữ liệu khi nhập input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setPetInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //  Sửa thông tin người dùng với API
    const handleUpdateUser = async () => {
        try {
            const data = await handleUpdateUserApi(userInfo.id, userInfo);
            if (data.status === '200') {
                localStorage.setItem('user', JSON.stringify(userInfo));
                toast.success('Cập nhật thông tin người dùng thành công');
            } else {
                toast.error(`Cập nhật không thành công: ${data.errMessage}`);
            }
        } catch (error) {
            console.error('Lỗi khi sửa thông tin:', error);
            toast.error('Đã xảy ra lỗi khi sửa thông tin của bạn');
        }
    };

    useEffect(() => {
        if (userId) {
            const getPetsByUserId = async () => {
                try {
                    const data = await getPetsByUserIdApi(userId);
                    setPets(data);
                    console.log(data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách thú nuôi:', error);
                }
            };
            getPetsByUserId();
        }
    }, [userId]);

    // Thêm vật nuôi bằng id người dùng
    const handleCreatePet = async () => {
        try {
            const infoUser = localStorage.getItem('user');
            const id = JSON.parse(infoUser).id;
            const data = await handleAddPetApi(
                petInfo.petName,
                petInfo.petType,
                petInfo.petWeight,
                id,
            );
            if (data && data.status === '200') {
                console.log('Thêm thành công');
                toast.success('Thêm thành công!');
                handleShowCreatePetForm();
            } else {
                console.error('Thêm thất bại:', data?.data?.errMessage);

                toast.error('Thêm thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm thú cưng:', error);
            toast.error('Đã xảy ra lỗi khi thêm thú cưng');
        }
    };

    return (
        <div onClick={handleOutClick} className="user-container">
            <div
                className="user-content"
                style={{
                    display: showCreatePetForm ? 'none' : 'flex',
                }}
            >
                <div className="content-left col-3">
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowForm('user')}
                    >
                        Thông tin của bạn
                    </Buttons>
                    <hr />
                    <Buttons
                        className="content-btn"
                        onClick={() => handleShowForm('pet')}
                    >
                        Danh sách vật nuôi của bạn
                    </Buttons>
                </div>
                <ToastContainer />
                <div className="content-right col-9">
                    {activeForm === 'user' && (
                        <>
                            <div className="first">
                                <div className="first-group">
                                    <label>Email</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Họ và tên</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userInfo.fullName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Địa chỉ</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="address"
                                            value={userInfo.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="second-group">
                                    <label>Số điện thoại</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={userInfo.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label>Giới tính</label>
                                <div className="input-group">
                                    <select
                                        name="gender"
                                        value={userInfo.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Buttons
                                    className="sua-btn"
                                    mainbtn
                                    onClick={handleUpdateUser}
                                >
                                    Sửa
                                </Buttons>
                            </div>
                        </>
                    )}

                    {activeForm === 'pet' && (
                        <>
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Tên thú nuôi</th>
                                        <th>Loài</th>
                                        <th>Cân nặng (kg)</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet.id}>
                                            <td>{pet.petName}</td>
                                            <td>{pet.petType}</td>
                                            <td>{pet.petWeight}</td>
                                            <td
                                                style={{
                                                    padding: '0',
                                                    display: 'flex',
                                                    width: '100%',
                                                    border: 'none',
                                                }}
                                            >
                                                <Buttons
                                                    className="edit-btn"
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                        />
                                                    }
                                                >
                                                    Sửa
                                                </Buttons>
                                                <Buttons
                                                    className="delete-btn"
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                        />
                                                    }
                                                >
                                                    Xóa
                                                </Buttons>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <Buttons
                                    className="sua-btn"
                                    mainbtn
                                    onClick={handleShowCreatePetForm}
                                >
                                    Thêm
                                </Buttons>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {showCreatePetForm && (
                <div className="create-background">
                    <div className="create-container" ref={createPetFormRef}>
                        <div className="create-form">
                            <div className="first">
                                <div className="first-group">
                                    <label>Tên</label>
                                    <div className="input-group">
                                        <input
                                            name="petName"
                                            value={petInfo.petName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="first-group">
                                    <label>Loài</label>
                                    <div className="input-group">
                                        <input
                                            name="petType"
                                            value={petInfo.petType}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="second">
                                <div className="second-group">
                                    <label>Cân nặng</label>
                                    <div className="input-group">
                                        <input
                                            name="petWeight"
                                            value={petInfo.petWeight}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="second-group"
                                    style={{ display: 'none' }}
                                >
                                    <label>Chủ sở hữu</label>
                                    <div className="input-group">
                                        <input
                                            name="userId"
                                            value={petInfo.userId}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Buttons
                                    className="exit-btn"
                                    onClick={handleShowCreatePetForm}
                                >
                                    Hủy
                                </Buttons>
                                <Buttons onClick={handleCreatePet}>
                                    Thêm
                                </Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
