<template>
  <div class="food">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(items, index) in foods" class="menu-item" @click="selectMenu(index,$event)" :class="{'current':currentIndex === index}">
          <span class="text">{{items.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(items,index) in foods" class="food-list food-list-hook">
          <h1 class="title">{{items.name}}</h1>
          <ul>
            <li v-for="item in items.foods" class="food-item" @click="selectFood(item,$event)">
              <div class="icon">
                <img :src="item.image" alt width="57">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.description}}</p>
              <div class="extra">
                <span class="count">月售{{item.sellCount}}</span>
                  <span class="count">好评{{item.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">¥{{item.price}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food="item"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopCart"></shopCart>
      <afood :food="selectedFood" ref="food"></afood>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import data from '../common/json/data.json';
import shopCart from '../components/shopCart.vue'
import cartControl from '../components/cartControl.vue'
import afood from '../components/food.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      foods: [],
      listHeight: [], //每个li的尾端的位置
      scrolly: 0,
      selectedFood: {}
    };
  },
  created() {
    this.foods = data.goods;
    this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i;
          }
        }
        return 0;
    },
    selectFoods() {
      let goods = [];
      this.foods.forEach((food) => {
        food.foods.forEach((food) => {
          if (food.count) {
            goods.push(food);
          }
        });
      });
      return goods;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrolly = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  components: {
    shopCart,
    cartControl,
    afood
  }
}
</script>

<style>
  ul,h1{
    margin: 0;
    padding: 0;
  }
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .food {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }
  .food .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .food .menu-wrapper .menu-item {
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }
  .food .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    position: relative;
    font-size: 12px;
  }
  .food .menu-wrapper .menu-item.current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }
  .good .menu-wrapper .menu-item.current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;
  }
  .food .foods-wrapper {
    flex: 1;
  }
  .food .foods-wrapper .food-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: #93999f;
    background: #f3f5f7;
  }
  .food .foods-wrapper .food-list .food-item {
    display: flex;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 18px;
    position: relative;
  }
  .food .foods-wrapper .food-list .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .food .foods-wrapper .food-list .food-item .content {
    flex: 1;
  }
  .food .foods-wrapper .food-list .food-item .content .name {
    margin: 2px 0 8px;
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    color: #07111b;
  }
  .food .foods-wrapper .food-list .food-item .content .desc {
    margin-bottom: 8px;
  }
  .food .foods-wrapper .food-list .food-item .content .extra,
  .food .foods-wrapper .food-list .food-item .content .desc {
    font-size: 10px;
    line-height: 10px;
    color: #93999f;
  }
  .food .foods-wrapper .food-list .food-item .content .extra .count {
    margin-right: 12px;
  }
  .food .foods-wrapper .food-list .food-item .content .price {
    margin-right: 8px;
    font-size: 14px;
    color: #f01414;
    line-height: 24px;
    font-weight: 700px;
  }
  .food .foods-wrapper .food-list .food-item .content .cartControl-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
}
</style>

