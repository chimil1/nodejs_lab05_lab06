const express =require('express');
const apiController = require('../controller/api/categories');

const router = express.Router();

router.get('/categories',apiController.listProduct)

router.delete('/categories/:MaSanPham',apiController.delete);

router.post('/categories/',apiController.add)

router.put('/categories/:MaSanPham', apiController.update);

module.exports = router;