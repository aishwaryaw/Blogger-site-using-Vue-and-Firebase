<template>
  <div class="chat container">
    <h2 class="center teal-text">Ninja Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages"  v-chat-scroll>
          <li  v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.from }} : </span>
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <span class="grey-text time">{{ message.timestamp }}</span>
          </li>
         
        </ul>
      </div>
      <div class="card-action">
        <form v-on:submit.prevent="addMessage">
      <label for="new-message">New message (enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage">
      <!-- <p v-if="feedback" class="red-text">{{ feedback }}</p> -->
    </form>
      </div>
    </div>
  </div>
</template>

<script>

import db from '../firebase/init';
import moment from 'moment';
import firebase from 'firebase';

export default {
    
    data()
    
    {
        return{
            messages :[],
            //name : this.$route.params.name,
            newMessage:null,
            from : null,
            to : null,
            blog_id : this.$route.params.id
        }
    },


methods :
{
addMessage : function()
{

  
 
  db.collection('blogs').doc(this.blog_id).get().then(
    
        doc =>
        {
          this.to = doc.data().user
          console.log(this.to)
        }
      )
   .then(()=>
    {
       console.log('hi');
      db.collection('chats').add(
        {
         
            from : this.from,
            to: this.to,
            blog_id : this.blog_id,
            // name:this.name,
            content :this.newMessage,
            timestamp:Date.now()

        }
    ).then(
        ()=>{
            this.newMessage=null
        }
    )
})
}
},


created()
{
    //real time event listening 
    db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.from = doc.id
        console.log(this.from)
      })
    })
    db.collection('chats').where('blog_id','==',this.blog_id)
      .onSnapshot(
        snapshot=>
        {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added')
                {
                    let doc = change.doc 
                    this.messages.push({
                    id: doc.id,
                    from: doc.data().from,
                    content: doc.data().content,
                    timestamp: moment(doc.data().timestamp).format('lll')
          })
                    
 }
       
            });
        }
    )
}
}

</script>

<style>
.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span{
  font-size: 1.4em;
}
.chat .time{
  display: block;
  font-size: 0.8em;
}
.messages{
    width: 100%;
    border: 1px solid black;
    float :left;
    max-height: 300px;
    overflow: auto;
}

.messages li{
    display:  inline;
}

.messages::-webkit-scrollbar {
  width: 3px;
}
 
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
 
.messages::-webkit-scrollbar-thumb {
  background: #aaa; 
}
</style>
