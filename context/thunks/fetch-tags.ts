import { TagsResponse } from "../../types/aha/responses.type";
import { AppEvents, CustomDispatch, Messages } from "../../types/reducer";
import wrapFunctionInTimeoutInDev from "../../utils/wrapFunctionInTimeoutInDev";
import AhaApi from "../../constants/aha-api";

function onError(
  message: string,
  dispatch: React.Dispatch<CustomDispatch>,
  payload: Messages[AppEvents.GetTagsError]
) {
  console.error(message);
  dispatch({
    type: AppEvents.GetTagsError,
    payload,
  });
}

export default function fetchTagsAction() {
  return async (dispatch: React.Dispatch<CustomDispatch>) => {
    try {
      dispatch({ type: AppEvents.GetTagsRequest, payload: {} });

      wrapFunctionInTimeoutInDev(async () => {
        try {
          const response = await fetch(AhaApi.TAGS_URL);
          const data: TagsResponse = await response.json();

          dispatch({
            type: AppEvents.GetTagsResponse,
            payload: {
              tags: data.map((val) => ({
                id: val.id,
                name: val.name,
                count: val.count,
              })),
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
