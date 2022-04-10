## Quick Start
role admin:  
login: admin  
Pw: @Aa123  
  

role editor:  
login: editor  
Pw: @Aa123  


role user:  
login: user  
Pw: @Aa123  
### File
|path|description|
|---|---|
|`\avalanche\code\wordle_war`|whole project, all command related to UI should be on this path|  
|`\avalanche\code\wordle_war\src`|main UI code|
|`\avalanche\code\wordle_war\server`|backend server code|
### command
those command can be run in path `\avalanche\code\wordle_war\`.  

#### **First time to run any command
Please install all package:  
run `npm install` on both the path `\avalanche\code\wordle_war` and `\avalanche\code\wordle_war\server`

#### Run UI in dev (dev way may have some duplicate click event)  
`npm start` -> host development server to run dev UI, typically host in `https://localhost:3000`  
If you save your modified UI code, all change on UI code should be updated the UI of development server immediately, so you can quickly to view the code of changed UI  

#### Run UI in prod
1. `npm run build` -> output the prod UI build to `\avalanche\code\wordle_war\build`.  
2. `npm run prod` -> host a server to run the prod UI build, this code need to install http-server : `npm install http-server --save`, typically host in `https://localhost:3000`  

#### Run Backend server
`npm run server`  
run the backend server. the main code is in `\avalanche\code\wordle_war\server\server.js`  
Multiplayer is supported by Socket.io server. Socket.io server is set in `https://localhost:3501`  
  
Some custom scripts can be found in `\avalanche\code\wordle_war\package.json.`
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "node ./server/server.js",
    "prod": "http-server ./build -p 3000"
  },
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

<!--### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
-->

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
