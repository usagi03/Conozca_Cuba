<template>
  <div v-if="this.$route.name != 'Login'">
    <Dashboard @changeLang="changeLang">
        <main>
         <div >
        <RouterView />
         </div>
        </main>
    </Dashboard>
  </div>
  <div v-else>
    <RouterView/>
  </div>
</template>
<script>
import { RouterView } from 'vue-router';
import Dashboard from "@/views/Dashboard.vue"
export default {
  components:{
    RouterView,
    Dashboard
  },
  data(){
    return{
      lang: 'es'
    }
  },
  mounted(){
     this.$i18n.locale = this.lang
  },
  methods:{
    changeLang(lang){
      this.lang = lang;
    }
  }
}
</script>
