export interface IUserFields {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: string;
  role: string;
  token: string;
}

export interface IUserRegisterMuation {
  username: string;
  password: string;
  displayName: string;
  mail: string;
  avatar: File | null;
}

export interface IUserLoginMutation {
  username: string;
  password: string;
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
