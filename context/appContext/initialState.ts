import IState from "../../types/state.interface";

const initialState: IState = {
  keyword: "",
  pageSize: 15,
  searchResults: { byId: {}, all: [], totalPages: 0, page: 0, error: null },
  tags: { byId: {}, all: [], error: null },
  social: {
    byId: {},
    all: [],
    totalPages: 0,
    page: 0,
    error: null,
    loadingIds: {},
  },
};

export default initialState;
