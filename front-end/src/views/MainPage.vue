<template>
<div>
<Create v-if="user"/>

<div class="main" v-else>
  <div class='header'>
    <h1>Welcome To Keto Success!</h1>
  </div>
<h2>Let's plan your perfect keto meal...</h2>

  <div class='buttons'>
    <router-link to="/SignupLogin">
    <button class="button" style="vertical-align:middle"><span>Create Your Meal Plan! <i class="fas fa-edit"></i></span></button>
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
  font-size: 50px;
  border: 2px solid;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

h2 {
  font-size: 25px;
  text-align: center;
}



.button {
  display: inline-block;
  border-radius: 2px;
  background-color: #8FBC8F;
  color: #000000;
  text-align: center;
  font-size: 20px;
  padding: 15px;
  width: 200px;
  height: 100px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 20px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.2s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.2s;
}

.button:hover span {
  padding-right: 15px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

.button:hover {
  background-color: #568f56;
}

.buttons {
  display: flex;
  justify-content: center;
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
