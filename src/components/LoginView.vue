<template>
  <form name="login-form">
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login">
      Login
    </button>
    <button class="btn btn-outline-dark" type="button" @click="register">
      register
    </button>
  </form>
  <h3>Login Output: {{ this.output }}</h3>

</template>

<script>
import {SET_AUTHENTICATION, SET_USERNAME} from "../store/storeconstants";
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      output: "",
    }
  },
  methods: {
    async login() {
      this.output = "";
      //make sure username OR password are not empty
      if (this.input.username !== "" && this.input.username !== "") {
        const UserNameExist = await this.checkUserNameExist();
        const PasswordCorrect = await this.loginApi();
        console.log("UserNameExist: " + UserNameExist);
        console.log("PasswordCorrect: " + PasswordCorrect);
        if (UserNameExist && PasswordCorrect) {
          this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
          this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
          this.output = "Authentication complete."
          this.$router.push('/home')
        } else if (!PasswordCorrect) {
          this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
          this.output = "Username or password is incorrect"
        }
      } else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }
    },
    async loginApi() {
      console.log("LoginApi");
      return await axios({
        method: 'post',
        url: '/api/login/CheckPassword',
        params: {
          username: this.input.username,
          password: this.input.password
        }
      }).then(function (response) {
        console.log(response);
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });

    },
    async checkUserNameExist() {
      console.log("checkUserNameExist");
      return await axios({
        method: 'post',
        url: '/api/login/CheckUsernameExist',
        params: {
          username: this.input.username,
        }
      }).then(function (response) {
        console.log(response);
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });

    },
    register() {
      this.$router.push('/register')
    }
  },


}
</script>