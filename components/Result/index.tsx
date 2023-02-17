import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import wrapFunctionInTimeoutInDev from "../../utils/wrapFunctionInTimeoutInDev";
import TwoFieldImageLabel from "../TwoFieldImageLabel";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  src: string;
  name: string;
  username: string;
  loaded?: boolean;
}

function Result({
  src,
  name,
  username,
  className,
  loaded = true,
  ...rest
}: IProps) {
  const [loadedAvatar, setLoadedAvatar] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    wrapFunctionInTimeoutInDev(() => {
      if (src !== "" && imgRef && imgRef.current) {
        imgRef.current.src = src;
      }
    });
  }, [src]);

  return (
    <div
      className={classNames({ "flex flex-col relative": true, className })}
      {...rest}
    >
      {!loadedAvatar && (
        <>
          {/* padding-top here is to give a "height" to the skeleton that otherwise would only have a width and 0 height */}
          <div className="bg-greyscale100 animate-pulse rounded pt-[67%]" />
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        className="mb-[20.33px] xm:mb-[12.83px]"
        onLoad={() => setLoadedAvatar(true)}
        alt=""
      />
      <TwoFieldImageLabel
        firstField={name}
        secondField={`by ${username}`}
        loaded={loaded}
      />
    </div>
  );
}

export default memo(Result);
