import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  maxHeight: string; // ex: "calc(100vh-162px)"
}

/* wraps a given div/grid and constraints its height to make it scrollable.  There is an issue with CSS specifity, which is why we use ! below setting height in screens >= xm. "maxHeight" can't be used directly in tailwind in this case due to being a dynamic value so the "style" prop has to be used, which causes the issue. */
function ScrollableArea(
  { children, maxHeight, className, ...rest }: IProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={classNames(
        {
          "overflow-y-auto xm:!h-max w-[calc(100vw_-_7px)] relative xm:w-full scrollbar":
            true,
        },
        className
      )}
      style={{ height: maxHeight }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default forwardRef(ScrollableArea);
