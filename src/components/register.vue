<template>
  <form name="register-form" >
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" v-bind:required="rule.required" v-bind:placeholder="rule.message"/>
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" v-bind:required="rule.required" v-bind:placeholder="rule.message"/>
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="register">
      Register
    </button>
    <h3>Register Output: {{ this.output }}</h3>
 
  </form>

</template>

<script>

import axios from "axios";
import {SET_AUTHENTICATION, SET_USERNAME} from "@/store/storeconstants";

export default {
name: "register",
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      rule: {
        required: true,
        message: 'please input data'
      },
      output: "",
    }
  },
  methods: {
    registerApi(){
      console.log("Register");
      axios({
        method: 'post',
        url: '/api/login/CreateNewUser',
        params: {
          username: this.input.username,
          password: this.input.password
        }
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    },
    login() {
      //make sure username OR password are not empty
      if (this.input.username !== "" || this.input.username !== "") {
        this.output = "Register complete"
        //stores true to the set_authentication and username to the set_username 
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
        this.output = "Authentication complete."
        this.$router.push('/home')
      } else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }
    },
    async checkUserNameExist() {
      return await axios({
        method: 'post',
        url: '/api/login/CheckUsernameExist',
        params: {
          username: this.input.username,
        }
      }).then(function (response) {
        console.log("result in func " + response.data);
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    async register() {
      this.output = "";
      let userNameExist = await this.checkUserNameExist()
      console.log("userNameExist: " + userNameExist);
      if (userNameExist) {
        this.output = "Username already exist"
      } else {
        if (this.input.username === "" || this.input.username === "") {
          this.output = "Username and password can not be empty"
        } else {
          await this.registerApi();
          await this.login();
        }
      }
    },
    
    
  },
}
</script>

<style scoped>

</style>