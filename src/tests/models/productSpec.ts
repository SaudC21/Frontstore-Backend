import { Product, productStore } from "../../models/product";

const store = new productStore();

const productInstance = {
   name: "Test Product",
   price: 100,
}

describe("Product Model", () => {
   it("should create a product", async (): Promise<void> => {
      const result: any = await store.create(productInstance);
      expect(result).toEqual(
         jasmine.objectContaining({
            name: "Test Product",
            price: 100,
         })
      )
   });

   it("should show product with id 1", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual(
         jasmine.objectContaining({
            name: "PS2",
            price: 800,
         })
      )
   });

   it("should index products", async (): Promise<void> => {
      const result: any = await store.index();
      expect(result[0]).toEqual(
         jasmine.objectContaining({
            name: "PS2",
            price: 800,
         })
      );
   });
});