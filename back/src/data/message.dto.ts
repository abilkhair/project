import { Expose } from "class-transformer";


export @Expose() class MessageDto {
		message!:string;
		author!:string;
}


