import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserSua() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data
        fetch(`http://localhost:3000/admin/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.role || !user.dia_chi || !user.dien_thoai) {
            alert("Vui lòng điền đầy đủ thông tin người dùng.");
            return;
        }

        fetch(`http://localhost:3000/admin/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(`Lỗi: ${data.error}`);
            } else {
                alert('Đã cập nhật người dùng thành công');
                navigate("/admin/users");
            }
        })
        .catch(err => {
            console.error(`Lỗi: ${err.message}`);
            alert(`Lỗi: ${err.message}`);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-right-top-content">
            <div className="frmaddsp-khung">
                <form id="frmaddsp" onSubmit={handleSubmit}>
                    <h2>Sửa Người Dùng</h2>
                    <div className="row mb-3">
                        <div className='col'>Tên
                            <input
                                name="name"
                                value={user.name || ''}
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className='col'>Email
                            <input
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                type="email"
                                className="form-control"
                            />
                        </div>
                        <div className='col'>Vai trò
                            <select
                                name="role"
                                value={user.role || ''}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="" disabled>Chọn vai trò</option>
                                <option value="0">Người dùng</option>
                                <option value="1">Quản trị viên</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>Địa chỉ
                            <input
                                name="dia_chi"
                                value={user.dia_chi || ''}
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className='col'>Số điện thoại
                            <input
                                name="dien_thoai"
                                value={user.dien_thoai || ''}
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <button className="btn btn-warning" type="submit">Cập nhật người dùng</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserSua;
