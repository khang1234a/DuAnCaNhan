import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SanPhamThem() {
    let sp = {};  // Biến tạm để lưu trữ dữ liệu sản phẩm
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the API
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
    }, []);

    const submitDuLieu = () => {
        // Kiểm tra dữ liệu đầu vào
        if (!sp.ten_sp || !sp.gia || !sp.hinh || !sp.ngay || !sp.gia_km || !sp.id_loai) {
            console.error("Vui lòng điền đầy đủ thông tin sản phẩm.");
            alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
            return;
        }

        let url = `http://localhost:3000/admin/sp`;
        let opt = {
            method: 'POST',
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
                    console.log('Đã thêm sản phẩm thành công');
                    alert('Đã thêm sản phẩm thành công');
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
        sp[name] = type === 'checkbox' ? checked : value;
    };

    return (
        <div className="main-right-top-content">
            <div className="frmaddsp-khung">
                <form id="frmaddsp">
                    <h2>Thêm sản phẩm</h2>
                    <div className="row mb-3">
                        <div className='col'>Tên SP <input name="ten_sp" onChange={handleChange} type="text" className="form-control" placeholder="Nhập tên sản phẩm" /> </div>
                        <div className='col'>Slug <input name="slug" onChange={handleChange} type="text" className="form-control" placeholder="Nhập slug" /> </div>
                        <div className='col'>Giá <input name="gia" onChange={handleChange} type="number" className="form-control" placeholder="Nhập giá" /> </div>
                        <div className='col'>Giá KM <input name="gia_km" onChange={handleChange} type="number" className="form-control" placeholder="Nhập giá khuyến mãi" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>Hình <input name="hinh" onChange={handleChange} type="text" className="form-control" placeholder="Nhập URL hình ảnh" /> </div>
                        <div className='col'>Ngày <input name="ngay" onChange={handleChange} type="date" className="form-control" /> </div>
                        <div className='col'>Lượt xem <input name="luot_xem" onChange={handleChange} type="number" className="form-control" placeholder="Nhập lượt xem" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            Danh Mục
                            <select name="id_loai" onChange={handleChange} className="form-control">
                                <option value="">Chọn danh mục</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.danh_muc_id}>{cat.ten_loai}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col'>Hot <input name="hot" onChange={handleChange} type="checkbox" className="form-control" /> </div>
                        <div className='col'>Ẩn Hiện <input name="an_hien" onChange={handleChange} type="checkbox" className="form-control" /> </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            RAM
                            <select name="ram" onChange={handleChange} className="form-control">
                                <option value="">Chọn RAM</option>
                                <option value="4GB">4GB</option>
                                <option value="8GB">8GB</option>
                                <option value="16GB">16GB</option>
                                <option value="32GB">32GB</option>
                            </select>
                        </div>
                        <div className='col'>
                            CPU
                            <select name="cpu" onChange={handleChange} className="form-control">
                                <option value="">Chọn CPU</option>
                                <option value="Intel i3">Intel i3</option>
                                <option value="Intel i5">Intel i5</option>
                                <option value="Intel i7">Intel i7</option>
                                <option value="Intel i9">Intel i9</option>
                                <option value="AMD Ryzen 3">AMD Ryzen 3</option>
                                <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                                <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                            </select>
                        </div>
                        <div className='col'>
                            Đĩa cứng
                            <select name="dia_cung" onChange={handleChange} className="form-control">
                                <option value="">Chọn đĩa cứng</option>
                                <option value="256GB SSD">256GB SSD</option>
                                <option value="512GB SSD">512GB SSD</option>
                                <option value="1TB HDD">1TB HDD</option>
                                <option value="2TB HDD">2TB HDD</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>Màu sắc <input name="mau_sac" onChange={handleChange} type="text" className="form-control" placeholder="Nhập màu sắc" /> </div>
                        <div className='col'>Cân nặng <input name="can_nang" onChange={handleChange} type="text" className="form-control" placeholder="Nhập cân nặng" /> </div>
                    </div>
                    <div className='mb-3'>
                        <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Thêm sản phẩm</button> &nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SanPhamThem;
