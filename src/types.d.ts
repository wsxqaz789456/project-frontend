export interface ISalePhoto {
  pk: string;
  file: string;
}

export interface ISale {
  key: number;
  pk: number;
  name: string;
  price: number;
  is_owner: boolean;
  photos: ISalePhoto[];
}
export interface IComments {
  pk: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  body: string;
  created_at: string;
}
export interface IComunity {
  pk: number;
  title: string;
  content: string;
  views: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  total_comments: number;
  created_at: string;
  updated_at: string;
  comments: IComments[];
}

export interface IHomeComunity {
  title: string;
  content: string;
  views: number;
  total_comments: number;
  pk: number;
}

export interface IHomeSales {
  name: string;
  price: number;
  pk: number;
}

export interface ISaleOwner {
  name: string;
  username: string;
  avatar: string;
}

export interface IReply {
  pk: string;
  author: ISaleOwner;
  question: string;
  parent: number;
  created_at: string;
}

export interface ISaleQuestion {
  id: number;
  pk: number;
  author: ISaleOwner;
  question: string;
  parent: number;
  created_at: string;
  is_parent: boolean;
  reply: IReply[{
    pk: string;
    author: ISaleOwner;
    question: string;
    parent: number;
    created_at: string;
  }];
}

export interface ISalesDetail extends ISale {
  id: number;
  created_at: string;
  updated_at: string;
  owner: ISaleOwner;
  category: {
    pk: number;
    name: string;
  };
  questions: ISaleQuestion[{
    id: number;
    pk: number;
    author: ISaleOwner;
    question: string;
    parent: number;
    created_at: string;
    is_parent: boolean;
    reply: IReply[];
  }];
  description: string;
  bought_price: number;
  location: string;
  unopened: boolean;
}

export interface IUser {
  name: string;
  gender: string;
  avatar: string;
  email: string;
  username: string;
  is_owner: boolean;
}
export interface ICategory {
  pk: number;
  name: string;
}
