import { Actions, AppEvents } from "../../types/reducer";
import IState from "../../types/state.interface";

export default function reducer(state: IState, action: Actions) {
  switch (action.type) {
    case AppEvents.SetPageSize: {
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };
    }
    case AppEvents.SetKeyword: {
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    }

    case AppEvents.GetSocialRequest: {
      return {
        ...state,
        social: {
          ...state.social,
          isFetching: true,
        },
      };
    }

    case AppEvents.GetSocialResponse: {
      const { page, totalPages, social } = action.payload;

      let newById = { ...state.social.byId };
      let newAll = [...state.social.all];

      // add to existing results
      if (page > 1) {
        social.map((result) => {
          newAll.push(result);
          newById[result.id] = result;
        });
      }
      // no results yet - creating data structures from scratch
      else {
        newAll = social;
        newById = social.reduce(
          (pre, cur) => ({ ...pre, [cur.id]: { ...cur } }),
          {}
        );
      }

      return {
        ...state,
        social: {
          ...state.social,
          isFetching: false,
          hasFetched: true,
          all: newAll,
          byId: newById,
          totalPages,
          page,
        },
      };
    }

    case AppEvents.SetLoadingSocialFollowStatus: {
      const { userId } = action.payload;

      const newLoadingIds = { ...state.social.loadingIds };
      if (newLoadingIds[userId]) {
        delete newLoadingIds[userId];
      } else {
        newLoadingIds[userId] = true;
      }

      return {
        ...state,
        social: {
          ...state.social,
          loadingIds: newLoadingIds,
        },
      };
    }

    case AppEvents.UpdateSocialFollowStatus: {
      const { userId } = action.payload;

      if (state.social.byId[userId]) {
        const newById = { ...state.social.byId };

        const updatedUser = { ...newById[userId] };
        updatedUser.following = !updatedUser.following;
        newById[userId] = updatedUser;

        const newLoadingIds = { ...state.social.loadingIds };
        delete newLoadingIds[userId];

        return {
          ...state,
          social: {
            ...state.social,
            byId: newById,
            all: state.social.all.map((person) =>
              person.id === userId
                ? { ...person, following: !person.following }
                : person
            ),
            loadingIds: newLoadingIds,
          },
        };
      }
      return state;
    }

    case AppEvents.GetSocialError: {
      return {
        ...state,
        social: {
          ...state.social,
          isFetching: false,
          error: action.payload.error,
        },
      };
    }

    case AppEvents.GetTagsRequest: {
      return {
        ...state,
        tags: {
          ...state.tags,
          isFetching: true,
        },
      };
    }

    case AppEvents.GetTagsResponse: {
      return {
        ...state,
        tags: {
          ...state.tags,
          isFetching: false,
          hasFetched: true,
          all: action.payload.tags,
          byId: action.payload.tags.reduce(
            (pre, cur) => ({ ...pre, [cur.id]: { ...cur } }),
            {}
          ),
        },
      };
    }

    case AppEvents.GetTagsError: {
      return {
        ...state,
        tags: {
          ...state.tags,
          isFetching: false,
          error: action.payload.error,
        },
      };
    }

    case AppEvents.GetResultsRequest: {
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: true,
          error: null,
        },
      };
    }

    case AppEvents.GetResultsResponse: {
      const { page, totalPages, searchResults, pageSize, keyword } =
        action.payload;
      let newById = { ...state.searchResults.byId };
      let newAll = [...state.searchResults.all];

      // add to existing results
      if (page > 1) {
        searchResults.map((result) => {
          newAll.push(result);
          newById[result.id] = result;
        });
      }
      // no results yet - creating data structures from scratch
      else {
        newAll = searchResults;
        newById = searchResults.reduce(
          (pre, cur) => ({ ...pre, [cur.id]: { ...cur } }),
          {}
        );
      }

      return {
        ...state,
        pageSize,
        keyword: keyword || "",
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          hasFetched: true,
          page,
          totalPages,
          all: newAll,
          byId: newById,
        },
      };
    }

    case AppEvents.GetResultsError: {
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          error: action.payload.error,
        },
      };
    }

    case AppEvents.ResetResults: {
      return {
        ...state,
        searchResults: {
          byId: {},
          all: [],
          totalPages: 0,
          page: 0,
          error: null,
        },
      };
    }

    default: {
      throw Error(`Unknown action: ${(action as any).type}`);
    }
  }
}
