import express, { json } from "express";
import { readFileSync } from 'fs';

const rawData = readFileSync('./db.json', 'utf-8');
const db = JSON.parse(rawData);

const router = express.Router();

const getItems = (req, res) => {
    res.json(db.items);
}

const getSales = (req, res) => {
    res.json(db.sales)
}

const addSales = (req, res) => {
    const sales = req.body.sales
    db.sales.sales += sales;
    res.send(db.sales)
    console.log(sales)
}


router.get("/", getItems)
router.get("/sales", getSales)
router.post("/buy",addSales)
// router.delete("/:id", deletePost)
// router.put("/:id", upload.single('file') ,updatePost)


export default router