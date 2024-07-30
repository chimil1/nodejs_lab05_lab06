const db = require("./database");

module.exports = class Category {
  static async getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM sanpham`;
      db.query(sql, function (err, data) {
        data.forEach((data) => {
          data.Gia = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data.Gia);
        });
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async addProduct(category) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO sanpham SET ?', category, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

static async update(category, MaSanPham) {
  return new Promise((resolve, reject) => {
      db.query('UPDATE sanpham SET ? WHERE MaSanPham= ?', [category, MaSanPham], function (err, data) {
          if (err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
  });
}


  static async Delete(MaSanPham) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM sanpham WHERE MaSanPham = ${MaSanPham}`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};
