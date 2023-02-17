import classNames from "classnames";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  // here for testing buttons render correctly
  isFocused?: boolean;
}

export default function Input({ isFocused, ...rest }: IProps) {
  const classes = classNames(
    {
      "h-[60px] border-[3px] border-[#8B8B8B] bg-transparent rounded-md px-[15px] pt-[2px] text-sm focus:border-orange focus:outline-0 transition-colors duration-200 placeholder:text-[#5D5D5D] leading-[21px] tracking-[0.25px] w-full":
        true,
      "border-orange": isFocused,
    },
    rest.className
  );

  return <input {...rest} className={classes} />;
}
