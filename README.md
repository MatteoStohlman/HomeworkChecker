
HomeworkChecker is a sample project demonstrating the use of React to implement a homework grading utility for teachers grading unit conversion assignments. 

[Click to See Demo](https://converter.matteostohlman.com)

## Available Scripts

In the project directory, you can run:

### `npm install`

then 

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Gitflow For this Project

![master->staging->feature](https://buddy.works/blog/images/gitflow.png)

## CI/CD

[staging.converter.matteostohlman.com](https://staging.converter.matteostohlman.com) is automatically published from updates into staging branch. 

feature urls can be configured in [netlify](netlify.com) in the shape of:
  ### `*branchName*.converter.matteostohlman.com`

deploy preview urls are automatically generated for all branches and updated to reflect most recent github state. These can be found in netlify. Preview URLs are automatically generated in the form:
  ### `*branchName*--converter-matteostohlman.netlify.com`
