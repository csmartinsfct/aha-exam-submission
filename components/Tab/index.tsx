import classNames from "classnames";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  // max 2 items
  items: Array<string>;
  indexSelected: number;
  handleItemClicked: (index: number) => void;
}

export default function Tab({
  items,
  indexSelected,
  handleItemClicked,
  className,
  ...rest
}: IProps) {
  return (
    <div
      className={classNames(
        {
          "flex h-max item-center relative w-full justify-around before:absolute before:w-full before:bottom-[-9px] before:bg-greyscale800 before:block before:h-[2px] after:absolute after:bottom-[-9px] after:h-[2px] after:block after:bg-white after:w-[calc(50%_-_0.5px)]":
            true,
          "after:translate-x-[-50%]": indexSelected === 0,
          "after:translate-x-2/4": indexSelected === 1,
          "after:transition-transform after:duration-300": true,
          "[&>div:last-of-type>span]:relative [&>div:last-of-type>span]:left-[-0.5px]":
            true,
        },
        className
      )}
      {...rest}
    >
      {items.map((item, index) => (
        <div
          className={classNames({
            "cursor-pointer transition-colors duration-300 tracking-[0.15px]":
              true,
            "font-bold": indexSelected === index,
            "text-greyscale500 opacity-[87]": indexSelected !== index,
          })}
          key={item}
          onClick={() => handleItemClicked(index)}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
