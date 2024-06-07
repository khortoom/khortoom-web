import React from "react";
import Comment from "./comment";

interface Props {
  comments: (string | null)[];
  ids: string[];
}

function CommentResults(props: Props) {
  const { comments, ids } = props;
  return (
    <>
      {comments.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-52">
          <p>گشتم نبود نگرد نیست</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {comments.map((item: any, index: number) => (
          <Comment key={index} comment={item} productId={ids[index]} />
        ))}
      </div>
    </>
  );
}

export default CommentResults;
