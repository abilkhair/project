import { RequestHandler } from "express";

export const validateMessage:RequestHandler = (req,res,next) => {
	const message = req.body
	if (!message.author || !message.message) {
		res.status(400).send({message: "Invalid message"})
};
next()
}