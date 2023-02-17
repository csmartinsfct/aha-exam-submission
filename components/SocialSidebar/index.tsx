"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import fetchAllSocialAction from "../../context/thunks/fetch-all-social";
import updateSocialStatus from "../../context/thunks/update-social-status";
import useGlobalDispatcher from "../../hooks/use-global-dispatcher";
import useGlobalState from "../../hooks/use-global-state";
import { Person } from "../../types/state.interface";
import ErrorMessage from "../ErrorMessage";
import InfiniteScrollingMessages from "../InfiniteScrollingMessages";
import SocialFollow from "../SocialFollow";
import Tab from "../Tab";

function SocialSidebar() {
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useGlobalDispatcher();
  const state = useGlobalState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendFetchRequest = useCallback(() => {
    dispatch(fetchAllSocialAction());
  }, [dispatch]);

  const toggleStatus = useCallback(
    (userId: string) => {
      dispatch(updateSocialStatus(userId));
    },
    [dispatch]
  );

  /* when switching between tabs scroll to the top */
  useEffect(() => {
    if (scrollRef && scrollRef.current && scrollRef.current.scrollTop !== 0) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [selectedTab]);

  /* fetch on mount if never fetched */
  useEffect(() => {
    if (
      !state.social.hasFetched &&
      !state.social.isFetching &&
      !state.social.error
    ) {
      sendFetchRequest();
    }
  }, [
    sendFetchRequest,
    state.social.hasFetched,
    state.social.isFetching,
    state.social.error,
  ]);

  const [followers, following] = useMemo(() => {
    const followers: Array<Person> = [];
    const following: Array<Person> = [];

    state.social.all.map((person) => {
      followers.push(person);

      if (person.following) {
        following.push(person);
      }
    });

    return [followers, following];
  }, [state.social.all]);

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: (inView) => {
      // if it hasn't fetched at all or if there are more pages to fetch
      if (
        inView &&
        !state.social.isFetching &&
        !state.social.error &&
        ((state.social.page === 0 && !state.social.hasFetched) ||
          state.social.page < state.social.totalPages)
      ) {
        sendFetchRequest();
      }
    },
  });

  const collectionToDisplay = selectedTab === 0 ? followers : following;

  return (
    <div className="h-full w-screen xm:pb-0 xm:w-[375px] xm:bg-greyscaleLight pt-8">
      <Tab
        items={["Followers", "Following"]}
        indexSelected={selectedTab}
        handleItemClicked={(selectedTab) => {
          setSelectedTab(selectedTab);
        }}
        className="mb-8"
      />
      <div
        ref={scrollRef}
        className="pb-28 h-[calc(100vh-151px)] mt-[44px] px-4 xm:h-[calc(100vh_-_91px)] xm:pb-0 overflow-hidden overflow-y-auto"
      >
        {((state.social.isFetching && state.social.page === 0) ||
          (!state.social.hasFetched && !state.social.error)) &&
          new Array(20).fill(undefined).map((item, index) => (
            <SocialFollow
              id=""
              avatarSrc=""
              name=""
              username=""
              following={false}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              loaded={false}
              className={
                index !== collectionToDisplay.length - 1 ? "mb-[16px]" : "mb-0"
              }
              updatingStatus={false}
              toggleStatus={toggleStatus}
            />
          ))}
        {state.social.hasFetched &&
          state.social.all.length > 0 &&
          collectionToDisplay.map((person, index) => (
            <SocialFollow
              {...person}
              key={person.name}
              className={
                index !== collectionToDisplay.length - 1 ? "mb-[16px]" : "mb-0"
              }
              updatingStatus={state.social.loadingIds[person.id]}
              toggleStatus={toggleStatus}
            />
          ))}
        {!state.social.error && (
          <div className="!mb-0 pt-14 xm:pt-10 xm:pb-10">
            <InfiniteScrollingMessages
              isFetching={state.social.isFetching}
              hasFetched={state.social.hasFetched}
              page={state.social.page}
              totalPages={state.social.totalPages}
              ref={ref}
            />
          </div>
        )}
        {state.social.error && <ErrorMessage centered />}
      </div>
    </div>
  );
}

export default memo(SocialSidebar);
