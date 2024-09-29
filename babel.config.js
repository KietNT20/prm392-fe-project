module.exports = function (api) {
  api.cache(true);
  module.exports = {
    plugins: [
      ['module:react-native-dotenv']
    ]
  };
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
