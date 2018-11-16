
<template>
<div class="container">
  <h1>SignUp</h1>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
        <v-text-field
      v-model="password"
      type="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>
      <v-text-field
      v-model="confirmPassword"
      type="password"
      :rules="checkMatch"
      label="Confirm Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  <v-dialog></v-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import {constants} from '../constant.js'
export default {
  name: 'SignUp',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => constants.EMAIL_VALIDATOR.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => constants.REGEX_PASSWORD.test(v) || 'Password is required and it should not be less than 8 characters'
    ],
    confirmPassword: ''
  }),

  computed: {
    checkMatch () {
      return this.password === this.confirmPassword ? [true] : ['Password does not match']
    }
  },

  methods: {
    submit () {
      axios.post(constants.NOTIFICATION_URL + `signup`, { email: this.email, password: window.btoa(this.password), name: this.name })
        .then((response) => {
          this.$modal.show('dialog', {
            title: 'Verification Mail',
            text: 'A mail has been sent to your corresponding email address. Click on that mail to verify your identity.',
            buttons: [
              {
                title: 'Close'
              }
            ]
          })
          this.$refs.form.reset()
        })
        .catch(() => {
          this.$modal.show('dialog', {
            title: 'MailId is already registered',
            text: 'Please try with some other mail address',
            buttons: [
              {
                title: 'Close'
              }
            ]
          })
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style scoped>
.theme--light.application{
  background:none;
}
.container{
  width:40%;
  background: white;
  /* border: 1px solid black; */
  border-radius: 19px;
  box-shadow: 0 10px 6px -6px #777;
  flex:none !important;
  padding:68px !important;
}

.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat){
  color: white;
  border-radius: 8px;
  background-color: #38b93c;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
