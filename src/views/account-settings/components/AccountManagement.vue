<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { deviceDetection } from "@pureadmin/utils";

defineOptions({
  name: "AccountManagement"
});

const list = ref([
  {
    title: "계정 비밀번호",
    illustrate: "현재 비밀번호 강도: 강함",
    button: "수정"
  },
  {
    title: "휴대번호",
    illustrate: "158****6789",
    button: "수정"
  },
  {
    title: "보안 문제",
    illustrate:
      "보안 질문이 설정되어 있지 않으며 보안 질문이 계정 보안을 효과적으로 보호할 수 있습니다.",
    button: "수정"
  },
  {
    title: "이메일",
    illustrate: "pure***@163.com",
    button: "수정"
  }
]);

function onClick(item) {
  console.log("onClick", item.title);
  message("직접 구현", { type: "success" });
}
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">계정 관리</h3>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <el-text class="mx-1" type="info">{{ item.illustrate }}</el-text>
        </div>
        <el-button type="primary" text @click="onClick(item)">
          {{ item.button }}
        </el-button>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-divider--horizontal {
  border-top: 0.1px var(--el-border-color) var(--el-border-style);
}
</style>
