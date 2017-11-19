# I hate complex stuff. Once again, no more NgRx

## Echoes Player - Angular Version (2nd Generation)
Echoes is a great youtube player developed by [Oren Farhi](http://orizens.com).
It's fun & easy to listen or watch videos from youtube with Echoes.
What if youtube was designed to be used as music player?
This repository is an implementation of Echoes Player with Angular (2nd genration)- It's still a work in progress aimed at learning Angular (2nd generation).

Echoes Player is also available as a [Chrome Application](https://chrome.google.com/webstore/detail/echoes-player/aaenpaopfebcmdaegggjbkhaedlbbkde)

It can be regarded as the Media Player experience for youtube listening pleasure.

<p align="center">
  <a href="http://echoesplayer.com" target="_blank">
    <img src="https://user-images.githubusercontent.com/878660/30917366-7ffe7ba2-a3a4-11e7-89ab-e85f4b761bcb.png" alt="Webpack, Angular, ngrx, bootstrap" width="75%"/>
  </a>
</p>

# EchoesPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Build for Production
Run `npm run build:prod` to build the project minified for production with AOT.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).  
Run `npm run test:ci` to execute the unit tests only **Once** 

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

# Todo

- [x] Fix app-player UI not in sync
- [ ] Test apis using next_page tokens
- [ ] Migrate `appLayout` store
- [ ] Migrate tests


# Bundle analyze explorer
[look at issue](https://github.com/angular/angular-cli/issues/4172) 
1. make sure ```npm i source-map-explorer -g```
2. ```ng build --prod --aot --sm``` (the sourcemap is for later steps)  
3. ```cd dist && source-map-explorer A-FILE-WITH-HASH.js```
