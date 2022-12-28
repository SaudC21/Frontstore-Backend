import express, { Request, Response } from 'express'
import { Order, orderStore } from '../models/order'
import verifyAuthToken from './middleware/verifyAuthToken';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
   try {
      const order = await store.index();
      res.json(order);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const show = async (req: Request, res: Response) => {
   try {
      const orderId = req.params.id as unknown as number;
      const order = await store.show(orderId);
      res.json(order);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const create = async (req: Request, res: Response) => {
   try {
      const order: Order = {
         user_id: req.query.user_id as unknown as number,
         status: req.query.status as string,
      }
      console.log(order);
      const orderRecord = await store.create(order);
      res.json(`Order of the user with id #${orderRecord.user_id} has been created`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const update = async (req: Request, res: Response) => {
   try {
      const order_data = {
         user_id: req.query.user_id as unknown as number,
         status: req.query.status as string,
         id: req.params.id as string,
      }
      const result = await store.update(order_data);
      res.json(result);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const destroy = async (req: Request, res: Response) => {
   try {
      await store.delete(req.params.id as unknown as number);
      res.json(`Order #${req.params.id} has been deleted`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const createOrderProduct = async (req: Request, res: Response) => {
   try {
      const OrderProduct = {
         quantity: req.query.quantity as unknown as number,
         order_id: req.query.order_id as unknown as number,
         product_id: req.query.product_id as unknown as number,
      }
      console.log(OrderProduct)
      const orderProductRecord = await store.createOrderProduct(OrderProduct);
      res.json(`order for product ${OrderProduct.product_id} has been created`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const deleteOrderProduct = async (req: Request, res: Response) => {
   try {
      const orderProduct_id = req.params.id as unknown as number;
      await store.deleteOrderProduct(orderProduct_id);
      res.json(`Order #${orderProduct_id} has been deleted`);
   } catch (error) {
      res.status(400);
      res.json(error);
   }
}

const orderRoutes = async (app: express.Application) => {
   app.get('/orders', index);
   app.get('/orders/:id', show);
   app.post('/orders/create', verifyAuthToken, create);
   app.put('/orders/:id', verifyAuthToken, update);
   app.delete('/orders/:id', verifyAuthToken, destroy);
   app.post('/orders/products', verifyAuthToken, createOrderProduct);
   app.delete('/orders/products/:id', verifyAuthToken, deleteOrderProduct);
}

export default orderRoutes;