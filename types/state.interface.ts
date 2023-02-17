import { BaseState } from "./base-state.interface";

export interface SearchResult {
  title: string;
  userName: string;
  imageSrc: string;
  id: string;
}

export interface SearchResults extends BaseState {
  all: SearchResult[];
  byId: { [key: string]: SearchResult };
  totalPages: number;
  page: number;
}

export interface Tag {
  name: string;
  count: number;
  id: string;
}

export interface Tags extends BaseState {
  all: Tag[];
  byId: { [key: string]: Tag };
}

export interface Person {
  name: string;
  username: string;
  avatarSrc: string;
  id: string;
  following: boolean;
}

export interface Social extends BaseState {
  all: Person[];
  byId: { [key: string]: Person };
  totalPages: number;
  page: number;
  /* stores person IDs to keep track of which persons we've toggled to Follow or Unfollow. Better performance than storing it in an array when reading (no looping) */
  loadingIds: { [key: string]: boolean };
}

interface IState {
  keyword: string;
  pageSize: number;
  searchResults: SearchResults;
  tags: Tags;
  social: Social;
}

export default IState;
