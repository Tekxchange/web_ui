import { atom } from "recoil";

interface IAuthUser {
  username: string;
  userId: number;
}

interface IAuthSlice {
  authModalOpen: boolean;
  user: IAuthUser | null;
}

export const authSlice = atom<IAuthSlice>({
  key: "authSlice",
  default: {
    authModalOpen: false,
    user: null,
  },
});
