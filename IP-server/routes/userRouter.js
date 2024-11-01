

const router = require('express').Router();
const { postInvoiceById, getInvoice } = require('../controllers/invoiceController');
const { addService, getService, putServiceById, deletePostById } = require('../controllers/serviceController');
const { register, login, googleLogin } = require('../controllers/userController');
const adminAuthorization = require('../middlewares/adminAuthorization');
const authentication = require('../middlewares/authentication');
const memberAuthorization = require('../middlewares/authorization');
const errorHandler=require('../middlewares/errorHandler');

router.get("/", getService)
router.post("/register", register)
router.post("/login", login)
router.post("/google-login", googleLogin)
// router.get("/", getService)

router.use(authentication)

router.get("/service/list", getService)
router.post("/service/add", memberAuthorization, adminAuthorization ,addService)
router.put("/service/:id", memberAuthorization, putServiceById)
router.post("/invoice/:id", memberAuthorization, postInvoiceById)
router.get("/invoice", memberAuthorization, getInvoice)

router.delete("/service/:id", memberAuthorization, deletePostById)




router.use(errorHandler);
module.exports = router;