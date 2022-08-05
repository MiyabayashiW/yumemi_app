<script >
import HomeChildVue from '../components/HomeChild.vue';
import axios from 'axios';
export default {
  components:{
    HomeChildVue
  },
  data(){
    return{
      todos:[{done:false}],
      pref:[],
      prefCode:[],
      prefName:[]
    }
  },
  mounted(){
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
          headers: { "X-API-KEY": "ODdVRSfsLTyX8SI7nhM5JE6ZqfDcgKsDLBz3MQOA" },})
      .then(response => (
        this.pref.push(response.data.result)
        ));
  },
 

}
</script>

<template>
  <main>
    <div>
      <li v-for="prefname in pref[0]" :key="prefname">
        <HomeChildVue :prefname="prefname" />
      </li>
     {{pref[0]}}
      
    </div>
  </main>
</template>
