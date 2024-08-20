import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thoat } from './authSlice'; // Đảm bảo đường dẫn đúng

function Thoat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const daDangNhap = useSelector(state => state.auth.daDangNhap);

  const handleLogout = () => {
    dispatch(thoat());
    navigate(0);
  };

  if (!daDangNhap) return null;

  return (
    <li
      onClick={handleLogout}><a href="#/"><i className="fa-solid fa-right-from-bracket"></i>Thoát</a>
    </li>
  );
}

export default Thoat;
