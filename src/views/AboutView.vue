<script setup>
  import HomeChild2Vue from '../components/HomeChild2.vue';
  import axios from 'axios';
  import Plotly from "plotly.js-dist-min";
  import { onMounted } from 'vue' //reactive, watch
  import { ref } from "vue";

  const pref=ref([]);
  let master_data=ref([]);//plotするデータ配列
  let cl=[];//ref([])県名の配列
  let hensuu="";
  let cl2="";//消す県名
  let Num=0;//消す県名が配列のどこにあるか(index)

  onMounted(async() => {
    await axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {headers: { "X-API-KEY": "ODdVRSfsLTyX8SI7nhM5JE6ZqfDcgKsDLBz3MQOA" },}).then(response => (pref.value=response.data.result));
  })
    
    let  someExample24 = (msg)=>{
            if(true!=hensuu.includes(msg[0].name)){//県名配列に入れようとしている県名があるかどうか
              master_data.value.push(msg[0])//描画したい県の人口構成データを配列に追加        ここを関数化してawaitを使いたい
              cl.push(msg[0].name)//県名を配列に追加
              hensuu=cl.toString();//県名配列を文字列に変換
              //Plotly.newPlot('myDiv', master_data.value)
            }
            if(msg[1].value==true){//チェックボックスにチェックがついているか
              Plotly.newPlot('myDiv', master_data.value)//ついている場合          現状awaitが実装できていないためグラフが表示できない
            }else{//ついていない場合
              cl2=msg[0].name//県名を文字列に代入
              Num=cl.indexOf(cl2)//県名配列の中で目的の県名がどこに入っているか検索 indexを変数に代入
              cl.splice(Num,1)//県名配列からindexをもとに県名を削除
              master_data.value.splice(Num,1)//人口構成データ配列もindexをもとにデータを削除
              Plotly.newPlot('myDiv', master_data.value)//変更したデータをもとにグラフを描画
            }
            }
</script>



<template>
    <div>
      <li v-for="prefname in pref" :key="prefname">
          <HomeChild2Vue :prefname="prefname" @trace2="someExample24" />      
      </li>
      
      <div id='myDiv'></div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
