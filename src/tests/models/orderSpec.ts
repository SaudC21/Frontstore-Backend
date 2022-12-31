import { Order, orderStore } from "../../models/order";

const store = new orderStore();

describe("Order Model", () => {
   it("should get order by id", async () => {
      const result: any = await store.show(1);
      expect(result).toEqual(
         jasmine.objectContaining({
            user_id: '2',
            status: "Active",
         })
      );
   });

   it("should get all orders", async () => {
      const result: any = await store.index();
      expect(result[0]).toEqual(
         jasmine.objectContaining({
            user_id: '3',
            status: "Waiting",
         })
      );
   });

   it("should create an order", async () => {
      const order: Order = {
         user_id: 2,
         status: "Active",
      }
      const result: any = await store.create(order);
      expect(result).toEqual(
         jasmine.objectContaining({
            user_id: '2',
            status: "Active",
         })
      );
   });

   it("should update an order", async () => {
      const order_data = {
         user_id: 2,
         status: "Active",
         id: "1",
      }
      const result: any = await store.update(order_data);
      expect(result).toEqual("User's order with id #2 has been updated");
   });
});