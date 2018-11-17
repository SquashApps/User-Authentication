export let constants = {
  NOTIFICATION_URL: 'http://localhost:8080/',
  REGEX_PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  EMAIL_VALIDATOR: /.+@.+/,
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_REQUIRED_TEXT: 'Password is required and it should contain number,characters,special characters',
  NAME_REQUIRED: 'Name is required',
  NAME_REQUIRED_TEXT: 'Name must be less than 15 characters',
  EMAIL_REQUIRED: 'E-mail is required',
  EMAIL_REQUIRED_TEXT: 'E-mail must be valid',
  MAIL_VERIFIED_TEXT: ' A mail has been sent to your corresponding email address. Click on that mail to verify your identity.'
}
