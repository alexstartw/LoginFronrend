<template>
    
    <button class="btn btn-outline-dark" type="button" @click="logout">
      logout
    </button>
    <h3>Welcome {{getUsername()}}</h3>
    <button class="btn btn-outline-dark" type="button" @click="getCheckInTodayText">
      checkInToday
    </button>
    <h3>{{this.checkInStatus}}</h3>
    <div class="mb-3">
      <label for="checkTimeInput">CheckTime: </label>
      <input type="text" id="checkTimeInput" v-model="input.checkTimeInput" v-bind:placeholder="rule.message"/>
      <button class="btn btn-outline-dark" type="button" @click="getMonthCheckIn">
        MonthCheckInTimes
      </button>
      <h3>This month had check in {{this.checkTime}} times.</h3>
    </div>
    <div class="mb-3">
      <label for="checkAbsentTimeInput">CheckTime: </label>
      <input type="text" id="checkAbsentTimeInput" v-model="input.absentTimeInput" v-bind:placeholder="rule.message"/>
      <button class="btn btn-outline-dark" type="button" @click="getMonthAbsent">
        MonthAbsentTimes
      </button>
      <h3>This month had absent {{this.absentTime}} times.</h3>
    </div>
  <div class="mb-3">
    <label for="changePWInput">Old Password: </label>
    <input type="text" id="oldPWInput" v-model="input.oldPWInput"/>
    <label for="changePWInput">New Password: </label>
    <input type="text" id="changePWInput" v-model="input.changePWInput"/>
    <button class="btn btn-outline-dark" type="button" @click="changePW">
      changePW
    </button>
    <h3>{{this.changePWText}}</h3>
  </div>

  
  </template>
  
  <script>
  import {GET_USERNAME, SET_AUTHENTICATION, SET_USERNAME} from "../store/storeconstants";
  import axios from "axios";
  export default {
    name: 'WelcomeVIew',
    data() {
      return {
        checkInStatus: "",
        checkTime: "0",
        absentTime: "0",
        changePWText: "",
        input: {
          checkTimeInput: "",
          absentTimeInput: "",
          changePWInput: "",
          oldPWInput: ""
        },
        rule: {
          message: 'YYYY-MM'
        },
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
    },
    async checkInTodayApi() {
      return await axios({
        method: 'post',
        url: '/api/checkin/TodayCheckIn',
        params: {
          username: this.getUsername(),
        }
      }).then(function (response) {
        console.log("check in result " +response.data);
        return response.data;
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
    },
      async getCheckInTodayText() {
        let checkInToday = await this.checkInTodayApi();
        if (checkInToday) {
          this.checkInStatus = "You have checked in today"
        } else {
          this.checkInStatus = "You already checked in today"
        }
      },
      async monthCheckInApi() {
        return await axios({
          method: 'post',
          url: '/api/checkin/GetMonthCheckInCount',
          params: {
            username: this.getUsername(),
            dateTime: this.input.checkTimeInput
          }
        }).then(function (response) {
          console.log("check in result " +response.data);
          return response.data;
        }).catch(function (error) {
          console.log(error);
          throw error;
        });
      },
      async getMonthCheckIn() {
        this.checkTime = await this.monthCheckInApi();
      },
      async monthAbsentApi() {
        return await axios({
          method: 'post',
          url: '/api/checkin/GetAbsentCount',
          params: {
            username: this.getUsername(),
            dateTime: this.input.absentTimeInput
          }
        }).then(function (response) {
          console.log("check in result " + response.data);
          return response.data;
        }).catch(function (error) {
          console.log(error);
          throw error;
        });
      },
      async getMonthAbsent() {
        this.absentTime = await this.monthAbsentApi();
      },
      async changePWApi() {
        return await axios({
          method: 'post',
          url: '/api/login/ChangePassword',
          params: {
            username: this.getUsername(),
            oldPassword: this.input.oldPWInput,
            newPassword: this.input.changePWInput
          }
        }).then(function (response) {
          console.log("change PW result " + response.data);
          return response.data;
        }).catch(function (error) {
          console.log(error);
          throw error;
        });
      },
      async changePW() {
        let status = await this.changePWApi();
        console.log("status " + status);
        if (status===200) {
          this.changePWText = "Change password successfully"
        }
        else {
          this.changePWText = "Change password failed"
        }
      },
    }
   
  
  
  }
  </script>