const express =require('express');
const apiController = require('../controller/api/categories');
const router = express.Router();
 //listuser
router.get('/users',apiController.listUsers);

//add
router.post('/users',apiController.add);

router.get('/users/:id',apiController.getUsers);

//update
router.put('/users/:id',apiController.update);
//delete
router.delete('/users/:id',apiController.delete)
module.exports = router;