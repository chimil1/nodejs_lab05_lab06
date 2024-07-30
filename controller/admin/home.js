var db = require("../../models/database");
const multer = require("multer");
const path = require("path");
// Cấu hình Multer để lưu tệp tin
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Đường dẫn lưu tệp tin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên tệp tin
  },
});
const upload = multer({ storage: storage });

exports.index = async (req, res, next) => {
  res.render("client/home");
};

exports.home = async (req, res, next) => {
  res.render("admin/home");
};

exports.qlPersonnel = async (req, res, next) => {
  let sql = `SELECT * FROM nhanvien`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("admin/category/qlPersonnel", { data: data });
  });
};

exports.qlProduct = async (req, res, next) => {
  fetch("http://localhost:3000/api/categories")
    .then((response) => response.json())
    .then((data) => {
      res.render("admin/category/qlProduct", { data: data.data });
  });  
};

exports.addProduct = async (req, res, next) => {
  res.render("admin/category/addProduct");
};

exports.addPersonnel = async (req, res, next) => {
  res.render("admin/category/addPersonnel");
};


exports.delete = (req, res, next) => {
  let MaSanPham = req.params.MaSanPham;
  fetch(`http://localhost:3000/api/categories/${MaSanPham}`, {
      method: "DELETE",
  })
  .then(response => response.json())
  .then(data => {
      if (data) {
        res.redirect("/admin/category/qlProduct");
      } else {
          res.send('Lỗi không thể xoá');
      }
  })
  .catch(error => console.error('Error:', error));

};


exports.deletePersonnel = async (req, res, next) => {
  const MaNhanVien = req.params.MaNhanVien;
  const sql = `DELETE FROM nhanvien WHERE MaNhanVien = ?`;
  db.query(sql, [MaNhanVien], (err, result) => {
    if (err) throw err;
    res.redirect("/admin/category/qlPersonnel");
  });
};



exports.post = async (req, res, next) => {
  let TenSanPham = req.body.TenSanPham;
  let Gia = req.body.Gia;
  let HinhAnh = req.body.HinhAnh;
  let GiaKhuyenMai = req.body.GiaKhuyenMai;
  let SoLuong = req.body.SoLuong;
  let MoTa = req.body.MoTa;
  let  TrangThai =req.body.TrangThai
  let MaDanhMuc = req.body.MaDanhMuc;
 
  let category = {
      TenSanPham: TenSanPham,
      Gia:Gia,
      HinhAnh:HinhAnh,
      GiaKhuyenMai:GiaKhuyenMai,
      SoLuong:SoLuong,
      MoTa:MoTa,
      TrangThai:TrangThai,
      MaDanhMuc: MaDanhMuc,
  }
  fetch('http://localhost:3000/api/categories/', {
          method: "POST",
          mode: "cors", 
          cache: "no-cache",
          credentials: "same-origin", 
          headers: {
              "Content-Type": "application/json",
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(category), 
      })
      .then(response => response.json())
      .then(data => {
          if (data) {
            res.redirect("/admin/category/qlProduct");
          } else {
              res.send('Lỗi không thể thêm')
          }
      })
      .catch(error => console.error('Error:', error));
};



exports.updateProduct = async (req, res, next) => {
  let MaSanPham = req.params.MaSanPham;
  let TenSanPham = req.body.TenSanPham;
  let Gia = req.body.Gia;
  let HinhAnh = req.body.HinhAnh;
  let GiaKhuyenMai = req.body.GiaKhuyenMai;
  let SoLuong = req.body.SoLuong;
  let MoTa = req.body.MoTa;
  let MaDanhMuc = req.body.MaDanhMuc;

  let category = {
      TenSanPham: TenSanPham,
      Gia:Gia,
      HinhAnh:HinhAnh,
      GiaKhuyenMai:GiaKhuyenMai,
      SoLuong:SoLuong,
      MoTa:MoTa,
      MaDanhMuc: MaDanhMuc,
  }
  fetch(`http:/localhost:3000/api/categories/${MaSanPham}`, {
          method: "PUT", 
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(category), 
      })
      .then(response => response.json())
      .then(data => {
          if (data) {
            res.redirect("/admin/category/qlproduct");

          } else {
              res.send('Lỗi không thể cập nhật')
          }
      })
      .catch(error => console.error('Error:', error));

};



exports.postPersonnel = [
  upload.single("Anh"),
  async (req, res, next) => {
    const { HoTen, Email, MatKhau, SDT, ChucVu, LyLich, Admin } = req.body;
    const Anh = req.file ? req.file.filename : ""; // Lấy tên tệp tin đã lưu
    const sql =
      "INSERT INTO nhanvien (HoTen, Email,MatKhau, SDT,ChucVu,LyLich,Admin,Anh) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    db.query(
      sql,
      [HoTen, Email, MatKhau, SDT, ChucVu, LyLich, Admin, Anh],
      (err, result) => {
        if (err) throw err;
        res.redirect("/admin/category/qlPersonnel"); // Điều hướng sau khi thêm thành công
      }
    );
  },
];

exports.editProduct = async (req, res, next) => {
  const MaSanPham = req.params.MaSanPham;
  const sql = "SELECT * FROM sanpham WHERE MaSanPham = ?";
  db.query(sql, [MaSanPham], (err, data) => {
    if (err) throw err;
    res.render("admin/category/editProduct", { product: data[0] });
  });
};

// // Xử lý dữ liệu chỉnh sửa sản phẩm
// exports.updateProduct = [
//   upload.single("HinhAnh"),
//   async (req, res, next) => {
//     const MaSanPham = req.params.MaSanPham;
//     const {
//       TenSanPham,
//       Gia,
//       GiaKhuyenMai,
//       SoLuong,
//       MaDanhMuc,
//       MoTa,
//       TrangThai,
//     } = req.body;
//     const HinhAnh = req.file ? req.file.filename : req.body.existingImage; // Lấy tên tệp tin mới hoặc giữ nguyên tệp tin cũ
//     const sql =
//       "UPDATE sanpham SET TenSanPham = ?, Gia = ?, GiaKhuyenMai = ?,SoLuong=?, MaDanhMuc=?, MoTa=?, TrangThai=? ,HinhAnh = ? WHERE MaSanPham = ?";
//     db.query(
//       sql,
//       [
//         TenSanPham,
//         Gia,
//         GiaKhuyenMai,
//         SoLuong,
//         MaDanhMuc,
//         MoTa,
//         TrangThai,
//         HinhAnh,
//         MaSanPham,
//       ],
//       (err, result) => {
//         if (err) throw err;
//         res.redirect("/admin/category/qlproduct"); // Điều hướng sau khi cập nhật thành công
//       }
//     );
//   },
// ];
