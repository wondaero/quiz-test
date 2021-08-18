import { createStore } from "vuex";
import axios from 'axios';
import node from './config/backEnd.js';

export default createStore({
    state: {
        ref: {},
        pageName: 'main',
        popup: {
            name: '',
            isOpen: false,
        },
        userSeq: '',
        userInfo: {
          point_now: 0,
          correct_answer_cnt: 0,
          incorrect_answer_cnt: 0,
        },
        resultPopData: {

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
                // console.log(state.userInfo);
              }else{
                alert('유저 정보를 가져올 수 없습니다.');
              }
            });
          }
    },

    ref: {

    }
});