"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { ChangeEvent, memo, startTransition, useEffect, useId } from "react";
import setPageSizeOrKeywordAction from "../../context/thunks/set-page-size-or-keyword";
import useGlobalDispatcher from "../../hooks/use-global-dispatcher";
import useInputRangeContext from "../../hooks/use-input-range-context";
import { AppEvents } from "../../types/reducer";
import Button from "../Button";
import Input from "../Input";
import Separator from "../Separator";
import Slider from "../Slider";

interface IProps {
  pageSize: number;
  keyword: string;
  sendSearchRequest: () => void;
  hasResults: boolean;
}

function HomePageForm({
  pageSize,
  keyword,
  sendSearchRequest,
  hasResults,
}: IProps) {
  const router = useRouter();
  const dispatch = useGlobalDispatcher();
  const inputRangeSliderState = useInputRangeContext();

  const loadingSlider = inputRangeSliderState.width === 1;

  const inputId = useId();
  const sliderId = useId();

  useEffect(() => {
    startTransition(() => {
      if (hasResults) {
        dispatch({ type: AppEvents.ResetResults, payload: {} });
      }
    });
  }, [dispatch, hasResults]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/?keyword=${keyword}&pageSize=${pageSize}`);
        sendSearchRequest();
      }}
      className="relative h-[calc(100%-66px)] xm:h-[100%] xm:max-w-[var(--max-width-home)] overflow-hidden xm:overflow-visible"
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={inputId}
        className="mb-4 text-2xl block leading-9 pt-[70px] xm:pt-[53px] xm:mb-5"
      >
        Search
      </label>
      <Input
        id={inputId}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setPageSizeOrKeywordAction({ keyword: e.target.value }))
        }
        placeholder="Keyword"
        value={keyword}
      />
      <Separator className="hidden xm:block" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={sliderId}
        className="block text-white text-2xl leading-9 mt-7 mb-[6px] xm:mt-0 xm:mb-[9.5px]"
      >
        # Of Results Per Page
      </label>
      <div className="mb-4">
        <span
          className={classNames({
            "leading-[72px] text-[48px] font-bold relative top-[-0.5px] xm:top-[-0.25px]":
              true,
            "animate-pulse text-transparent bg-greyscale100 rounded-lg":
              loadingSlider,
          })}
        >
          {pageSize}
        </span>
        <span
          className={classNames({
            "leading-6 ml-[13px] relative top-[-3px] left-[-2px]": true,
            "animate-pulse text-transparent bg-greyscale100 rounded-sm":
              loadingSlider,
          })}
        >
          results
        </span>
      </div>
      <div className="relative top-[-2px] xm:top-[-1.75px]">
        <div className="fixed w-[calc(100vw_-_32px)] left-4 xm:absolute xm:left-[1px] xm:w-[calc(100%_+_1px)]">
          <Slider
            id={sliderId}
            selectedValue={pageSize}
            onValueChange={(newValue) =>
              dispatch(setPageSizeOrKeywordAction({ pageSize: newValue }))
            }
          />
        </div>
      </div>
      <Separator className="absolute bottom-[113.5px] xm:!mt-[89.5px] xm:relative xm:bottom-auto w-full" />
      <Button
        className="absolute bottom-[23.5px] xm:bottom-[56px] w-full xm:max-w-[343px] xm:relative xm:bottom-auto xm:mt-[391.5px]"
        variant="normal"
        type="submit"
      >
        search
      </Button>
    </form>
  );
}

export default memo(HomePageForm);
