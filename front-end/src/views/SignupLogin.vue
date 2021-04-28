<template>
<div>
<Create v-if="user"/>
<div class="main" v-else>
  <div class="formBox">
    <form class="pure-form" @submit.prevent>
      <fieldset>
        <p>Sign-up now to start planning!</p>
        <input placeholder="Enter first name" v-model="firstName">
        </fieldset>
        <fieldset>
        <input placeholder="Enter last name" v-model="lastName">
      </fieldset>
      <fieldset>
        <input placeholder="Enter username" v-model="username">

        </fieldset>
        <fieldset>
        <input type="password" placeholder="Enter password" v-model="password">
      </fieldset>
      <p v-if="error" class="error">{{error}}</p>
      <fieldset>
      <div class="container-3">
        <div class="btn btn-three" @click.prevent="register">
          <span>Sign-up</span>
        </div>
      </div>
      </fieldset>

    </form>

    <div class='login'>
    <form class="pure-form">
      <fieldset>
        <p>Already have an account? Login!</p>
        <input placeholder="Enter username" v-model="usernameLogin">
        </fieldset>
        <fieldset>
        <input type="password" placeholder="Enter password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
      <div class="container-3">
        <div class="btn btn-three" @click.prevent="login">
          <span>Login</span>
        </div>
      </div>
      </fieldset>
      <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </form>
    </div>
  </div>

</div>
</div>

</template>

<script>
import axios from 'axios';
import Create from '@/components/Create.vue'
export default {
  name: 'SignupLogin',
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
      this.message = '';
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
        this.$root.$data.creating = true;
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
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}

</script>
<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
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

.title {
  display: flex;
  justify-content: center;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.main {
  display: flex;
  height: 600px;
  text-align: left;
  justify-content: center;
}

.formBox {
  display: flex;
  padding: 20px;
  width: auto;
  height: auto;
  justify-content: space-between;
  width: 900px;
  margin-top: 50px;
}

.main form {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  color: #DC143C;
  margin-bottom: -10px;
  margin-top: -1px;

}

.login {
  margin-top: 50px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.signup-login {
  text-align: center;
  font-size: 20px;
}

div[class*=container] {
  text-align: center;
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.btn {
  position: relative;
  color: white;
  width: 175px;
  height: 34px;
  transition: all 0.3s;
  text-decoration: none !important;
  font-size: 20px;
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

.btn-three::before {
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1, 0.1);
}

.btn-three:hover::before {
  opacity: 1;
  transform: scale(1, 1);
}

.btn-three::after {
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-three:hover::after {
  transform: scale(1, .1);
  opacity: 0;
}

@media only screen and (min-width: 300px) and (max-width: 960px) {
  .formBox {
    width: 20%;
    flex-wrap: wrap;
  }
}
</style>
