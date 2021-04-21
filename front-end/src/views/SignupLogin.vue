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
        <button type="submit" class="button" style="vertical-align:middle" @click.prevent="register"><span>Sign-up <i class="fas fa-user-plus"></i></span></button>
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
        <button type="submit" class="button" style="vertical-align:middle" @click.prevent="login"><span>Login <i class="fas fa-sign-in-alt"></i></span></button>
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

.button {
  display: inline-block;
  border-radius: 2px;
  background-color: #8FBC8F;
  color: #000000;
  text-align: center;
  font-size: 17px;
  padding: 10px;
  width: 250px;
  height: 40px;
  transition: all 0.5s;
  cursor: pointer;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

.buttons {
  display: flex;
  justify-content: center;
}

.signup-login {
  text-align: center;
  font-size: 20px;
}
</style>
