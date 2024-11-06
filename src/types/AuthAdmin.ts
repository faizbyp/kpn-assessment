// export interface LoginRes {
//   username: string;
//   fullname: string;
//   email: string;
//   access_token: string;
//   refresh_token: string;
// }

// export interface AuthAction extends LoginRes {
//   setAuth: (loginRes: LoginRes) => void;
//   checkAuth: () => void;
//   refreshToken: () => void;
//   signOut: () => void;
// }

export type LoginRes = {
  username: string;
  fullname: string;
  email: string;
  access_token: string;
  refresh_token: string;
};

type AuthAction = {
  setAuth: (loginRes: LoginRes) => void;
  checkAuth: () => void;
  refreshToken: () => void;
  signOut: () => void;
};

export type Auth = LoginRes & AuthAction;
