import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  clearMocks: true,
  preset: "ts-jest",
  roots: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  testEnvironment: "jsdom",
} as import("ts-jest").JestConfigWithTsJest;
