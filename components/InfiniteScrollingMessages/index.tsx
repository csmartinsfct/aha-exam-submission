import { forwardRef, LegacyRef } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface IProps {
  isFetching?: boolean;
  hasFetched?: boolean;
  page: number;
  totalPages: number;
}
function InfiniteScrollingMessages(
  { isFetching, hasFetched, page, totalPages }: IProps,
  ref: LegacyRef<HTMLDivElement>
) {
  return (
    <>
      {!isFetching && <div ref={ref} />}
      {(isFetching || (totalPages === page && page > 0)) && (
        <p className="text-center">
          {hasFetched && totalPages === page ? (
            "No more results"
          ) : (
            <LoadingSpinner className="h-10 w-10 m-[0_auto] xm:h-14 xm:w-14" />
          )}
        </p>
      )}
      {hasFetched && totalPages === 0 && (
        <p className="text-center">No results</p>
      )}
    </>
  );
}

export default forwardRef(InfiniteScrollingMessages);
