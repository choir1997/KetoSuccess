<template>
<div class="loginPage">
  <h2>Welcome, {{user.firstName}}! </h2>
  <h1>Add your plan for today: {{time()}}</h1>
  <div class="createLogout">
    <button @click="setCreating"><span>Create <i class="fas fa-plus-square"></i></span></button>
    <br />
    <button @click="logout"><span>Logout <i class="fas fa-sign-out-alt"></i></span></button>
  </div>
  <form class="pure-form" v-if="creating" @submit.prevent="addTicket">
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
      <button @click="cancelCreating">Cancel</button>
      <button type="submit">Add Plan!</button>
    </fieldset>
  </form>
  <div class="meal" v-else>
        <div v-for="ticket in tickets" v-bind:key="ticket.id">
          <button @click="isEditing(ticket)">Edit</button>
          <div class="editing" v-if="matchTicket(ticket)" @submit.prevent="editTicket(ticket)">
          <form class="pure-form">
            <input placeholder="edit name" mealName = "ticket.mealName"  v-model="ticket.editMealName">
            <br/>
            <input placeholder="edit time" mealTime = "ticket.mealTime" v-model="ticket.editMealTime">
            <br/>
            <textarea placeholder="edit nutrition..." nutrition = "ticket.nutrition" v-model="ticket.editNutrition"></textarea>
            <button @click="editTicket(ticket)" type="submit">Save</button>
          </form>
          </div>
          <div class="notEditing" v-else>
            <h3>My {{ticket.mealTime}}</h3>
            <p>Meal: {{ticket.mealName}}</p>
            <p>Meal Time: {{ticket.mealTime}}</p>
            <p>Nutrition Facts: {{ticket.nutrition}}</p>
          </div>
          <button @click="deleteTicket(ticket)">Delete <i class="fas fa-trash-alt"></i></button>
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

  methods: {
  created() {
   this.getTickets();
   },
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
      console.log(ticket);
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

textarea {
  width: 100%;
  max-width: 500px;
}

h1 {
  font-size: 20px;
  text-align: center;
}

h2 {
  font-size: 30px;
  text-align: center;
}

button {
  display: inline-block;
  border-radius: 2px;
  background-color: #8FBC8F;
  color: #000000;
  text-align: center;
  font-size: 15px;
  padding: 10px;
  width: 150px;
  height: 40px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 10px;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.2s;
}

button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.2s;
}

button:hover span {
  padding-right: 15px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}

button:hover {
  background-color: #568f56;
}

</style>
