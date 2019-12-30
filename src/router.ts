import Vue from 'vue';
import Router from 'vue-router';
import State from './views/State/State.vue';
import MajorCouncil from './views/MajorCouncil/MajorCouncil.vue';
import Distric from './views/Districs/Distric.vue';
import LocalCouncil from './views/LocalCouncil/LocalCouncil.vue';
import Election from './views/Election/Election.vue';
import PoliticalSpectrum from './views/PoliticalSpectrum/PoliticalSpectrum.vue';
import StateList from './views/StateList/StateList.vue';
import DistricList from './views/DistricList/DistricList.vue';
import LocalCouncilList from './views/LocalCouncilList/LocalCouncilList.vue';
import MajorCouncilList from './views/MajorCouncilList/MajorCouncilList.vue';
import ElectionList from './views/ElectionList/ElectionList.vue';
import PoliticalSpectrumList from './views/PoliticalSpectrumList/PoliticalSpectrumList.vue';
import Login from './views/Login.vue';
import Pages from './views/Pages.vue';




Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pages',
      name: 'Pages',
      component: Pages,
      children:[
        {
          path: '/state',
          name: 'State',
          component: State,
        },
        {
          path: '/distric',
          name: 'Distric',
          component: Distric
        },
        {
          path: '/local-council',
          name: 'LocalCouncil',
          component: LocalCouncil,
        },
        {
          path: '/major-council',
          name: 'MajorCouncil',
          component: MajorCouncil 
        },
        {
          path: '/election',
          name: 'Election',
          component: Election
        },
        {
          path: '/political-spectrum',
          name: 'PoliticalSpectrum',
          component: PoliticalSpectrum
        },
        {
          path: '/state-list',
          name: 'StateList',
          component: StateList
        },
        {
          path: '/distric-list',
          name: 'DistricList',
          component: DistricList
        },
        {
          path: '/local-council-list',
          name: 'LocalCouncilList',
          component: LocalCouncilList
        },
        {
          path: '/major-council-list',
          name: 'MajorCouncilList',
          component: MajorCouncilList
        },
        {
          path: '/election-list',
          name: 'ElectionList',
          component: ElectionList
        },
        {
          path: '/political-spectrum-list',
          name: 'PoliticalSpectrumList',
          component: PoliticalSpectrumList
        },
      ]
    },
    
    
  ],
});
