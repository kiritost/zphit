<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"> <router-link to="/foods">商品</router-link> </div>
      <div class="tab-item"> <router-link to="/ratings">评论</router-link> </div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link> </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header.vue';
import data from './common/json/data.json';
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.seller = data.seller;
  },
  components: {
    'v-header': header
  }
}
</script>

<style>
  a {
    color: #4d555d;
    text-decoration: none;
  }
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab .tab-item {
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a {
    display: block;
    font-size: 14px;
  }
  .tab .tab-item .active {
    color: #f01414;
}
</style>
