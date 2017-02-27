<template>
  <div id="app">
    <search v-if="isShowSearch"></search>

    <router-view></router-view>
    <audio-box v-show="isShowAudio"></audio-box>
    <audio-nav v-if="isShowAudioNav"></audio-nav>
    <play-list v-if="isShowPlayList"></play-list>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters, mapState} from 'vuex'
import Search from './components/search'
import AudioNav from './components/AudioNav'
import AudioBox from './components/Audio'
import PlayList from './components/PlayList'

export default {
  name: 'app',
  data () {
    return{
    }
  },
  computed:{
    ...mapState(['isShowSearch','isShowAudio','isShowAudioNav','isShowPlayList'])
  },
  components:{
    Search,AudioNav,AudioBox,PlayList
  },
  methods:{

  }
}
</script>

<style>

</style>
