import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function DangKy() {
    const navigate = useNavigate();
    const userRef = useRef({});
    const [error, setError] = useState("");

    const submitDuLieu = () => {
        const user = userRef.current;
        if (!user.name || !user.email || !user.password || !user.confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (user.password !== user.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        const url = "http://localhost:3000/register";
        const opt = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    alert('Đã đăng ký thành công');
                    navigate('/admin/dangnhap');
                }
            })
            .catch(err => {
                setError(`Lỗi: ${err.message}`);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        userRef.current[name] = value;
    };

    return (
        <div className="main-right-top-content">
            <div className="frmaddsp-khung">
                <form id="frmaddsp">
                    <h2>Đăng Ký</h2>
                    <div className="row mb-3">
                        <div className='col'>
                            Tên <input name="name" onChange={handleChange} type="text" className="form-control" placeholder="Nhập tên của bạn" />
                        </div>
                        <div className='col'>
                            Email <input name="email" onChange={handleChange} type="email" className="form-control" placeholder="Nhập email của bạn" />
                        </div>
                        <div className='col'>
                            Mật khẩu <input name="password" onChange={handleChange} type="password" className="form-control" placeholder="Nhập mật khẩu" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            Xác nhận mật khẩu <input name="confirmPassword" onChange={handleChange} type="password" className="form-control" placeholder="Xác nhận mật khẩu" />
                        </div>
                        <div className='col'>
                            Địa chỉ <input name="dia_chi" onChange={handleChange} type="text" className="form-control" placeholder="Nhập địa chỉ của bạn" />
                        </div>
                        <div className='col'>
                            Điện thoại <input name="dien_thoai" onChange={handleChange} type="text" className="form-control" placeholder="Nhập số điện thoại" />
                        </div>
                        <div className='col'>
                            Hình <input name="hinh" onChange={handleChange} type="text" className="form-control" placeholder="Nhập đường dẫn hình" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <div className='mb-3'>
                        <button
                            style={{ backgroundColor: '#333E48', color: '#fff' }} // Thay đổi màu nền và màu chữ theo ý muốn
                            type="button"
                            onClick={submitDuLieu}
                            className="btn btn-info"
                        >
                            Đăng Ký
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default DangKy;
