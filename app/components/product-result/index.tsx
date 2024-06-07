import React from "react";
import ProductComponent from "./product-component";
import Product from "@/app/types/product";

interface Props {
  products: Product[];
}

function ProductResults(props: Props) {
  const { products } = props;
  return (
    <>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-52">
          <p>گشتم نبود نگرد نیست</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {products.map((item: any, index: number) => (
          <ProductComponent key={index} product={item} />
        ))}
      </div>
    </>
  );
}

export default ProductResults;
