const router = require("express").Router();
const adminController = require('../controller/adminController');
const userController = require('../controller/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../mongo/public/upload') // The destination folder where the image will be stored
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + '-' + file.originalname) // Renaming the file to avoid conflicts
    }
  });
  const upload = multer({ storage: storage });
  
  // Set up a route to handle image uploads
  router.post('/upload', upload.single('image'), adminController.uploadImage);

// All Routes use in website
router.get('/', adminController.showHome);
router.get('/register', userController.showRegister);
router.get('/login', userController.showLogin);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', adminController.showAdmin);
router.get('/delete/:id', adminController.deleteCategory);
router.get('/newsdelete/:id', adminController.deleteNews);
router.post('/addCategory', adminController.addCategory);
router.post('/addNews',upload.single('image'), adminController.addNews);
router.get('/contact', userController.contact);
router.get('/news', adminController.news);
router.patch('/editCategory/:id', adminController.editCategory);

module.exports = router;
