const db = require("./database");


module.exports = class Category {
  static async getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM nhan_vien`;
      db.query(sql, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }


  static async getUser(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM nhan_vien WHERE id = ?";
      db.query(sql, [id], function (err, data) {
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
      db.query("INSERT INTO nhan_vien SET ?", category, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async update(category, id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE nhan_vien SET ? WHERE id= ?",
        [category, id],
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  static async Delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM nhan_vien WHERE id = ${id}`;
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
