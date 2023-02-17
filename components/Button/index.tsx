import classNames from "classnames";
import LoadingSpinner from "../LoadingSpinner";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  variant: "normal" | "outlined" | "contained";
  type: "submit" | "reset" | "button";
  // here for testing buttons render correctly
  isHovering?: boolean;
  loading?: boolean;
}

export default function Button({
  variant,
  type = "button",
  children,
  isHovering = false,
  className,
  loading = false,
  ...rest
}: IProps) {
  const classes = classNames(
    {
      // defaults for all button types
      "border-white border border-solid flex items-center w-max justify-center hover:border-white transition-colors duration-[400ms]":
        true,

      "h-10 px-[13px] text-sm text-default bg-white uppercase font-bold rounded hover:bg-default hover:text-white transition-colors duration-200":
        variant === "normal",

      // here for testing components in Storybook
      "border-white !bg-default !text-white": isHovering,

      // some defaults for the variants below
      "text-xs [&>*]:relative font-opensans rounded-[20px] font-semibold":
        variant !== "normal",

      "bg-white [&>*]:top-[0.5px] px-[9.43px] h-[28px] text-default hover:bg-default hover:text-white":
        variant === "contained",

      "border-white px-[10.2422px] [&>*]:top-[-1.25px] h-[29px] hover:!bg-white hover:!text-default":
        variant === "outlined",

      // here for testing components in Storybook
      "!bg-white !text-default": isHovering && variant === "outlined",

      "[&>span]:flex [&>span]:items-center [&>span>svg]:w-[30px] [&>span>svg]:h-[30px] opacity-60 cursor-not-allowed":
        loading,

      "[&>span>svg]:mr-[5px] [&>span>svg]:w-[30px] [&>span>svg]:h-[30px]":
        loading && variant === "normal",

      "[&>span>svg]:mr-[2.5px] [&>span>svg]:w-[20px] [&>span>svg]:h-[20px]":
        loading && variant !== "normal",
    },
    className
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} {...rest} className={classes} disabled={loading}>
      <span>
        {loading && <LoadingSpinner />}
        {children}
      </span>
    </button>
  );
}
