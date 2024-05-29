import React from "react";

interface Props {
  productId: string;
  comment: string;
}

function Comment(props: Props) {
  const { comment, productId } = props;
  return (
    <a
      href={`https://www.digikala.com/product/dkp-${productId}/`}
      className="card bg-base-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      <div className="card-body p-4">
        <p>{comment}</p>
      </div>
    </a>
  );
}

export default Comment;
