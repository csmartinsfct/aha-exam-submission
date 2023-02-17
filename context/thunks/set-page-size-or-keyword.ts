import { AppEvents, CustomDispatch } from "../../types/reducer";

export default function setPageSizeOrKeywordAction(data: {
  keyword?: string;
  pageSize?: number;
}) {
  return async (dispatch: React.Dispatch<CustomDispatch>) => {
    try {
      if (typeof data.keyword === "string") {
        dispatch({
          type: AppEvents.SetKeyword,
          payload: { keyword: data.keyword },
        });
      } else if (typeof data.pageSize === "number") {
        dispatch({
          type: AppEvents.SetPageSize,
          payload: { pageSize: data.pageSize },
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
}
