import express, { json } from "express";
import { readFileSync } from 'fs';
import jwt  from "jsonwebtoken";
import fs from 'fs';


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

const setUser = (req, res) => {

    const { name, email, password } = req.body

   const newUser = {
    id: (db.users.length + 1),
    name: name,
    email: email.toLowerCase(),
    password: password,
    isAdmin: false
   }

   const user = db.users.find(u => u.email === newUser.email);
   if (user) {
     res.status(400).send('User already exists, please login');
     return;
   }

   db.users.push(newUser);

   fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

    res.send(newUser)
};

const likeItem = (req, res) => {
   const { itemId, userId } = req.body

  const user = db.users.find((user) => user.id === userId);

  const index = user.liked.indexOf(itemId);

  if(user.liked.includes(itemId)) {
    user.liked.splice(index, 1);
  } else {
    user.liked.push(itemId);
  }
  
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

  res.json(user)
}

router.get("/", getUsers);
router.get("/:id", getUser);
router.put('/liked', likeItem);
router.post('/register', setUser);

export default router