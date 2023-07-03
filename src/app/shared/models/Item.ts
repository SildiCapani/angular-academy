export interface Item{
    sales: any;
    id:number;
    name:string;
    price:number;
    tags:string[];
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}

export interface SaleItem {
    quantity: number;
    sales: number;
}

export interface Analytics{
    quantity: number,
    earnings: number,
    sales: {
        [name: string]: SaleItem;
    }
}