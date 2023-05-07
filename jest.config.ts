import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    "moduleFileExtensions": [
        "js",
        "jsx",
        "json",
        "ts",
        "tsx"
      ],
      "rootDir": "src",
      "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
      "transform": {
        "^.+\\.(t|j)sx?$": "ts-jest"
      },
      "coverageDirectory": "../coverage",
      "testEnvironment": "node"
};
export default config;