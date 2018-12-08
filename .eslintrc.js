// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['vue', 'standard'],
  // required to lint *.vue files
  plugins: ['html', 'flowtype-errors'],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'flowtype-errors/show-errors': 2,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    beforeAll: true,
    afterAll: true,
    beforeEach: true,
    afterEach: true,
    before: true,
    after: true,
    jest:  true,
    expect: true,
    it: true,
    describe: true
  }
}
