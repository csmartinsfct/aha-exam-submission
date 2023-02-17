import classNames from "classnames";
import TwoFieldImageLabel from "../TwoFieldImageLabel";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  name: string;
  count: number;
  loaded?: boolean;
}

export default function Tag({
  name,
  count,
  className,
  loaded = true,
  ...rest
}: IProps) {
  return (
    <div
      className={classNames({
        "flex flex-col relative max-w-[150px]": true,
        className,
      })}
      {...rest}
    >
      <div className="mb-[10px]">
        <div
          className={classNames({
            "bg-greyscale100 rounded w-[150px] h-[150px] rounded-[10px] relative":
              true,
            "animate-pulse": !loaded,
          })}
        >
          {loaded && (
            <div className="absolute bottom-[14px] left-[10px] flex items-center justify-center border border-[4px] rounded-[8px] h-[50px] max-w-[calc(100%_-_14px)]">
              <span className="text-2xl leading-9 text-ellipsis overflow-hidden whitespace-nowrap font-bold pl-[10px] pr-[11px]">
                {name}
              </span>
            </div>
          )}
        </div>
      </div>

      <TwoFieldImageLabel
        firstField={name}
        secondField={`${count.toString()} Results`}
        loaded={loaded}
      />
    </div>
  );
}
