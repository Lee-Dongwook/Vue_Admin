<script setup lang="ts">
import { useRouter } from "vue-router";
import back from "@/assets/svg/back.svg?component";

defineOptions({
  name: "Empty"
});

const router = useRouter();
</script>

<template>
  <div class="w-full h-full text-center">
    <h1>비즈니스 콘텐츠 모듈</h1>
    <p>
      사용 시나리오: 외부 플랫폼의 특정 페이지를 내장해야 하며 메뉴 탐색 및 추가
      모듈을 표시할 필요가 없습니다.
    </p>
    <div class="black" title="" @click="router.go(-1)">
      <back class="w-[80px] h-[80px]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.back {
  position: relative;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background: rgb(138 150 160 / 8%);
  border-radius: 18px;
  transform: translate(-50%, -50%);

  &:hover {
    background: rgb(138 150 160 / 20%);
    transition: background 0.6s;
  }
}
</style>
