import { RequestHandler } from "express"
import { MessageService } from "../service/message.service";
import { plainToInstance } from "class-transformer";
import { MessageDto } from "../data/message.dto";

export class MessageController {

	private service: MessageService;
	constructor() {
			this.service = new MessageService();

	}

	getMessage:RequestHandler = (req,res) => {
		res.send(this.service.getMessage())
	}

	getMessageByDate: RequestHandler = (req, res) => {
		const datetime = req.query.datetime as string; 
		if (!datetime) {
			res.status(400).json({ error: 'Datetime parameter is missing' });
			return;
		}
	
		const date = new Date(datetime);
		if (isNaN(date.getDate())) {
			res.status(400).json({ error: 'Invalid datetime format' });
			return;
		}
	
		const messages = this.service.getMessageByDate(date);
		res.send(messages);
	};
	

	createMessage:RequestHandler = (req,res) => {
			const messageDto = plainToInstance(MessageDto,req.body);
			const message = this.service.createMessage(messageDto);
			res.send(message)
	}

	deleteMessageById: RequestHandler = (req, res) => {
		const messageId = req.params.id as string;
		if (!messageId) {
			res.status(400).json({ error: 'Message ID parameter is missing' });
			return;
		}

		this.service.deleteMessageById(messageId);
		res.json({ message: 'Message deleted successfully' });
	}

	editMessage: RequestHandler = (req, res) => {
		const messageId = req.params.id as string;
		const updatedMessageDto = plainToInstance(MessageDto, req.body);

		if (!messageId) {
			res.status(400).json({ error: 'Message ID parameter is missing' });
			return;
		}

		const updatedMessage = this.service.editMessage(messageId, updatedMessageDto);

		if (updatedMessage) {
			res.json({ message: 'Message updated successfully', updatedMessage });
		} else {
			res.status(404).json({ error: 'Message not found' });
		}
	}

}