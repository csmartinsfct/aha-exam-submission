"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import ROUTES from "../../constants/routes.enum";
import { SearchResult } from "../../types/state.interface";
import BackButton from "../BackButton";
import ErrorMessage from "../ErrorMessage";
import InfiniteScrollingMessages from "../InfiniteScrollingMessages";
import Result from "../Result";
import ScrollableArea from "../ScrollableArea";

interface IProps {
  isFetching?: boolean;
  hasFetched?: boolean;
  searchResults: SearchResult[];
  page: number;
  totalPages: number;
  pageSize: number;
  sendSearchRequest: () => void;
  errorFetching: boolean;
}

function SearchResults({
  isFetching,
  hasFetched,
  searchResults,
  page,
  totalPages,
  pageSize,
  sendSearchRequest,
  errorFetching,
}: IProps) {
  const router = useRouter();

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView) => {
      if (inView && page < totalPages && !isFetching) {
        sendSearchRequest();
      }
    },
  });

  return (
    <div className="pt-[37px] xm:pt-[95px] xm:max-w-[var(--max-width-home)]">
      <BackButton
        className="hidden relative xm:flex xm:left-[-38px] xm:[&>p]:top-[1px] xm:[&>p]:ml-[31px]"
        onClick={() => {
          router.push(ROUTES.HOME);
        }}
        text="Results"
      />
      <p className="text-white leading-9 text-2xl xm:hidden">Results</p>
      <ScrollableArea
        maxHeight="calc(100vh - 158px)"
        className="mt-[24.5px] left-[-20px] pl-[20px] pr-[8px] xm:left-0 xm:px-0 xm:mt-[28.5px]"
      >
        <div className="grid pb-14 grid-cols-[repeat(auto-fill,minmax(219px,1fr))] gap-x-[34px] gap-y-[40px] xm-pb-0 xm:gap-y-[30.5px]">
          {isFetching &&
            page === 0 &&
            new Array(pageSize).fill(undefined).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Result key={index} src="" name="" username="" loaded={false} />
            ))}
          {hasFetched &&
            searchResults.map((result) => (
              <Result
                key={result.id}
                src={result.imageSrc}
                name={result.title}
                username={result.userName}
              />
            ))}
        </div>
        {!errorFetching && (
          <div className="pb-28 xm:pb-14">
            <InfiniteScrollingMessages
              isFetching={isFetching}
              hasFetched={hasFetched}
              page={page}
              totalPages={totalPages}
              ref={ref}
            />
          </div>
        )}
        {errorFetching && <ErrorMessage />}
      </ScrollableArea>
    </div>
  );
}

export default memo(SearchResults);
