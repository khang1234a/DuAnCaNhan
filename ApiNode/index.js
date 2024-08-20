const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt'); // Thêm bcrypt để mã hóa mật khẩu
const app = express();
const cors = require('cors');

app.use([cors(), express.json()]);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'laptop_react'
});

db.connect(err => {
    if (err) throw err;
    console.log('Da ket noi database');
});

// show sản phẩm
app.get('/admin/sp', (req, res) => {
    let sql = `
        SELECT sp.id, sp.ten_sp, sp.gia, sp.gia_km, sp.hinh, sp.ngay, sp.luot_xem, loai.ten_loai, tt.*
        FROM san_pham sp
        JOIN thuoc_tinh tt ON sp.id = tt.id_sp
        JOIN loai ON sp.id_loai = loai.id
        ORDER BY sp.id DESC
    `;
    db.query(sql, (err, data) => {
        if (err) res.json({ "Thông báo": "Lỗi Lấy Sản Phẩm", "error": err });
        else res.json({ "Thông báo": "Lấy Sản Phẩm Thành Công", "data": data });
    });
});
// show users 
app.get('/admin/users', (req, res) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "Thông báo": "Lỗi Lấy Users", "error": err });
        else res.json({ "Thông báo": "Lấy users Thành Công", "data": data });
    });
});
// chi tiết sản phẩm
app.get('/admin/sp/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thong bao": "Không biết sản phẩm", "id": id }); return;
    }
    let sql = `
    SELECT sp.*, loai.ten_loai, tt.*
     FROM san_pham sp
     JOIN thuoc_tinh tt ON sp.id = tt.id_sp
     JOIN loai ON sp.id_loai = loai.id
     WHERE sp.id = ?
     `
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
        else res.json({ "thông báo":" Chi tiết sản phẩm thành công ", data: data[0]});
    });
});
app.get('/admin/danhmuc/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thong bao": "Không biết danh mục", "id": id }); return;
    }
    let sql = `
    SELECT * FROM loai WHERE id = ?
     `
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 danh mục", err })
        else res.json(data[0]);
    });
});
// show sản phẩm chi tiết
app.get('/admin/sp/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (isNan(id) || id <= 0) {
        res.json({ "Thông báo": "Không Biết sản phẩm", "id": id }); return;
    }
    let sql = 'SELECT * FROM san_pham WHERE id = ?';
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "Thông báo": "Lỗi Lấy 1 sản phẩm chi tiết", "id": id });
        else res.json(data[0]);
    });
});

app.get('/admin/users/:id', (req, res) => {
    let id = req.params.id;

    // Corrected typo and validation check
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ "Thông báo": "ID không hợp lệ", "id": id });
    }

    let sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ "Thông báo": "Lỗi lấy thông tin người dùng", "id": id, "error": err });
        }
        if (results.length === 0) {
            return res.status(404).json({ "Thông báo": "Người dùng không tồn tại", "id": id });
        }
        res.json(results[0]);
    });
});


// lấy danh mục sản phẩm
app.get('/admin/danhmuc', (req, res) => {
    // Câu lệnh SQL để lấy danh mục cùng số lượng sản phẩm
    let sql = `
        SELECT 
            l.id AS danh_muc_id, 
            l.ten_loai, 
            l.thu_tu, 
            l.slug,
            COUNT(s.id) AS so_san_pham
        FROM 
            loai l
        LEFT JOIN 
            san_pham s ON l.id = s.id_loai
        GROUP BY 
            l.id, l.ten_loai, l.thu_tu, l.slug
    `;

    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "Thông báo": "Lỗi Lấy Danh Mục", "error": err });
        } else {
            res.json({ "Thông báo": "Lấy Danh Mục Thành Công", "data": data });
        }
    });
});
// Tìm kiếm sản phẩm
app.get('/admin/timkiem/:ten_sp', function (req, res) {
    let ten_sp = req.params.ten_sp;
    let sql = `
        SELECT san_pham.id, san_pham.ten_sp, san_pham.gia, san_pham.gia_km, san_pham.hinh, san_pham.ngay, san_pham.luot_xem, loai.ten_loai
        FROM san_pham
        JOIN loai ON san_pham.id_loai = loai.id
        WHERE san_pham.ten_sp LIKE ?
        AND san_pham.an_hien = 1
        ORDER BY san_pham.luot_xem DESC
    `;
    db.query(sql, [`%${ten_sp}%`], (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi tìm kiếm sản phẩm", err });
        } else {
            res.json(data);
        }
    });
});
// Show sản phẩm mới
app.get('/admin/spmoi', (req, res) => {
    let sql = `
     SELECT sp.id, sp.ten_sp, sp.gia, sp.gia_km, sp.hinh, sp.ngay, sp.luot_xem, loai.ten_loai
        FROM san_pham sp  
        JOIN loai ON sp.id_loai = loai.id
           WHERE sp.an_hien = 1
          ORDER BY sp.ngay desc
    `;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "L��i lấy sản phẩm mới", err });
        else res.json({ data });
    });
})
// show sản phẩm nhiều lượt xem
app.get('/admin/nhieuluotxem', (req, res) => {
    let sql = `
    SELECT sp.id, sp.ten_sp, sp.gia, sp.gia_km, sp.ngay, sp.hinh, sp.luot_xem, loai.ten_loai
    FROM san_pham sp
    JOIN loai ON sp.id_loai = loai.id
    WHERE sp.an_hien = 1
    ORDER BY sp.luot_xem DESC
    `;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "L��i lấy sản phẩm mới", err });
        else res.json({ data });
    });
})
// sản phẩm hot 
app.get('/admin/hot', (req, res) => {
    let sql = `
    SELECT sp.*, loai.ten_loai
    FROM san_pham sp
    JOIN loai ON sp.id_loai = loai.id
    WHERE sp.hot = 1
    ORDER BY sp.ngay DESC
    `
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "L��i lấy sản phẩm hot", err });
        else res.json({ data });
    })
})
app.get('/admin/giagiamdan', (req, res) => {
    let sql = `
    SELECT sp.*, loai.ten_loai
    FROM san_pham sp
    JOIN loai ON sp.id_loai = loai.id
    WHERE sp.an_hien = 1
    ORDER BY sp.gia_km DESC
    `;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "L��i lấy sản phẩm giảm giá", err });
        else (res.json({ data }))
    })
})
app.get('/admin/giatangdan', (req, res) => {
    let sql = `
    SELECT sp.*, loai.ten_loai
    FROM san_pham sp
    JOIN loai ON sp.id_loai = loai.id
    WHERE sp.an_hien = 1
    ORDER BY sp.gia_km ASC
    `;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "L��i lấy sản phẩm giảm giá", err });
        else (res.json({ data }))
    })
})
// Thêm danh mục
app.post('/admin/danhmuc', (req, res) => {
    let data = req.body;

    let sql = 'INSERT INTO loai SET ?';
    db.query(sql, data, (err, result) => {
        if (err) res.json({ "Thông báo": "Lỗi Thêm Danh Mục", "error": err });
        else res.json({ "Thông báo": "Thêm Danh Mục Thành Công", "id": result.insertId });
    });
});
// Thêm sản phẩm
app.post('/admin/sp', (req, res) => {
    let data = req.body;
    let { ten_sp, gia, gia_km, slug, id_loai, hot, luot_xem, an_hien, hinh, ngay, ram, cpu, dia_cung, mau_sac, can_nang } = data;

    if (!ten_sp || !gia || !hinh || !ngay) {
        res.status(400).json({ "Thông báo": "Dữ liệu không hợp lệ. Vui lòng cung cấp đầy đủ thông tin sản phẩm." });
        return;
    }

    let sql = 'INSERT INTO san_pham SET ?';
    db.query(sql, { ten_sp, gia, gia_km, slug, id_loai, hot, luot_xem, an_hien, hinh, ngay }, (err, result) => {
        if (err) {
            if (err.code === 'ER_BAD_NULL_ERROR') {
                res.status(400).json({ "Thông báo": "Thiếu dữ liệu cần thiết", "error": err.message });
            } else if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).json({ "Thông báo": "Sản phẩm đã tồn tại", "error": err.message });
            } else {
                res.status(500).json({ "Thông báo": "Lỗi Thêm Sản Phẩm", "error": err.message });
            }
        } else {
            let id_sp = result.insertId;
            let thuocTinhData = { id_sp, ram, cpu, dia_cung, mau_sac, can_nang };

            let sqlThuocTinh = 'INSERT INTO thuoc_tinh SET ?';
            db.query(sqlThuocTinh, thuocTinhData, (err, result) => {
                if (err) {
                    res.status(500).json({ "Thông báo": "Lỗi Thêm Thuộc Tính Sản Phẩm", "error": err.message });
                } else {
                    res.status(201).json({ "Thông báo": "Thêm Sản Phẩm Thành Công", "id": id_sp });
                }
            });
        }
    });
});



// sửa users
app.put('/admin/users/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;
    let sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, result) => {
        if (err) res.json({ "Thông báo": "Lỗi Cập Nhật người dùng", "error": err });
        else res.json({ "Thông báo": "Cập Nhật người dùng Thành Công", "id": data });
    });
});
// Sửa sản phẩm
app.put('/admin/sp/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ "Thông báo": "id sản phẩm không hợp lệ!", id });
    }

    let sqlUpdateSanPham = 'UPDATE san_pham SET ten_sp = ?, slug = ?, gia = ?, gia_km = ?, hinh = ?, ngay = ?, luot_xem = ?, id_loai = ?, hot = ?, an_hien = ? WHERE id = ?';
    let sanPhamValues = [data.ten_sp, data.slug, data.gia, data.gia_km, data.hinh, data.ngay, data.luot_xem, data.id_loai, data.hot ? 1 : 0, data.an_hien ? 1 : 0, id];

    db.query(sqlUpdateSanPham, sanPhamValues, (err, result) => {
        if (err) {
            return res.status(500).json({ "Thông báo": "Lỗi Cập Nhật Sản Phẩm", "error": err });
        }

        let thuocTinhData = {
            ram: data.ram,
            cpu: data.cpu,
            dia_cung: data.dia_cung,
            mau_sac: data.mau_sac,
            can_nang: data.can_nang
        };

        // Cập nhật thuộc tính sản phẩm
        let sqlUpdateThuocTinh = 'INSERT INTO thuoc_tinh (id_sp, ram, cpu, dia_cung, mau_sac, can_nang) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ram = VALUES(ram), cpu = VALUES(cpu), dia_cung = VALUES(dia_cung), mau_sac = VALUES(mau_sac), can_nang = VALUES(can_nang)';
        let thuocTinhValues = [id, thuocTinhData.ram, thuocTinhData.cpu, thuocTinhData.dia_cung, thuocTinhData.mau_sac, thuocTinhData.can_nang];

        db.query(sqlUpdateThuocTinh, thuocTinhValues, (err, result) => {
            if (err) {
                return res.status(500).json({ "Thông báo": "Lỗi Cập Nhật Thuộc Tính", "error": err });
            }
            return res.status(200).json({ "Thông báo": "Cập Nhật Sản Phẩm và Thuộc Tính Thành Công", "id": id });
        });
    });
});



// Sửa danh mục
app.put('/admin/danhmuc/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ "Thông báo": "ID không hợp lệ", "id": id });
    }

    let sql = 'UPDATE loai SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, result) => {
        if (err) res.json({ "Thông báo": "Lỗi sửa danh mục", "error": err });
        else res.json({ "Thông báo": "Sửa Danh Mục Thành Công", data });

    });
});

// Xóa sản phẩm
app.delete('/admin/sp/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id) || id <= 0) {
        res.json({ "Thông báo": "ID sản phẩm không hợp lệ", "id": id });
        return;
    }
    let sql = `DELETE FROM san_pham WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if (err) res.json({ "Thông báo": "Lỗi khi xóa sản phẩm", "error": err });
        else res.json({ "Thông báo": "Đã xóa sản phẩm thành công!" });
    });
});
// xóa người dùng
app.delete('/admin/users/:id', (req, res) => {
    let id = req.params.id;
    if (isNaN(id) || id <= 0) {
        res.json({ "Thông báo": "ID Người dùng không hợp lệ", "id": id });
        return;
    }

    let checkSql = `SELECT * FROM users WHERE id = ?`;
    db.query(checkSql, [id], (err, results) => {
        if (err) {
            res.json({ "Thông báo": "Lỗi khi kiểm tra ID Người dùng", "error": err });
        } else if (results.length === 0) {
            res.json({ "Thông báo": "ID Người dùng không tồn tại", "id": id });
        } else {
            let deleteSql = `DELETE FROM users WHERE id = ?`;
            db.query(deleteSql, [id], (err, result) => {
                if (err) {
                    res.json({ "Thông báo": "Lỗi khi xóa Người dùng", "error": err });
                } else {
                    res.json({ "Thông báo": "Đã xóa Người dùng thành công!" });
                }
            });
        }
    });
});

// Xóa danh mục
app.delete('/admin/danhmuc/:id', (req, res) => {
    let id = parseInt(req.params.id);

    // Kiểm tra ID hợp lệ
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ "Thông báo": "ID danh mục không hợp lệ", "id": id });
    }

    // Kiểm tra danh mục tồn tại
    let kiemtraDanhMuc = 'SELECT id FROM loai WHERE id = ?';
    db.query(kiemtraDanhMuc, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ "Thông báo": "Lỗi kiểm tra danh mục", "error": err });
        }

        if (data.length === 0) {
            return res.status(404).json({ "Thông báo": "Danh mục không tồn tại", "id": id });
        }

        // Kiểm tra xem danh mục có sản phẩm không
        let kiemtraSanPham = 'SELECT id FROM san_pham WHERE id_loai = ?';
        db.query(kiemtraSanPham, [id], (err, data) => {
            if (err) {
                return res.status(500).json({ "Thông báo": "Lỗi kiểm tra sản phẩm", "error": err });
            }

            if (data.length > 0) {
                return res.status(400).json({ "Thông báo": "Danh mục chứa sản phẩm, không thể xóa", "id": id });
            }

            // Xóa danh mục
            let deleteSql = 'DELETE FROM loai WHERE id = ?';
            db.query(deleteSql, [id], (err) => {
                if (err) {
                    return res.status(500).json({ "Thông báo": "Lỗi khi xóa danh mục", "error": err });
                }
                return res.status(200).json({ "Thông báo": "Đã xóa danh mục thành công!" });
            });
        });
    });
});
// login 
const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
const checkUserPass = (un, pw, callback) => {
    const query = "SELECT * FROM users WHERE name = ?";
    db.query(query, [un], (err, results) => {
        if (err) {
            return callback(err, false);
        }
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(pw, user.password, (err, isMatch) => {
                if (err) {
                    return callback(err, false);
                }
                if (isMatch) {
                    return callback(null, true, user);
                } else {
                    return callback(null, false);
                }
            });
        } else {
            return callback(null, false);
        }
    });
};

app.post("/login", function (req, res) {
    const un = req.body.un;
    const pw = req.body.pw;

    checkUserPass(un, pw, (err, isValid, user) => {
        if (err) {
            return res.status(500).json({ thongbao: "Lỗi máy chủ" });
        }
        if (isValid) {
            const jwtBearToken = jwt.sign({}, PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: user.id.toString()
            });
            res.status(200).json({ token: jwtBearToken, expiresIn: 120, userInfo: { id: user.id, name: user.name } });
        } else {
            res.status(401).json({ thongbao: "Đăng nhập thất bại" });
        }
    });
});
// thêm người dùng
app.post('/register', async (req, res) => {
    const { name, email, password, dia_chi, dien_thoai, hinh } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ tên và email.' });
    }

    try {
        let hashedPassword = null;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const query = 'INSERT INTO users (name, email, password, dia_chi, dien_thoai, hinh, role) VALUES (?, ?, ?, ?, ?, ?, 0)';
        db.query(query, [name, email, hashedPassword, dia_chi, dien_thoai, hinh], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi máy chủ.' });
            }
            res.status(201).json({ message: 'Đăng ký thành công.' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi mã hóa mật khẩu.' });
    }
});

app.listen(3000, () => console.log(`Ứng dụng đang chạy với port 3000`));
