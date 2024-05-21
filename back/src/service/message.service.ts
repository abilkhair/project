import { readFileSync, writeFileSync } from "fs";
import { IMessage } from "../interfaces/Message.interace";
import path from "path";
import { MessageDto } from "../data/message.dto";
import { randomUUID } from "crypto";

const filePath = path.join(__dirname,'../data/messages.json')

export class MessageService {
	private message: IMessage[];

	constructor() {
		this.message = [];
		this.init()
	}

	init() {
		try {
				const fileContent:Buffer = readFileSync(filePath);
				this.message = JSON.parse(fileContent.toString());
		} catch (error) {
				this.message = [];
		}
	}

	getMessage():IMessage[] {
			return this.message;
	}

	getMessageByDate(date: Date): IMessage[] {
		return this.message.filter((message) => {
			const messageDate = new Date(message.date);
			return messageDate >= date;
		});
	}
	

	createMessage(messageDto:MessageDto) {
		const timestamp = new Date().toISOString();
		
			const newMessages = {
				id:randomUUID(),
				date:timestamp,
				...messageDto
			};
			

			this.message.push(newMessages);
			this.save();
			return newMessages;
	};

	save() {
		writeFileSync(filePath, JSON.stringify(this.message,null,2))
	}

	deleteMessageById(id: string) {
		this.message = this.message.filter(message => message.id !== id);
		this.save();
	}

	editMessage(id: string, updatedMessageDto: MessageDto) {
		const index = this.message.findIndex(message => message.id === id);

		if (index !== -1) {
			const updatedMessage = {
				id,
				date: this.message[index].date, // Retain the original date
				...updatedMessageDto
			};

			this.message[index] = updatedMessage;
			this.save();
			return updatedMessage;
		}

		return null; // Return null if the message with the given id is not found
	}






}