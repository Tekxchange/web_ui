import { createAsyncThunk, createSlice, DeepPartial, PayloadAction } from "@reduxjs/toolkit";
import api from "@api";
import { UserInfo } from "@api/userApi";
import { none, Option, some } from "@utils/option";
import { toast } from "react-toastify";

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  return await api.userApi.getSelfInfo();
});

export interface AuthState {
  authModalOpen: boolean;
  loading: boolean;
  user: Option<UserInfo>;
  wasLoggedIn: boolean;
}

export function createAuthState(initialState: AuthState) {
  return createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
      logout: (state) => {
        void api.authApi.logout();
        state.user = none();
        sessionStorage.removeItem("welcome");
      },
      setAuthModalState: (state, { payload }: PayloadAction<boolean>) => {
        state.authModalOpen = payload;
      },
      setUser: (state, { payload }: PayloadAction<Option<UserInfo>>) => {
        state.user = payload;
        if (!sessionStorage.getItem("welcome") && payload.isSome) {
          toast.info(`Welcome back, ${payload.value.username}!`);
          sessionStorage.setItem("welcome", "true");
        }
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
        if (!sessionStorage.getItem("welcome")) {
          toast.success(`Welcome back, ${payload.username}!`);
          sessionStorage.setItem("welcome", "true");
        }
      });
      builder.addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.user = none();
      });
    },
  });
}

export function preloadAuthState(preloadedState: DeepPartial<AuthState>): AuthState {
  if (preloadedState.wasLoggedIn) {
    preloadedState.loading = true;
  }

  return { ...authState.getInitialState(), ...preloadedState } as AuthState;
}

export const authState = createAuthState({
  loading: false,
  user: none(),
  authModalOpen: false,
  wasLoggedIn: false,
});

export const reducer = authState.reducer;
export const { logout, setUser, setAuthModalState, setWasLoggedIn } = authState.actions;
