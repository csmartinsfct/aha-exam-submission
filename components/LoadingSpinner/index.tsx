import classNames from "classnames";
import Spinner from "./spinner.svg";

export default function LoadingSpinner({
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) {
  return <Spinner className={classNames(className)} {...rest} />;
}
