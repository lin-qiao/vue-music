<template>
  <div class="search-wrap">
    <div class="header">
      <div class="search-back" v-if = "isShowBack" @click="back()">
        <i class="wyl-icon">
          <img src="../assets/image/icon-back.png" alt="">
        </i>
      </div>
      <div class="search-menu" v-if = "!isShowBack">
        <i class="wyl-icon">
          <img src="../assets/image/icon-menuH.png" alt="">
        </i>
      </div>
      <div class="search-input" @click="search(searchInfo)">
        <input type="text" placeholder="搜索 歌曲/专辑/歌手" class="wyl-input" v-model="searchInfo">
      </div>
      <div class="search-button" @click="search(searchInfo)">
        <i class="wyl-icon">
          <img src="../assets/image/icon-search.png" alt="">
        </i>
      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUp fast" leave-active-class="animated fadeOutDown">
      <div class="search-list" v-if = "isSearchList">
        <div class="serch-list-song" v-if = "searchList.song">
          <div class="search-list-title" v-text = "searchList.song.name"></div>
          <div class="search-list-box" v-for = "(v,i) in searchList.song.itemlist" @click="play(v)">
            <span class="search-list-index" v-text = "i + 1"></span>
            <span class="search-list-name" v-text = "v.name"></span>
            <span class="search-list-singer" v-text = "v.singer"></span>
          </div>
        </div>
        <div class="search-list-singer" v-if="searchList.singer">
          <div class="search-list-title" v-text = "searchList.singer.name"></div>
          <div class="search-list-box" v-for = "v in searchList.singer.itemlist">
            <span class="search-list-pic">
              <img :src="v.pic" alt="">
            </span>
            <span class="search-list-name" v-text = "v.name"></span>
          </div>
        </div>
        <div class="search-list-album" v-if="searchList.album">
          <div class="search-list-title" v-text = "searchList.album.name"></div>
          <div class="search-list-box" v-for = "v in searchList.album.itemlist">
            <span class="search-list-pic">
              <img :src="v.pic" alt="">
            </span>
            <span class="search-list-name" v-text = "v.name"></span>
            <span class="search-list-singer" v-text ="v.singer"></span>
          </div>
        </div>
        <div class="search-list-mv" v-if="searchList.mv">
          <div class="search-list-title" v-text="searchList.mv.name"></div>
          <div class="search-list-box" v-for="(v,i) in searchList.mv.itemlist">
            <span class="search-list-index" v-text = "i + 1"></span>
            <span class="search-list-name" v-text = "v.name"></span>
            <span class="search-list-singer" v-text = "v.singer"></span>
          </div>
        </div>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeInUp fast" leave-active-class="animated fadeOutDown">
      <div class="search-hot" v-if="isSearchHot">
        <div class="search-hot-box" v-for="(item,index) in searchHot" @click="search(item.k)">
          <p>
            <span class="search-hot-index" v-text = "index + 1"></span>
            <span class="search-hot-name" v-text = "item.k"></span>
            <span class="search-hot-heat" v-text = "item.n"></span>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      searchHot:'',
      searchList:'',
      isSearchHot:false,
      isShowBack:false,
      isSearchList:false,
      searchInfo:''
    }
  },
  computed:{
    ...mapState(['song','isShowSearch','isShowAudio'])
  },
  methods:{
    search(value){
      if(value== ""){
        this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',{
          params:{
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'jsonp',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp:'jsonpCallback'
        }).then((response) => {
          this.searchHot = response.data.data.hotkey
          this.isSearchHot = true
          this.isShowBack = true
          this.isSearchList = false
        })
      }else{
        this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
          params: {
            is_xml: 0,
            format: 'jsonp',
            key: value,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
          },
          jsonp: 'jsonpCallback'
        }).then((response) => {
          this.searchList = response.data.data;
          this.isSearchList = true;
          this.isShowBack = true;
          this.isSearchHot = false;
        })
      }
    },
    back(){
      this.isSearchHot = false;
      this.isShowBack = false;
      this.isSearchList = false;
    },
    play(obj){
      this.$store.state.song = {'id':obj.id,'mid':obj.mid,'name':obj.name,'singer':obj.singer};
      this.$store.state.isShowAudio = true;
      this.$store.state.isShowAudioNav = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*header start*/
.search-wrap{
  width: 100%;
  height: 1.29rem;
}
.header{
  width: 100%;
  height: 1.29rem;
  position: fixed;
  z-index: 999;
}

.wyl-icon{
  display: block;
  width: auto;
  height: 0.49rem;
}
.wyl-icon img{
  height: 100%;
}
.header .search-menu,.header .search-back{
  width: 1.37rem;
  padding: 0.39rem 0 0 0.24rem;
  float: left;
  box-sizing: border-box;
}
.header .search-back i{
  width: 0.61rem;
  height: 0.61rem;
}
.header .search-input{
  width: 7.27rem;
  height: 0.83rem;
  float: left;
  margin-top: 0.24rem;
}
.header .search-input .wyl-input{
  width: 100%;
  height: 100%;
  border: 0.02rem solid hsla(0,0%,100%,.1);
  padding: 0.12rem 0.24rem;
  background: hsla(0,0%,100%,.3);
  color: #fff;
  font-size: 0.34rem;
  box-sizing: border-box;
  border-radius: 0.12rem;
}

.header .search-button{
  padding: 0.34rem 0 0 0.5rem;
  float: left;

}
.header .search-button img{
  height: 0.63rem;
}
/*header end*/
/*search-list start*/
.search-list-title{
  height: 0.88rem;
  padding: 0 0.44rem;
  font-size: 0.34rem;
  color: #fff;
  background: hsla(0,0%,100%,.1);
  line-height: 0.88rem;
}
.search-list-pic img{
  width: 0.78rem;
  height: 0.78rem;
}
/*search-list end*/
/*search-hot start*/

.search-hot,.search-list{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;
  padding-bottom: 1.56rem;
  z-index: 11;
  padding-top: 1.29rem;
  background: url(../assets/image/body-bg.7f43813.jpg) no-repeat 100%;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.search-hot-box,.search-list-box{
  padding: 0.44rem;
  background: url(../assets/image/count-box-border.png) no-repeat bottom;
  background-size: 100% auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.search-hot-box span,.search-list-box span{
  font-size: 0.34rem;
  color: #c2c8d2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-hot-box span.search-hot-name,.search-list-box span.search-list-name{
  color: #fff;
  margin: 0 0.29rem;
}

/*search-hot end*/
</style>
