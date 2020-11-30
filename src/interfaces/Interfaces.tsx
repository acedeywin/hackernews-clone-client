export interface LinkInterface {
  link: {
    id: string;
    description: string;
    url: string;
    createdAt: any;
    votes: any;
    postedBy: { name: string };
  };
  index: string;
  updateStoreAfterVote: (store: any, createVote: any, linkId: string) => void;
}

export interface RenderData {
  loading: boolean;
  error: string;
  data: LinkInterface;
  feed: any;
}
export interface CreateLinkState {
  state: { description: string; url: string };
}

export interface History {
  history: any;
  location: any;
  match: any;
}
