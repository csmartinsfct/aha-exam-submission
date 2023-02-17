import { ResultsResponse } from "../../types/aha/responses.type";
import { AppEvents, CustomDispatch, Messages } from "../../types/reducer";
import IState from "../../types/state.interface";
import generateNumberBetweenRange from "../../utils/generateNumberBetweenRange";
import wrapFunctionInTimeoutInDev from "../../utils/wrapFunctionInTimeoutInDev";
import AhaApi from "../../constants/aha-api";

function onError(
  message: string,
  dispatch: React.Dispatch<CustomDispatch>,
  payload: Messages[AppEvents.GetResultsError]
) {
  console.error(message);
  dispatch({
    type: AppEvents.GetResultsError,
    payload,
  });
}

export default function fetchResultsAction(data: {
  keyword: string | null;
  pageSize: number;
}) {
  return async (
    dispatch: React.Dispatch<CustomDispatch>,
    getState: () => IState
  ) => {
    try {
      dispatch({ type: AppEvents.GetResultsRequest, payload: {} });
      const { keyword, pageSize } = data;
      const pageToFetch = getState().searchResults.page + 1;

      wrapFunctionInTimeoutInDev(async () => {
        try {
          const response = await fetch(
            AhaApi.SEARCH_URL(pageToFetch, pageSize, keyword)
          );

          const data: ResultsResponse = await response.json();

          dispatch({
            type: AppEvents.GetResultsResponse,
            payload: {
              searchResults: data.data.map((val: any) => ({
                id: val.id,
                title: `This is ${val.name}`,
                userName: val.username,
                /* the API returns avatars instead of images like the ones in the mockup so using hardcoded ones here to match the mockup */
                imageSrc: `/results/image${generateNumberBetweenRange(
                  1,
                  3
                )}.png`,
              })),
              page: data.page,
              totalPages: data.totalPages,
              pageSize,
              keyword,
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
