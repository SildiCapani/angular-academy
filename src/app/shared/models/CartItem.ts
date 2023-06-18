import { Item } from "./Item";

export class CartItem{
    
    quantity: number = 1;
    price: number = this.item.price

    constructor(public item: Item) {
    }
}