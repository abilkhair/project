import express, { Application, RequestHandler } from "express";
import { AppInit } from "./interfaces/AppInit.interface";
import { IRoutes } from "./interfaces/IRoute.interface";


class App {
	public app:Application;
	public port:number;

	constructor(appInit:AppInit){
			this.app = express();
			this.port = appInit.port
			this.initAssets()
			this.initMiddleWares(appInit.middlewares)
		this.initRoutes(appInit.controllers)
		
	}

	private initMiddleWares(middlewares:RequestHandler[]) {
			middlewares.forEach((middleware) => {
				this.app.use(middleware)
			})
		};

		private initRoutes(routes: IRoutes[]) {
			routes.forEach((route) => {
				this.app.use(route.path, route.router);
			});
		}

		private initAssets () {
			this.app.use(express.json())
		}

		public listen () {
			this.app.listen(this.port, () => {
				console.log(`App listening  on the http://localhost:${this.port}`);
				
			})
		}
}

export default App