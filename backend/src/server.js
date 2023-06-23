import express from 'express';
import cors from 'cors';
import getItems from "./routers/items.js"
import getUsers from "./routers/users.js"

const server = express();


server.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

server.use("/api/items", getItems);
server.use("/api/users", getUsers);

server.listen(3000, () => {
  console.log('JSON Server is running');
});