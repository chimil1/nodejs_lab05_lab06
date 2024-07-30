const Category = require('../../models/categories');

exports.listProduct = async(req,res,next)=>{
    const category = await Category.getAll();
    res.status(200).json({
        data:category
    })
}


exports.delete = async (req, res, next) => {
    let MaSanPham = req.params.MaSanPham;
    let category = await Category.Delete(MaSanPham);
    res.status(201).json({
        data: category
    })
};


exports.add = async (req, res, next) => {
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
    let result = await Category.addProduct(category);
    console.log(result);
    res.status(201).json({
        data: result,
        category: category
    })
};


exports.update = async (req, res, next) => {
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
    let result = await Category.update(category, MaSanPham);
    console.log(result);
    res.status(201).json({
        result: result,
        category: category
    })
};