import { Order, orderStore } from "../../models/order";
import { Request, Response } from 'express'

const store = new orderStore();

describe("Order Model", () => {
   it("should have an INDEX method", () => {
      expect(store.index).toBeDefined();
   });
  
   it("should have a SHOW method", () => {
      expect(store.show).toBeDefined();
   });
  
   it("should have a CREATE method", () => {
      expect(store.create).toBeDefined();
   });
  
   it("should have a UPDATE method", () => {
      expect(store.update).toBeDefined();
   });

   it("should have a DELETE method", () => {
      expect(store.delete).toBeDefined();
   });
   // it("It should return 200 response", (done) => {
   //    request.get('127.0.0.1/users', function(error, response) {
   //       expect(response.statusCode).toEqual(200);
   //    });
   // })
});