// Coded by Aya Saito

import { useEffect, useRef, useState } from "react";

export default function RangeFilter({
  id,
  label,
  type,
  min,
  max,
  value,
  price,
  unit,
  setValue: propSetValue,
  className,
}) {
  const wrapperRef = useRef(null);
  const [handleMin, setHandleMin] = useState(0);
  const [handleMax, setHandleMax] = useState(0);
  const [validRange, setValidRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (min) {
      console.log("change");
      setHandleMin(min);
      updateValidRange(min, "miniVal");
    }
  }, [min]);
  useEffect(() => {
    if (max) {
      setHandleMax(max);
      updateValidRange(max, "maxVal");
    }
  }, [max]);

  console.log(validRange.max);
  console.log(value);

  function onChange(e) {
    if (e.target.id === "miniVal") {
      setHandleMin(e.target.value);
      updateValidRange(e.target.value, e.target.id);
      propSetValue(prev => ({ ...prev, ["min"]: e.target.value }));
    } else if (e.target.id === "maxVal") {
      setHandleMax(e.target.value);
      updateValidRange(e.target.value, e.target.id);
      propSetValue(prev => ({ ...prev, ["max"]: e.target.value }));
    }
  }

  function updateValidRange(value, target) {
    const wrapperWidth = wrapperRef.current.clientWidth;
    if (target === "miniVal") {
      setValidRange(prev => ({ ...prev, ["min"]: (wrapperWidth / (max - min)) * (value - min) }));
    }
    if (target === "maxVal") {
      setValidRange(prev => ({ ...prev, ["max"]: (wrapperWidth / (max - min)) * (max - value) }));
    }
    if (min === max) {
      setValidRange({ ["min"]: min, ["max"]: max });
    }
  }
  return (
    <div className={`${className}`}>
      <label className="text-neutral-light">{label}</label>
      <div ref={wrapperRef} className="relative left-1 my-6 -mx-2 w-full">
        {/* Track background -------------------------------------------- */}
        {/* bg */}
        <div className="absolute w-full h-[2px] -mt-[1px]">
          <div className={`w-full h-full bg-background-4`}></div>
        </div>
        {/* Valid range */}
        <div
          className="absolute w-full h-[2px] -mt-[1px] overflow-hidden"
          style={{ paddingLeft: validRange.min + "px", paddingRight: validRange.max + "px" }}
        >
          <div className={`w-full h-full bg-primary`}></div>
        </div>
        {/* Input ------------------------------------------------------ */}
        <div className="absolute top-0 left-0 w-full flex justify-center">
          <input
            id="miniVal"
            name="miniVal"
            type="range"
            className="w-full"
            value={handleMin}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>
        <div className="absolute top-0 left-0 w-full flex justify-center">
          <input
            id="maxVal"
            name="maxVal"
            type="range"
            className="w-full"
            value={handleMax}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>

        {/* output values ---------------------------------------------------- */}
        <div className="relative top-4 flex justify-center text-xs text-neutral">
          <div>
            {price && "$"}
            {handleMin}
          </div>
          <span className="w-6 flex justify-center"> - </span>
          <div>
            {price && "$"}
            {handleMax}
          </div>
        </div>
      </div>
    </div>
  );
}
