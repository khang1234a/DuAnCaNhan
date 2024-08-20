import React, { useState, useEffect } from 'react';
import PhanTrang from './PhanTrang';
import { Link } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(window.location.search);
}

function TimKiem() {
    const [results, setResults] = useState([]);
    const query = useQuery().get('q');

    useEffect(() => {
        if (query) {
            fetch(`http://localhost:3000/admin/timkiem/${query}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data); // Lưu kết quả vào state
                })
                .catch(error => console.error('Error searching:', error));
        }
    }, [query]);

    return (
        <>

            {results.length > 0 ? (
                <div className="main-right-top-content">
                    <h1>Kết quả tìm kiếm cho: "<b> {query} </b>"</h1>
                    <div className="content-table-product-admin">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Hình Ảnh</th>
                                    <th>Giá</th>
                                    <th>Giá Khuyến Mãi</th>
                                    <th>Danh Mục</th>
                                    <th style={{ width: 100 + "px" }}>Lượt Xem</th>
                                    <th>Ngày</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <PhanTrang listSP={results} pageSize={10} />
                        </table>
                    </div>
                </div>
            ) : (
                <div className="main-right-top-content">
                    <div className="not-found-search">
                        <p>Không tìm thấy kết quả nào cho "{query}"</p>
                        <Link to={"/admin/sanpham"}>
                            <button className="not-found-search-home">Quay Lại Trang Sản Phẩm</button>

                        </Link>
                    </div>
                </div>

            )}

        </>
    );
}

export default TimKiem;
