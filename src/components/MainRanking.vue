<template>
  <div class="pd3 border-box pd-b25">
    <article class="pd15 bg-fff-0_6 mg-b10 border-eee radius20">
      <h4 class="mp0 mg-b10">마이 랭킹</h4>
      <div>
        <div class="cf">
          <div class="float-l w40p">{{state.myRanking.ranking}}등</div>
          <div class="float-r w60p txt-r"><strong>{{numberWithComma(state.myRanking.point_total)}}원</strong></div>
        </div>
        <div class="txt-r font14">{{state.myRanking.nickname}}</div>
        <div class="font14 mg-b5">정답률</div>
          <div class="relative radius50 bg-ccc overflow-hidden txt-c font8 color-fff">
            <div class="absolute top0 left0 h100p  bg-green" style="background:#2EC4B6;"
            :style="{width: state.myRanking.correct_answer_cnt / (state.myRanking.correct_answer_cnt + state.myRanking.incorrect_answer_cnt) * 100 + '%'}">
            </div>
            <div class="relative">
              <strong v-if="state.myRanking.correct_answer_cnt == 0 && state.myRanking.incorrect_answer_cnt == 0">0.00%</strong>
              <strong v-else>
                {{(state.myRanking.correct_answer_cnt / (state.myRanking.correct_answer_cnt + state.myRanking.incorrect_answer_cnt) * 100).toFixed(2)}}%
              </strong>
            </div>
          </div>
      </div>
    </article>
    <article class="pd15 bg-fff-0_6 border-eee radius20">
      <h4 class="mp0 mg-b10">전체 랭킹</h4>
      <ul class="mp0 list-style-none">
        <li class="border-b-eee pd-v10" v-for="(r, idx) in state.ranking" :key="idx">
          <div class="cf">
            <div class="float-l w40p">{{r.ranking}}등</div>
            <div class="float-r w60p txt-r"><strong>{{numberWithComma(r.point_total)}}원</strong></div>
          </div>
          <div class="txt-r font14 mg-b5">{{r.nickname}}</div>
          <div class="font14 mg-b5">정답률</div>
          <div class="relative radius50 bg-ccc overflow-hidden txt-c font8 color-fff">
            <div class="absolute top0 left0 h100p  bg-green" style="background:#2EC4B6;"
            :style="{width: r.correct_answer_cnt / (r.correct_answer_cnt + r.incorrect_answer_cnt) * 100 + '%'}">
            </div>
            <div class="relative">
              <strong v-if="r.correct_answer_cnt == 0 && r.incorrect_answer_cnt == 0">0.00%</strong>
              <strong v-else>{{(r.correct_answer_cnt / (r.correct_answer_cnt + r.incorrect_answer_cnt) * 100).toFixed(2)}}%</strong>
            </div>
          </div>
        </li>
      </ul>
      <div class="txt-c pd-t10" @click="getMemberRankByTotalPoint();">더보기</div>
    </article>
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import node from '../config/backEnd.js';
import commonJs from '../common.js';
import { useStore } from "vuex";
import axios from 'axios';


export default {
  components: {
  },
  setup() {

    const store = useStore();

    const state = reactive({
      myRanking: {
        ranking: 0,
        point_total: 0,
      },
      ranking: [],
      rankingCnt: 10,
    })

    //method
    const getMemberRankByTotalPoint = (num) => {
      state.rankingCnt = num ? num : state.rankingCnt;
      axios.post(`${node.nodeUrl}/getMemberRankByTotalPoint`, {rankingCnt: state.rankingCnt}).then((res) => {
        state.ranking = res.data;
        state.rankingCnt += 10;
      });
    }

    const getMyRankByTotalPoint = () => {
      axios.post(`${node.nodeUrl}/getMyRankByTotalPoint`, {seq_m: store.state.userSeq}).then((res) => {
        console.log(res.data);
        state.myRanking = res.data[0];
        console.log(state.myRanking);
      });
    }

    const numberWithComma = (num) => {
      return commonJs.fnc('numberWithComma', num);
    }
    //method

    onMounted(() => {
    });

    return {
      //var
      state,
      //var


      //method
      getMyRankByTotalPoint,
      getMemberRankByTotalPoint,
      numberWithComma,
      //method
    };
  },
};
</script>