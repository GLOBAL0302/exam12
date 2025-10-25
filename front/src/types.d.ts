export interface IUserFields {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  avatar: string;
  token: string;
}

export interface IUserRegisterMuation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface IUserLoginMutation {
  username: string;
  password: string;
}

export interface IComment {
  user: IUserFields;
  comment: string;
}

export interface IMeal {
  user: IUserFields
  _id: string;
  title: string;
  image: string;
  recipe: string;
  comments: IComment[];
}
export interface IMealMutation {
  title: string;
  image: File | null;
  recipe: string;
}

export interface IGlobalError {
  error: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
    message: string;
    name: string;
    _message: string;
  };
}
