import React from "react";
import Product from "./product";

interface Props {
  products: any[];
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
          <Product key={index} product={item} />
        ))}
      </div>
    </>
  );
}

export default ProductResults;
