import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("users")
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn( "identity" )
    id : number; 

    @Column()
    email : string;

    @Column()
    password : string;

}