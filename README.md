# Team managment API

Please note this project has been developed for a coding exercise.

## Getting started

1. The project requires node engine > `14.xx.xx`
1. Run `yarn install`
1. Populate a .env file with needed variables (check .env.example).
1. Run `yarn dev` to start development

## Scripts in package.json

-   `build:prod` Builds the project for production mode
-   `build:dev` Builds the project for development with hotmodule replacement
-   `dev` Starts dev server + watch for files to restart on changes
-   `watch` Runs webapck in watch mode (mostly used by `dev` script)
-   `nodemon` Runs the dev server. it's used by `dev` script.
-   `lint` Exports eslint command and requries a file/dir path to lint
-   `test` Runs jest tests
-   `test:watch` Runs jest tests with --watch

## Notes

1. Always use `yarn` over `npm`
1. All functions should use `Named Parameters`
1. Project uses babel to transpile the code which is in `src/` directory. The output is in `build` directory.
1. Response data is enveloped:
    - For success respone : `{result: {} | []}`
    - For error response: `{error: {} | []}`
1. To send errors back to user, throw an error object with the following structure:
    ```javascript
    {
    	statusCode: 4xx,
    	message: 'Some Related Error Message',
    	name: 'ERROR_NAME' // unique id for this error type
    	...rest // any more data needed with this error
    }
    ```
