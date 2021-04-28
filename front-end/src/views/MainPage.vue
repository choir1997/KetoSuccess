<template>
<div>
<Create v-if="user"/>

<div class="main" v-else>
  <div class='header'>
    <h1>Welcome To Meal Planner!</h1>
  </div>
  <h2>Let's plan your perfect meal...</h2>

  <div class='buttons'>
    <router-link to="/SignupLogin">
    <div class="container-2">
    <div class="btn btn-two">
      <span>Start!</span>
    </div>
    </div>
    </router-link>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import Create from '@/components/Create.vue'
export default {
  name: 'MainPage',
  components: {
    Create,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
   async login() {
     this.error = '';
     this.errorLogin = '';
     if (!this.usernameLogin || !this.passwordLogin)
       return;
     try {
       let response = await axios.post('/api/users/login', {
         username: this.usernameLogin,
         password: this.passwordLogin,
       });
       this.$root.$data.user = response.data.user;
     } catch (error) {
       this.errorLogin = "Error: " + error.response.data.message;
       this.$root.$data.user = null;
     }
  },
  }
}

</script>
<style scoped>

h1 {
  text-align: center;
  font-size: 75px;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: center;
  padding-top: 120px;
}

h2 {
  font-size: 25px;
  text-align: center;
}

div[class*=container] {
  text-align: center;
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.btn {
  position: relative;
  color: white;
  width: 200px;
  height: 64px;
  line-height: 64px;
  transition: all 0.3s;
  text-decoration: none !important;
  font-size: 25px;
  span {
    transition: all 0.3s;
    tranform: scale(1, 1);
  }
}

.btn::before, .btn::after {
  content: '';
  position: absolute;
  transition: all 0.3s;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.btn-two::before, .btn-two::after {
  content: '';
  position: absolute;
  width: 100%;
	height: 100%;
  bottom: 0;
	left: 0;
	z-index: 1;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-two:hover::after {
  animation-name: rotatecw;
  animation-duration: 2s;
}
.btn-two:hover::before {
  animation-name: rotateccw;
  animation-duration: 3s;
}
.btn-two:hover::after, .btn-two:hover::before {
  left: 66px;
  width: 64px;

  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotatecw {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

@keyframes rotateccw {
    from {transform: rotate(0deg);}
    to {transform: rotate(-360deg);}
}

.buttons a {
  text-decoration: none;
}

.signup-login {
  text-align: center;
  font-size: 20px;
}

.signup-login a {
  color: #B84901;
}

.signup-login a:hover {
  color: #8B0000;
}

</style>
