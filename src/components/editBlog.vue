<template>
  <div id="edit-blogs">
 
  <form>
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

           
            <!--select box - input binding -->
            <label>Author:</label>
            <select v-model="blog.author">
                <option selected="selected">{{blog.author}}</option>
                <option v-for="author in authors">
                    {{ author }}
                    </option>
            </select>
            <hr />
            <button v-on:click.prevent="UpdateBlog">Update Blog</button>
        </form>
     

  </div>
</template>

<script>

import db from '../firebase/init';


export default {
    data () {
    return {

        blog : {},
        id : this.$route.params.id,
        authors : ['The Net Ninja', 'The Angular Avenger', 'The Vue Vindicator'],
        another : null,
        feedback : null
         
    }
  },
methods :
{

    UpdateBlog : function()
    {
          this.blog.categories.push(this.another);
        db.collection('blogs').doc(this.id).update({
              author : this.blog.author,
            categories : this.blog.categories,
            content : this.blog.content,
            title : this.blog.title,
        }).then(
            ()=>  {
                this.$router.push({ name: 'showBlogs' })
        }).catch(err => {
          console.log(err)
        })
        
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
},
  created()
  {
      db.collection('blogs').doc(this.id).get().then(
          doc=>
          {
              this.blog = doc.data();
          }
      )
    
}
}
  </script>

  <style scoped>
#edit-blogs *{
    box-sizing: border-box;
}
#edit-blogs{
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