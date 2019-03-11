exports.config = {
  tests: './e2e/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:4200',
      show: true,
      windowSize: '1440x900'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: 'npm run start',
  mocha: {},
  name: 'echoes-player'
};
