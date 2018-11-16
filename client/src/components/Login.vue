<template>
    <v-container>
    <v-layout row class="text-xs-center">
    <v-flex xs6 >
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
        <v-card>
            <v-card-title primary-title>
            <h4>Login</h4>
            </v-card-title>
            <v-form v-model="valid">
            <v-text-field prepend-icon="person" v-model="email" name="Email" label="Email"></v-text-field>
            <v-text-field prepend-icon="lock" v-model="password" name="Password" label="Password" type="password" :rules="passwordRules"></v-text-field>
            <v-card-actions>
            <v-btn :disabled="!valid"
            @click="submit"> Login</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
        </v-container>
    </v-flex>
    </v-layout>
     <v-dialog></v-dialog>
</v-container>
</template>

<script>
import axios from 'axios'
import {constants} from '../constant.js'
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    email: '',
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => constants.REGEX_PASSWORD.test(v) || 'Password is required and it should not be less than 8 characters'
    ]
  }),
  methods: {
    submit () {
      axios.post(constants.NOTIFICATION_URL + `login`, { email: this.email, password: this.password, name: this.name })
        .then((response) => {
          this.$modal.show('dialog', {
            title: 'Logged in successfully',
            text: 'Welcome to home',
            buttons: [
              {
                title: 'Close'
              }
            ]
          })
        })
        .catch(() => {
          this.$modal.show('dialog', {
            title: 'Entered crendentials are not correct',
            text: 'Enter the correct UserName or Password',
            buttons: [
              {
                title: 'Close'
              }
            ]
          })
        })
    }
  }
}
</script>

<style scoped>
form.v-form {
    padding: 20px;
}
.layout.text-xs-center.row{
    display:flex;
    justify-content: center;
}
.v-card__actions{
    justify-content: center;
}
.v-card__title{
    justify-content: center;
    font-size: 24px;
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat){
color: white;
border-radius: 8px;
background-color: #38b93c;
}

</style>
