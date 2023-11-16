import { Product } from "./product";
import { ShoppingCartItem } from "./shoppingCartItem";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(public itemsMap : {[productId : string] : ShoppingCartItem}) {
        // console.log(itemsMap)
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, key: productId }));
        }
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            // console.log(this.items[productId].quantity)
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalItemsPrice() {
        let count = 0;
        for (let productId in this.items) {
            // console.log(this.items[productId].quantity)
            count += this.items[productId].totalPrice;
        }
        return count;
    }

    getQuantity(product : any) {

        let item = this.itemsMap[product.key];
        // console.log(this.itemsMap[product.key]);
        return item ? item.quantity : 0;
    }
}