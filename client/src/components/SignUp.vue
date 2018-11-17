
<template>
<div class="container">
  <h1>SignUp</h1>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="15"
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
      class="button"
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn class="button" @click="clear">clear</v-btn>
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
      v => !!v || constants.NAME_REQUIRED,
      v => (v && v.length <= 15) || constants.NAME_REQUIRED_TEXT
    ],
    email: '',
    emailRules: [
      v => !!v || constants.EMAIL_REQUIRED,
      v => constants.EMAIL_VALIDATOR.test(v) || constants.EMAIL_REQUIRED_TEXT
    ],
    password: '',
    passwordRules: [
      v => !!v || constants.PASSWORD_REQUIRED,
      v => constants.REGEX_PASSWORD.test(v) || constants.PASSWORD_REQUIRED_TEXT
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
            text: constants.MAIL_VERIFIED_TEXT,
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
  border-radius: 19px;
  box-shadow: 0 10px 6px -6px #777;
  flex:none !important;
  padding:20px !important;
}

.button{
 float:right;
}

.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat){
  color: white;
  border-radius: 8px;
  background-color: #38b93c;
}
</style>
