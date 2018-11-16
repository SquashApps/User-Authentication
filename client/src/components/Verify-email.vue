<template>
  <v-container>
    <v-layout row class="text-xs-center">
    <v-flex xs6 >
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
        <v-card>
            <v-card-title primary-title>
            <h4>Mail has been verified succesfully</h4>
            </v-card-title>
            <v-form>
            <v-card-actions>
            <v-btn  @click="submit">Continue to login page</v-btn>
            </v-card-actions>
            </v-form>
        </v-card>
        </v-container>
    </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'VerifyMail',
  methods: {
    submit () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
form.v-form {
    padding: 68px;
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
