<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { deviceDetection } from "@pureadmin/utils";

defineOptions({
  name: "Preferences"
});

const list = ref([
  {
    title: "사용자 메시지",
    illustrate: "다른 사용자의 메시지는 사이트 메시지 형식으로 통보됩니다.",
    checked: true
  },
  {
    title: "시스템 메시지",
    illustrate: "시스템 메시지는 사이트 메시지 형식으로 통보됩니다.",
    checked: true
  },
  {
    title: "해야 할 일",
    illustrate: "할일은 사이트 내 메시지로 알려드립니다.",
    checked: true
  }
]);

function onChange(val, item) {
  console.log("onChange", val);
  message(`${item.title}설정 성공`, { type: "success" });
}
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">환경설정</h3>
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <p class="wp-4">
            <el-text class="mx-1" type="info">
              {{ item.illustrate }}
            </el-text>
          </p>
        </div>
        <el-switch
          v-model="item.checked"
          inline-prompt
          active-text="是"
          inactive-text="否"
          @change="val => onChange(val, item)"
        />
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
