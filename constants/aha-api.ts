const TAGS_URL = `https://avl-frontend-exam.herokuapp.com/api/tags`;

const SEARCH_URL = function GenerateSearchUrl(
  pageToFetch: number,
  pageSize: number,
  keyword?: string | null
) {
  return `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${pageToFetch}&pageSize=${pageSize}${
    typeof keyword === "string" ? `&keyword=${keyword}` : ""
  } `;
};

export default { TAGS_URL, SEARCH_URL };
