import React from "react";
// cung cấp thông tin về địa chỉ URL hiện tại.
//useRef cho phép bạn cập nhật giá trị mà không làm render lại component
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";

function DangNhap() {
    const unRef = React.createRef();
    const pwRef = React.createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = React.useState("");
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const submitDuLieu = () => {
        if (unRef.current.value === "" || pwRef.current.value === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const url = "http://localhost:3000/login";
        const tt = { un: unRef.current.value, pw: pwRef.current.value };
        const opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Đăng nhập thất bại');
                }
                return res.json();
            })
            .then(data => {
                if (data.thongbao) {
                    setError(data.thongbao);
                } else {
                    dispatch(dalogin(data));
                    navigate(from, { replace: true });
                    alert("Đăng Nhập Thành Công");
                }
            })
            .catch(err => {
                console.error('Đăng nhập thất bại:', err);
                setError('Tên đăng nhập hoặc mật khẩu không đúng, vui lòng nhập lại!');
            });
    };

    return (
        <div className="login-form">
            <form id="frmlogin" className="col-7 m-auto border border-primary">
                <h2 className="bg-info h5 p-2"> Đăng nhập</h2>
                <div className="m-3">
                    Tên đăng nhập <input className="form-control" type="text" ref={unRef} placeholder="Nhập tên đăng nhập..." />
                </div>
                <div className="m-3">
                    Mật khẩu <input className="form-control" type="password" ref={pwRef}  placeholder="Nhập Mật khẩu..." />
                </div>
                <div className="m-3">
                    {error && <div className="alert alert-danger"><i class="fa-solid fa-circle-xmark"></i>{error}</div>}
                    <button type="button" onClick={submitDuLieu} className="btn btn-info">
                        Đăng nhập
                    </button>
                </div>
                <div className="m-3">
                   <span>Chưa có Tài Khoản Vui lòng, </span> <Link to="/register">Đăng ký</Link>
                </div>
            </form>
        </div>
    );
};

export default DangNhap;
