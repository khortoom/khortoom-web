import Image from "next/image";
import React from "react";

interface Props {
  loading?: boolean;
  text?: string;
}

function Dialog(props: Props) {
  const { loading, text } = props;
  return (
    <div className="chat chat-start w-full pt-4">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            width={10}
            height={10}
            alt="blake"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble">
        {loading && <span className="loading loading-dots loading-sm"></span>}
        {!loading && <span>{text}</span>}
      </div>
    </div>
  );
}

export default Dialog;
