import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
function ChiTiet() {
    let { id } = useParams();
    let [sp, setSP] = useState([]);
    let [sanPhamLienQuan, setSanPhamLienQuan] = useState([]);
    useEffect(() => {
        let url = `http://localhost:3000/admin/sp/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.data) {
                    setSP(data.data);
                } else {
                    console.error("API không trả về mảng:", data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
        fetch(`http://localhost:3000/sanphamlienquan/${id}`)
            .then(res => res.json())
            .then(data => setSanPhamLienQuan(data))
            .catch(error => console.error('Error fetching related products:', error));
    }, [id]);

    if (!sp) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="main-right-top-content">

            <div className="container-detail">
                <h2>Chi Tiết Sản Phẩm</h2>
                <div className="container-detail-all">
                    <div className="detail_temple_1">
                        <div className="detail_content_product_name">
                            <h4>{sp?.ten_sp}</h4>
                        </div>
                        <div className="detail_content_product_mota">
                            <span>
                                Laptop ASUS là một trong những dòng sản phẩm nổi bật của hãng ASUS một trong những thương hiệu hàng đầu về công nghệ và điện tử tiêu dùng. Với thiết kế hiện đại, hiệu năng mạnh mẽ và tính năng đa dạng, laptop ASUS phù hợp với nhiều đối tượng người dùng từ sinh viên, nhân viên văn phòng đến các game thủ chuyên nghiệp.
                            </span>
                        </div>
                        <div class="detail_content_product_img_phu">
                            <img src={sp.hinh} alt={sp.ten_sp} />
                            <img src={sp.hinh} alt={sp.ten_sp} />
                            <img src={sp.hinh} alt={sp.ten_sp} />
                            <img src={sp.hinh} alt={sp.ten_sp} />
                        </div>
                    </div>
                    <div className="detail_temple_2">
                        <div className="detail_temple_2_img_main">
                            <img src={sp?.hinh} alt={sp?.ten_sp} />
                        </div>
                        <div className="detail_temple_dieuhuong">
                            <i className='bx bx-chevron-left'></i>
                            <i className='bx bx-chevron-right'></i>
                        </div>
                    </div>
                    <div className="detail_temple_3">
                        <div className="detail_temple_cannang">
                            <h4>Cân Nặng</h4>
                            <div className="detail_temple_cannang_items">
                                <span className="active_cannang">{sp?.Cannang}</span>
                            </div>
                        </div>
                        <div className="detail_temple_review">
                            <h4>Đánh Giá</h4>
                            <div className="temple_review_start">
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bx-star'></i>
                            </div>
                        </div>
                        <div className="detail_temple_price">
                            <h4>Giá</h4>
                            <div className="temple_price_two">
                                <div className="temple_price_sale">
                                    <span>{Number(sp?.gia_km).toLocaleString("vi")} VNĐ</span>
                                </div>
                                <div className="temple_price_giagoc">
                                    <del>{Number(sp?.gia).toLocaleString("vi")} VNĐ</del>
                                </div>
                            </div>
                        </div>
                        <div className="detail_temple_cauhinh">
                            <h4>Cấu Hình</h4>
                            <div className="temple_cauhinh_items">
                                <b>RAM</b>: <i>{sp?.ram}</i> |
                                <b>CPU</b>: <i>{sp?.cpu}</i> |
                                <b>DIA</b>: <i>{sp?.dia_cung}</i>
                            </div>
                        </div>
                        <div className="detail_temple_color">
                            <h4>Màu Sắc</h4>
                            <div className="temple_color_items">
                                <span className="temple_color_black ">{sp.mau_sac}</span>
                                <span className="temple_color_white"></span>
                                <span className="temple_color_green"></span>
                                <span className="temple_color_blue"></span>
                            </div>
                        </div>
                        {/* <div className="detail_temple_btn_all">
                            <button className="detail_addtocart">Thêm vào giỏ</button>
                            <button className="detail_buynow">Mua ngay</button>
                        </div> */}
                    </div>
                </div>
                <div className="container-nav-product-all">
                    <div className="container-nav-product-items-title">
                        <div className="nav-product-items-title-show">
                            <h3>Sản Phẩm Liên Quan</h3>
                        </div>
                    </div>
                    <div className="container-nav-product-items">
                        {sanPhamLienQuan.map((sp, i) => (
                            <div className="nav-product-item" key={i}>
                                <div className="nav-product-item-img">
                                    <Link to={"/sp/" + sp.id} > <img src={sp.hinh} alt={sp.ten_sp} /> </Link>
                                </div>
                                <div className="nav-product-item-category">
                                    <span>Asus</span>
                                </div>
                                <div className="nav-product-item-name">
                                    <h3>{sp.ten_sp}</h3>
                                </div>
                                <div className="nav-product-item-price-sale">
                                    <div className="nav-product-item-price">
                                        <h4>{Number(sp.gia_km).toLocaleString("vi")} </h4> <span>VNĐ</span>
                                    </div>
                                    <div className="nav-product-item-sale">
                                        <del>{Number(sp.gia).toLocaleString("vi")} </del><span>VNĐ</span>
                                    </div>
                                </div>
                                <div className="nav-product-item-sale-top-img">
                                    <span>Giảm 25%</span>
                                </div>
                                <div className="nav-product-item-start">
                                    <div className="nav-product-item-start-items">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-stroke"></i>
                                    </div>
                                    <div className="nav-product-item-start-danhgia">
                                        <span>({sp.luot_xem} Lượt Xem)</span>
                                    </div>
                                </div>
                                <div className="nav-product-item-view-heart-return">
                                    <div className="nav-product-item-view">
                                        <a href="/#"><i className="fa-solid fa-eye"></i></a>
                                    </div>
                                    <div className="nav-product-item-heart">
                                        <a href="/#"><i className="fa-solid fa-heart"></i></a>
                                    </div>
                                    <div className="nav-product-item-return">
                                        <a href="/#">
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </a>
                                    </div>
                                </div>
                                {/* <div className="nav-product-item-button">
                                    <div className="nav-product-item-button-add-to-cart">
                                        <button>Thêm Vào Giỏ</button>
                                    </div>
                                    <div className="nav-product-item-button-buy-now">
                                        <button>Buy Now</button>
                                    </div>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChiTiet;
