<template>
    <button class="btn btn-outline-dark" type="button" @click="logout">
      logout
    </button>
    <h3>Welcome {{getUsername()}}</h3>
  
  </template>
  
  <script>
  import {GET_USERNAME, SET_AUTHENTICATION, SET_USERNAME} from "../store/storeconstants";
  export default {
    name: 'WelcomeVIew',
    data() {
      return {
      }
    },
    methods:{
      getUsername() {
      return this.$store.getters[`auth/${GET_USERNAME}`]
    },
    logout() {
      this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
      this.$store.commit(`auth/${SET_USERNAME}`, "");
      this.$router.push('/')
    }
    }
   
  
  
  }
  </script>