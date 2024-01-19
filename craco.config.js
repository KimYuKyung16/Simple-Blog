const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  jest: {
    configure: {
      moduleNameMapper: {
        "^@apis/(.*)$": "<rootDir>/src/apis/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
        "^@lib/(.*)$": "<rootDir>/src/lib/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@states/(.*)$": "<rootDir>/src/states/$1",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
      },
    },
  },
};
