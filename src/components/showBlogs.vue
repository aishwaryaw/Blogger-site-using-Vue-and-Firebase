<template>

   <div  v-theme:column="'wide'"  id="show-blogs">
       <div v-if="showblogs">
        <h1>All Blog Articles</h1>
        <input type="text" v-model="search" placeholder="search blogs" />
        <div v-for="blog in filteredBlogs" class="single-blog">
            <!-- Passing parameters -->
        <router-link v-bind:to="'/showblog/'+ blog.id"><h2 v-rainbow>{{ blog.title | to-uppercase }}</h2></router-link>
            <article>{{ blog.content | snippet }}</article>
            <button v-on:click="deleteBlog(blog.id)">delete blog </button>
        </div>
    </div>

    <!-- <div v-if="!showblogs">
        <h1>no blogs </h1>
    </div> -->
   </div>
</template>

<script>

import searchMixin from '../mixins/searchMixin';
import db from '../firebase/init';
import firebase from 'firebase';

export default {
    data () {
    return {

        blogs : [],
        search :'',
        showblogs:false,
        slug : null
     
    }
  },
methods:
{
    deleteBlog : function(id)
    {
          db.collection('blogs').doc(id).delete().then(
          ()=>{
              this.blogs = this.blogs.filter(
                  blog =>
                  {
                      return blog.id != id
                  })
            
          })

    }
},
//local directive 
  directives :
  {
      'rainbow': {
          bind(el , binding , vnode)
          {
              el.style.color = "#" + Math.random().toString(16).slice(2,8);
          }
      }
  },

//local filter
  filters :
  {
      'to-uppercase' :function(value)
      {
          return value.toUpperCase();
      }
  },


  created()
  {
      
        db.collection('blogs').get().then(snapshot => {
          snapshot.forEach(doc =>
          {
              let blog = doc.data();
              blog.id = doc.id;
              this.blogs.push(blog);

            if(this.blogs != null)
            {
                this.showblogs = true;
            }
         else if(this.blogs==null)
         {
         this.showblogs=false;
         }
          

          })
          
      })
           
      /*
      this.$http.get('https://vueproject-aec7c.firebaseio.com/posts.json').then(function(data)
      {
          return data.json()
        }).then(function(data){
            var blogsArray = [];
            for (let key in data){
                data[key].id = key;
                blogsArray.push(data[key]);
            }
            this.blogs = blogsArray;
            console.log(this.blogs);
        });
     */
  },

  mixins : [searchMixin]
}
</script>

<style scoped>
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
input[type="text"]{
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
}

</style>
