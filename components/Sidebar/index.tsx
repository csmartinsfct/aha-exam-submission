"use client";

import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import IconTabs from "../../assets/icon-tabs.svg";
import ROUTES from "../../constants/routes.enum";
import SIDEBAR_ITEMS from "../../constants/sidebar-items";

export default function Sidebar() {
  const path = usePathname();
  const searchParams = useSearchParams();

  const selected = path === ROUTES.TAGS ? 1 : 0;

  const keyword = searchParams.get("keyword");

  const shouldBeDisplayed =
    (path === "" || path === ROUTES.HOME) && keyword === null;

  const classNamesSharedByBoxShadowDivs =
    "absolute w-[124px] h-4 top-[50%] rounded-[50%] shadow-[_1px_1px_20px_1px_#ffffff7d] xm:hidden";

  return (
    <div
      className={classNames({
        "z-[2] h-[var(--sidebar-height-mobile)] w-full fixed bottom-0 xm:w-[var(--sidebar-width-desktop)] xm:fixed xm:h-screen xm:bottom-auto xm:top-0 left-0 translate-y-[0px]":
          true,
        "translate-y-[100px] xm:translate-y-0": !shouldBeDisplayed,
        "transition-transform duration-300": true,
      })}
    >
      {/* these two exist to create the effect displayed in the mobile sidebar (cloudy-like) - caused by the blur filter used in the nav element */}
      <div
        className={classNames({
          [classNamesSharedByBoxShadowDivs]: true,
          "left-[13%]": true,
          hidden: !shouldBeDisplayed,
        })}
      />
      <div
        className={classNames({
          [classNamesSharedByBoxShadowDivs]: true,
          "left-[62%]": true,
          hidden: !shouldBeDisplayed,
        })}
      />
      <nav
        className={classNames({
          "h-full shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.8)] bg-sidebarMobile backdrop-blur-[27.1828px] flex xm:bg-greyscaleLight xm:flex-col items-center xm:pt-[94px] xm:pl-[1.5px] xm:shadow-none xm:backdrop-blur-0 translate-y-[0px]":
            true,
        })}
      >
        {/* on mobile a third option is added to the sidebar that isn't in the mockup (sorry if this counts as not being able to read instructions) but it was rather ambiguous to me that there is a design for the "followers&following" page for mobile in Figma and its also mentioned in the google document when referring to the social page "web/mobile" so I added "Social" as a third option to so the page is accessible on mobile as well (better UX).  */}
        <div className="pt-[3px] flex w-full justify-center [&>a]:mr-[52px] [&>a:last-of-type]:mr-0 xm:[&>a]:mb-[23px] xm:flex-col xm:[&>a:first-of-type]:mr-0 xm:[&>a:nth-child(2)]:mr-0 xm:[&>a:last-of-type]:hidden">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link
              className={classNames({
                "flex flex-col items-center cursor-pointer transition-colors duration-200 xm:hover:text-white":
                  true,
                "text-white": selected === index,
                "text-greyscale500": selected !== index,
              })}
              key={item.name}
              href={item.href}
            >
              <IconTabs id={item.name} />
              <label
                htmlFor={item.name}
                className="text-xs leading-[18px] pt-[2px] tracking-[0.4px] pl-[0.5px] cursor-pointer"
              >
                {item.name}
              </label>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
