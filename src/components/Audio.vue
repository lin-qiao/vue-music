<template>
  <div class="audio-warp">
    <div class="audio-header">
      <div class="audio-bank">
        <span class="wyl-icon" @click="bank()"></span>
      </div>
      <div class="audio-title">
        <span class="song-name">{{song.name}}</span>
        <span class="singer-name">{{song.singer}}</span>
      </div>
    </div>
    <div class="audio-box">
      <audio :src="songUrl" id="music" :autoplay="isPlayIng" @timeupdate="updateTime()" @ended="playNext"></audio>
      <div class="audio-box-img">
        <img :src="albumidURL" alt="">
      </div>
      <div class="audio-progress-warp">
        <div class="audio-progress" @click="updatePlay($event)">
          <div class="audio-progress-box" :style="{width:progressWidth}">
            <div class="audio-progress-bar">
            </div>
          </div>
        </div>
        <div class="audio-progress-time">
          <span>{{updateCurrentTime}}</span><span>{{updateDuration}}</span>
        </div>
      </div>
    </div>
    <div class="audio-lyric" :get-lyric="BaseLyric">
      <div class="audio-lyric-warp">
        <p class="lyric-item" v-for="v in lyric">{{v.content}}</p>
      </div>
    </div>
    <div class="audio-nav">
      <div class="audio-nav-button">
        <div class="audio-play-order">
          <span class="wyl-icon icon-retweet"></span>
        </div>
        <div class="audio-nav-handle">
          <span class="audio-nav-pre" @click="playPre"></span>
          <span :class="isPlayIng? 'audio-nav-player': 'audio-nav-pause'" @click="playOrPause"></span>
          <span class="audio-nav-next" @click="playNext"></span>
        </div>
        <div class="audio-player-list">
          <span class="wyl-icon audio-player-btn" @click="playList()"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Base64 from '../assets/js/base64.js'
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  name: 'Audio',
  data () {
    return {
      'PW' : 0
    }
  },
  computed: {
    ...mapState([
      'song','isPlayIng','duration','currentTime','updateDuration','updateCurrentTime','progressWidth','lyric','isLyric','isShowPlayList'
    ]),
    ...mapState({
      songUrl(state){
        if(state.song.id == null){return}
        this.isId = state.song.id;
        this.$store.commit('playing');
        return 'http://ws.stream.qqmusic.qq.com//' + this.isId + '.m4a?fromtag=46'
      },
      BaseLyric(state){
        this.$http.jsonp('https://api.darlin.me/music/lyric/' + state.song.id,{
          jsonp:'callback'
        }).then(function (response) {
          this.$store.state.lyric =  Base64
          .decode(response.data.lyric)
          .split('[')
          .slice(6)
          .map(str =>{
            return {'time':str.substring(0,5),'content':str.substring(9)};
          });
          this.$store.state.isLyric = true;
        })
      },
      albumidURL(state){
        if(state.song.albumid == null){return}
        return 'http://imgcache.qq.com/music/photo/album_500/'+state.song.albumid % 100+'/500_albumpic_'+state.song.albumid+'_0.jpg';
      }
    })
  },
  methods:{
    updateTime(){
      this.$store.commit('updateDuration',document.getElementById('music').duration);
      this.$store.commit('updateCurrentTime',document.getElementById('music').currentTime);
      this.$store.commit('updateProgressWidth');
      this.lyricTime();
    },
    updatePlay(e){
      if(this.PW === 0){
        this.PW = e.toElement.offsetWidth;
      }
      this.$store.commit('updateCurrentTime',e.offsetX / this.PW * this.duration);
      document.getElementById('music').currentTime = this.currentTime;
      e.preventDefault();
      e.stopPropagation();
    },
    lyricTime(){
      if(!this.$store.state.isLyric){
        return
      }
      let dataTime
      for(let data in this.$store.state.lyric){
        dataTime = this.$store.state.lyric[data].time.split(':');
        dataTime = parseInt(dataTime[0] * 60) + parseInt(dataTime[1]);
        let el = document.getElementsByClassName('lyric-item')[data];
        if(dataTime == this.currentTime){
          if(document.getElementsByClassName('cur')[0]){
            document.getElementsByClassName('cur')[0].className = 'lyric-item';
          }
          if(data > 2){
            document.getElementsByClassName('audio-lyric').scrollTop =
             document.getElementsByClassName('lyric-item')[data].offsetHeight * (data - 1) +'px';
          }
            el.className = 'lyric-item cur';
        }
      }
    },
    bank(){
      this.$store.state.isShowAudio = false
    },
    playList(){
      this.$store.state.isShowPlayList = true;
    },
    ...mapMutations([
      'playOrPause','playNext','playPre'
    ])
  },
  watch:{

  }
}
</script>


<style>
.audio-warp{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url(../assets/image/body-bg.7f43813.jpg) no-repeat 100%;
  background-attachment: fixed;
  background-size: 100% 100%;
}
/*auido-header-start*/
.audio-header{
  background: rgba(0,0,0,.1);
  height: 1.29rem;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  padding: 0 0.24rem;
  z-index: 999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.audio-bank{
  margin-right: 0.49rem;
  line-height: 1.29rem;
}
.audio-bank span{
  width: 0.61rem;
  height: 0.61rem;
  background: url(../assets/image/icon-back.png) no-repeat;
  background-size: 100%;
}
.audio-title{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  margin-right: 1.02rem;
  -o-flex: 1;
  -moz-flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  overflow: hidden;
}
.audio-title span{
  text-align: center;
}
.audio-title .song-name{
  font-size: 0.39rem;
  color: #fff;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 0.29rem;
  max-width: 4.88rem;
}
.audio-title .singer-name{
  font-size: 0.39rem;
  color: #c2c8d2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/*audio-header-end*/
/*audio-box-start*/
.audio-box{
  height: 4.88rem;
  position: relative;
  overflow: hidden;
}
.audio-box-img img{
  width: 100%;
}
.audio-progress-warp{
  position: absolute;
  bottom: 0.29rem;
  left: 0.44rem;
  right: 0.44rem;
}
.audio-progress-warp .audio-progress{
  width: 100%;
  height: 4px;
  background: hsla(0,0%,100%,.5);
  border-radius: 2px;
}
.audio-progress .audio-progress-box{
  width: 0%;
  height: 4px;
  border-radius: 2px;
  background: #fff;
  position: relative;
  transition: width .2s;
}
.audio-progress-box .audio-progress-bar{
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top:-3px;
  right: 0;
  box-shadow: 0 0 5px 0 #7d7d7d;
}
.audio-progress-time{
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.audio-progress-time span{
  font-size: 12px;
  color: #fff;
  font-family: "微软雅黑";
}
/*audio-box-end*/
.audio-lyric{
  padding-top: 10px;
  -o-flex: 1;
  -moz-flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  -moz-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -ms-align-content: center;
  -o-align-content: center;
  -ms-flex-line-pack: center;
      align-content: center;
  overflow-y: scroll;

}
.lyric-item{
  text-align: center;
  font-size: 14px;
  color: #fff;
  opacity: .6;
  line-height: 2em;
  -webkit-transition: all .1s;
  transition: all .1s;
}
.lyric-item.cur{
  opacity: 1;
}
/*audio-nav-start*/
.audio-nav{
  z-index: 10;
  padding: 0.29rem 0.88rem;
  margin-bottom: 0.59rem;
}
.audio-nav-button{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.audio-nav-button .audio-play-order{

}
.audio-play-order span,.audio-player-list span{
  display: block;
  width: 0.52rem;
  height: 0.38rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.audio-play-order span.icon-exchange{
  background-image: url(../assets/image/icon-exchange.png);
}
.audio-play-order span.icon-retweet{
  background-image: url(../assets/image/icon-retweet.png)
}
.audio-play-order span.icon-random{
  background-image: url(../assets/image/icon-random.png)
}
.audio-player-list span{
  background-image: url(../assets/image/icon-meng.png)
}
.audio-nav-handle{
  display: flex;
  justify-content: space-between;
  width: 4.39rem;
}
.audio-nav-pre,.audio-nav-next{
  width: 0.73rem;
  height: 0.88rem;
  background-repeat: no-repeat;
  background-size: 100%;
}
.audio-nav-pre{
  background-image: url(../assets/image/icon-step-backward.png);
}
.audio-nav-next{
  background-image: url(../assets/image/icon-icon-step-forward.png);
}
.audio-nav-player{
  width: 0.73rem;
  height: 0.88rem;
  background:url(../assets/image/icon-playing.png) no-repeat;
  background-size: auto 100%;
}
.audio-nav-pause{
  width: 0.73rem;
  height: 0.88rem;
  background:url(../assets/image/icon-pauseClass.png) no-repeat;
  background-size: auto 100%;
}
/*audio-nav-end*/
</style>
