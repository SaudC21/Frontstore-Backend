import { Product, productStore } from "../../models/product";

const store = new productStore();

describe("Product Model", () => {
   it("shoud check product routes", () => {
      expect(store.index).toBeDefined();
      expect(store.show).toBeDefined();
      expect(store.create).toBeDefined();
      expect(store.update).toBeDefined();
      expect(store.delete).toBeDefined();
   });

   it("should create a product", async (): Promise<void> => {
      const result: any = await store.create({
         name: "Test Product",
         price: 100,
      });
      expect(result).toEqual({
         id: 1,
         name: "Test Product",
         price: 100,
      });
   });

   it("should show product with id 1", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual({
         id: 1,
         name: "Test Product",
         price: 100,
      });
   });
});