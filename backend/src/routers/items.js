import express, { json } from "express";
import { readFileSync } from 'fs';
import fs from 'fs';



const rawData = readFileSync('./db.json', 'utf-8');
const db = JSON.parse(rawData);

const router = express.Router();
router.use(express.json())

const getItems = (req, res) => {
    res.json(db.items);
}

const getSales = (req, res) => {
    res.json(db.sales);
}

const addSales = (req, res) => {
    console.log(db.sales.sales); // Check the content of req.body in the console

  const { sales, earnings } = req.body;

  if (typeof sales !== 'number') {
    res.status(400).json({ error: 'Invalid sales amount' });
    return;
  }

  db.sales.sales += sales;
  db.sales.earnings += earnings
  // Write the updated db object back to the JSON file
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

 
  res.json(db.sales);
}

const getItem = (req, res) => {
    const itemId = parseInt(req.params.id)
    const item = db.items.find(item => item.id === itemId);

    if(item) {
    res.json(item)
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
}

const updateItem = (req, res) => {
    const itemId = parseInt(req.params.id);
  const updatedItem = req.body;


   const item = db.items.find((item) => item.id === itemId);

   if (!item) {
     res.status(404).json({ error: 'Item not found' });
     return;
   }

   item.name = updatedItem.name;
   item.cookTime = updatedItem.cookTime;
   item.price = updatedItem.price;
   item.origins = updatedItem.origins
   item.tags = updatedItem.tags

   fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

   res.json(item);
console.log(itemId, updatedItem, item)
}

router.get("/", getItems)
router.get("/sales", getSales)
router.get("/:id", getItem)
router.put("/:id", updateItem)
router.put("/totalsales", addSales)


export default router