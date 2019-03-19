<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64px" height="64px" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support">
          <span class="icon decrease"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count">
        <span class="count">{{seller.supports.length}}个</span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar" />
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail" @click="hideDetail" transition="fade">
      <div class="detail-wrapper clearFix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <!--
            <star :size="48" :score="seller.score"></star>
            -->
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <!--
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              -->
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="iconfont icon-cha"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
      seller: {
        type: Object
      }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  }
}
</script>
<style>
  html,body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .header {
    position: relative;
    overflow: hidden;
    height: 134px;
    width: 100%;
    color: #fff;
  }
  .header .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .header .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
  }
  .header .content-wrapper .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
  }
  .header .content-wrapper .content .title {
    margin: 2px 0 8px;
  }
  .header .content-wrapper .content .title .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header .content-wrapper .content .support {
    line-height: 12px;
    font-size: 10px;
    font-weight: 100;
    margin: 10px 0 0 0;
  }
  .header .content-wrapper .supports-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    background: rgba(0,0,0,.2);
  }
  .header .content-wrapper .supports-count .count {
    font-size: 10px;
    vertical-align: top;
  }
  .header .bulletin-wrapper {
    position: relative;
    background-color: rgba(7,17,27,.2);
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }
  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);
    height: 100%;
    width: 100%;
  }
  .header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,.8);
    -webkit-backdrop-filter: blur(10px);
  }
  .clearFix {
    display: inline-block;
  }
  .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }
  .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-wrapper .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700px;
  }
  .detail-wrapper .detail-main .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .detail-wrapper .detail-main .title {
    width: 80%;
    display: -ms-flexbox;
    display: flex;
    margin: 28px auto 0;
  }
  .detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 22px auto;
  }
  .detail-wrapper .detail-main .title .line {
    -ms-flex: 1;
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid hsla(0,0%,100%,.2);
  }
  .detail-wrapper .detail-main .title {
    width: 80%;
    display: -ms-flexbox;
    display: flex;
    margin: 28px auto 0;
  }
  .detail-wrapper .detail-main .bulletin {
    width: 80%;
    height: 200px;
    margin: 22px auto;
  }
  .detail-wrapper .detail-main .supports .support-item {
    padding: 0 12px;
    font-size: 0;
    margin-bottom: 12px;
  }
  .detail-wrapper .detail-main .supports .support-item .text {
    line-height: 12px;
    font-size: 12px;
    color: #fff;
  }
  .detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
