<template>
  <div v-show="showFlag" class="afood" ref="afood">
    <div class="fond-content">
      <div class="image-header">
        <img :src="food.image" alt="">
        <div class="back" @click="hide">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
      </div>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingSelect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px"
                v-for="rating in food.ratings">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <i class="iconfont" :class="{'icon-zan':rating.rateType === 0,'icon-cai':rating.rateType === 1}"></i>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import ratingSelect from '../components/ratingSelect.vue'
import {formatDate} from '../common/js/date';
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: 2,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
    },
    hide() {
      this.showFlag = false;
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === 2) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    ratingSelect
  }
}
</script>
<style>
  .afood {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
  }
  .afood .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .afood .image-header .back {
    position: absolute;
    top: 10px;
    left: 0;
    height: 25px;
    width: 25px;
  }
  .afood .content {
    position: relative;
    padding: 18px;
  }
  .afood .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #07111b;
  }
  .afood .image-header img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .afood .rating {
    padding-top: 18px;
  }
  .afood .rating .title {
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: #07111b;
  }
  .afood .rating .rating-wrapper {
    padding: 0 18px;
  }
  .afood .rating .rating-wrapper .rating-item {
    padding: 16px 0;
    position: relative;
  }
  .afood .rating .rating-wrapper .rating-item .user {
    position: absolute;
    right: 0;
    top: 16px;
    font-size: 0;
    line-height: 12px;
  }
  .afood .rating .rating-wrapper .rating-item .user .name {
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: #93999f;
    margin-right: 6px;
  }
  .afood .rating .rating-wrapper .rating-item .user .avatar {
    border-radius: 50%;
  }
  .afood .rating .rating-wrapper .rating-item .time {
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: #93999f;
  }
  .afood .rating .rating-wrapper .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: #07111b;
  }
  .food .rating .rating-wrapper .rating-item .text .icon-zan {
    color: #00a0dc;
  }
  .food .rating .rating-wrapper .rating-item .text .icon-cai {
    color: #93999f;
  }
</style>
