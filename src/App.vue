<template>
  <div id="app">
 <app-header>
   <h1 slot="h1">Bloggers site </h1>
 </app-header>
 <router-view></router-view>
  </div>
</template>


<script>

import addBlog from './components/addBlog';
import showBlogs from './components/showBlogs';
import appHeader from './components/appHeader';


export default {
  components :
  {
    // 'add-blog' : addBlog,
    // 'show-blog':showBlogs,
    'app-header':appHeader

  },
  data () {
    return {
     
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
