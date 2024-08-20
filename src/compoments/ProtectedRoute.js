import { Outlet, useLocation, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const daDangNhap = useSelector(state => state.auth.daDangNhap);
    const location = useLocation();
    
    // Kiểm tra trạng thái đăng nhập
    if (!daDangNhap) {
        return <Navigate to="/admin/dangnhap" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
};

export default ProtectedRoute;
