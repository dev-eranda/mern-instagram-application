export interface Comments {
  _id: string;
  text: string;
  commentedBy: {
    _id: string;
    name: string;
  };
}

export interface PostedBy {
  id: string;
  name: string;
}

export interface Post {
  title: string;
  body: string;
  comments: Comments[];
  likes: any[];
  photo: string;
  postedBy: PostedBy | null;
}

export interface PostState {
  post: Post | null;
  post: Post[];
}
