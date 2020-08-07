<p align="center">
  <h3 align="center">Chart Plot</h3>
  <p align="center">
    A web app to generate charts based on input events
  </p>
  
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Run App](#run-app)
  - [Run Tests](#run-tests)
- [Architecture and Design Choices](#architecture-and-design-choices)

<!-- ABOUT THE PROJECT -->

## About The Project

This repo comes with the frontend, built with React (CRA) and Typescript, which handles user input and chart display, and the backend, 
built with socket.io, which is responsible for generating the chart by receiving the full list of events from the frontend

### Built With

-   Frontend
    -   [React](https://reactjs.org/)
    -   [Typescript](https://www.typescriptlang.org/)
-   Backend
    -   [Socket.io](https://socket.io/)
-   Tests
    -   [Jest](https://jestjs.io/)
    -   [Enzyme](https://enzymejs.github.io/enzyme/)
-   Styling
    -   [SCSS](https://sass-lang.com/)
    -   [Bulma](https://bulma.io/)
-   Extra packages
    -   [Charts: Nivo](https://nivo.rocks/)
    -   [React Window](https://github.com/bvaughn/react-window)
    -   [re-resizeable](https://github.com/bokuweb/re-resizable)
    -   [use-undo](https://github.com/homerchen19/use-undo)


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

`yarn` installed on your local machine.

### Installation

```sh
cd web    # For the frontend, or
cd server # For the backend
yarn
```

## Usage

### Run App

```sh
cd server
yarn start
```

In another terminal:
```sh
cd web
yarn start
```

You should be able to see the web app by opening `http://localhost:3000/` on your browser.

Example inputs are already provided when loading the app. You can generate the chart, or clean the input to start from a fresh start!

### Run Tests

```sh
yarn test
```


## Architecture and Design Choices

The main difficulty of developing this project was to make it efficient and user friendly, whilst dealing with large amounts of data. With this in mind, this project has undergone some changes through its development.

When rendering large lists of input events, the app struggled to mantain a smooth experience, especially when scrolling through the list. To counter this, the project uses the [React Window](https://github.com/bvaughn/react-window) package, as to render the list partially, depending on the scroll position. This greatly improves perfomance, but coming at the cost of showing blank items when scrolling fast, or resizing the input window.

For charts, I opted to use the [Nivo](https://nivo.rocks/) library, for its lightweight installation (since it's not necessary to install all the chart modules), and quick configuration. The only cutback necessary, was using the canvas alternative for the line module. It's faster and lighter than its SVG counterpart, but it redners without smooth transitions.

For generating the chart, initially, I made the calculations on the frontend, visible at `web/helpers/chart.ts`, but with a large collection of events, the browser started freezing while calculating, and it proved to be too demanding. With this in mind, a simple socket.io server was made, which receives the `DataEvent` array, and returns the chartData, but the frontend still does one calculation: Since there can be multiple `start` and `stop` events, it only sends data from the last `start` event, as to minimize the data being sent. 



Made by [Thomas G. Lopes](https://github.com/TGlide)
