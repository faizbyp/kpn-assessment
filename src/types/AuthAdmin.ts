export type LoginRes = {
  username: string;
  fullname: string;
  email: string;
  user_id: string;
  access_token: string;
};

type AuthAction = {
  setAuth: (loginRes: LoginRes) => void;
  checkAuth: () => void;
  setAccessToken: (newToken: string) => void;
  signOut: () => void;
};

export type Auth = LoginRes & AuthAction;
