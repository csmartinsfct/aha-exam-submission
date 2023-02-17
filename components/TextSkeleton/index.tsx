import classNames from "classnames";

interface IProps {
  text: string;
  loaded: boolean;
  classNamesWhileLoading: string;
  defaultClassNames: string;
}

export default function TextSkeleton({
  text,
  loaded,
  classNamesWhileLoading,
  defaultClassNames,
}: IProps) {
  return (
    <p
      className={classNames({
        [defaultClassNames]: true,
        "bg-greyscale100 !text-transparent animate-pulse rounded": !loaded,
        [classNamesWhileLoading]: !loaded,
      })}
    >
      {text}
    </p>
  );
}
