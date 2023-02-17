import { Dispatch } from "react";
import IState, { Person, SearchResult, Tag } from "./state.interface";

export enum AppEvents {
  SetPageSize = "App/SetPageSize",
  SetKeyword = "App/SetKeyword",

  // GET SOCIAL (followers & following)
  GetSocialRequest = "App/GetSocialRequest",
  GetSocialResponse = "App/GetSocialResponse",
  GetSocialError = "App/GetSocialError",

  // TOGGLE FOLLOW/FOLLOWING
  UpdateSocialFollowStatus = "App/UpdateSocialFollowStatus",

  // SO THE "FOLLOW"/"FOLLOWING" BUTTONS LOAD BEFORE TOGGLING
  SetLoadingSocialFollowStatus = "App/SetLoadingSocialFollowStatus",

  // GET RESULTS
  GetResultsRequest = "App/GetResultsRequest",
  GetResultsResponse = "App/GetResultsResponse",
  GetResultsError = "App/GetResultsError",

  // GET TAGS
  GetTagsRequest = "App/GetTagsRequest",
  GetTagsResponse = "App/GetTagsResponse",
  GetTagsError = "App/GetTagsError",

  // RESET RESULTS
  ResetResults = "App/ResetResults",
}

export type Messages = {
  [AppEvents.SetPageSize]: { pageSize: number };
  [AppEvents.SetKeyword]: { keyword: string };

  [AppEvents.GetSocialRequest]: unknown;
  [AppEvents.GetSocialResponse]: {
    social: Person[];
    page: number;
    totalPages: number;
  };
  [AppEvents.GetSocialError]: { error: string };

  [AppEvents.UpdateSocialFollowStatus]: { userId: string };
  [AppEvents.SetLoadingSocialFollowStatus]: { userId: string };

  [AppEvents.GetResultsRequest]: unknown;
  [AppEvents.GetResultsResponse]: {
    searchResults: SearchResult[];
    page: number;
    totalPages: number;
    keyword: string | null;
    pageSize: number;
  };
  [AppEvents.GetResultsError]: { error: string };

  [AppEvents.GetTagsRequest]: unknown;
  [AppEvents.GetTagsResponse]: { tags: Tag[] };
  [AppEvents.GetTagsError]: { error: string };

  [AppEvents.ResetResults]: unknown;
};

// see https://medium.com/hackernoon/finally-the-typescript-redux-hooks-events-blog-you-were-looking-for-c4663d823b01

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Actions = ActionMap<Messages>[keyof ActionMap<Messages>];

export interface Thunk<S, A> {
  (dispatch: Dispatch<A | Thunk<S, A>>, getState: () => S): void;
}

export type CustomDispatch =
  | Actions
  | ((
      dispatch: React.Dispatch<Actions | Thunk<IState, Actions>>,
      getState: () => IState
    ) => void);
