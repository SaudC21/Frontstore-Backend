import express, { Request, Response } from 'express'
import { User, userStore } from '../models/user'
import jwt from 'jsonwebtoken';
import verifyAuthToken from './middleware/verifyAuthToken';
import dotenv from "dotenv";

dotenv.config();

const store = new userStore();

const index = async (_req: Request, res: Response) => {
   try {
      const user = await store.index();
      res.json(user);
   } catch (error) {
      res.status(400)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const user = await store.show(req.params.id as unknown as number);

      if(!user) {
         res.status(400).send(`User ${req.params.id} not found`);
      }

      res.json(user);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const user: User = {
         first_name: req.query.first_name as string,
         last_name: req.query.last_name as string,
         username: req.query.username as string,
         password_digest: req.query.password_digest as string,
      }

      if(user.first_name == undefined  || user.last_name == undefined || user.username == undefined || user.password_digest == undefined) {
         res.status(400)
         res.send("Missing required parameters")
         return
      }

      const userRecord = await store.create(user);
      var token = jwt.sign({ user: userRecord }, process.env.TOKEN_SECRET as string);
      
      res.json(token);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const authenticate = async (req: Request, res: Response) => {
   try {
      const username = req.query.username as unknown as string;
      const password = req.query.password as unknown as string;
   if (username == undefined || password == undefined) {
      res.status(400);
      res.send("Some required parameters are missing! eg.:username, :password");
      return false;
   }   
      console.log(password, username)
     const user: User | null = await store.authenticate(username, password);

     console.log(user);
 
     if (user == null) {
       res.status(401);
       res.send(`Wrong password for user ${username}.`);
       return false;
     }

     var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
 
     res.json(token);
   } catch (error) {
     res.status(400);
     res.json(error);
   }
}

const update = async (req: Request, res: Response) => {
   try {
      const user_data = {
         fName: req.query.first_name as string,
         lName: req.query.last_name as string,
         username: req.query.username as string,
         password: req.query.password_digest as string,
         id: req.params.id as string
      }
      await store.update(user_data);
      res.json(`User #${user_data.id} has been updated`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      const userId = req.params.id as unknown as number;
      console.log(userId)
      await store.delete(userId);
      res.json(`User #${userId} has been deleted`);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const userRoutes = async (app: express.Application) => {
   app.get('/users', verifyAuthToken, index)
   app.get('/users/:id', verifyAuthToken, show)
   app.post('/users/register', verifyAuthToken, create)
   app.post('/users/authenticate', authenticate)
   app.put('/users/:id', verifyAuthToken, update)
   app.delete('/users/:id', verifyAuthToken, destroy)
}

export default userRoutes;