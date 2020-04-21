import {Injectable, NotFoundException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<User> ){}
    users :User[] =[]
   async insertUser(name:string,place:string,college:string,branch:string,year:number){
        const newUser = new this.userModel({
            name:name,
            place:place,
            college:college,
            branch:branch,
            year:year
        });
        const result = await  newUser.save();
        console.log(result);
        return result.id;
    }

    async getAllUser() {
         const users = await this.userModel.find().exec();
         return users as User[];
        
    }
    
    async getSingleUser(id:string) {
        const user = await this.findUser(id);

        if(!user){
            throw new NotFoundException('Could not found the User')
        }

        return user;
    }

    // async updateUser(id:string,name:string,place:string,college:string,branch:string,year:number){
    //     const user= await this.findUser(id);
    //     const updatedUser = {...user};
    //     if(name){
    //         updatedUser.name = name;
    //     }
    //     if(place){
    //         updatedUser.place = place;
    //     }

    //     this.users[index] = updatedUser;


    // }

    private async findUser(id:string):Promise<User> {
        const user = await this.userModel.findById(id);
        ;
        if(!user){
            throw new NotFoundException('Could Not Found User');
        }
        return user
    }
}