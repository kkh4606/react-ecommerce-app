import { useMemo, useState } from "react";

function Memoeexample() {
  const [count, setCount] = useState(0);

  const calculateValue = useMemo(() => {
    console.log("calculating....");

    let result = 0;

    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }

    return result;
  }, []);

  return (
    <>
      <div className="mx-[200px]">
        <p>count : {count}</p>
        <p>calculated result {calculateValue}</p>
        <div>
          <button
            className="border-2 px-[30px] mr-2"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
          <button
            className="border-2 px-[30px]"
            onClick={() => {
              setCount(count != 0 ? count - 1 : 0);
            }}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default Memoeexample;
