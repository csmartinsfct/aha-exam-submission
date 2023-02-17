import { SocialResponse } from "../../types/aha/responses.type";
import { AppEvents, CustomDispatch, Messages } from "../../types/reducer";
import IState from "../../types/state.interface";
import generateNumberBetweenRange from "../../utils/generateNumberBetweenRange";
import wrapFunctionInTimeoutInDev from "../../utils/wrapFunctionInTimeoutInDev";
import AhaApi from "../../constants/aha-api";

function onError(
  message: string,
  dispatch: React.Dispatch<CustomDispatch>,
  payload: Messages[AppEvents.GetSocialError]
) {
  console.error(message);
  dispatch({
    type: AppEvents.GetSocialError,
    payload,
  });
}

export default function fetchAllSocialAction() {
  return async (
    dispatch: React.Dispatch<CustomDispatch>,
    getState: () => IState
  ) => {
    try {
      dispatch({ type: AppEvents.GetSocialRequest, payload: {} });

      const pageToFetch = getState().social.page + 1;

      wrapFunctionInTimeoutInDev(async () => {
        try {
          const response = await fetch(AhaApi.SEARCH_URL(pageToFetch, 20));
          const data: SocialResponse = await response.json();

          dispatch({
            type: AppEvents.GetSocialResponse,
            payload: {
              social: data.data.map((val) => ({
                id: val.id,
                name: val.name,
                username: val.username,
                /* this service was down https://cdn.fakercloud.com/avatars so I implemented it using some of the avatars from the mockup */
                // avatarSrc: val.avater, // @ahah - typo "avater"
                avatarSrc: `/users/user${generateNumberBetweenRange(1, 3)}.png`,
                following: val.isFollowing,
              })),
              page: data.page,
              totalPages: data.totalPages,
            },
          });
        } catch (error: any) {
          onError(error.message, dispatch, { error: error.message });
        }
      });
    } catch (error: any) {
      onError(error.message, dispatch, { error: error.message });
    }
  };
}
