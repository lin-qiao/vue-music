<template >
  <div class="song-list">
    <div class="header">
      <div class="search-bank" @click="bank()"></div>
    </div>
    <div class="song-list-warp" v-if="songList">
      <div class="song-list-ban">
        <img :src="songList.topinfo.pic_h5" alt="">
        <div class="song-list-info">
          <div class="song-list-title">{{songList.topinfo.ListName}}</div>
          <div class="song-list-time">{{songList.date}}</div>
        </div>
      </div>
      <ul class="song-list-con">
        <li class="song-list-box" v-for ="(item,index) in songList.songlist" @click="play(index)">
          <div class="song-box-index">{{index+1}}</div>
          <div class="song-box-info">
            <p class="song-box-title">{{item.data.songname}}</p>
            <p class="song-box-name">{{item.data.singer[0].name}}-{{item.data.albumname}}</p>
          </div>
          <div class="song-box-but">
            <i></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'

export default {
  name: 'SongList',
  data () {
    return{
      songList:null
    }
  },
  computed:{
    ...mapState([])
  },
  mounted(){
    this.$store.state.isShowSearch = false;
    this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',{
      params: {
        topid: this.$route.query.id,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }).then(function (response) {
      this.songList = response.data;
    })

  },
  methods:{
    play(i){
      let song = this.songList.songlist[i].data;
      this.$store.state.song = {'id':song.songid,'mid':song.songmid,'name':song.songname,'singer':song.singer[0].name,'albumid':song.albumid};
      this.$store.commit('setPlaylist')
      this.$store.state.isShowAudio = true;
      this.$store.state.isShowAudioNav = true;
    },
    bank(){
      this.$store.state.isShowSearch = true;
      this.$router.push('/');
    }
  }
}
</script>

<style>
.song-list{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  padding-bottom: 1.56rem;
}
/*header start*/
.song-list .header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1.29rem;
  padding: 0 0.24rem;
  z-index: 99;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.song-list .header .search-bank{
  width: 0.61rem;
  height: 0.61rem;
  background: url(../assets/image/icon-back.png) no-repeat;
  background-size: 100%;
}
/*header end*/
/*song-list start*/
.song-list-warp{
  padding-bottom: 0.24rem;
}
.song-list-ban{
  width: 100%;
  position: relative;
}
.song-list-ban img{
  width: 100%;
}
.song-list-ban .song-list-info{
  background: rgba(0,0,0,.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  padding: 0.29rem 0.44rem;
}
.song-list-title{
  font-size: 0.44rem;
  color: #fff;
  line-height: 1.5;
}
.song-list-time{
  font-size: 0.29rem;
  color: #fff;
  line-height: 1.5;
}
/*song-list end*/
/*song-list-box start*/
.song-list-box{
  padding: 0.24rem 0.37rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  background: url(../assets/image/count-box-border.png) no-repeat bottom;
  background-size: 100% auto;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.song-box-index{
  font-size: 0.34rem;
  color: #fff;
  padding-right: 0.24rem;
}
.song-box-info{
  -o-flex: 1;
  -moz-flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.song-box-title{
  font-size: 0.34rem;
  margin-bottom: 0.12rem;
  color: #fff;
}
.song-box-name{
  font-size: 0.29rem;
  color: #c2c8d2;
}
.song-box-but{
  height: 0.85rem;
  width: 0.85rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
.song-box-but i{
  background: url(../assets/image/icon-ellipses.png) no-repeat;
  background-size: 100% 100%;
  width: 0.67rem;
  height: 0.17rem;
}
/*song-list-box end*/
</style>
