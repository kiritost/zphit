<template>
  <div class="cartControl">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <span class="inner iconfont icon-jian"></span>
      </div>
    <span class="cart-count" v-show="food.count > 0 ">
      {{food.count}}
    </span>
    <span class="iconfont icon-add cart-add" @click.stop.prevent="addCart($event)"></span>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
<style>
  @import "../css/iconfont.css";
</style>
<style>
  .cartControl {
    font-size: 0;
  }
  .cartControl .cart-add, .cartControl .cart-decrease {
    display: inline-block;
  }
  .cartControl .cart-decrease {
    padding: 6px;
  }
  .cartControl .cart-add {
    padding: 6px;
    font-size: 24px;
    color: #00a0dc;
  }
  .cartControl .cart-add .inner, .cartControl .cart-decrease .inner {
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    vertical-align: top;
    color: #00a0dc;
  }
  .cartControl .cart-add, .cartControl .cart-count {
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
  }
  .cartControl .cart-count {
    font-size: 10px;
    width: 12px;
    padding-top: 6px;
    text-align: center;
    color: #93999f;
  }
</style>
