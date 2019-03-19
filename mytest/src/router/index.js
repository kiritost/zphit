import Vue from 'vue'
import Router from 'vue-router'
import foods from '@/components/foods.vue'
import ratings from '@/components/rating.vue'
import seller from '@/components/seller.vue'
Vue.use(Router)

let routes = [
  {path: '/foods', component: foods}, {path: '/ratings', component: ratings}, {path: '/seller', component: seller}
]

export default routes
