import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DanhMucSua() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        let url = `http://localhost:3000/admin/danhmuc/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const submitDuLieu = () => {
        // Kiểm tra dữ liệu đầu vào
        if (!category.ten_loai || !category.slug) {
            console.error("Vui lòng điền đầy đủ thông tin danh mục.");
            alert("Vui lòng điền đầy đủ thông tin danh mục.");
            return;
        }

        let url = `http://localhost:3000/admin/danhmuc/${id}`;
        let opt = {
            method: 'PUT',
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
                    console.log('Đã cập nhật danh mục thành công');
                    alert('Đã cập nhật danh mục thành công');
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
                    <h2>Sửa danh mục</h2>
                    <div className="row mb-3">
                        <div className='col'>
                            Tên Danh Mục 
                            <input 
                                name="ten_loai" 
                                value={category.ten_loai} 
                                onChange={handleChange} 
                                type="text" 
                                className="form-control" 
                                placeholder='Nhập tên danh mục...' 
                            /> 
                        </div>
                        <div className='col'>
                            Slug 
                            <input 
                                name="slug" 
                                value={category.slug} 
                                onChange={handleChange} 
                                type="text" 
                                className="form-control" 
                                placeholder='Nhập tên slug...' 
                            /> 
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            Thứ Tự <br/>
                            <input 
                                name="thu_tu" 
                                value={category.thu_tu} 
                                onChange={handleChange} 
                                type="number" 
                                className="form-control" 
                                placeholder='Nhập thứ tự...' 
                            /> 
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            Ẩn Hiện 
                            <input 
                                name="an_hien" 
                                checked={category.an_hien} 
                                onChange={handleChange} 
                                type="checkbox" 
                                className="form-control" 
                            /> 
                        </div>
                    </div>
                    <div className='mb-3'>
                        <button 
                            className="btn btn-warning" 
                            type="button" 
                            onClick={submitDuLieu}
                        >
                            Cập Nhật Danh Mục
                        </button>
                        &nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DanhMucSua;
