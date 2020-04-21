import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('/addUser')
    addUser(@Body('name') userName, @Body('place') userPlace, @Body('college') userCollege, @Body('branch') userBranch, @Body('year') userYear):any{
        const u_id = this.userService.insertUser(userName,userPlace,userCollege, userBranch,userYear);
        return {id:u_id};
    }
    
    @Get('/check')
    check(){
        return 'All Good';
    }
    @Get('/allUser')
    async getAllUser(){
        const user =  await this.userService.getAllUser();
        return user;
    }

    @Get('/oneUser/:id')
    async getOneUser(@Param('id') userId:string){
        const user = await this.userService.getSingleUser(userId);
        return user;

    }
}