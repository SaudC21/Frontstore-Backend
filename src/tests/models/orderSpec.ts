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
            user_id: '2',
            status: "Active",
         })
      );
   });
});