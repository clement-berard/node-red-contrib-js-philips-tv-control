# node-red-contrib-js-philips-tv-control

A collection of nodes to control Philips TV with Node-RED, including Ambilight control.

Build on top of [philtv-js](https://github.com/clement-berard/philtv-js) (no python, only Javascript), this package provides a set of nodes to control your Philips TV with Node-RED.

<br/>
<p align="center">
  <a href="https://www.npmjs.com/package/@keload/node-red-dxp" aria-label="Build with node-red-dxp">
    <img src="https://img.shields.io/badge/Build%20with-node--red--dxp-blue?style=for-the-badge" alt="Build with node-red-dxp">
  </a>
</p>
<p align="center">
    <a href="https://github.com/clement-berard/node-red-contrib-js-philips-tv-control/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/clement-berard/node-red-contrib-js-philips-tv-control.svg?style=for-the-badge" alt="Contributors">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-js-philips-tv-control/network/members">
        <img src="https://img.shields.io/github/forks/clement-berard/node-red-contrib-js-philips-tv-control.svg?style=for-the-badge" alt="Forks">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-js-philips-tv-control/stargazers">
        <img src="https://img.shields.io/github/stars/clement-berard/node-red-contrib-js-philips-tv-control.svg?style=for-the-badge" alt="Stargazers">
    </a>
    <a href="https://github.com/clement-berard/node-red-contrib-js-philips-tv-control/issues">
        <img src="https://img.shields.io/github/issues/clement-berard/node-red-contrib-js-philips-tv-control.svg?style=for-the-badge" alt="Issues">
    </a>
</p>
<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/@keload/node-red-contrib-js-philips-tv-control">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@keload/node-red-contrib-js-philips-tv-control.svg?label=NPM&logo=npm&style=for-the-badge&color=0470FF&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/@keload/node-red-contrib-js-philips-tv-control">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@keload/node-red-contrib-js-philips-tv-control?label=Downloads&style=for-the-badge&color=67ACF3">
  </a>
</p>


## Installation

```bash
npm install @keload/node-red-contrib-js-philips-tv-control
```

or with the palette manager in Node-RED.

## Prerequisites

You need to have valid digest credentials to access your TV.

You can do this in the TV config node.

![paring-config.png](docs/img/paring-config.png)

## Features

Many feature are missing, but the package is growing. Here is the list of the current features:

### `ambilight`

- Manage Ambilight brightness
- Manage Ambilight Follow Video Mode

### `send-key`

Send a key to the TV to control it. (Mute, Volume Up, Volume Down, Power, ...)

### `info`

- Get TV information System
- Get all Ambilight current information
- Get all TV structure

## Roadmap

- [ ] Add more nodes to manage more features

## Contributing

This package use [node-red-dxp](https://www.npmjs.com/package/@keload/node-red-dxp) to build the package.
A crazy fast and easy way to build Node-RED package.

Please feel free to contribute to this package by creating issues or pull requests.

## License

MIT
