import { Order, orderStore } from "../../models/order";

const store = new orderStore();

describe("User Model", () => {
   it("check orders routes", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("should create an order", async (): Promise<void> => {
      const result: any = await store.create({
         user_id: 1,
         status: "active",
      });
      expect(result).toEqual({
         id: 1,
         user_id: 1,
         status: "active",
      });
   });

   it("should show order with id 1", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual({
         id: 1,
         user_id: 1,
         status: "active",
      });
   });
});