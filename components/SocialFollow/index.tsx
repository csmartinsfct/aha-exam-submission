import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import { Person } from "../../types/state.interface";
import wrapFunctionInTimeoutInDev from "../../utils/wrapFunctionInTimeoutInDev";
import Button from "../Button";
import TextSkeleton from "../TextSkeleton";

export interface ISocialFollowProps
  extends Omit<Person, "id">,
    Omit<React.HTMLProps<HTMLDivElement>, "name"> {
  loaded?: boolean;
  updatingStatus: boolean;
  toggleStatus: (userId: string) => void;
}

function SocialFollow({
  avatarSrc,
  name,
  username,
  following,
  loaded = true,
  className,
  updatingStatus = false,
  toggleStatus,
  id,
}: ISocialFollowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loadedAvatar, setLoadedAvatar] = useState(false);

  /* fetch avatar image and display skeleton while it isn't available. Force loading image slowly so the skeleton is displayed (for testing only) */
  useEffect(() => {
    if (ref && ref.current) {
      const img = new Image();
      img.src = avatarSrc;

      // @ts-ignore
      img.onload = () => {
        wrapFunctionInTimeoutInDev(() => {
          if (ref && ref.current) {
            ref.current.style.backgroundImage = `url('${avatarSrc}')`;
          }
          setLoadedAvatar(true);
        });
      };

      img.onerror = () => {
        /* TODO: handle error */
      };
    }
  }, [avatarSrc]);

  return (
    <div
      className={classNames(
        {
          "flex justify-between items-center": true,
        },
        className
      )}
    >
      <div className="flex align-center">
        <div
          ref={ref}
          className={classNames({
            "w-10 h-10 rounded-[5px] relative left-[1px] border-[1px] border-greyscale50 mr-[15px] bg-contain":
              true,
            "border-none": !loaded,
            "bg-greyscale100 animate-pulse": !loaded || !loadedAvatar,
          })}
        />
        <div className="flex flex-col">
          <TextSkeleton
            text={name}
            defaultClassNames="leading-6 pl-[1px] relative top-[-3px] tracking-[0.15px]"
            classNamesWhileLoading="w-[160px] h-5"
            loaded={loaded}
          />

          <TextSkeleton
            text={`@${username}`}
            defaultClassNames="leading-[21px] text-sm text-greyscale400 pl-[1px] relative top-[-2.5px] tracking-[0.25px]"
            classNamesWhileLoading="w-[50px] h-[19px] mt-[4px]"
            loaded={loaded}
          />
        </div>
      </div>
      <div>
        {loaded && (
          <Button
            className="relative"
            type="button"
            variant={following ? "contained" : "outlined"}
            style={{
              top: following ? "-3.5px" : "-3px",
              left: following ? "0px" : "1px",
            }}
            loading={updatingStatus}
            onClick={() => toggleStatus(id as string)}
          >
            {following ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(SocialFollow);
