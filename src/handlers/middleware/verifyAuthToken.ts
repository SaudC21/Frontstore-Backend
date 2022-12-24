import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization as string;

		if(!token) {
			return res.status(401).send("Access Denied. Missing token");
		}

		jwt.verify(token, process.env.TOKEN_SECRET as string);

		next();
  	} catch (error) {
		res.status(400).send("Invalid token");
		return;
  }
}

export default verifyAuthToken;