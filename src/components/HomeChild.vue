<script>
  export default{
    props:{
        prefname:[]
    },
    data(){
        return{
            done:false,
        }
    },
    //watchで都道府県の人口構成を取得する処理を書く
    watch: {
      count: function(done){
        if(done == true){
          console.log('watchは正常に機能しています。')
        }else{
          console.log('watchは正常に機能していません。')
        }
      }
    }


  }
</script>
<template>
        <label>
          <span>{{prefname.prefCode}}</span>
          <input type="checkbox" v-model="done">
          <span >{{prefname.prefName}}</span>
        </label>
</template>