<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2, $event)" :class="{'active': type === 2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span> </span>
      <span class="block positive" @click="select(0, $event)"
            :class="{'active': type === 0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1, $event)"
            :class="{'active': type === 1}">{{desc.negative}}<span
        class="count">{{nagatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent( $event)" :class="{'on':only}">
      <i class="iconfont icon-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: 2
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '吐槽'
        };
      }
    }
  },
  data () {
    return { 
      only : this.onlyContent,
      type : this.selectType
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0;
      });
    },
    nagatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.type = type;
      this.$emit('increment', 'selectType', type);
    },
    toggleContent (event) {
      if (!event._constructed) {
        return;
      }
      this.only = !this.only;
      this.$emit('increment', 'onlyContent', this.only);
    }
  }
}
</script>
<style>
  .ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    position: relative;
    font-size: 0;
  }
  .ratingselect .rating-type .block.positive {
    background: rgba(0,160,220,.2);
  }
  .ratingselect .rating-type .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    color: #4d555d;
  }
  .ratingselect .rating-type .block .count {
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
  }
  .ratingselect .rating-type .block.positive {
    background: rgba(0,160,220,.2);
  }
  .ratingselect .rating-type .block.positive.active {
    color: #fff;
    background: #00a0dc;
  }
  .ratingselect .rating-type .block.negative {
    background: rgba(77,85,93,.2);
  }
  .ratingselect .rating-type .block.negative.active {
    color: #fff;
    background: #4d555d;
  }
  .ratingselect .switch {
    padding: 12px 18px;
    line-height: 24px;
    font-size: 12px;
    color: #93999f;
    border: 1px solid rgba(1,17,27,.1);
    font-size: 0;
  }
  .ratingselect .switch.on .iconfont {
    color: #00c850;
  }
  .ratingselect .switch .iconfont {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    margin-right: 4px;
  }
  .ratingselect .switch .text {
    font-size: 12px;
  }
</style>

