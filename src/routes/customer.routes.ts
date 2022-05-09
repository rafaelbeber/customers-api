
import { Router} from 'express';

const router = Router();
const customerController = require('../controllers/customer.controller');

/*----------------- Customers --------------------- */
// Get All
router.get('/customers', customerController.getCostumers);

// Get One by Id
router.get('/customer/:id', customerController.getCostumerById);

//Create
router.post('/customer', customerController.create)

//Update
router.put('/customer/:id', customerController.update)

//Delete
router.delete('/customer/:id', customerController.delete)

export default router;