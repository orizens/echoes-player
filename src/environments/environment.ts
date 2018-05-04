// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  youtube: {
    API_KEY: 'AIzaSyDCGg6FG6s_zxACqel09vQUKBc-x26pKFA',
    CLIENT_ID: '971861197531-hm7solf3slsdjc4omsfti4jbcbe625hs'
  },
  firebase: {
    apiKey: 'AIzaSyC_k1AnMyA3vpjZKeTY7baVmzjPcqH_9Jc',
    authDomain: 'echoes-player-a5d80.firebaseapp.com',
    databaseURL: 'https://echoes-player-a5d80.firebaseio.com',
    projectId: 'echoes-player-a5d80',
    storageBucket: 'echoes-player-a5d80.appspot.com',
    messagingSenderId: '1091000328541'
  }
};
