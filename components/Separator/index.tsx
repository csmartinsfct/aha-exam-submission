import classNames from "classnames";

export default function Separator({
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        { "h-[1px] opacity-10 bg-white my-[30px] xm:mt-[29px]": true },
        className
      )}
      {...rest}
    />
  );
}
