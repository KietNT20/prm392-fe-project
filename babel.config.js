module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv'],
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            assets: './assets',
            components: './components',
            constant: './constant',
            screens: './screens',
            utils: './utils',
          },
        },
      ],
    ],
  };
};
