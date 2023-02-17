"use client";

import Draggable from "react-draggable"; // The default
import { useMemo, useState } from "react";
import classNames from "classnames";
import useResizeObserver from "use-resize-observer";
import useInputRangeContext from "../../hooks/use-input-range-context";
import SLIDER_VALUES from "../../constants/slider-values";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  onValueChange: (newValue: number) => void;
  selectedValue: number;
}

const Slider = ({ onValueChange, selectedValue, ...rest }: IProps) => {
  const inputRangeContext = useInputRangeContext();

  /* only animate slider when the user is using it (this is so it doesn't animate on mount by default) */
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { ref, width = inputRangeContext.width } =
    useResizeObserver<HTMLDivElement>({
      onResize: (size) => {
        if (typeof size.width === "number" && !Number.isNaN(size.width)) {
          inputRangeContext.setWidth(size.width);
        }
      },
    });

  const [draggingState, setDraggingState] = useState({
    closestIndex: 0,
    draggingWidth: 0,
  });

  const { closestIndex, draggingWidth } = draggingState;

  const loading = width === 1;

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 420;

  const isMobile = viewportWidth < 420;

  const valuesKey = isMobile ? "offsetMobile" : "offsetDesktop";

  const [selected, setSelected] = useState(
    SLIDER_VALUES.findIndex((val) => val.val === selectedValue)
  );

  const [dragging, setDragging] = useState(false);

  const thumbLeftOffset =
    // eslint-disable-next-line no-nested-ternary
    selected === 0
      ? isMobile
        ? 10
        : 4
      : width * (SLIDER_VALUES[selected][valuesKey] / 100);

  /* currently the parent passes us the value/pageSize to use - we keep track of what index it corresponds to so we can notify the parent when it changes */
  const parentSelectedIndex = useMemo(
    () => SLIDER_VALUES.findIndex((val) => val.val === selectedValue),
    [selectedValue]
  );

  const inputRangeTrackBackground = useMemo(
    () =>
      `linear-gradient(269.99deg, #FFD25F 0.01%, #FF5C01 99.99%) 0% 0% / ${width}px`,
    [width]
  );

  /* finds the closest index while dragging so the interface updates while the user is dragging as opposed to only updating on rest */
  function getClosestIndex() {
    let index = -1;
    let distance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < SLIDER_VALUES.length; i += 1) {
      const val = SLIDER_VALUES[i];
      const valOffset = width * (val[valuesKey] / 100);
      const diff = Math.abs(valOffset - draggingWidth);
      if (diff < distance) {
        distance = diff;
        index = i;
      }
    }

    return index;
  }

  return (
    <div
      ref={ref}
      className="flex flex-col w-full"
      {...rest}
      onMouseEnter={() => {
        if (!shouldAnimate) {
          setShouldAnimate(true);
        }
      }}
    >
      <Draggable
        axis="x"
        scale={1}
        onDrag={(_e, data) => {
          setDragging(true);

          const closestIndex = getClosestIndex();

          const newIndexToUse = dragging ? closestIndex : selected;

          /* notify parent if selected value changes while dragging */
          if (parentSelectedIndex !== newIndexToUse) {
            onValueChange(
              SLIDER_VALUES[dragging ? closestIndex : selected].val
            );
          }
          setDraggingState({ closestIndex, draggingWidth: data.x });
        }}
        onStop={() => {
          if (dragging) {
            setDragging(false);
            setSelected(closestIndex);
          }
        }}
        bounds={{
          left: isMobile ? 10 : 4,
          right: isMobile ? width - 12 : width - 7,
        }}
        position={{ x: thumbLeftOffset, y: 0 }}
      >
        <div
          className={classNames({
            "absolute cursor-all-scroll top-[-9px] w-[26px] h-[26px] rounded-[50%] bg-orange2 z-[1] after:w-[13.5px] after:h-[13.5px] after:rounded-[50%] after:bg-greyscaleLight after:block after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] transition-colors delay-200":
              true,
            "!bg-greyscale100": loading,
          })}
          style={{
            transition:
              dragging || !shouldAnimate ? "none" : "transform linear 0.3s",
            transform: `translate(calc(${
              dragging ? draggingWidth : thumbLeftOffset
            }px - 50%), 0px)`,
            left: -12,
          }}
        />
      </Draggable>

      <div
        className={classNames({
          "relative w-full h-[8px] rounded-lg overflow-hidden": true,
          "animate-pulse": loading,
        })}
      >
        <div className="absolute bg-[rgb(255_255_255_/_30%)] h-full w-full top-0">
          <div
            style={{
              background: inputRangeTrackBackground,
              width:
                (dragging ? draggingWidth : thumbLeftOffset) - 5 < 0
                  ? 0
                  : (dragging ? draggingWidth : thumbLeftOffset) - 5,
              transition:
                dragging || !shouldAnimate
                  ? "none"
                  : "width linear 0.3s, background linear 0.3s",
            }}
            className="h-full"
          />
        </div>
      </div>

      <ul className="relatve mt-[12px] xm:mt-[14.25px]">
        {SLIDER_VALUES.map((item, index) => (
          <li
            className="absolute"
            key={item.val}
            style={{
              left: `${item[valuesKey]}%`,
              transform: `translate(${index > 0 ? "-50%" : "0%"})`,
            }}
          >
            <span
              className="cursor-pointer w-[28px] h-[13px] absolute top-[-25px] block left-[-5px]"
              onClick={() => {
                setSelected(index);
                if (index !== parentSelectedIndex) {
                  onValueChange(SLIDER_VALUES[index].val);
                }
              }}
            />

            <span
              className={`text-greyscale700 tracking-[0.25px] text-sm transition-colors duration-200 xm:text-base xm:tracking-[0.15px] xm:font-medium ${
                (dragging && index === closestIndex) ||
                (!dragging && selected === index)
                  ? "!text-white"
                  : ""
              }`}
            >
              {item.val}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
