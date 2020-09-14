import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './Routes';
import VueResource from 'vue-resource';
import VueChatScroll from 'vue-chat-scroll';
import firebase from 'firebase';
let app  = null ;
// Vue.use(VueRouter);

//directive
Vue.use(VueChatScroll);

Vue.use(VueResource); // http requests

// const router = new VueRouter({
//   routes : Routes,
//   mode : 'history'
// });



//global directive

Vue.directive('theme',
{
  bind(el , binding , vnode)
  {
    if(binding.value == 'wide')
    {
      el.style.maxWidth = "1200px";
    }

    else if(binding.value == 'narrow')
    {
      el.style.maxWidth = "100px";
    }

    if(binding.arg = 'column')
    {
      el.style.background = '#ddd';
      el.style.padding = '20px';
    }
  }
});


//global filter
Vue.filter('snippet',function(value)
{
  return value.slice(0,100) + '...';
});

// wait for firebase auth to init before creating the app

firebase.auth().onAuthStateChanged(()=>
{
if(!app){
  app = new Vue({
    el: '#app',
    render: h => h(App),
    router : router

})
}
})
