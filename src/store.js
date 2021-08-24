import { createStore } from "vuex";
import axios from 'axios';
import node from './config/backEnd.js';

export default createStore({
    state: {
        ref: {},
        pageName: 'main',
        popup: {
            name: 'login',
            isOpen: true,
        },
        userSeq: '',
        userInfo: {
          point_now: 0,
          correct_answer_cnt: 0,
          incorrect_answer_cnt: 0,
        },
        resultPopData: {

        },
        cookie: { //위치 변경 예정
          get: function (name) {
              var nameEQ = name + "=";
              var ca = document.cookie.split(';');
              for (var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
          },
          set: function (name, value, days) {
              var expires = "";
              if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                  expires = "; expires=" + date.toUTCString();
              }
              document.cookie = name + "=" + (value || "") + expires + "; path=/";
          }
      }
    },
    mutations: {

        popupControl(state, option) {
            state.popup.isOpen = option.isOpen;
            state.popup.name = option.name;
        },

        getUserInfo(state) {
          axios.post(`${node.nodeUrl}/getUserInfo`, {seq: state.userSeq}).then((res) => {
            if(res.data.length){
              state.userInfo = res.data[0];
              state.cookie.set('tel', res.data[0].tel);
              // console.log(state.userInfo);
            }else{
              alert('유저 정보를 가져올 수 없습니다.');
            }
          });
        },

    },

    ref: {

    },
});