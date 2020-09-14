<template>

   <div v-theme:column="'wide'"  id="show-blogs">
        <div class="single-blog">
            <h2>{{ blog.title }}</h2>
            <article>{{ blog.content }}</article>
             
              <p> categories : <ul><li v-for="category in blog.categories">
                        {{category}}
                    </li>
                </ul></p>
            <p>Author : {{blog.author}}</p>
        </div>
        <!--passing parameters -->
        <router-link v-bind:to="{ name: 'editBlog', params: {id: id}}"><button> Edit blog </button></router-link>
         <button v-on:click="deleteBlog"> Delete blog </button>
         <router-link v-bind:to="{name :'enterchat', params :{id : id}}"><button>Add comment</button></router-link>
  
    </div>
</template>


<script>

import db from '../firebase/init';

export default {
    data () {
    return {

        blog : {},
        id : this.$route.params.id
         
    }
  },
methods :
{
    deleteBlog : function()
    {

      db.collection('blogs').doc(this.id).delete().then(
          ()=>{
              this.$router.push({name :'showBlogs'})
          }
      )

    }
},
  created()
  {
      db.collection('blogs').doc(this.id).get().then(
          doc=>
          {
              this.blog = doc.data();
          }
      )
      /*
      this.$http.get('https://vueproject-aec7c.firebaseio.com/posts/'+ this.id + '.json').then(function(data)
       
       {
           return data.json();
        }).then(function(data){
            this.blog = data;
        });
*/
}
}
  </script>

<style>

#show-blogs{
    max-width: 800px;
    margin: 0px auto;
}
.single-blog{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;
}
#show-blogs a{
    color: #444;
    text-decoration: none;
}
</style>