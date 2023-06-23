import express, { json } from "express";
import { readFileSync } from 'fs';
import jwt  from "jsonwebtoken";

const rawData = readFileSync('./db.json', 'utf-8');
const db = JSON.parse(rawData);

const router = express.Router();
router.use(express.json())

const getUsers = (req, res) => {
    res.json(db.users);
}

const getUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = db.users.find(user => user.id === userId);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

router.post("/login", (req, res) => {
    const {email, password} = req.body
    const user = db.users.find(user => user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    } else {
     res.status(400).send("User name or password is not valid");
    }
})

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "Random", {
        expiresIn: "30d"
    });

    user.token = token;
    return user
}

router.get("/", getUsers)
router.get("/:id", getUser)
// router.post("/", upload.single('file') ,addPost)
// router.delete("/:id", deletePost)
// router.put("/:id", upload.single('file') ,updatePost)


export default router