

const router = require('express').Router();
const { addService, getService, putServiceById, deletePostById } = require('../controllers/serviceController');
const { register, login } = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const memberAuthorization = require('../middlewares/authorization');
const errorHandler=require('../middlewares/errorHandler');

router.post("/register", register)
router.post("/login", login)
// router.get("/", getService)

router.use(authentication)

router.post("/service/add", memberAuthorization, addService)
router.get("/service/list", getService)
router.put("/service/:id", memberAuthorization, putServiceById)
router.delete("/service/:id", memberAuthorization, deletePostById)




router.use(errorHandler);
module.exports = router;