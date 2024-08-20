// data: Đảm bảo rằng data không phải là null hoặc undefined.
// Tải lại trang hiện tại
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router';
function Users() {
    const [listUsers, ganlistUsers] = useState([]);
    // const navigate = useNavigate();
    const xoaSP = (id) => {
        if (window.confirm('Bạn chắc muốn xóa') === false) return false;
        fetch(`http://localhost:3000/admin/users/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Lỗi khi xóa danh mục');
                }
                return res.json();
            })
            .then(data => {
                alert("Xóa người dùng Thành Công")
                // navigate(0);
                ganlistUsers(prevList => prevList.filter(user => user.id !== id));

            })
    }
    useEffect(() => {
        fetch("http://localhost:3000/admin/users")
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    ganlistUsers(data.data);
                } else {
                    console.error("API không trả về mảng:", data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);

    return (<>

        <div class="main-right-top-content">
            <h3>Dashboard</h3>
            {
                listUsers.map((user, i) => (
                    <div class="main-right-top-content-three-box">
                        <div class="main-right-top-content-three-box-1">
                            <div class="card-box-all-img-message">
                                <div class="card-box-all-img">
                                    <img src="/img/avart.jpg" alt="" />
                                    <span class="light"></span>
                                </div>
                                <div class="card-box-all-btn">
                                    <button class="btn-tiktok"> <i class='bx bxl-tiktok'></i> Follow</button>
                                    <button class="btn-facebook"><i class='bx bxl-facebook'></i>Message</button>
                                </div>
                                <div class="card-box-all-id">
                                    <span class="id-company">{i + 1}</span>
                                </div>
                            </div>
                            <div class="card-box-all-content-information">
                                <div class="box-all-content-information-users">
                                    <h3>
                                        {user.name}
                                    </h3>
                                    <i>Website Design</i>
                                    <div class="content-information-user">
                                        <span class="age-user">Tuổi : 20</span>
                                        <span class="home-user">Quê : Bình Định</span>
                                        <span class="company-user">Công Ty: Trách Nghiệm 1 Thành Viên Tỷ phú tài trợ</span>
                                    </div>
                                    <div class="content-information-salary-nv-btn">
                                        <div class="content-information-salary-nv">
                                            <div class="content-information-salary">
                                                <span>Lương</span>
                                                <b>30 triệu</b>
                                            </div>
                                            <div class="content-information-nv">
                                                <span>Điên Thoại</span>
                                                <b>   {user.dien_thoai}</b>
                                            </div>
                                            <div class="content-information-nv">
                                                <span>Email</span>
                                                <b> {user.email}</b>
                                            </div>
                                        </div>
                                        <div class="content-information-btn">
                                            <a href="#/" onClick={() => xoaSP(user.id)}><button class="remove"><i class='bx bx-trash'  ></i> Xóa Thông Tin</button></a>
                                            <Link to={`/admin/usersua/${user.id}`}>
                                                <a href="#/"><button class="edit"><i class='bx bxs-edit' ></i>Sửa Thông Tin</button></a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                ))
            }
        </div>
    </>

    )
}
export default Users;