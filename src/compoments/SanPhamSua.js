import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SanPhamSua() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [sp, setSP] = useState({});

    useEffect(() => {
        // Fetch danh mục sản phẩm
        fetch("http://localhost:3000/admin/danhmuc")
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    setCategories(data.data);
                } else {
                    console.error("API không trả về mảng:", data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });

        // Fetch sản phẩm theo ID
        let url = `http://localhost:3000/admin/sp/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    setSP(data.data);
                } else {
                    console.error('Không tìm thấy sản phẩm:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const submitDuLieu = (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (!sp?.ten_sp || !sp?.gia || !sp?.ngay || !sp?.gia_km || !sp?.id_loai) {
            console.error("Vui lòng điền đầy đủ thông tin sản phẩm.");
            alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
            return;
        }

        let url = `http://localhost:3000/admin/sp/${id}`;
        let opt = {
            method: 'PUT',
            body: JSON.stringify(sp),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(`Lỗi: ${data.error}`);
                    alert(`Lỗi: ${data.error}`);
                } else {
                    console.log('Đã cập nhật sản phẩm thành công');
                    alert('Đã cập nhật sản phẩm thành công');
                    navigate('/admin/sanpham');
                }
            })
            .catch(err => {
                console.error(`Lỗi: ${err.message}`);
                alert(`Lỗi: ${err.message}`);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setSP(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className="main-right-top-content">
            <div className="frmaddsp-khung">
                <form id="frmaddsp">
                    <h2>Sửa sản phẩm</h2>
                    <div className="row mb-3">
                        <div className='col'>Tên SP <input name="ten_sp" value={sp?.ten_sp || ''} onChange={handleChange} type="text" className="form-control" /> </div>
                        <div className='col'>Slug <input name="slug" value={sp?.slug || ''} onChange={handleChange} type="text" className="form-control" /> </div>
                        <div className='col'>Giá <input name="gia" value={sp?.gia || ''} onChange={handleChange} type="number" className="form-control" /> </div>
                        <div className='col'>Giá KM <br /><input name="gia_km" value={sp?.gia_km || ''} onChange={handleChange} type="number" className="form-control" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>Hình <input name="hinh" value={sp?.hinh || ''} onChange={handleChange} type="text" className="form-control" /> </div>
                        <div className='col'>Ngày <input name="ngay" value={sp?.ngay || ''} onChange={handleChange} type="date" className="form-control" /> </div>
                        <div className='col'>Lượt xem <input name="luot_xem" value={sp?.luot_xem || ''} onChange={handleChange} type="number" className="form-control" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            Danh Mục
                            <select name="id_loai" value={sp?.id_loai || ''} onChange={handleChange} className="form-control">
                                <option value="">Chọn danh mục</option>
                                {categories.map(cat => (
                                    <option key={cat.danh_muc_id} value={cat.danh_muc_id}>{cat.ten_loai}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col'>Hot <input name="hot" checked={sp?.hot || false} onChange={handleChange} type="checkbox" className="form-control" /> </div>
                        <div className='col'>Ẩn Hiện <input name="an_hien" checked={sp?.an_hien || false} onChange={handleChange} type="checkbox" className="form-control" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>RAM <input name="ram" value={sp?.ram || ''} onChange={handleChange} type="text" className="form-control" placeholder="VD: 16GB" /> </div>
                        <div className='col'>CPU <input name="cpu" value={sp?.cpu || ''} onChange={handleChange} type="text" className="form-control" placeholder="VD: Intel Core i7" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>Đĩa cứng <input name="dia_cung" value={sp?.dia_cung || ''} onChange={handleChange} type="text" className="form-control" placeholder="VD: 512GB SSD" /> </div>
                    </div>
                    <div className='mb-3'>
                        <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Cập nhật sản phẩm</button> &nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SanPhamSua;
