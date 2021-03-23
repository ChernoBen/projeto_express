const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require('../middleware/AdminAuth');
const cors  = require('cors');

app.use(cors());

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id',AdminAuth, UserController.findUser);
router.put('/user',AdminAuth, UserController.edit);
router.delete('/user/:id',AdminAuth, UserController.remove);
router.post('/user/recover',AdminAuth, UserController.recoverPassword);
router.post('/user/changepassaword',AdminAuth, UserController.changePassword);
router.post('/login', UserController.login)


module.exports = router;