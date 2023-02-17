"use client";

import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogoIcon from "../../assets/logo.svg";
import ROUTES from "../../constants/routes.enum";
import BackButton from "../BackButton";

export default function LogoOrBackButton() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get("keyword");

  const shouldBeDisplayed =
    (path === "" || path === ROUTES.HOME) && keyword === null;

  return (
    <>
      <LogoIcon
        className={classNames({
          "z-[3] mb-[46px] left-[1px] fixed ml-[21px] top-[30px] xm:ml-[23px] xm:top-[38px]":
            true,
          "hidden xm:block": !shouldBeDisplayed,
        })}
      />
      <BackButton
        className={classNames({
          hidden: shouldBeDisplayed,
          block: !shouldBeDisplayed,
          "mt-[25.17px] xm:hidden ": true,
          "relative left-[5px]": true,
        })}
        text="Home Page"
        onClick={() => router.push(ROUTES.HOME)}
      />
    </>
  );
}
