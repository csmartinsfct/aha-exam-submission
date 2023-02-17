"use client";

import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import ScrollableArea from "../../components/ScrollableArea";
import Tag from "../../components/Tag";
import fetchTagsAction from "../../context/thunks/fetch-tags";
import useGlobalDispatcher from "../../hooks/use-global-dispatcher";
import useGlobalState from "../../hooks/use-global-state";

export default function Home() {
  const dispatch = useGlobalDispatcher();
  const state = useGlobalState();

  useEffect(() => {
    if (!state.tags.isFetching && !state.tags.hasFetched && !state.tags.error) {
      dispatch(fetchTagsAction());
    }
  }, [
    state.tags.isFetching,
    state.tags.hasFetched,
    dispatch,
    state.tags.error,
  ]);

  return (
    <div className="pt-[37px] xm:pt-[80px] mb-6 min-[1200px]:m-[0px_auto] min-[1200px]:w-max">
      <h1 className="text-2xl leading-9 xm:leading-[45px] xm:text-3xl mb-6">
        Tags
      </h1>
      <ScrollableArea
        maxHeight="calc(100vh - 162px)"
        className="mt-[24.5px] left-[-20px] pl-[25px] pr-[8px] xm:left-0 xm:px-0 pb-14"
      >
        <div className="grid pb-14 grid-cols-[repeat(auto-fit,minmax(150px,150px))] gap-y-[24px] gap-x-[24px] max-w-[846px] xm:pb-0 xm:gap-y-[35.5px]">
          {(state.tags.isFetching ||
            (!state.tags.hasFetched && !state.tags.error)) &&
            new Array(30).fill(undefined).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag key={index} name="" count={0} loaded={false} />
            ))}
          {state.tags.hasFetched &&
            state.tags.all.map((result) => (
              <Tag key={result.id} name={result.name} count={result.count} />
            ))}
        </div>
        {state.tags.error && <ErrorMessage />}
      </ScrollableArea>
    </div>
  );
}
