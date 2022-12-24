import express, { Request, Response } from 'express'
import { User, userStore } from '../models/user'
import jwt from 'jsonwebtoken';
import verifyAuthToken from './middleware/verifyAuthToken';

const store = new userStore();

const index = async (_req: Request, res: Response) => {
   try {
      const user = await store.index();
      res.json(user);
   } catch (error) {
      //res.json(error)
      res.status(400)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const user = await store.show(req.body.id);
      res.json(user);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const user: User = {
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         username: req.body.username,
         password_digest: req.body.password,
      }

      if(user.first_name === undefined  || user.last_name === undefined || user.username === undefined || user.password_digest === undefined) {
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
     const username = req.body.username as unknown as string;
     const password = req.body.password as unknown as string;
 
   if (username === undefined || password === undefined) {
      res.status(400);
      res.send("Some required parameters are missing! eg.:username, :password");
      return false;
   }
 
     const user: User | null = await store.authenticate(username, password);
 
     if (user === null) {
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
      const user: User = {
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         username: req.body.username,
         password_digest: req.body.password,
      }
      const result = await store.update(user);
      res.json(result);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      const deleted = await store.delete(req.body.id);
      res.json(deleted);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const userRoutes = async (app: express.Application) => {
   app.get('/users', verifyAuthToken, index)
   app.get('/users/:id', verifyAuthToken, show)
   app.post('/users/register', create)
   app.post('/users/authenticate', authenticate)
   app.put('/users/:id', verifyAuthToken, update)
   app.delete('/users/:id', verifyAuthToken, destroy)
}

export default userRoutes;