module.exports = {
  "parser": "babel-eslint",
  "extends" : "airbnb-base",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "linebreak-style": ["off", "windows"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
}