import Image from "next/image";
import React from "react";

function Product() {
  return (
    <a
      href="https://www.digikala.com/product/dkp-15058862/%D9%84%D9%BE-%D8%AA%D8%A7%D9%BE-156-%D8%A7%DB%8C%D9%86%DA%86%DB%8C-%D8%A7%DB%8C%D8%B3%D9%88%D8%B3-%D9%85%D8%AF%D9%84-vivobook-15-x515ma-br001w-celeron-n4020-8gb-512ssd-%DA%A9%D8%A7%D8%B3%D8%AA%D9%88%D9%85-%D8%B4%D8%AF%D9%87/"
      className="card bg-base-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      <figure>
        <Image
          src="https://dkstatics-public.digikala.com/digikala-products/8cade9127074329e1dec7706c076bfea6a36d9ab_1712562979.jpg"
          alt="Product"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title">کفش</h2>
        <p>یک توضیح کوتاه در مورد کفش</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">آرایشی و بهداشتی</div>
          <div className="badge badge-outline">تایید شده</div>
        </div>
      </div>
    </a>
  );
}

export default Product;
