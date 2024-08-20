// data: Đảm bảo rằng data không phải là null hoặc undefined.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhanTrang from './PhanTrang.js';
import SearchBar from './searchbar.js';
function SanPham() {
    const [ListSP, ganListSP] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/admin/sp")
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    ganListSP(data.data);
                } else {
                    console.error("API không trả về mảng:", data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
            });
    }, []);
   

    return (<>
        <div className="main-right-top-content">
            <div className="right-top-content-title-and-search">
                <h3>Sản Phẩm</h3>
                <SearchBar />
            </div>
            <div className="container-product-admin">
                <div className="container-product-admin-title">
                <div className="product-admin-title-filter">
                        Lọc Sản Phẩm <i class="fa-solid fa-filter"></i>
                        <ul>
                            <li><Link to={"/admin/sphot"}><a href="#/"> Sản Phẩm Hot <i class="fa-solid fa-fire"></i></a></Link></li>
                            <li><Link to={"/admin/spnhieuluotxem"}><a href="#/"> Sản Phẩm Nhiều Lượt Xem <i class="fa-solid fa-eye"></i></a></Link></li>
                            <li><Link to={"/admin/spmoi"}><a href="#/"> Sản Phẩm Mới <i class="fa-solid fa-check"></i></a></Link></li>
                            <li><Link to={"/admin/giagiamdan"}><a href="#/"> Giá Giảm Dần<i class="fa-solid fa-arrow-down-wide-short"></i></a></Link></li>
                            <li><Link to={"/admin/giatangdan"}><a href="#/"> Giá Tăng Dần   <i class="fa-solid fa-arrow-down-short-wide"></i></a></Link></li>
                        </ul>

                    </div>
                    <Link to={"/admin/spthem"}>
                        <button id="openAppPage"> <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm</button>
                    </Link>
                </div>
                <div className="content-table-product-admin">
                    <table>
                        <thead>
                            <tr>
                                <th >STT</th>
                                <th style={{width: 300 +"px"}}> Tên Sản Phẩm</th>
                                <th>Hình Ảnh</th>
                                <th>Giá</th>
                                <th>Giá Khuyến Mãi</th>
                                <th>Danh Mục</th>
                                <th style={{width: 100 +"px"}}>Lượt Xem</th>
                                <th>Ngày</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <PhanTrang listSP={ListSP} pageSize={12} />
                    </table>
                </div>
            </div>
        </div>
    </>

    )
}
export default SanPham;