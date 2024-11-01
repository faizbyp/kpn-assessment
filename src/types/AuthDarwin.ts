export type ResponseAuthDarwin = Promise<{
  status: number;
  message: string;
  token: string;
  email: string;
  firstname: string;
}>;

export type RequestAuthDarwin = {
  encoded_auth: string | null;
  token_client: string | null;
};
