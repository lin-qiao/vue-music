<template>
  <div class="play-list">
    <div class="header play-list-hd">
      <div class="search-bank" @click ="bank()">
        <i class="wyl-icon"></i>
      </div>
      <div class="play-list-title">播放列表</div>
    </div>
    <div class="play-list-warp">
      <ul>
        <li class="play-list-box" v-for="(v,i) in playList">
          <div class="play-list-index">{{i+1}}</div>
          <div class="play-list-info" @click="play(v,i)">
            <p class="song-box-title">{{v.name}}</p>
            <p class="song-box-name">{{v.singer}}</p>
          </div>
          <div class="play-list-btn" @click="delSong($event,i)">
            <span class="wyl-icon"></span>
            <div class="del-song">
              <div class="del-song-warp">
                <div class="play-list-info">
                  <p class="song-box-title">{{v.name}}</p>
                  <p class="song-box-name">{{v.singer}}</p>
                </div>
                <div class="del-song-box">从播放列表中删除</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  name: 'PlayList',
  data () {
    return {

    }
  },
  computed:{
    ...mapState([
      'playList'
    ])
  },
  mounted(){

  },
  methods:{
    delSong(e,index){
      if(this.playList.length<=1){return}
      let box =document.getElementsByClassName('play-list-box')[index];
      let el = box.querySelector('.del-song');
      el.style.display = 'block';

      if(e.target == el){
        el.style.display = 'none';
      }else if(e.target == box.querySelector('.del-song-box')){
        for(let i in this.playList){
          if(i == index){
            this.$store.state.playList.splice(i,1);
          }
        }
        localStorage.playList = JSON.stringify(this.playList);
        el.style.display = 'none';
        this.$store.commit('playNext')
      }
    },
    bank(){
      this.$store.state.isShowPlayList = false;
    },
    play(v,i){
      this.$store.state.song = v;
      this.$store.state.index = i;
      this.$store.state.isShowPlayList = false;
    },
  }
}
</script>


<style>
.play-list{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(../assets/image/body-bg.7f43813.jpg) no-repeat 100%;
  background-attachment: fixed;
  background-size: 100% 100%;
  z-index: 999;
  padding-bottom: 1.56rem;
  font-family: PingFangSC,Helvetica Neue,Helvetica,Arial,sans-serif;
}
/*header start*/
.play-list-hd{
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
  padding: 0 0.24rem;
  box-sizing: border-box;
}
.search-bank{
  margin-right: 0.49rem;
  line-height: 1.29rem;
}
.search-bank i{
  width: 0.61rem;
  height: 0.61rem;
  background: url(../assets/image/icon-back.png) no-repeat;
  background-size: 100%;
}
.play-list-title{
  margin-right: 1.02rem;
  -webkit-box-flex:1;
      -ms-flex:1;
          flex:1;
  font-size: 0.39rem;
  color: #fff;
  text-align: center;
}
/*header end*/
/*play-list-warp-start*/
.play-list-warp{
  padding: 1.27rem 0.44rem;
  box-sizing: border-box;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}
.play-list-box{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: fow;
          flex-direction: fow;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 0.24rem 0.37rem;
  background: url(../assets/image/count-box-border.png) no-repeat bottom;
  background-size: 100% auto;
}
.play-list-box .play-list-index{
  font-size: 0.34rem;
  color: #fff;
  padding-right: 0.24rem;
}
.play-list-box .play-list-info{
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
.play-list-box .play-list-btn{
  width: 0.85rem;
  height: 0.85rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.play-list-btn span{
  width: 0.67rem;
  height: 0.17rem;
  background: url(../assets/image/icon-ellipses.png) no-repeat;
  background-size: 100%;
}
.play-list-btn .del-song{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.6);
  display: none;
}
.del-song .del-song-warp{
  position: absolute;
  left: 0;
  bottom: 0;
  min-height: 4.39rem;
  width: 100%;
  background: url(../assets/image/body-bg.7f43813.jpg) no-repeat top;
  background-size: 100% auto;
}
.del-song .play-list-info{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  padding: 0.41rem;
  box-sizing: border-box;
  background: url(../assets/image/count-box-border.png) no-repeat bottom;
  background-size: 100% auto;
}
.del-song .song-box-name{
  font-size: 0.34rem;
  margin-top: 0.29rem;
}
.del-song .del-song-box{
  padding: 0.41rem;
  color: #fff;
  font-size: 0.34rem;
  text-align: center;
  background: url(../assets/image/count-box-border.png) no-repeat bottom;
  background-size: 100% auto;
}
/*play-list-warp-end*/
</style>
