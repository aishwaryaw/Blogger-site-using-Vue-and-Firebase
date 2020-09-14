   <template>
   <div>
   <slot name="h1"></slot>
   <nav class="navbar navbar-default">
        <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">WebSiteName</a>
    </div>
   <ul class="nav navbar-nav">
   <li><router-link to="/add" exact>Add blog</router-link></li>
    <li><router-link to="/" exact>show blogs</router-link></li>
        <li><router-link to="/myblogs" exact>My blogs</router-link></li>
     <li><router-link to="/realtimechat" exact>Real time chat</router-link></li>
      <li v-if="!user"><router-link to="/signup" exact>Signup</router-link></li>
       <li v-if="!user"><router-link to="/login" exact>Login</router-link></li>
        <li v-if="user"><a v-on:click="logout">Logout</a></li>
    </ul>
        </div>
    </nav>
   </div>
    </template>

<script>

import firebase from 'firebase';
export default {
    data () {
    return {
     user : null
    }
  },

  methods :
  {
    logout(){

      firebase.auth().signOut().then(()=>
      {
        this.$router.push({name : 'login'})
      })
    }
  },

  created()
  {
    firebase.auth().onAuthStateChanged((user)=>
    {
      if(user)
      this.user= user

      else
      this.user=null
    })
  }
}
</script>





