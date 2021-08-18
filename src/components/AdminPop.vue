<template>
  <div class="w100p overflow-y-auto mx-h80vh">
      <div class="pd10 border-box">
        <article class="pd15 bg-fff-0_6 mg-b10 border-eee">
          <h4 class="mp0" @click="getContent('upload');">퀴즈 업로드</h4>
          <div class="mg-t10" v-if="state.contentName === 'upload'">
            <!-- <div>
                <label class="mg-r10">
                <input type="radio" name="uploadType" value="normal" class="mg-r5 w20 h20 v-bottom" checked>
                <span>일반</span>
                </label>
                <label>
                <input type="radio" name="uploadType" class="mg-r5 w20 h20 v-bottom" value="special">
                <span>특정</span>
                </label>
            </div> -->
            <div class="mg-t10">
              <div class="border-t-dashed-eee mg-t10 pd-v10">
                <h5 class="mg0 mg-b5">최근 업로드</h5>
                <div class="cf">
                  <div class="float-l w30p">
                    <img :src="state.currentFiles.quiz_url" class="w100p">
                  </div>
                  <div class="float-r w70p pd-h10 border-box">
                    <strong>{{state.currentFiles.release_dt}}_{{state.currentFiles.release_timing}}</strong>
                    <br>
                    <span class="font12">{{state.currentFiles.reg_dt}}</span>
                  </div>
                </div>
              </div>
              <form action="contentForm" method="post" entype="multipart/form-data" ref="contentForm" id="aaab">
                <label class="block border-eee pd10 mg-b10" v-for="(value, key) in state.imgFiles" :key="key">
                  <strong>{{key}}</strong>
                  <input type="file" :id="'inputFile_' + key" class="none" name="quizImg" @change="previewImg($event, key);">
                  <img class="media-mx-w767-block w100p mg-t10" :id="'img_' + key">
                </label>
              </form>
              <label class="input-style1 w100p bg-fff">
                  <input type="text" placeholder=" " ref="answer" />
                  <strong class="color-bbb">정답을 입력해주세요.</strong>
                  <span></span>
              </label>
              <div class="mg-t10 txt-c">
                <button class="h100p w120 border0 outline0 pd10" style="background:#e7c13c;" @click="fileUpload();">
                  <strong>등록</strong>
                </button>
              </div>
            </div>
          </div>
        </article>
        <article class="pd15 bg-fff-0_6 border-eee">
          <h4 class="mp0" @click="getContent('depositMng');">
            <span>출금관리</span>
            <strong class="mg-l3 bg-red radius50 pd5 font8 color-fff line-h4px inline-block mn-w15 txt-c"
            v-if="state.withdrawalList.length">{{state.withdrawalList.length}}</strong>
          </h4>
          <div class="border-t-dashed-eee mg-t10" v-if="state.contentName === 'depositMng'">
            <ul class="list-style-none mp0">
              <li class="border-b-eee pd10" v-for="(value, idx) in state.withdrawalList" :key="idx">
                <div class="mg-b10">{{value.nickname}}({{value.tel}})</div>
                <div class="radius10 pd10 bg-eee">
                  <div class="txt-r font12">
                    <div><strong>{{value.account_holder}}</strong></div>
                    <div><strong>{{value.bank}}</strong></div>
                    <div>{{value.account_number}}</div>
                  </div>
                  <div class="mg-v5 txt-r">
                    <strong>{{numberWithComma(value.amount)}}원</strong>
                    <button class="border0 outline0 pd10 mg-l10" style="background:#e7c13c;" @click="completeDeposit(value.seq_hw);">
                      <strong class="font14">입금완료</strong>
                    </button>
                  </div>
                  <div class="txt-r font12">{{value.reg_dt2}}</div>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </div>
  </div>
</template>
<script>
import { onMounted, ref } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import axios from 'axios';
import node from '../config/backEnd.js';
import commonJs from '../common.js';

export default {
  components: {
  },
  setup() {

    const state = reactive({
      imgFiles: { //업로드 템플릿
        quiz: '',
        hint: '',
        answer: ''
      },
      contentName: '',
      currentFiles: {
        quiz_url: ''
      },
      withdrawalList: []
    })

    const contentForm = ref();
    const answer = ref();

    const previewImg = (target, type) => {
      let realTarget = target.target;
      if(!realTarget){
        realTarget = document.querySelector(target);
      }

      let addedId = type;
      let outputImg = document.getElementById('img_' + addedId);

      if(!realTarget.files.length){
        outputImg.src = '';
        return;
      }

      outputImg.src = URL.createObjectURL(realTarget.files[0]);
      outputImg.onload = function() {
        URL.revokeObjectURL(outputImg.src) // free memory
      }
    }

    const getContent = (name) => {
      if(state.contentName == name){
        state.contentName = '';
      }else{
        state.contentName = name;
      }

      if(state.contentName == 'upload'){
        currentFile();
      }
    }

    const fileUpload = () => {

      let form = contentForm.value;
      let data = new FormData(form);

      //유효성검사
      let i = 0;
      let isPassed = true;
      for (var value of data.values()) {
        if(i == 0 && value.name == ''){
          isPassed = false;
          break;
        }
        i++;
      }

      if(answer.value.value == ''){
        isPassed = false;
      }

      if(!isPassed){
        alert('누락된 부분이 있습니다.');
        return;
      }

      axios.post(`${node.nodeUrl}/upload`, data).then((res) => {

        let fileData = res.data;
        fileData.answer = answer.value.value;

        axios.post(`${node.nodeUrl}/addQuizRow`, fileData).then((res) => {
          console.log(res.data);
          if(res.data.affectedRows == 1){
            alert('파일이 업로드 됐습니다.');

            //input 초기화
            // answer.value.value = '';
            // contentForm.value.querySelector('#inputFile_quiz').value = '';
            contentForm.value.querySelector('#inputFile_hint').value = '';
            contentForm.value.querySelector('#inputFile_answer').value = '';

            previewImg('#inputFile_quiz', 'quiz');
            previewImg('#inputFile_hint', 'hint');
            previewImg('#inputFile_answer', 'answer');

            currentFile();

          }else{
            alert('서버 오류가 있습니다.');
          }
        });
      });

    }

    const currentFile = () => {
      axios.post(`${node.nodeUrl}/getCurrentFile`).then((res) => {
        // console.log(res.data);
        if(!res.data.length) return;
        state.currentFiles = res.data[0];
      });
    }

    const getWithdrawalList = () => {
      axios.post(`${node.nodeUrl}/getWithdrawalList`).then((res) => {
        state.withdrawalList = res.data;
      });
    }

    const numberWithComma = (num) => {
      return commonJs.fnc('numberWithComma', num);
    }

    const completeDeposit = (seq) => {
      if(confirm('입금을 완료하셨습니까?')){
        axios.post(`${node.nodeUrl}/completeDeposit`, {seq_hw: seq}).then((res) => {
          if(res.data.affectedRows == 1){
            getWithdrawalList();
          }
        });
      }

    }





    onMounted(() => {
      getWithdrawalList();
    });

    return {
      //method
      previewImg,
      getContent,
      fileUpload,
      currentFile,
      getWithdrawalList,
      numberWithComma,
      completeDeposit,
      //method

      //var
      state,
      //var

      //const
      contentForm,
      answer,
      //const
    };
  },
};
</script>