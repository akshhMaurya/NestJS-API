import {Controller, Post, Body, Get, Patch,Param, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}
    @Post()
    addProduct(
        // @Body() completeBody: {title:string, description:string, price:number} 
        @Body('title') prodtitle, @Body('description') prodDesc , @Body('price') prodPrice):any {
       const p_id =  this.productsService.insertProduct(prodtitle,prodDesc,prodPrice)
       return {id:p_id};
    }

    @Get('/checks')
    checkFunc(){
        return 'All Well';
    }

    @Get('allProd')
    getAllProducts(){
        return this.productsService.getProd();

    }

    @Get('oneProd/:id')
    oneProd(@Param('id') prodId:string){
       return this.productsService.getSingleProd(prodId);
    }

    @Patch('update/:id')
    async updateProd(
        @Param('id') prodId :string,
        @Body('title') prodTitle : string,
        @Body('description') prodDesc:string,
        @Body('price') prodPrice : number
    ){
      await  this.productsService.updateProd(prodId,prodTitle,prodDesc,prodPrice)
        return null;

    }

    @Delete('delete/:id')
    async deleteProd(@Param('id') prodId:string){
      await this.productsService.deleteProduct(prodId);
        return null;
    }
}