import { none } from "@utils/option";
import { createAuthState } from "../auth";

describe("src/state/auth.ts", () => {
  describe("init", () => {
    it("Loads an initial auth state", () => {
      const {} = createAuthState({
        authModalOpen: false,
        loading: false,
        user: none(),
      });
    });
  });
});
