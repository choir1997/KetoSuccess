<template>
<div class="loginPage">
  <h2>Welcome, {{user.firstName}}! </h2>
  <h1>Add your plan for today: {{time()}}</h1>
  <div class="createLogout">
    <div class="container-3">
      <div class="btn btn-three" @click="setCreating">
        <span>Create </span>
      </div>
    </div>
    <br />
    <div class="container-3">
      <div class="btn btn-three" @click="logout">
        <span>Logout </span>
      </div>
    </div>
  </div>

  <form class="pure-form" v-if="creating">
    <fieldset>
      <p>Name of Meal:</p>
      <input v-model="mealName">
      <br />
      <p>Breakfast, Lunch, or Dinner?</p>
      <input v-model="mealTime">
      <br />
      <p>Nutrition Facts(Calories, Fat, Protein, Carbs):</p>
      <textarea v-model="nutrition"></textarea>
      <br />
      <div class="cancelAdd">
      <div class="container-3">
        <div class="btn btn-three" @click="cancelCreating">
          <span>Cancel </span>
        </div>
      </div>
      <div class="add">
        <div class="container-3">
          <div class="btn btn-three" @click="addTicket">
            <span>Add Plan! </span>
          </div>
        </div>
      </div>
      </div>
    </fieldset>
  </form>

  <div class="meal" v-else>
        <div v-for="ticket in tickets" v-bind:key="ticket.id">
          <div class="oneMeal">
          <div class="container-3">
            <div class="btn btn-three" @click="isEditing(ticket)">
              <span>Edit </span>
            </div>
          </div>
          <div class="editing" v-if="matchTicket(ticket)" @submit.prevent="editTicket(ticket)">
          <form class="pure-form">
            <input placeholder="edit name" mealName = "ticket.mealName" v-model="ticket.editMealName" >
            <br/>
            <input placeholder="edit time" mealTime = "ticket.mealTime" v-model="ticket.editMealTime">
            <br/>
            <textarea placeholder="edit nutrition..." nutrition = "ticket.nutrition" v-model="ticket.editNutrition"></textarea>
            <br/>
            <div class="container-3">
              <div class="btn btn-three" @click="editTicket(ticket)" type="submit">
                <span>Save </span>
              </div>
            </div>
            <br/>
            <br/>
          </form>
          </div>
          <div class="notEditing" v-else>
            <h3>My {{ticket.mealTime}}</h3>
            <p>Meal: {{ticket.mealName}}</p>
            <p>Meal Time: {{ticket.mealTime}}</p>
            <p>Nutrition Facts: {{ticket.nutrition}}</p>
          </div>
          <div class="container-3">
            <div class="btn btn-three" @click="deleteTicket(ticket)">
              <span>Delete </span>
            </div>
          </div>
          </div>
        </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Create',
  data() {
    return {
      editing: false,
      creating: false,
      mealName: '',
      mealTime: '',
      nutrition: '',
      editingTicket: '',
      compareTicket: '',
      doneEditing: false,
      tickets: [],
    }
  },
  created() {
   this.getTickets();
   },
  methods: {

   cancelEdit() {
      this.editing = false;
   },
   isEditing(ticket) {
      this.editingTicket = ticket;
   },
   matchTicket(currentTicket) {
     if (this.editingTicket == currentTicket) {
       return true;
     }
     else {
       return false;
     }
   },
   async editTicket(ticket) {
      if (ticket.editMealName == null) {
        ticket.editMealName = ticket.mealName;
      }
      if (ticket.editMealTime == null) {
        ticket.editMealTime = ticket.mealTime;
      }
      if (ticket.editNutrition == null) {
        ticket.editNutrition = ticket.nutrition;
      }
       await axios.put("/api/tickets/" + ticket._id, {
         mealName: ticket.editMealName,
         mealTime: ticket.editMealTime,
         nutrition: ticket.editNutrition,
       });
       this.getTickets();
       this.doneEditing = true;
       this.editing = false;
       return true;
   },
   async addTicket() {
       await axios.post("/api/tickets", {
         creating: false,
         mealName: this.mealName,
         mealTime: this.mealTime,
         nutrition: this.nutrition
       });
       this.mealName = "";
       this.mealTime = "";
       this.nutrition = "";
       this.creating = false;
       this.editing = false;
       this.getTickets();
       return true;
   },
  async getTickets() {
      let response = await axios.get("/api/tickets");
      this.tickets = response.data.tickets;
      return true;
  },
  async deleteTicket(ticket) {
      this.getTickets();
      await axios.delete("/api/tickets/" + ticket._id);
      return true;
  },
  setCreating() {
    this.creating = true;
  },
  cancelCreating() {
    this.creating = false;
  },
  time(d) {
      return moment(d).format('MMMM D YYYY');
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
},
computed: {
  user() {
    return this.$root.$data.user;
  },
},
}
</script>

<style scoped>
.loginPage {
  padding: 20px;
  text-align: center;
  height: auto;
}
.meal {
  display: flex;
  justify-content: flex-start;
  text-align: center;
  padding: 5px;
  margin-top: 20px;
}

.pure-form input {
  height: 30px;
  margin: 5px;
  width: 200px;
}
.pure-form textarea {
  margin: 5px;
}
.editing {
  display: flex;
  padding-top: 10px;
}

textarea {
  width: 200px;
  max-width: 500px;
  color: #000000;
}
.cancelAdd {
  padding: 20px;
}
.add {
  margin-top: 20px;
}
h1 {
  font-size: 20px;
  text-align: center;
}
h2 {
  font-size: 30px;
  text-align: center;
}

.oneMeal {
  padding-right: 20px;
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
  .loginPage {
    width: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .oneMeal {
    padding: 10px;
  }
  .meal {
    display: initial;
    width: 100%;
    flex-wrap: wrap !important;
  }
  .pure-form {
    margin: 0 auto;
  }
  .pure-form input {
    height: 30px;
    margin: 5px;
    width: 200px;
  }
}
</style>
