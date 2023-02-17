/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import classNames from "classnames";
import Button from "../Button";

interface IProps extends React.HTMLProps<HTMLParagraphElement> {
  centered?: boolean;
}

export default function ErrorMessage({
  className,
  centered = false,
  ...rest
}: IProps) {
  return (
    <div
      className={classNames({ "text-center": centered }, className)}
      {...rest}
    >
      <p className="text-lg">An error occurred.</p>
      <p className="mt-5 mb-10">
        Click the button below to refresh the application.
      </p>
      <Button
        onClick={() => location.reload()}
        type="button"
        variant="normal"
        className={centered ? "m-[0_auto]" : ""}
      >
        Refresh
      </Button>
    </div>
  );
}
