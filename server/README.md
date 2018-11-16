### UserAuthentication System

The challenge is to create a user authentication system without using any NPM module.

### Setup & Running

*  run ```npm i``` in order to install required packages.

*  run `npm start` in order to run the backend.

*  Make sure to run the mongoDB.

## Rules:

* API service must include 3 API endpoints: sign-up, login and verify-email.

* The database owner (You) cannot store plaintext password or SHA256-hashed password in your DB.

### KeyPoints to remember

* Add an email Address in the mail service file to send verification link to other accounts.

* Also enable Less secure Apps Authentication settings for sending mail using node mailer in local.
