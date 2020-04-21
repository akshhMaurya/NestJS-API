import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './products.model';
import { InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';


@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel :Model<Product> ){}
    products : Product[] = [];

    insertProduct(title:string, desc:string, price: number){
        const newProduct = new this.productModel({
            title:title,
            description:desc,
            price:price
        });
        const result = newProduct.save();
        console.log(result);
        return 'akshh';
        
    }

    getProd(){
        return [...this.products];
    }

    getSingleProd(prodId:string){
        const product = this.products.find((prod) => prod.id === prodId )
        if(!product){
            throw new NotFoundException('Could Not found Product');
        }
        
        return {...product};
    }

    updateProd(prodId:string, title:string, desc:string, price:number){
        const [product, index] = this.findProduct(prodId);
        const updatedProd = {...product};
        if(title){
            updatedProd.title = title;
        }
        if(desc){
            updatedProd.description = desc;
        }
        if(price){
            updatedProd.price = price;
        }
        this.products[index] = updatedProd;
    }
    deleteProduct(prodId:string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1)
    }
    private findProduct(id:string):[Product,number]{
        const productIndex = this.products.findIndex(prod => prod.id === id );
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not found');
        }
        return [product, productIndex];
    }
}