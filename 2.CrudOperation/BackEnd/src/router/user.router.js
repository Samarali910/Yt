import { Router } from "express";
import { CreateUser ,getAllUser,deleteUser, updateUser, bulkDelete} from "../controller/User.controller.js";
const router = Router()

  router.post('/createuser',CreateUser)
  router.get('/users',getAllUser)
  router.delete('/deleteuser',deleteUser)
  router.put('/updateuser',updateUser)
  router.delete('/bulkdelete',bulkDelete)

export default router