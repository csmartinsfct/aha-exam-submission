export type TagsResponse = Array<{ id: string; name: string; count: number }>;

type base = {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};

export type SocialResponse = base & {
  data: Array<{
    id: string;
    name: string;
    username: string;
    isFollowing: boolean;
  }>;
};

/* Unnecessary in this case since the URL is shared between Social and Search results but just to showcase some typescript goodness */
export type ResultsResponse = base & {
  data: Array<{
    id: string;
    title: string;
    username: string;
  }>;
};
