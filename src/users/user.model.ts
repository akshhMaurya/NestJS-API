import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name:String,
    place:String,
    college:String,
    branch:String,
    year:Number
})

export interface User  {
    id:string,
    name:string,
    place: string,
    college:string,
    branch:string,
    year:string
}