<template>
  <!-- <span>#facade</span> -->
  <!-- <span>#e7c13c</span> -->
  <!-- <span>#face31</span> -->
  <div class="max-w500 mg0auto" :style="{background: 'url(' + state.mainBg + ') no-repeat center'}" style="background-size:cover;">
    <header class="cf h45 txt-c border-box fixed top0 left50p w100p z-idx2 mx-w500 translate-x-50p">
      <div class="absolute top0 left10 h100p txt-c pd-t10 border-box">
        <img src="../assets/img/admin.svg" height="25"
        @click="$store.commit('popupControl', {isOpen: true, name: 'admin'});"
        v-if="store.state.userInfo.grade === '999'" v-cloak />
      </div>

      <img src="../assets/img/solomon.svg" class="v-top" height="45" />
      <strong class="inline-block h100p line-h45px v-top">솔로몬의 하루</strong>

      <!-- <div class="absolute top0 right10 h100p txt-c pd-t10 border-box">
        <img src="../assets/img/logout.svg" height="25" v-if="store.state.userInfo" v-cloak @click="logout();">
        <img src="../assets/img/login.svg" height="25" v-else v-cloak>
      </div> -->
      <div class="absolute top0 right10 h100p txt-c pd-t10 border-box">
        <input type="number" class="w50 op0">
      </div>
    </header>
    <footer class="fixed bottom0 left50p translate-x-50p w80p h50 bg-fff border-box z-idx2 flex flex-row radius50 mx-w400"
    style="box-shadow1:0 0 5px #bbb; background:#e7c13c;">
      <span id="btn_rank" class="flex flex-col flex1 txt-c pd-t12">
        <span ref="rank" @click="slideTo(0)">
          <img src="../assets/img/footer/rank_on.svg" height="26" v-if="state.swiperIdx == 0" />
          <img src="../assets/img/footer/rank_off.svg" height="26" v-else data-on-off="off" />
        </span>
      </span>
      <span id="btn_home" class="flex flex-col flex1 txt-c pd-t12">
        <span ref="home" @click="slideTo(1)">
          <img src="../assets/img/footer/home_on.svg" height="26" v-if="state.swiperIdx == 1" />
          <img src="../assets/img/footer/home_off.svg" height="26" v-else />
        </span>
      </span>
      <span id="btn_myPage" class="flex flex-col flex1 txt-c pd-t12">
        <span ref="userInfo" @click="slideTo(2)">
          <img src="../assets/img/footer/user_on.svg" height="26" v-if="state.swiperIdx == 2" />
          <img src="../assets/img/footer/user_off.svg" height="26" v-else />
        </span>
      </span>
    </footer>
    <div class="fixed top0 left0 right0 bottom0 bg-000-0_5 z-idx2 pd10" v-if="store.state.popup.isOpen">
      <div class="vertical-m mx-h100p bg-fff w80p mg0auto media-mx-w767-w100p">
        <div class="h30 cf" style="background:#e7c13c;">
          <div class="float-r h30 w30 font30 txt-c line-h30px color-fff"
          @click="$store.commit('popupControl', {isOpen: false});"
          v-if="store.state.userSeq">
            &#10799;
          </div>
        </div>
        <AdminPop v-if="store.state.popup.name == 'admin'" />
        <ResultPop v-else-if="store.state.popup.name == 'result'" />
        <LoginPop v-else-if="store.state.popup.name == 'login'" />
      </div>
    </div>
    <div class="pd-t35 pd-b15 h100vh border-box">
      <div class="h100p pd10 border-box">
        <div class="h100p bg-fff border-box pd10 radius20" style="box-shadow:inset 0px 0px 10px #aaa;">
          <div class="swiper-container h100p" ref="swiperRef">
            <div class="swiper-wrapper">
              <div class="swiper-slide overflow-y-auto"><MainRanking ref="mainRanking" /></div>
              <div class="swiper-slide overflow-y-auto"><MainHome ref="mainHome" /></div>
              <div class="swiper-slide overflow-y-auto"><MainUserInfo ref="mainUserInfo" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <span>{{ store.state.number }}</span> -->
  <!-- <button @click="increase()">Click me</button>
<button @click="post()">Post</button> -->
  <!-- <ul>
  <li v-for="(t, idx) in state.todos" :key="idx">{{ t.title }}</li>
</ul> -->
  <!-- <input type="text" ref="inputRef" /> -->
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import Swiper from "swiper";
// import axios from 'axios';
// import node from '../config/backEnd.js';

import MainHome from "./MainHome";
import MainUserInfo from "./MainUserInfo";
import MainRanking from "./MainRanking";
import LoginPop from "./LoginPop";
import AdminPop from "./AdminPop";
import ResultPop from "./ResultPop";

import { useStore } from "vuex";

import mainBg from '@/assets/img/main-bg3.png';

export default {
  components: {
    MainHome,
    MainUserInfo,
    MainRanking,
    LoginPop,
    AdminPop,
    ResultPop,

  },
  setup() {
    const store = useStore();
    const state = reactive({
      swiper: null,
      swiperIdx: 1,
      isPopup: false,
      test: "aaaa",
      mainBg: mainBg,
    });

    //ref
    const swiperRef = ref(null);

    const mainRanking = ref(null);
    const mainHome = ref(null);
    const mainUserInfo = ref(null);

    //ref


    //method
    const slideTo = (pageIdx) => {
      state.swiper.slideTo(pageIdx, 500);
      state.swiperIdx = pageIdx;
    };

    // const login = (tel, isCookie) => {
    //   let telWithoutHyphen = tel.replaceAll("-", "");
    //   if(isCookie) telWithoutHyphen = store.state.cookie.get('tel');
    //   // let telWithoutHyphen = String(tel).replace(/-/gi, '');
    //   axios.post(`${node.nodeUrl}/login`, {tel: telWithoutHyphen}).then((res) => {
    //     if(res.data.length){
    //       store.state.userSeq = res.data[0].seq_m;
    //       store.commit('getUserInfo', store.state.userSeq);
    //     }else{
    //       store.commit('popupControl', {isOpen: true, name: 'login'});
    //     }
    //   });
    // }

    const logout = () => {
      if(confirm('로그아웃 하시겠습니까?')){
        store.state.userInfo = {
          point_now: 0,
          correct_answer_cnt: 0,
          incorrect_answer_cnt: 0,
        };
        store.state.userSeq = '';
        store.commit('popupControl', {isOpen: true, name: 'login'});
      }
    }

    const isMobile = () => {
      store.commit('isMobile');
    }

    //method

    //create
      // login('1');
      isMobile();
      
    //create

    

    // const increase = () => {
      //   store.commit("increase", 1);
    // };

    // const post = () => {
      //   axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
        // state.todos = res.data;
    //   });

    // };


    store.state.ref.mainRanking = mainRanking;
    store.state.ref.mainHome = mainHome;
    store.state.ref.mainUserInfo = mainUserInfo;

    onMounted(() => {
      state.swiper = new Swiper(swiperRef.value, {
        on: {
          activeIndexChange: function () {
            state.swiperIdx = this.realIndex;
            // console.log(this.realIndex);
            switch(this.realIndex){
              case 0:
                store.state.ref.mainRanking.getMemberRankByTotalPoint(10);
                store.state.ref.mainRanking.getMyRankByTotalPoint();
              break;
              case 1:
                store.state.ref.mainHome.state.oldQuizListCnt = 5;
                store.state.ref.mainHome.getNowQuiz();
                store.state.ref.mainHome.getOldQuizList();
              break;
              case 2:
                 store.commit('getUserInfo', store.state.userSeq);
              break;
            }
          },
        },
      });

      state.swiper.slideTo(state.swiperIdx, false, false);

      
    });

    return {
      //var
      state,
      //var

      //ref
      swiperRef,
      mainHome,
      mainRanking,
      mainUserInfo,
      //ref

      //method
      slideTo,
      isMobile,
      // login,
      logout,
      //method

      //const
      //const

      store,
    };
  },
};
</script>