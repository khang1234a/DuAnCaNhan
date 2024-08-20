import './App.css';
import Home from './compoments/home.js';
import SanPham from './compoments/SanPham.js';
import DanhMuc from './compoments/DanhMuc.js';
import NotFound from './compoments/NotFound.js';
import Users from './compoments/Users.js';
import SanPhamThem from './compoments/SanPhamThem.js';
import TimKiem from './compoments/timkiem.js';
import SanPhamMoi from './compoments/SanPhamMoi.js';
import SanPhamHot from './compoments/SanPhamHot.js';
import ChiTiet from './compoments/Detail.js';
import DanhMucThem from './compoments/DanhMucThem.js';
import DanhMucSua from './compoments/DanhMucSua.js';
import SanPhamGiaGiamDan from './compoments/SanPhamGiaGiamDan.js';
import SanPhamGiaTangDan from './compoments/SanPhamGiaTangDan.js';
import SanPhamNhieuLuotXem from './compoments/SanPhamNhieuLuotXem.js';
import SanPhamSua from './compoments/SanPhamSua.js';
import DangNhap from './compoments/DangNhap.js';
import Download from './compoments/download.js';
import DangKy from './compoments/register.js';
import ProtectedRoute from './compoments/ProtectedRoute.js';
import { useSelector } from 'react-redux';
import Thoat from './compoments/thoat.js';
import UserSua from './compoments/UserSua.js';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
function App() {
  const user = useSelector(state => state.auth.user);
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  return (
    <BrowserRouter basename="/">

      <div className="container">
        <div className="container-all-content">
          <div className="container-left">
            <div className="ct-left-content-temple-top">
              <div className="content-temple-top-img">
                <div className="content-temple-top-img-vien">
                  <a href="#/"> <img src="/img/Raica.jpg" alt="" /></a>
                </div>
              </div>
              <h3>FISH CODE</h3>
              <div className="content-temple-top-icon-thongke">
                <div className="content-temple-top-icon-thongke-1">
                  <i className="fa-regular fa-eye"></i>
                  <span>2,594</span>
                </div>
                <div className="content-temple-top-icon-thongke-1">
                  <i className="fa-regular fa-comment"></i>
                  <span>465</span>
                </div>
                <div className="content-temple-top-icon-thongke-1">
                  <i className="fa-regular fa-heart"></i>
                  <span>551</span>
                </div>
              </div>
              <div className="content-temple-top-button">
                <button>Follow</button>
                <button>Message</button>
              </div>
            </div>
            <div className="ct-left-content-temple-bottom">
              <div className="ct-left-content-temple-bottom-menu">
                <ul>
                  <li><Link to={"/home"} ><a href="#/"><i className="fa-solid fa-house"></i> <span>Dashboard</span></a></Link></li>
                  <li> <Link to={"/admin/sanpham"}><a href="#/"><i className="fa-brands fa-slack"></i> <span>Sản Phẩm</span></a></Link></li>
                  <li><Link to={"/admin/danhmuc"}><a href="#/"><i class="fa-solid fa-list"></i><span>Danh Mục</span></a></Link></li>
                  <li><Link to={"/admin/users"}><a href="#/"><i class="fa-solid fa-user"></i> <span>Users</span></a></Link></li>
                  <li><Link><a href="#/"><i className="fa-solid fa-handshake"></i> <span>Thư Viện</span></a></Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-right">
            <div className="header-right-top-content-all">
              <div className="header-right-top-content">
                <div className="header-right-top-content-icon">
                  <i className="fa-solid fa-bars"></i>
                </div>
                <div className="header-right-top-content">
                  <span>Và Oke nó gọi chẳng mấy khi!</span>
                  <span>Liên Hệ: TCK</span>
                  <button>More <i className="fa-solid fa-chevron-down"></i></button>
                </div>
                <div className="header-right-top-content-myselft">
                  <div className="header-right-top-content-myselft-information">
                    <i className="fa-solid fa-bell"></i>
                    <span className="thongbao-bell">8</span>
                    <div className="right-top-content-myselft-information-table">
                      <ul className="ul-tamgiac-informaintion">
                        <li>
                          <img src="/img/anhthongtin.jpg" alt="" />
                          <div className="thongtin-bell-information">
                            <h4>Tin Cấp Báo</h4>
                            <span>
                              Ăn Ngủ và Code
                            </span>
                          </div>
                        </li>
                        <li>
                          <img src="/img/anhthongtin.jpg" alt="" />
                          <div className="thongtin-bell-information">
                            <h4>Tin Cấp Báo</h4>
                            <span>
                              Ăn Ngủ và Code
                            </span>
                          </div>
                        </li>
                        <li>
                          <img src="/img/anhthongtin.jpg" alt="" />
                          <div className="thongtin-bell-information">
                            <h4>Tin Cấp Báo</h4>
                            <span>
                              Ăn Ngủ và Code
                            </span>
                          </div>
                        </li>
                        <li>
                          <img src="/img/anhthongtin.jpg" alt="" />
                          <div className="thongtin-bell-information">
                            <h4>Tin Cấp Báo</h4>
                            <span>
                              Ăn Ngủ và Code
                            </span>
                          </div>
                        </li>
                        <li>
                          <img src="/img/anhthongtin.jpg" alt="" />
                          <div className="thongtin-bell-information">
                            <h4>Tin Cấp Báo</h4>
                            <span>
                              Ăn Ngủ và Code
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="right-top-content-myselft-img">
                    <img src="/img/Raica.jpg" alt="" />
                  </div>
                  <div className="right-top-content-myselft-content">

                    <span>
                      {user === null || user === undefined ? "Chào Quý Khách" : "Chào bạn " + user.name}
                      <i className="fa-solid fa-caret-down"></i>

                      <div className="top-content-myselft-content-table">
                        <ul className="ul-tamgiac">

                          {user === null || user === undefined ? (
                            <li><Link to={"/admin/dangnhap"}> <i className="fa-solid fa-user"></i> Đăng Nhập</Link></li>

                          ) : null}

                          {user !== null && user !== undefined ? (
                            <li>
                              <Link to={`/usersua/${user.id}`}>
                                <i className="fa-solid fa-user"></i>Thông Tin Người Dùng
                              </Link>
                            </li>
                          ) : null}

                          <li><a href="/#"><i className="fa-solid fa-gear"></i> Cài Đặt</a></li>
                          {user !== null && user !== undefined ? (
                            <Thoat />
                          ) : null}
                        </ul>
                      </div>
                    </span>

                  </div>
                </div>
              </div>
              <Routes>
                <Route path="/home" exact element={<Home />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin/spthem" exact element={<SanPhamThem />} />
                  <Route path="/admin/spsua/:id" exact element={<SanPhamSua />} />
                  <Route path="/admin/dmthem/" exact element={<DanhMucThem />} />
                  <Route path="/admin/dmsua/:id" exact element={<DanhMucSua />} />
                  <Route path="/admin/usersua/:id" exact element={<UserSua />} />

                  <Route path="/admin/spmoi" exact element={<SanPhamMoi />} />
                  <Route path="/admin/spnhieuluotxem" exact element={<SanPhamNhieuLuotXem />} />
                  <Route path="/admin/sphot" exact element={<SanPhamHot />} />
                  <Route path="/admin/giagiamdan" exact element={<SanPhamGiaGiamDan />} />
                  <Route path="/admin/giatangdan" exact element={<SanPhamGiaTangDan />} />
                  <Route path="/admin/chitiet/:id" exact element={<ChiTiet />} />

                </Route>
                <Route path="/admin/sanpham" exact element={<SanPham />} />
                <Route path="/admin/danhmuc" exact element={<DanhMuc />} />
                <Route path="/admin/users" exact element={<Users />} />


                <Route path="/register" exact element={<DangKy />} />

                <Route path="/admin/dangnhap" exact element={<DangNhap />} />
                <Route path="/timkiem" exact element={<TimKiem />} />


                <Route path="/download" exact element={daDangNhap === true ? <Download /> : <Navigate to="/admin/dangnhap" />} />

                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;