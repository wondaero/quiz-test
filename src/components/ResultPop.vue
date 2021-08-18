<template>
  <div class="w100p">
      <div class="pd10 border-box txt-c">
        <h4 class="mg0 mg-b10" v-if="$store.state.resultPopData.isAlready && $store.state.resultPopData.isNew">
          <span>기존에 시도한 적이 있네요?</span>
        </h4>
        <h4 class="mg0 mg-b10" :class="[$store.state.resultPopData.isCorrectAnswer ? 'color-65bb00' : 'color-red']">
          <span>{{$store.state.resultPopData.isCorrectAnswer ? '정답입니다!' : '오답입니다.'}}</span>
        </h4>
        <div class="border-eee mg-b10 pd10"
        v-if="!$store.state.resultPopData.isAlready && $store.state.resultPopData.isNew">
          <strong class="block font30" v-if="$store.state.resultPopData.isCorrectAnswer">
            <span>{{$store.state.resultPopData.ranking}}등</span>
          </strong>
          <strong class="block">
            <span>({{$store.state.resultPopData.reward}} point 획득)</span>
          </strong>
        </div>
        <div class="txt-c">
          <button class="w80 pd10 border0 outline0" style="background:#e7c13c;"
           @click="$store.commit('popupControl', {isOpen: false});">
              <strong>확인</strong>
          </button>
        </div>
      </div>
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  components: {
  },
  setup() {
    const store = useStore();
    const state = reactive({

    })


    onMounted(() => {
    });

    return {
      //method
      //method

      //var
      state,
      //var

      store,
    };
  },
};
</script>