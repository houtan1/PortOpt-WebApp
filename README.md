# PortOpt-WebApp
Node.js application for stock portfolio optimization

## How to Use
Run this application locally by downloading the repository.
Navigate to it and run the NPM commands `npm install` to install all dependencies, `npm test` to ensure nothing is broken, and `npm start` to start up the web app.
In a web browser, navigate to `localhost:3000` to use the app.
When finished, follow the instrunction in the command line to shut down the web server.
**The web app will soon be hosted and the above instructions will no longer be necessary.**

## Goal
Providing an investment strategy based on stock performance and user's risk aversiveness/financial target.

## Mechanics
Based on the past performance of two chosen stocks, calculates the expectation and risk of each, as well as their correlation.
With the user's desired gain or comfortable risk as inputs, suggests an investment strategy which minimizes risk and maximizes profit.

## Theory
The methodology and theoretical concepts of this project are based on modern portfolio theory by Harry Markowitz.

## Disclaimer
This software is not financial advice.
This software is provided as-is and makes absolutely no guarantees about anything.
Do not make any decisions, financial or otherwise, based on this software.
The author is not liable for any damages resulting from use or misuse of this software.

##
![https://xkcd.com/1570/][comic]

[comic]: https://imgs.xkcd.com/comics/engineer_syllogism.png "XKCD Comic 1570"
https://xkcd.com/1570/
