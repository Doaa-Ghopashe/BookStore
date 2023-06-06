const express = require('express');
const authorController = require('../controllers/authorController')
const router = express.Router();

const multer = require('multer');
const { multerFilter, multerStorageAuthor } = require('../Middleware/upload.js');

const upload=multer({
    fileFilter: multerFilter,
    storage:multerStorageAuthor
})


router.post('/',upload.single('Image'),
 authorController.add);

router.get('/' , authorController.list );
router.get('/:id' , authorController.getById );
router.delete('/:id' , authorController.remove );
router.put('/:id' , authorController.edit );
router.delete('/',authorController.deleteAll)
module.exports = router;