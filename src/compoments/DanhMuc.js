import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function DanhMuc() {
    const [listDM, ganlistDM] = useState([]);
    const navigate = useNavigate();

    const xoaDM = (id) => {
        if (window.confirm('Bạn chắc muốn xóa?') === false) return;

        fetch(`http://localhost:3000/admin/danhmuc/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw res; // Chuyển tiếp lỗi để xử lý trong .catch
                }
                return res.json();
            })
            .then(data => {
                alert("Xóa danh mục thành công");
                // Cập nhật state để loại bỏ danh mục đã bị xóa
                ganlistDM(listDM.filter(dm => dm.danh_muc_id !== id));
            })
            .catch(err => {
                err.json().then(errorData => {
                    if (errorData && errorData.message && errorData.message.includes("có sản phẩm")) {
                        alert("Danh mục có sản phẩm, không thể xóa.");
                    } else {
                        alert("Danh mục có sản phẩm, không thể xóa.");
                    }
                }).catch(() => {
                    alert("Lỗi không xác định.");
                });
            });
    };

    useEffect(() => {
        fetch("http://localhost:3000/admin/danhmuc")
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    ganlistDM(data.data);
                } else {
                    console.error("API không trả về dữ liệu mong muốn:", data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (
        <div className="main-right-top-content">
            <h3>Danh Mục</h3>

            <div className="container-product-admin">
                <div className="container-product-admin-title">
                    <h3>Danh Mục</h3>
                    <Link to={"/admin/dmthem"}>
                        <button id="openAppPage"> <i className="fa-solid fa-plus"></i> Thêm Danh Mục</button>
                    </Link>
                </div>
                <div className="content-table-product-admin">
                    <table className="table-danhmuc">
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>STT</th>
                                <th style={{ width: "20%" }}>Tên Danh Mục</th>
                                <th style={{ width: "10%" }}>Slug</th>
                                <th style={{ width: "10%" }}>Số Sản Phẩm</th>
                                <th style={{ width: "10%" }}>Thứ Tự</th>
                                <th style={{ width: "10%" }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDM.map((dm, i) => (
                                <tr key={dm.danh_muc_id}>
                                    <td>{i + 1}</td>
                                    <td><b>{dm.ten_loai}</b></td>
                                    <td><b>{dm.slug}</b></td>
                                    <td><b>{dm.so_san_pham}</b></td>
                                    <td><b>{dm.thu_tu}</b></td>
                                    <td>
                                        <Link to={`/admin/dmsua/${dm.danh_muc_id}`}>
                                            <button className="openEditPage admin-product-edit"><i className="fa-solid fa-pencil"></i></button>
                                        </Link>
                                        <button className="admin-product-remove-item" onClick={() => xoaDM(dm.danh_muc_id)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DanhMuc;
