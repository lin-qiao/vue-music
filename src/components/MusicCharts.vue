<template>
  <div class="music-charts">
    <div class="music-charts-warp">
      <router-link  v-for="item in list"  :to="{path:'/song-list',query: {id:item.id}}" >
        <div class="music-charts-item">
          <div class="music-charts-img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="music-charts-list">
            <div class="music-charts-title">{{item.topTitle}}</div>
            <div class="music-charts-box" v-for="(v,i) in item.songList">
              <p class="music-charts-info">
                <span class="song-index">{{i+1}}</span>
                <span class="song-name">{{v.songname}}</span>
                <span class="singer-name">{{v.singername}}</span>
              </p>
            </div>
            <div class="song-list-amount">
              <i class="wyl-icon"></i>
              <p class="amount-num">{{item.listenCount | listenCount}}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters, mapState} from 'vuex'

export default {
  name: 'MusicCharts',
  data () {
    return{
      list:null
    }
  },
  computed:{
    ...mapState([])
  },
  mounted(){
    this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',{
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }).then(function (response) {
      this.list = response.data.data.topList;
    })
  },
  methods:{

  },
  filters:{
    listenCount: num => {
      return Math.round(num / 1000) / 10 + '万'
    }
  }
}
</script>

<style>
.music-charts{
  position: absolute;
  top:1.29rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}
.music-charts-item{
  margin-bottom: 0.24rem;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  background: hsla(0,0%,100%,.1);
  overflow: hidden;
  position: relative;
}
/*music-chart-img start*/
.music-charts-img{
  width: 3.41rem;
  height: 3.41rem;
}
.music-charts-img img{
  width: 100%;
}
/*music-charts-img end*/
/*music-charts-list start*/
.music-charts-list{
  height: 2.8rem;
  padding: 0.29rem;
  -o-flex: 1;
  -moz-flex: 1;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
}
.music-charts-title{
  color: #fff;
  font-size: 0.37rem;
  padding-bottom: 0.12rem;
}
.music-charts-box{
  padding: 0.12rem 0;
  color: #fff;
  font-size: 0.29rem;
}
.music-charts-info{
  width: 100%;
  font-size: 0.29rem;
  color: #fff;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 0.29rem;
}
.music-charts-box .song-index{
  color: #c2c8d3;
  margin-right: 0.29rem;
  line-height: 0.29rem;

}
.music-charts-box .singer-name{
  margin-left: 0.29rem;
  color: #c2c8d2;
  line-height: 0.29rem;
}
.song-list-amount{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  margin-top: 0.23rem;
}
.song-list-amount i{
  width: 0.26rem;
  height: 0.35rem;
  background: url(../assets/image/icon-song-listenCount.png) no-repeat;
  background-size: 100%;
  opacity: .7;
}
.song-list-amount .amount-num{
  font-size: 0.29rem;
  color: #fff;
  line-height: 0.29rem;
  margin-left: 0.23rem;
}
/*music-charts-list end*/
.music-charts-item::after{
  content: "";
  position: absolute;
  right: 0.15rem;
  width: 0.34rem;
  height: 0.61rem;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  background: url(../assets/image/icon--chevron-right.png) no-repeat;
  background-size: 100% 100%;
}

</style>
