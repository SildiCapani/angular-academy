export interface Item{
    id:number;
    name:string;
    price:number;
    tags:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}

export interface Analytics{
    sales: number,
    earnings: number
}