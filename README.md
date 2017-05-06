[![Build Status](https://travis-ci.org/orizens/echoes-player.svg?branch=master)](https://travis-ci.org/orizens/echoes-player) [![Code Climate](https://codeclimate.com/github/orizens/echoes-player/badges/gpa.svg)](https://codeclimate.com/github/orizens/echoes-player)

# Echoes Player - Angular Version (2nd Generation)
Echoes is a great youtube player developed by [Oren Farhi](http://orizens.com).
It's fun & easy to listen or watch videos from youtube with Echoes.
What if youtube was designed to be used as music player?
This repository is an implementation of Echoes Player with Angular (+2)- It's still a work in progress aimed at learning Angular (+2).

Echoes Player is also available as a [Chrome Application](https://chrome.google.com/webstore/detail/echoes-player/aaenpaopfebcmdaegggjbkhaedlbbkde)

It can be regarded as the Media Player experience for youtube listening pleasure.

<p align="center">
  <a href="https://echoesplayer.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/878660/23353758/bf65142e-fcd6-11e6-860e-fac3cbcb1eac.jpg" alt="Webpack and Angular 4" width="75%"/>
  </a>
</p>

## Angular Consulting Services at Orizens
I'm a Senior Javascript Engineer & A Front End Consultant.
My services include:  
- consulting to companies and startups on how to approach code in their projects and keep it maintainable.  
- I provide project bootstrapping and development - while afterwards, I integrate it on site and guide the team on it.  

[Contact Me Here](http://orizens.com/contact)

  <a href="https://orizens.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/878660/23353771/d0adbd12-fcd6-11e6-96be-7a236f8819d9.png" alt="Webpack and Angular" width="20%"/>
  </a>

# Tech Stack

## Included ngrx solutions:  
- [ngrx/store](http://github.com/ngrx/store) - State Management a la "[Redux](https://github.com/reactjs/redux)" based on RxJs  
- [ngrx/effects](http://github.com/ngrx/effects) - Side Effects layer for ngrx/store  
- ~~[ngrx/notify](http://github.com/ngrx/notify)~~ (disabled until upgrade) - reactive web notifications 
- [ngrx-store-localstorage](https://github.com/btroncone/ngrx-store-localstorage) - local sotrage support for ngrx/store  
- [ngrx/store-devtools](https://github.com/ngrx/store-devtools) - a connector to [redux devtool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US) for chrome  

## Included Technologies & Libraries
- [Angular +4.x](http://angular.io) 
- [Angular CLI](https://cli.angular.io/)
- Bootstrap v3.x (SASS)
- Typescript 2.x
- ES6 / ES2015 (using Loader Spec)
- Webpack 2.x

# EchoesPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Build for Production
Run `npm run build:prod` to build the project minified for production with AOT.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Bundle analyze explorer
[look at issue](https://github.com/angular/angular-cli/issues/4172) 
1. make sure ```npm i source-map-explorer -g```
1. ```ng build --prod --aot --sm``` (the sourcemap is for later steps)  
1. ```cd dist && source-map-explorer A-FILE-WITH-HASH.js```