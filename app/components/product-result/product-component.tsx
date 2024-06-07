import Product from "@/app/types/product";
import React from "react";

interface Props {
  product: Product;
}

function ProductComponent(props: Props) {
  const { product } = props;
  return (
    <a
      href={`https://www.digikala.com/product/dkp-${product.id}/`}
      target="_blank"
      rel="noreferrer"
      className="card bg-base-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      <div className="card-body p-4">
        <h2 className="card-title">{product.title_fa}</h2>
        <p className="text-sm font-semibold">{product.Brand}</p>
        <p>{product.comment}</p>
        <div className="card-actions justify-end">
          {product.Category1 && (
            <div className="badge badge-outline truncate text-ellipsis overflow-hidden">
              {product.Category1}
            </div>
          )}
          {product.Category2 && (
            <div className="badge badge-outline text-ellipsis overflow-hidden">
              {product.Category2}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default ProductComponent;
