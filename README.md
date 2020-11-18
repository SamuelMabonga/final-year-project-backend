# EDU Q & A PLATFORM BY TEAM KIA
This is an EDU-API for the EDU Q&A platform where people can ask questions and answer questions.

## Tech Stack <br>
- Node.js
- Express --server handling
- JSON Web Token --Authentication
- Bcrypt -- Password hashing
- Passport -- Authentication
- mongoose --Database Management
- nodemon --automatic refreshing of the server
- eslint --code linting

## Main Files: Project Structure

    |--app.js
    |--controllers
      |--questionControllers.js
      |--usercontrollers.js
    |--model
      |--answerModel.js
      |--questionModel.js
    |--routes
      |--questionRoutes.js
      |--signupRoutes.js
      |--validators
        |--questionValidators.js
        |--signupValidators.js
    |--strategies
      |--jwtwebtoken.js

## Envorinment Variables

- PORT -- `server port number`
- MONGO_URL -- `database URL`
- JWT_SECRET -- `Secret key for verifying the token`

## Usage
1. `clone` this repository.
2. `cd` into project root directory.
3. run `npm install` to install all dependencies.(you must have [pre-requisites](#pre-requisites)) 
4. Run `npm start` to start the server.
5. Open up `Postman` and then test out the Endpoints.

## Heroku App
https://edu-api-kia.herokuapp.com

## API Documentation
https://app.swaggerhub.com/apis-docs/SamuelMabonga/Edu-Question-Api-KIA/1.0.0#/

## Contributors

- Mabonga Samuel
- Nabasirye Loyce
- Nalubwama Mastullah

