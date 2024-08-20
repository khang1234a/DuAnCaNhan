import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DanhMucThem() {
    const [category, setCategory] = useState({
        ten_loai: '',
        slug: '',
        thu_tu: "",
        an_hien: false
    });
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
        if (!category.ten_loai || !category.slug) {
            console.error("Vui lòng điền đầy đủ thông tin danh mục.");
            alert("Vui lòng điền đầy đủ thông tin danh mục.");
            return;
        }

        let url = `http://localhost:3000/admin/danhmuc`;
        let opt = {
            method: 'POST',
            body: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(`Lỗi: ${data.error}`);
                    alert(`Lỗi: ${data.error}`);
                } else {
                    console.log('Đã thêm danh mục thành công');
                    alert('Đã thêm danh mục thành công');
                    navigate('/admin/danhmuc');
                }
            })
            .catch(err => {
                console.error(`Lỗi: ${err.message}`);
                alert(`Lỗi: ${err.message}`);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="main-right-top-content">
            <div className="frmaddsp-khung">
                <form id="frmaddsp">
                    <h2>Thêm danh mục</h2>
                    <div className="row mb-4">
                        <div className='col '>Tên Danh Mục <input name="ten_loai" value={category.ten_loai} onChange={handleChange} type="text" className="form-control" placeholder='Nhập tên danh mục...' /> </div>
                      
                    </div>
                    <div className="row mb-4">
                       
                        <div className='col '>Slug <br/> <input name="slug" value={category.slug} onChange={handleChange} type="text" className="form-control" placeholder='Nhập tên slug...' /> </div>
                    </div>
                    <div className="row mb-4">
                    <span>Ẩn Hiện</span>
                        <div className='col '> <input name="thu_tu" value={category.thu_tu} onChange={handleChange} type="number" className="form-control" placeholder='Nhập tên thứ tự...' /> </div>
                    </div>
                    <div className="row mb-3">
                    <span>Ẩn Hiện</span>
                        <div className='col '> <input name="an_hien" checked={category.an_hien} onChange={handleChange} type="checkbox" className="form-control" /> </div>
                    </div>
                    <div className="row mb-3" >
                        <button className="btn-danhmuc" type="button" onClick={submitDuLieu}>Thêm Danh Mục</button> &nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DanhMucThem;
