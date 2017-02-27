import Vue from 'vue'
import Vuex from 'vuex'
import Base64 from '../assets/js/base64.js'
/* vuex */

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    song:{
      'id':null,
      'mid':null,
      'name':null,
      'singer':null
    },
    playList:[],
    index:-1,
    isPlayIng:false,
    isShowSearch:true,
    isShowAudio:false,
    isShowPlayList:false,
    isShowAudioNav:false,
    duration:0,
    currentTime:0,
    updateDuration:null,
    updateCurrentTime:null,
    progressWidth:0,
    lyric:null,
    isLyric:false,
  },
  mutations: {
    playing(state){
      if(state.song != null){
        state.isPlayIng = true;
      }
    },
    updateDuration(state,time){
      state.duration = parseInt(time);
      var minute = Math.floor(state.duration / 60);
      var second = state.duration % 60 < 10 ? '0' + state.duration % 60 : state.duration % 60;
      state.updateDuration = minute +':'+ second;
    },
    updateCurrentTime(state,time){
      state.currentTime = parseInt(time);
      var minute = Math.floor(state.currentTime / 60);
      var second = state.currentTime % 60 < 10 ? '0' + state.currentTime % 60 : state.currentTime % 60;
      state.updateCurrentTime = minute +':'+ second;
    },
    updateProgressWidth(state){
      state.progressWidth = state.currentTime / state.duration * 100 + '%';
    },
    playOrPause(state){
      if(state.isPlayIng){
        document.getElementById('music').pause();
      }else{
        document.getElementById('music').play();
      }
      state.isPlayIng = !state.isPlayIng;
    },
    setPlaylist(state){
      if(localStorage.playList){
        state.playList = JSON.parse(localStorage.playList);
      }
      state.playList.push(state.song)
      localStorage.playList = JSON.stringify(state.playList);
    },
    playPre(state){
      if(state.index <= 0  ){
        state.index = state.playList.length;
      }
      state.index -= 1;
      state.song = state.playList[state.index];
    },
    playNext(state){
      if(state.index >= state.playList.length - 1 ){
        state.index = -1;
      }
      state.index += 1;
      state.song = state.playList[state.index];
    }
  }
})
