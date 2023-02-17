import { AppEvents, CustomDispatch, Messages } from "../../types/reducer";

function onError(
  message: string,
  dispatch: React.Dispatch<CustomDispatch>,
  payload: Messages[AppEvents.SetLoadingSocialFollowStatus]
) {
  console.error(message);
  dispatch({
    type: AppEvents.SetLoadingSocialFollowStatus,
    payload,
  });
}

export default function updateSocialStatus(userId: string) {
  return async (dispatch: React.Dispatch<CustomDispatch>) => {
    try {
      dispatch({
        type: AppEvents.SetLoadingSocialFollowStatus,
        payload: { userId },
      });

      setTimeout(() => {
        try {
          dispatch({
            type: AppEvents.UpdateSocialFollowStatus,
            payload: { userId },
          });
        } catch (error: any) {
          onError(error.message, dispatch, { userId });
        }
      }, 1500);
    } catch (error: any) {
      onError(error.message, dispatch, { userId });
    }
  };
}
