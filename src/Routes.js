import addBlog from './components/addBlog';
import showBlogs from './components/showBlogs';
import myblogs from './components/myblogs';
import singleBlog from './components/singleBlog';
import Vue from 'vue';
import editBlog from './components/editBlog';
import realTimeChat from './components/realTimeChat';
import enterChat from './components/enterChat';
import signup from './components/signup';
import login from './components/login';
import firebase from 'firebase';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const router = new VueRouter({

    mode : 'history',

    routes : [
      {path :'/signup' ,name :'signup', component : signup },

    {path :'/login' ,name :'login', component : login },
    
    {path :'/' ,name :'showBlogs', component : showBlogs, 
    meta : {
        requiresAuth : true }
    },
    {path :'/myblogs' ,name :'myblogs', component : myblogs, 
    meta : {
        requiresAuth : true }
    },
    
    {path :'/add' , name : 'addblog' , component : addBlog, 
    meta : {
        requiresAuth : true },
   },
    
    {path :'/showblog/:id' ,component : singleBlog,
    meta : {
        requiresAuth : true }
    },
    
    {path :'/editblog/:id' ,name:'editBlog' ,component : editBlog, 
    meta : {
        requiresAuth : true }
    },
    
    {path :'/realtimechat' ,name:'realtimechat' ,component : realTimeChat, 
    meta : {
        requiresAuth : true }
    },
    
    {path :'/enterchat/:id' ,
    name:'enterchat' ,
    component : enterChat,
    // beforeEnter :(to,from,next)=>
    // {
    //     if(to.params.name){
    //         next()
    //     }
    //     else{
    //         next({name :'realtimechat'})
    //     }
    // },
    meta : {
        requiresAuth : true }
    }
    ]
})


router.beforeEach((to,from,next)=>{

    if(to.matched.some(rec => rec.meta.requiresAuth)){
    const loginpath = window.location.pathname;
    let user = firebase.auth().currentUser
          // User is signed in. Proceed to route
        if(user)
        {
            next()
        }
        else{
             // No user is signed in. Redirect to login
             // query to remember path before logging in
            next({ name: 'login', query : {from : loginpath} })
        }
     }

     else{
          // if route is not guarded by auth, proceed
         next();
     }

 })

// router.beforeEach((to, from, next) => {
//     const currentUser = firebase.auth().currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
//     if (requiresAuth && !currentUser) {
//       const loginpath = window.location.pathname;
//       next({ name: 'login', query: { from: loginpath } });
//     } else if (!requiresAuth && currentUser) next('menu');
//     else next();
//   });
export default router