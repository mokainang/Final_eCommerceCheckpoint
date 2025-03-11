import { AllProducts } from "@/constants/productsData";

import React from "react";
import ProductCard from "./ProductCard";

export const ProductList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {AllProducts.map((item) => {
        return (
          <ProductCard
            key={item.product_id}
            product_image={item.product_image}
            product_id={item.product_id}
            product_name={item.product_name}
            product_price={item.product_price}
          />
        );
      })}
    </section>
  );
};

export default ProductList;
