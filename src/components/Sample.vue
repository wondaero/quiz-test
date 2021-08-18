<template>
  <div class="swiper-container mySwiper" ref="swiperRef">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <Sample1 />
      </div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import Sample1 from "./Sample1";
import { onMounted, ref } from "@vue/runtime-core";
export default {
  components: {
    Sample1,
  },
  setup() {
    const swiperRef = ref();

    onMounted(() => {
      new Swiper(swiperRef.value, {});
    });

    return {
      swiperRef,
    };
  },
};
</script>
<style>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>