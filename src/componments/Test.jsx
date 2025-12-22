import React, { useState } from "react";

function Test() {
  let [count, setCount] = useState(0);

  let add = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div className="mx-40">
        <p>{count}</p>
        <div>
          <button className="border-2 px-7 " onClick={add}>
            +
          </button>
          <button className="border-2 px-7 ">-</button>
        </div>
      </div>
    </>
  );
}

export default Test;
