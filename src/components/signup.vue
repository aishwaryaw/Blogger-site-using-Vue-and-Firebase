<template>

 <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>

</template>


<script>
import firebase from 'firebase';
import db from '../firebase/init';
import slugify from 'slugify';
import functions from 'firebase/functions';

export default {
 
 data()
 {
     return{
         email : null,
         password : null,
         alias : null,
         slug : null,
         feedback : null
     }
 },

 methods : {

     signup(){

        if(this.email && this.password && this.alias){
         this.slug = slugify( this.alias, {
              replacement: '-',
              remove : /[$*_+~.()'"!\-:@]/g,
              lower : true
         });

        let ref = db.collection('users').doc(this.slug);
        let checkAlias = firebase.functions().httpsCallable('checkAlias')
        checkAlias({data: this.slug}).then((result)  =>
        {
            console.log(result)
        
        //  ref.get().then(doc =>
        //  {
             if(result.data.unique){
                 firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                 .then(
                    cred => {
                    ref.set({
                     alias : this.alias,
                     user_id : cred.user.uid
                     }
                 )
                }).then(()=>
                {
                    this.$router.push({name : 'showBlogs'})
                }).catch(
                    err => {
                        this.feedback = err.message
                        this.email=null;
                        this.password=null

                    }

                )
                 
             }

             else{

                 this.feedback = 'this alias exist';
             }
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