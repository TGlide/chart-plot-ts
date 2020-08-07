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
    -   [Use undo](https://github.com/homerchen19/use-undo)


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
