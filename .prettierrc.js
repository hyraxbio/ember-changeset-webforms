module.exports = {
  singleQuote: true,
  printWidth: 99999999999999999999999999999999,
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        singleQuote: false,
      },
    },
  ],
};
