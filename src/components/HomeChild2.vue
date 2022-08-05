<script setup>
  import { ref,watch } from "vue";
  import axios from 'axios';
  //import Plotly from "plotly.js-dist-min";
  const prefname=defineProps(["prefname"]);
  let done=ref(false);
  const pram=ref([]);
  let fetchPramNum=ref([]);
  let fetchYear=ref([]);
  
  let trace= {
  x: fetchYear.value,
  y: fetchPramNum.value,
  name:prefname.prefname.prefName
  //name:を使うならprefname.prefname.prefNameを変数に代入して変数.valueで使うと行けるはず
  };
  
  let emit = defineEmits(['trace2','done'])
  const someExample = () => {
    if(done.value==true){
        axios
          .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefname.prefname.prefCode}`,
          {
            headers: { "X-API-KEY": "ODdVRSfsLTyX8SI7nhM5JE6ZqfDcgKsDLBz3MQOA" },})
          .then(response => (
            pram.value = response.data.result.data[0].data//data.value=response.data.result
            ,pram.value.forEach((element) => {//.then(response => results.value = response.data)
              if(fetchPramNum.value.length<18){
                fetchPramNum.value.push(element.value);
              }
              })
            
            ,pram.value.forEach((element) => {//.then(response => results.value = response.data)
              if(fetchYear.value.length<18){
              fetchYear.value.push(element.year);//.push()
              }})
          ));
        //Plotly.newPlot('myDiv', data.value)
        //emit('done',done)
        emit('trace2',[trace,done])//trace
        console.log("trueを親コンポーネントに送りました");
    }else{
        
        emit('trace2',[trace,done])
        console.log("falseを親コンポーネントに送りました");
    }
  }
  
  watch(done, () => someExample());
  //<span>{{prefname.prefname.prefCode}}</span><span >{{prefname.prefname.prefName}}</span>
</script>

<template>
        <label>
          <span>{{prefname.prefname.prefCode}}</span>
          <input type="checkbox" v-model="done">
          <span >{{prefname.prefname.prefName}}</span>
        </label>
        
</template>