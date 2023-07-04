import { none, some } from "@utils/option";
import { authState, reducer as authReducer, getUserInfo } from "../auth";
import { configureStore } from "@reduxjs/toolkit";
import type { UserInfo } from "@api/userApi";
import api from "@api";
import { waitFor } from "@testing-library/react";

const createStore = () => {
  return configureStore({
    reducer: { authReducer },
    devTools: false,
  });
};

describe("src/state/auth.ts", () => {
  describe("State Init", () => {
    it("Loads an initial auth state", () => {
      const store = createStore();
      expect(store.getState()).toEqual({
        authModalOpen: false,
        loading: true,
        user: none(),
      });
    });
  });
  describe("Actions", () => {
    it("Sets the user", async () => {
      const testUser: UserInfo = {
        email: "test@test.com",
        id: 1,
        username: "testing",
      };
      const { dispatch, getState } = createStore();

      expect(getState().authReducer.user).toEqual(none());

      dispatch(authState.actions.setUser(some(testUser)));

      expect(getState().authReducer.user).toEqual(some(testUser));
    });
    it("Toggles the auth modal", async () => {
      const { dispatch, getState } = createStore();

      expect(getState().authReducer.authModalOpen).toEqual(false);
      dispatch(authState.actions.setAuthModalState(true));

      expect(getState().authReducer.authModalOpen).toEqual(true);
    });
    it("Logs the user out", () => {
      const logoutSpy = jest.spyOn(api.authApi, "logout").mockReturnValue();
      const { dispatch, getState } = createStore();
      dispatch(
        authState.actions.setUser(
          some({ email: "test", id: 1, username: "test" })
        )
      );

      expect(getState().authReducer.user.isSome).toEqual(true);
      dispatch(authState.actions.logout());
      expect(getState().authReducer.user.isSome).toEqual(false);
      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe("Async Actions", () => {
    it("Fetches the users' info", async () => {
      const userInfo: UserInfo = {
        email: "testing@test.com",
        id: 1,
        username: "testing",
      };
      const userInfoSpy = jest
        .spyOn(api.userApi, "getSelfInfo")
        .mockResolvedValue(userInfo);

      const { dispatch, getState } = createStore();
      expect(getState().authReducer.user.isSome).toBeFalsy();
      dispatch(getUserInfo());

      expect(userInfoSpy).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(getState().authReducer.user.isSome).toBeTruthy();
        expect(getState().authReducer.loading).toBeFalsy();
      });
    });
  });
});
