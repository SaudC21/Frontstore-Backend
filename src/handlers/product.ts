import express, { Request, Response } from 'express'
import { Product , productStore } from '../models/product'
import verifyAuthToken from './middleware/verifyAuthToken';

const store = new productStore();

const index = async (_req: Request, res: Response) => {
   try {
      const product = await store.index();
      res.json(product);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const productId = req.params.id as unknown as number;
      const product = await store.show(productId);
      res.json(product);
   } catch (error) {
      res.status(400)
      res.json(error)
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const product: Product = {
         name: req.query.name as string,
         price: req.query.price as unknown as number,
      }
      const productRecord = await store.create(product);
      res.json(`Product ${productRecord.name} has been created`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const update = async (req: Request, res: Response) => {
   try {
      const product_data = {
         name: req.query.name as string,
         price: req.query.price as unknown as number,
         id: req.params.id as string,
      }
      await store.update(product_data);
      res.json(`Proudct #${product_data.id} has been updated`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      const productId = req.params.id as unknown as number;
      await store.delete(productId);
      res.json(`Proudct #${productId} has been deleted`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const productRoutes = async (app: express.Application) => {
   app.get('/products', index);
   app.get('/products/:id', show);
   app.post('/products/create', verifyAuthToken, create);
   app.put('/products/:id', verifyAuthToken, update);
   app.delete('/products/:id', verifyAuthToken, destroy);
}

export default productRoutes;