import { PayloadAction, createSlice, createAsyncThunk, DeepPartial } from "@reduxjs/toolkit";
import api from "@api";
import { UserInfo } from "@api/userApi";
import { Option, none, some } from "@utils/option";
import { toast } from "react-toastify";

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  return await api.userApi.getSelfInfo();
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
        if (!sessionStorage.getItem("welcome") && payload.isSome) {
          toast.info(`Welcome back, ${payload.value.username}!`);
          sessionStorage.setItem("welcome", "true");
        }
      },
      setAuthModalState: (state, { payload }: PayloadAction<boolean>) => {
        state.authModalOpen = payload;
      },
      logout: (state) => {
        api.authApi.logout();
        state.user = none();
        sessionStorage.removeItem("welcome");
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

  const toReturn = { ...authState.getInitialState(), ...preloadedState } as AuthState;
  return toReturn;
}

export const authState = createAuthState({
  loading: false,
  user: none(),
  authModalOpen: false,
  wasLoggedIn: false,
});

export const reducer = authState.reducer;
export const { logout, setUser, setAuthModalState, setWasLoggedIn } = authState.actions;
