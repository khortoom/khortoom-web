import React from "react";

interface Props {
  product: any;
}

function Product(props: Props) {
  const { product } = props;
  console.log("product", product);
  return (
    <a
      href={`https://www.digikala.com/product/dkp-${product.id}/`}
      className="card bg-base-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      <div className="card-body p-4">
        <h2 className="card-title">{product.title_fa}</h2>
        <p>{product.Brand}</p>
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

export default Product;
