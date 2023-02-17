import classNames from "classnames";
import { useState } from "react";
import ArrowIcon from "../../assets/icon-left-arrow.svg";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  text: string;
  onClick: () => void;
}

export default function BackButton({
  text,
  onClick,
  className,
  ...rest
}: IProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClick}
      className={classNames(
        {
          "flex items-center cursor-pointer w-max": true,
        },
        className
      )}
      {...rest}
    >
      <ArrowIcon
        className={classNames({
          "relative top-[1px]": true,
          "animate-bounce-left animation-[": hovering,
        })}
      />
      <p className="relative text-2xl leading-9 ml-[19px] xm:text-3xl xm:ml-[25px]">
        {text}
      </p>
    </div>
  );
}
