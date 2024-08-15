const Category = require("../../models/categories");
const db = require("../../models/database");

function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}
exports.listUsers = async (req, res, next) => {
  const category = await Category.getAll();
  res.status(200).json({
    message: "Hiển thị thành công",
    data: category,
  });
};

exports.getUsers = async (req, res, next) => {
  let id = req.params.id;
  const category = await Category.getUser(id);
  res.status(200).json({
    message: "Lấy chi tiết user thành công",
    data: category,
  });
};

exports.add = async (req, res, next) => {
  let ten_dang_nhap = req.body.ten_dang_nhap;
  let email = req.body.email;
  let mat_khau = req.body.mat_khau;
  let ngay_sinh = req.body.ngay_sinh;
  let trang_thai = req.body.trang_thai;

  const sql = "SELECT * FROM nhan_vien WHERE ten_dang_nhap = ?";
  const results = await queryDatabase(sql, [ten_dang_nhap]);

  if (results.length > 0) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });
  }

  if (!ten_dang_nhap || !email || !mat_khau || !ngay_sinh || !trang_thai) {
    return res.status(400).json({ message: "Các trường không được để trống" });
  }
  if (new Date(ngay_sinh) > new Date("2006-01-01")) {
    return res.status(400).json({ message: "Ngày sinh phải lớn hơn 2006" });
  }

  let category = {
    ten_dang_nhap: ten_dang_nhap,
    email: email,
    mat_khau: mat_khau,
    ngay_sinh: ngay_sinh,
    trang_thai: trang_thai,
  };
  let result = await Category.addProduct(category);
  console.log(result);
  res.status(201).json({
    message: "Thêm thành công",
    data: result,
    category: category,
  });
};

exports.update = async (req, res, next) => {
  let id = req.params.id;
  let ten_dang_nhap = req.body.ten_dang_nhap;
  let email = req.body.email;
  let mat_khau = req.body.mat_khau;
  let ngay_sinh = req.body.ngay_sinh;
  let trang_thai = req.body.trang_thai;
  const sql = "SELECT * FROM nhan_vien WHERE ten_dang_nhap = ?";
  const results = await queryDatabase(sql, [ten_dang_nhap]);

  if (results.length > 0) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại." });
  }
  if (!ten_dang_nhap || !email || !mat_khau || !ngay_sinh || !trang_thai) {
    return res.status(400).json({ message: "Các trường không được để trống" });
  }
  if (new Date(ngay_sinh) > new Date("2006-01-01")) {
    return res.status(400).json({ message: "Ngày sinh phải lớn hơn 2006" });
  }

  let category = {
    ten_dang_nhap: ten_dang_nhap,
    email: email,
    mat_khau: mat_khau,
    ngay_sinh: ngay_sinh,
    trang_thai: trang_thai,
  };
  let result = await Category.update(category, id);
  console.log(result);
  res.status(201).json({
    message: "Cập nhật thành công",
    result: result,
    category: category,
  });
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  let trang_thai = req.body.trang_thai;
  if (trang_thai === "3" || trang_thai === 3) {
    return res
      .status(403)
      .json({
        message: "Không được xoá các tài khoản có trạng thái là “nghỉ việc”",
      });
  }
  const category = await Category.Delete(id);
  res.status(204).json({
    message: "Xóa thành công",
    data: category,
  });
};
