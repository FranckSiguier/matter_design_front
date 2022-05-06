import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard/ProductCard";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await axios({
        method: "get",
        url: "http://localhost:4000/products",
      });
      setProducts(response.data);
    }
    getProducts();
  }, []);

  return (
    <>
      <div id="products" className="d-flex justify-content-evenly">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              productId={product.id}
              name={product.name}
              price={product.price}
              description={product.description.replace(
                new RegExp("<[^>]*>", "g"),
                ""
              )}
            />
          );
        })}
      </div>
    </>
  );
};
