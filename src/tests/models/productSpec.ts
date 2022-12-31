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

   it("shouldn't show product with id 1", async (): Promise<void> => {
      const result: any = await store.show(1);
      expect(result).toEqual(undefined)
   });

   it("should index products", async (): Promise<void> => {
      const result: any = await store.index();
      expect(result[0]).toEqual(
         jasmine.objectContaining({
            name: "PS4",
            price: 1500,
         })
      );
   });

   it("shouldn't update product with id 1", async (): Promise<void> => {
      const product_data = {
         name: "Test Product",
         price: 100,
         id: "2",
      }
      const result: any = await store.update(product_data);
      expect(result).toEqual(undefined);
   });

   it("shouldn't delete product with id 1", async (): Promise<void> => {
      const result: any = await store.delete(1);
      expect(result).toEqual(undefined);
   });
});