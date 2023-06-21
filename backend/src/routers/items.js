import express, { json } from "express";
import { readFileSync } from 'fs';

const rawData = readFileSync('./db.json', 'utf-8');
const db = JSON.parse(rawData);

const router = express.Router()

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../client/public/upload')
//     },
//     filename: function (req, file, cb) {
//       cb(null,  Date.now()+file.originalname)
//     }
//   })
//   const upload = multer({ storage });

const getItems = (req, res) => {
    res.json(db.items);
}

router.get("/", getItems)
// router.get("/:id", getPost)
// router.post("/", upload.single('file') ,addPost)
// router.delete("/:id", deletePost)
// router.put("/:id", upload.single('file') ,updatePost)


export default router