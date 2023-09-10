import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api";
import { UserInfo } from "@api/userApi";
import { Option, none, some } from "@utils/option";
import { toast } from "react-toastify";

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  return await toast.promise(api.userApi.getSelfInfo(), {
    error: "Unable to fetch user info",
    pending: "Fetching user info",
    success: {
      render: (data) => `Welcome back, ${data.data?.username}!`,
    },
  });
});

export interface AuthState {
  loading: boolean;
  user: Option<UserInfo>;
  authModalOpen: boolean;
  wasLoggedIn: boolean;
}

export function createAuthState(initialState: AuthState) {
  return createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
      setUser: (state, { payload }: PayloadAction<Option<UserInfo>>) => {
        state.user = payload;
      },
      setAuthModalState: (state, { payload }: PayloadAction<boolean>) => {
        state.authModalOpen = payload;
      },
      logout: (state) => {
        api.authApi.logout();
        state.user = none();
      },
      setWasLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
        state.wasLoggedIn = payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = some(payload);
      });
      builder.addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.user = none();
      });
    },
  });
}

export const authState = createAuthState({
  loading: Boolean(localStorage.getItem("jwt")),
  user: none(),
  authModalOpen: false,
  wasLoggedIn: false,
});

export const reducer = authState.reducer;
export const { logout, setUser, setAuthModalState, setWasLoggedIn } = authState.actions;
