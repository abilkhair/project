
import {RequestHandler } from "express";
import { IRoutes } from "./IRoute.interface";

export interface AppInit {
	port: number;
	middlewares:RequestHandler[];
	controllers:IRoutes[];
}