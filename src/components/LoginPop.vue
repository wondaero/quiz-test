<template>
  <div class="w100p h100vh-50">
      <div class="pd10 border-box">
        <article class="pd10 border-ccc mg-b10">
          <div class="mg-b10">
            <strong>핸드폰번호</strong>
            <div class="cf border-ccc mg-t5">
              <input type="number" class="float-l block border0 radius0 pd10 w100p-100 border-box h40" placeholder="01012345678">
              <button class="float-r pd10 border0 outline0 font12 w100 block h40" style="background:#e7c13c;">
                  <strong>인증번호 요청</strong>
              </button>
            </div>
          </div>
          <div>
            <strong>인증번호</strong>
            <div class="cf border-ccc mg-t5">
              <input type="text" class="float-l block border0 radius0 pd10 w100p-80 border-box h40">
              <button class="float-r pd10 border0 outline0 font12 w80 block h40" style="background:#e7c13c;">
                  <strong>인증</strong>
              </button>
            </div>
          </div>
        </article>
        <article class="pd10 border-ccc mg-b10">
          <div>
            <strong>닉네임 <span class="color-red font8">*한번 정한 닉네임은 변경할 수 없습니다.</span></strong>
            <div class="cf border-ccc mg-t5">
              <input type="number" class="float-l block border0 radius0 pd10 w100p-80 border-box h40">
              <button class="float-r pd10 border0 outline0 font12 w80 block h40" style="background:#e7c13c;">
                  <strong>중복확인</strong>
              </button>
            </div>
          </div>
        </article>
        <div class="txt-c">
          <button class="pd10 border0 outline0 font14 w80" style="background:#e7c13c;">
              <strong>가입</strong>
          </button>
          <button class="pd10 border0 outline0 font14 w80" style="background:#e7c13c;">
              <strong>로그인</strong>
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
      //네이티브로 전화번호 가져오기
      //번호가 없으면 번호를 가져올 수 없다고 수동입력 시키기
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