
import { Router } from "express";
import { IRoutes } from "../interfaces/IRoute.interface";
import { MessageController } from "../controller/message.controller";
import { validateMessage } from "../middlewares/validate.message";

export class MessageRoute implements IRoutes {
		path: string = '/messages';
		router: Router = Router();

		private controller: MessageController;

		constructor() {
				
				this.controller = new MessageController()
				this.init();
		}
		private init() {
			this.router.get('/',this.controller.getMessage);
			this.router.get('/', this.controller.getMessageByDate);
			this.router.post('/',validateMessage,this.controller.createMessage);
			this.router.delete('/:id', this.controller.deleteMessageById);
			this.router.put('/:id', validateMessage, this.controller.editMessage);


		}
}