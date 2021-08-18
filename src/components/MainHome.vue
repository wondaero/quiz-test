<template>
  <div class="pd3 border-box pd-b25">
    <section id="page_main">
        <article class="pd15 bg-fff mg-b10 border-eee radius20">
            <h4 class="mp0 mg-b10" @click="getNowQuiz();">현재 퀴즈</h4>
            <!-- <img :src="'http://localhost/viewImg?img=' + state.nowQuiz.quiz_url" class="block w100p mg-b10" />
            <img :src="'http://localhost/viewImg?img=' + state.nowQuiz.hint_url" class="block w100p mg-b10"
            v-if="state.control_now_quiz.hint" /> -->
            <p class="mg0 mg-t10 font14" v-if="!state.nowQuiz.quiz_url">
              아침 08:00 ~ 11:00<br>
              점심 12:00 ~ 14:00<br>
              저녁 18:00 ~ 23:00<br>
              <strong class="inline-block mg-t10">*위 시간에 퀴즈가 올라옵니다.</strong>
            </p>
            <div v-else>
              <img :src="state.nowQuiz.quiz_url" class="block w100p mg-b10" />
              <img :src="state.nowQuiz.hint_url" class="block w100p mg-b10"
              v-if="state.control_now_quiz.hint" />
              <div class="mg-b10">
                  <label class="input-style1 w100p bg-fff">
                      <input type="text" placeholder=" " v-model="state.newAnswer" />
                      <strong class="color-bbb">정답을 입력해주세요.</strong>
                      <span class="radius50"></span>
                  </label>
              </div>
              <div class="txt-c">
                  <button id="btn_submit" class="w70 pd10 border0 outline0 mg-r5 radius50" style="background:#e7c13c;"
                  @click="submitTheAnswer(1, state.nowQuiz.seq_q);">
                      <strong>제출</strong>
                  </button>
                  <button id="btn_hint" class="pd10 border0 outline0 mg-r5 radius50" style="background:#ECD584;"
                  v-if="state.nowQuiz.hint_url" @click="showNowHint();">
                      <strong>힌트</strong>
                  </button>
                  <button id="btn_hint" class="pd10 border0 outline0 radius50 color-fff" style="background:#695F3B;" @click="showNowHint();">
                      <strong>정답확인</strong>
                  </button>
              </div>
            </div>
        </article>
        <article id="box_quized" class="pd15 bg-fff border-eee radius20">
            <h4 class="mg0 pd-v5 border-b-dashed-ccc">이전 퀴즈</h4>
            <ul id="quizedList" class="list-style-none mp0">
                <li class="border-b-eee pd10" @click="getOldQuiz(q.seq_q);" v-for="q in state.oldQuizList" :key="q.seq_q">
                    <h5 class="mg0 mg-b10">
                      <span>{{q.release_dt}} {{q.release_timing_kor}}</span>
                      <strong v-if="q.total_answer_cnt >= 100">(정답률: {{q.correct_answer_cnt / q.total_answer_cnt * 100}}%)</strong>
                    </h5>
                    <div class="cf">
                        <div class="float-l w30p"
                        :class="{ 'w100p': state.viewOldQuiz === q.seq_q }">
                            <img :src="q.quiz_url" class="block w100p" />
                            <img :src="q.hint_url" class="block w100p mg-t5"
                            v-if="state.viewOldQuizHint == q.seq_q" />
                        </div>
                        <div class="float-r w70p pd-l10 border-box" v-if="state.viewOldQuiz !== q.seq_q">
                            <ul class="mp0 list-style-none font12">
                              <li v-if="q.seq_m1">1등: {{q.seq_m1}}</li>
                              <li v-if="q.seq_m2">2등: {{q.seq_m2}}</li>
                              <li v-if="q.seq_m3">3등: {{q.seq_m3}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="mg-t5" v-if="state.viewOldQuiz === q.seq_q">
                        <div class="mg-b5">
                            <label class="input-style1 w100p bg-fff">
                                <input type="text" placeholder=" " v-model="state.oldAnswer" />
                                <strong class="color-bbb">정답을 입력해주세요.</strong>
                                <span class="radius50"></span>
                            </label>
                        </div>
                        <div class="txt-c">
                            <button id="btn_submit" class="w70 pd10 border0 outline0 mg-r5 radius50 font12" style="background:#e7c13c;"
                            @click="submitTheAnswer(0, q.seq_q);">
                                <strong>제출</strong>
                            </button>
                            <button id="btn_hint" class="w60 pd10 border0 outline0 mg-r5 radius50 font12" style="background:#ECD584;"
                            @click="getOldQuizHint(q.seq_q);">
                                <strong>힌트</strong>
                            </button>
                            <button id="btn_answer" class="w80 pd10 border0 outline0 radius50 font12 color-fff" style="background:#695F3B;">
                                <strong>정답확인</strong>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="txt-c pd-t10" @click="getOldQuizList();">더보기</div>
        </article>
    </section>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import axios from 'axios';
import { useStore } from "vuex";
import node from '../config/backEnd.js';

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      newAnswer: '',
      oldAnswer: '',
      viewOldQuiz: '',
      viewOldQuizHint: '',
      oldQuizList: [
        // {
        //   quiz_url: '',
        //   hint_url: '',
        //   answer_url: '',
        //   release_timing_kor: ''
        // }
      ],
      nowQuiz: {
        quiz_url: '',
        hint_url: ''
      },
      oldQuizListCnt: 5,

      control_now_quiz: {
        hint: false
      }
    })

    //ref
    const newAnswer = ref(null);
    //ref


    //method
    const submitTheAnswer = (isNew, seq_q) => {
      let answer = '';
      let isNewQuiz = isNew ? true : false;
      answer = isNew ? state.newAnswer : state.oldAnswer;

      if(confirm('\'' + answer + '\' (으)로 제출하시겠습니까?')){
        axios.post(`${node.nodeUrl}/submitTheAnswer`, {
          seq_q: seq_q,
          seq_m: store.state.userInfo.seq_m,
          nickname: store.state.userInfo.nickname,
          isNew: isNewQuiz,
          answer: answer
        }).then((res) => {
          // console.log(res.data);
          if(res.data.timeOver){
            alert('제출시간이 초과되었습니다.\n새로고침 부탁드립니다.');
            return;
          }

          let tmpData = {};
          tmpData = res.data;
          tmpData.isNew = isNewQuiz;

          store.state.resultPopData = tmpData;
          // console.log(store.state.resultPopData);
          store.commit('popupControl', {isOpen: true, name: 'result'});

          // state.todos = res.data;
        });
        // alert('제출되었습니다.');
        // isNew ? state.newAnswer = '' : state.oldAnswer = '';
      }
    }

    const getOldQuiz = (oldQuizSeq) => {
      state.viewOldQuiz = oldQuizSeq;
      state.oldAnswer = '';
      state.viewOldQuizHint = '';
    }

    const getOldQuizHint = (oldQuizSeq) => {
      state.viewOldQuizHint = oldQuizSeq;
      console.log(state.viewOldQuizHint);
    }

    const test = () => {
      // const privateUrl = '172.31.14.28';
      // const publicUrl = '3.34.138.157';

      axios.get(`${node.nodeUrl}/apple`).then((res) => {
        console.log(res.data);
        // state.todos = res.data;
      });
    }

    const getNowQuiz = () => {  //현재퀴즈 가져오기
      axios.post(`${node.nodeUrl}/getNowQuiz`).then((res) => {
        if(!res.data.length) return;
        state.nowQuiz = res.data[0];
      });
    }

    const showNowHint = () => { //현재퀴즈 힌트보기
      if(state.control_now_quiz.hint) return;
      if(confirm('광고가 노출됩니다.\n진행하시겠습니까?')){
        state.control_now_quiz.hint = true;
      }
    }

    const getOldQuizList = () => {
      axios.post(`${node.nodeUrl}/getOldQuizList`, {cnt: state.oldQuizListCnt}).then((res) => {
        // console.log(res.data);
        state.oldQuizList = res.data;
        state.oldQuizListCnt += 5;

        // console.log(state.oldQuizList);
        // if(!res.data.length) return;

        // state.nowQuiz = res.data[0];
      });
    }

    //method

    //create
    // getNowQuiz();
    // getOldQuizList();
    //create



    return {
      //var
      state,
      //var

      //ref
      newAnswer,
      //ref
      
      //method
      submitTheAnswer,
      getOldQuiz,
      getOldQuizHint,
      test,
      getNowQuiz,
      getOldQuizList,
      showNowHint,
      //method

      store,


    }
  },
}
</script>