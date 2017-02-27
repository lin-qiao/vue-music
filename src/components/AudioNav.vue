<template>
  <div class="audio-nav-warp" @click="ShowAudio()">
    <div class="audio-nav-name">
      <p class="song-name">{{song.name}}</p>
      <p class="singer-name">{{song.singer}}</p>
    </div>
    <div class="audio-nav-btn">
      <span class="audio-nav-pre"></span>
      <span :class="isPlayIng ? 'audio-nav-player' : 'audio-nav-pause'" @click="playOrPause"></span>
      <span class="audio-nav-next"></span>
    </div>
    <div class="audio-nav-progress">
      <div class="audio-progress-box" :style="{width:progressWidth}"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  name: 'AudioNav',
  data () {
    return {

    }
  },
  computed:{
    ...mapState([
      'song','progressWidth','isPlayIng'
    ])
  },
  methods:{
    ShowAudio(){
      this.$store.state.isShowAudio = true;
    },
     ...mapMutations([
       'playOrPause'
     ])
  }
}
</script>


<style>
.audio-nav-warp{
  height: 52px;
  width: 100%;
  border-top: 1px solid hsla(0,0%,100%,.4);
  background: url(../assets/image/body-bg.7f43813.jpg) no-repeat 50%;
  background-size: 100% auto;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
}
/*audio-nav-name-start*/
.audio-nav-name{
  padding-left: 10px;
  flex:1;
  overflow: hidden;
}
.audio-nav-name .song-name{
  font-size: 14px;
  line-height: 1.5;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.audio-nav-name .singer-name{
  font-size: 12px;
  line-height: 1.5;
  color: #c2c8d2;
}
/*audio-nav-name-end*/
/*audio-nav-btn-start*/
.audio-nav-btn{
  width: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.audio-nav-btn span{
  width: 21.6px;
  height: 27.6px;
}
/*audio-nav-btn-end*/
/*audio-nav-progress-start*/
.audio-nav-progress{
  height: 2px;
  background: hsla(0,0%,100%,.5);
  position: absolute;
  left: 52px;
  right: 0;
  bottom: 0;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.audio-nav-progress .audio-progress-box{
  height: 2px;
  background: #fff;
  transition: width .2s;
}
/*audio-nav-progress-end*/
</style>
