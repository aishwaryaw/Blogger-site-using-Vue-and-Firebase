<template>
  <div id="add-blog">
 
  <form v-if="!submitted">
       <label>Blog Title:</label>
        <input type="text" v-model.lazy="blog.title" required />
        <label>Blog Content:</label>
            <textarea v-model.lazy.trim="blog.content"></textarea>

 <label>Blog Categories:</label>
        <div v-for="(cat,index) in blog.categories">
        <input type="text" v-model="blog.categories[index]">
        <button v-on:click="deleteCategory(cat)">delete</button>    
    </div>

<div>
      <label>Add an ingredient (press tab to add):</label>
        <input type="text" v-on:keydown.tab.prevent="addCategory" v-model="another">
        <p v-if="feedback">{{feedback}}</p>
</div>

             <!--checkbox - input binding -->
           <!-- <div id="checkboxes">
                <p>Blog Categories:</p>
                <label>Ninjas</label>
                <input type="checkbox" value="ninjas" v-model="blog.categories" />
                <label>Wizards</label>
                <input type="checkbox" value="wizards" v-model="blog.categories" />
                <label>Mario</label>
                <input type="checkbox" value="mario" v-model="blog.categories" />
                <label>Cheese</label>
                <input type="checkbox" value="cheese" v-model="blog.categories" />
            </div>
-->
            <!--select box - input binding -->
            <label>Author:</label>
            <select v-model="blog.author">
                <option v-for="author in authors">
                    {{ author }}
                    </option>
            </select>
            <hr />
            <button v-on:click.prevent="addBlog">Add Blog</button>
        </form>
        <div v-if="submitted">
            <h3>Thanks for adding your post</h3>
        </div>

      <div id="add-blog">
            <h2>Title : {{blog.title}}</h2>
           <h2> Content : </h2><article>{{blog.content}}</article>
            <h2>categories : </h2>
                <ul v-for="category in blog.categories">
                    <li>
                        {{category}}
                    </li>
                </ul>
            <h2>
                Author : {{blog.author}}</h2>
   </div>
  </div>
</template>

<script>

    
import db from '../firebase/init';
import firebase from 'firebase';

export default {


    data () {
    return {
         blog: {
                title: null,
                content: null,
                categories: [],
                author: null
            },
        authors : ['The Net Ninja', 'The Angular Avenger', 'The Vue Vindicator'],
        another : null,
        submitted : false,
        feedback : null,
        slug : null
     
    }
  },

  methods :
  {

      addBlog : function()
      {
        this.blog.categories.push(this.another);
        db.collection('users').where('user_id','==', firebase.auth().currentUser.uid).get()
        .then(
            snapshot =>
            {
                snapshot.forEach(doc =>
                {
                    this.slug = doc.id
                })
            }).then(()=>
            {
            db.collection('blogs').add({
            user : this.slug,
            author : this.blog.author,
            categories : this.blog.categories,
            content : this.blog.content,
            title : this.blog.title,
           } ).then(
               () =>{
                   this.$router.push({name : 'showBlogs'})
               }
           )
            })          

           /*
         this.$http.post('https://vueproject-aec7c.firebaseio.com/posts.json',this.blog).then(function(data)
         {
                console.log(data);
                this.submitted = true;
            });
        }
        */
      },

      deleteCategory:function(category)
      {
          this.blog.categories = this.blog.categories.filter(
              cat => {
                  return category != cat
              }
          )
      },

      addCategory : function()
      {
          if(this.another)
          {
          this.blog.categories.push(this.another);
          this.another = null;
          this.feedback=null;
              
        }
        else{
            this.feedback="please enter category";
        }
      }
  }



}

</script>

<style scoped>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea, select{
    display: block;
    width: 100%;
    padding: 8px;
}
textarea{
    height:200px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}
#checkboxes label{
    display: inline-block;
    margin-top: 0;
}
hr{
    display: none;
}
button{
    display: block;
    margin: 20px 0;
    background: crimson;
    color: #fff;
    border: 0;
    padding: 14px;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
}

</style>
