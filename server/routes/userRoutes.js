import express from "express";
import { login, signup } from '../controllers/auth.js'
import { getAllUsers, updateProfile, updateAddFriends, updateDeleteFriends ,getCurrentUser,setUserSubscription} from '../controllers/Users.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/getallusers', getAllUsers)
router.patch('/updateprofile/:id', updateProfile)
router.patch('/addfriend', updateAddFriends)
router.patch('/removefriend', updateDeleteFriends)
router.get('/getcurrentuser', getCurrentUser)
router.patch('/setsubscription', setUserSubscription)
export default router;