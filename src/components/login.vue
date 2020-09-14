<template>

 <div class="signup container">
    <form class="card-panel" v-on:submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
       <div class="field center">
        <button class="btn deep-purple">login</button>
      </div>
    </form>
  </div>

</template>


<script>

import firebase from 'firebase';
import db from '../firebase/init';
import slugify from 'slugify';

export default {
 
 data()
 {
     return{
         email : null,
         password : null,
         feedback : null
     }
 },

 methods : {

     login(){

        
        if(this.email && this.password){

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                 .then(cred =>
                 {
                    this.$router.push(this.$route.query.from || '/');
                    
                     }
                 ).catch(
                    err => {

                        this.feedback = err.message
                        alert(this.feedback)
                        this.email=null
                        this.password=null

                    })
                 
             }
         
         else{
             this.feedback = 'Please fill the fields';
         }

     }
 },

 created()
 {

 }
}


</script>

<style scoped>

.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}
</style>