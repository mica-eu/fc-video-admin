
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

module.exports = config;
