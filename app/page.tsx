/* eslint react/no-array-index-key: 0 */

"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialSidebar from "../components/SocialSidebar";
import fetchResultsAction from "../context/thunks/fetch-results";
import SearchResults from "../components/SearchResults";
import HomePageForm from "../components/HomePageForm";
import useGlobalDispatcher from "../hooks/use-global-dispatcher";
import useGlobalState from "../hooks/use-global-state";
import SLIDER_VALUES from "../constants/slider-values";
import ROUTES from "../constants/routes.enum";
import useWindowSize from "../hooks/use-window-size";

export default function Home() {
  const router = useRouter();
  const dispatch = useGlobalDispatcher();
  const state = useGlobalState();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { width } = useWindowSize();

  /* this IIFE sanitizes the pageSize variable - since users can hit "search" and then update the URL's pageSize value...for example to 99, which one would assume would still search bit once the user hit "back to home" what would be selected in the slider? it doesn't have an option for 99... this doesn't let that scenario happen */
  const pageSize = (function calculatePageSize() {
    const pageSize = searchParams.get("pageSize");
    if (pageSize === null) {
      return null;
    }
    const pageSizeAsNumber = Number.parseInt(pageSize);
    if (Number.isSafeInteger(pageSizeAsNumber)) {
      if (
        SLIDER_VALUES.findIndex((entry) => entry.val === pageSizeAsNumber) !==
        -1
      )
        return pageSizeAsNumber;
    }
    return null;
  })();

  // making "keyword" optional
  const isSearching = pageSize !== null;

  const sendSearchRequest = useCallback(
    (params?: { keyword: string | null; pageSize: number }) => {
      dispatch(
        fetchResultsAction({
          keyword: params ? params.keyword : state.keyword,
          pageSize: params ? params.pageSize : state.pageSize,
        })
      );
    },
    [dispatch, state.keyword, state.pageSize]
  );

  /* user is searching with an invalid or non-existing pageSize parameter (for example by manually updating the URL) */
  const redirectToHome = isSearching && pageSize === null;

  if (redirectToHome) {
    router.push(ROUTES.HOME);
  }

  /* this useEffect runs when the user goes directly to the search page without hitting the submit button, ex: http://localhost:3000/?keyword=a&pageSize=6 */
  useEffect(() => {
    if (
      isSearching &&
      !state.searchResults.isFetching &&
      !state.searchResults.hasFetched &&
      !state.searchResults.error &&
      pageSize !== null
    ) {
      sendSearchRequest({ keyword, pageSize });
    }
  }, [
    sendSearchRequest,
    isSearching,
    state.searchResults.isFetching,
    state.searchResults.hasFetched,
    state.searchResults.error,
    keyword,
    pageSize,
  ]);

  /* avoid rendering it on mobile as 1) performance issue as the component is never displayed on mobile and 2) user will start in the Home page, navigate to Social and it'll aleady have results because even though the component can't be seen it will have mounted and fetch  */
  const socialSidebar = useMemo(
    () =>
      width !== undefined && width >= 1440 ? (
        <div className="h-screen fixed top-0 right-0 hidden min-[1440px]:block">
          <SocialSidebar />
        </div>
      ) : null,
    [width]
  );

  if (isSearching) {
    const { error, isFetching, hasFetched, all, totalPages, page } =
      state.searchResults;

    return (
      <>
        <SearchResults
          isFetching={isFetching}
          hasFetched={hasFetched}
          searchResults={all}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          sendSearchRequest={sendSearchRequest}
          errorFetching={error !== null}
        />
        {socialSidebar}
      </>
    );
  }
  return (
    <>
      <HomePageForm
        pageSize={state.pageSize}
        keyword={state.keyword}
        sendSearchRequest={sendSearchRequest}
        hasResults={state.searchResults.hasFetched === true}
      />
      {socialSidebar}
    </>
  );
}
