<template>
  <div class="pd3 border-box pd-b25">
    <article class="pd15 bg-fff-0_6 border-eee radius20">
      <h4 class="mp0 mg-b10">내정보</h4>
      <div>
        <div>
          <span>{{$store.state.userInfo.nickname}}</span>
          <span>({{$store.state.userInfo.tel}})</span>
        </div>
        <h3 class="mg-b0">
          <strong>{{numberWithComma($store.state.userInfo.point_now)}}원</strong>
          <button class="pd10 border0 outline0 font16 mg-l10 radius50 w100" style="background:#e7c13c;"
          @click="showRequestBox(1);">
            <strong>출금요청</strong>
          </button>
        </h3>
      </div>
    </article>
    <article class="pd15 bg-fff-0_6 mg-t10 border-eee radius20" v-if="state.outputBtnOn">
      <ul class="list-style-none mp0">
        <li class="mg-b5">
          <label class="input-style1 w100p bg-fff">
              <input type="text" placeholder=" " ref="accountHolder"/>
              <strong class="color-bbb">예금주</strong>
              <span class="radius50"></span>
          </label>
        </li>
        <li class="mg-b5">
          <label class="input-style1 w100p bg-fff">
              <input type="text" placeholder=" " ref="bank"/>
              <strong class="color-bbb">은행명</strong>
              <span class="radius50"></span>
          </label>
        </li>
        <li class="mg-b5">
          <label class="input-style1 w100p bg-fff">
              <input type="text" placeholder=" " ref="accountNumber"/>
              <strong class="color-bbb">계좌번호</strong>
              <span class="radius50"></span>
          </label>
        </li>
        <li>
          <label class="input-style1 w100p bg-fff">
              <input type="number" placeholder=" " class="txt-r" ref="amount"/>
              <strong class="color-bbb">금액</strong>
              <span class="radius50"></span>
          </label>
        </li>
      </ul>
      <div class="mg-t10 txt-c">
        <button class="w100 pd10 border0 outline0 font16 mg-r5 radius50"
        style="background:#e7c13c;" @click="requestWithdrawal();">
          <strong>요청</strong>
          </button>
        <button class="w100 pd10 border0 outline0 font16 radius50" @click="showRequestBox(0);"><strong>취소</strong></button>
      </div>
    </article>
    <article class="pd15 bg-fff-0_6 mg-t10 border-eee radius20">
      <h3 class="txt-c line-h1_5 mg-t0">
        정답률
        <br>
        {{($store.state.userInfo.correct_answer_cnt / ($store.state.userInfo.correct_answer_cnt + $store.state.userInfo.incorrect_answer_cnt) * 100).toFixed(2)}}%
      </h3>
      <div class="cf h15 bg-red line-h15px overflow-hidden txt-c font12" style="background:#E71D36;">
        <div class="float-l bg-green h100p color-fff" style="background:#2EC4B6;"
        :style="{width: $store.state.userInfo.correct_answer_cnt / ($store.state.userInfo.correct_answer_cnt + $store.state.userInfo.incorrect_answer_cnt) * 100 + '%'}">
          <strong>{{numberWithComma($store.state.userInfo.correct_answer_cnt)}}</strong>
        </div>
        <div class="float-r h100p color-fff"
        :style="{width: $store.state.userInfo.incorrect_answer_cnt / ($store.state.userInfo.correct_answer_cnt + $store.state.userInfo.incorrect_answer_cnt) * 100 + '%'}">
          <strong>{{numberWithComma($store.state.userInfo.incorrect_answer_cnt)}}</strong>
        </div>
      </div>
      <div class="flex flex-row border-b-eee pd-v20 border-v-eee">
        <div class="flex flex-col flex1 txt-c">
          <div class="txt-c mg-b10 color-green"><strong>정답</strong></div>
          <div class="txt-c">{{numberWithComma($store.state.userInfo.correct_answer_cnt)}}</div>
        </div>
        <div class="flex flex-col flex1 border-l-eee border-r-eee">
          <div class="txt-c mg-b10 color-red"><strong>오답</strong></div>
          <div class="txt-c">{{numberWithComma($store.state.userInfo.incorrect_answer_cnt)}}</div>
        </div>
        <div class="flex flex-col flex1">
          <div class="txt-c mg-b10"><strong>총 문제</strong></div>
          <div class="txt-c">{{numberWithComma(($store.state.userInfo.correct_answer_cnt + $store.state.userInfo.incorrect_answer_cnt))}}</div>
        </div>
      </div>
      <!-- <h4 class="mp0 mg-v10">최근 퀴즈</h4> -->
    </article>
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
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
      outputBtnOn: false
    })
    //ref
    const bank = ref(null);
    const accountHolder = ref(null);
    const accountNumber = ref(null);
    const amount = ref(null);
    //ref

    //method
    const showRequestBox = (boolean) => {
      if(store.state.userInfo.point_now < store.state.userInfo.withdrawCase && boolean !== 0){
        alert(`최소 출금 금액은 ${numberWithComma(store.state.userInfo.withdrawCase)}원입니다.`);
        return;
      }
      state.outputBtnOn = boolean ? true : false;

      if(state.outputBtnOn){
        axios.post(`${node.nodeUrl}/currentWithdrawalRow`, {seq_m: store.state.userSeq}).then((res) => {
          if(res.data.length){
            if(confirm('기존 계좌정보가 존재합니다.\n불러올까요?')){
              bank.value.value = res.data[0].bank;
              accountHolder.value.value = res.data[0].account_holder;
              accountNumber.value.value = res.data[0].account_number;
            }
          }
        });
      }
    }

    const requestWithdrawal = () => {
      if(bank.value.value === ''||
      accountHolder.value.value === '' ||
      accountNumber.value.value === '' ||
      amount.value.value === ''){
        alert('비어있는 항목이 있습니다.');
        return;
      }

      if(store.state.userInfo.withdrawCase > amount.value.value ||
      store.state.userInfo.point_now < amount.value.value){
        alert('출금 금액을 확인해주세요.');
        amount.value.focus();
        return;
      }



      if(confirm(
        bank.value.value + '\n' +
        accountHolder.value.value + '\n' +
        accountNumber.value.value + '\n' +
        numberWithComma(amount.value.value) + '원\n' +
        '----------' + '\n' +
        '출금요청을 진행하시겠습니까?'
      )){
        let data = {};
        data.bank = bank.value.value;
        data.accountHolder = accountHolder.value.value;
        data.accountNumber = accountNumber.value.value;
        data.amount = amount.value.value;
        data.seq_m = store.state.userSeq;

        console.log(data);

        axios.post(`${node.nodeUrl}/requestWithdrawal`, data).then((res) => {
          console.log(res.data);
          if(res.data.affectedRows == 1){
            alert('출금을 요청했습니다.');
            store.commit('getUserInfo', store.state.userSeq);
          }else{
            alert('서버에 오류가 있습니다.');
          }
        });
      }
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

      //ref
      bank,
      accountHolder,
      accountNumber,
      amount,
      //ref

      //method
      showRequestBox,
      requestWithdrawal,
      numberWithComma,
      //method
    };
  },
};
</script>