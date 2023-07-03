import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api";
import { UserInfo } from "@api/userApi";
import { LoginRequest } from "@api/authApi";
import { Option, none, some } from "@utils/option";

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  return await api.userApi.getSelfInfo();
});

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { dispatch }) => {
    await api.authApi.login(payload);
    dispatch(getUserInfo());
  }
);

export interface AuthState {
  loading: boolean;
  user: Option<UserInfo>;
  authModalOpen: boolean;
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
        state.user = none();
        api.authApi.logout();
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

const authState = createAuthState({
  loading: false,
  user: none(),
  authModalOpen: false,
});

export const reducer = authState.reducer;
export const { logout, setUser, setAuthModalState } = authState.actions;
