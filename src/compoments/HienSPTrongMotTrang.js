import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HienSPTrongMotTrang({ spTrongTrang }) {
    const [products, setProducts] = useState(spTrongTrang);


    useEffect(() => {
        setProducts(spTrongTrang);
    }, [spTrongTrang]);

    const xoaSP = (id) => {
        if (window.confirm('Bạn chắc muốn xóa?') === false) return;

        fetch(`http://localhost:3000/admin/sp/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Lỗi khi xóa sản phẩm');
                }
                return res.json();
            })
            .then(data => {
                alert("Xóa Sản Phẩm Thành Công");
                // Cập nhật state để loại bỏ sản phẩm đã bị xóa
                setProducts(products.filter(sp => sp.id !== id));
            })
            .catch(error => {
                console.error('Lỗi:', error);
                alert('Lỗi khi xóa sản phẩm');
            });
    };

    return (
        <tbody>
            {products.map((sp, i) => (
                <tr key={sp.id}>
                    <td>{i + 1}</td>
                    <td><b><Link to={"/admin/chitiet/" + sp.id}>{sp.ten_sp}</Link></b>
                    <br/>
                    <i>Ram: {sp.ram}</i>&nbsp;
                    <i>CPU: {sp.cpu}</i>&nbsp;
                    <i>Đĩa Cứng: {sp.dia_cung}</i>&nbsp;

                    </td>
                    <td><img src={sp.hinh} alt="" style={{ width: '150px' }} /></td>
                    <td>{typeof sp.gia === 'number' ? sp.gia.toLocaleString('vi') : sp.gia} VNĐ</td>
                    <td>{typeof sp.gia_km === 'number' ? sp.gia_km.toLocaleString('vi') : sp.gia_km} VNĐ</td>
                    <td><b>{sp.ten_loai}</b></td>
                    <td>{sp.luot_xem} &nbsp; <i className="fa-solid fa-eye"></i></td>
                    <td>{new Date(sp.ngay).toLocaleDateString('vi')}</td>
                    <td>
                        <Link to={"/admin/spsua/" + sp.id}>
                            <button className="openEditPage admin-product-edit" data-id=""><i className="fa-solid fa-pencil"></i></button>
                        </Link>
                        <button className="detelePro admin-product-remove-item" onClick={() => xoaSP(sp.id)}><i className="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default HienSPTrongMotTrang;
