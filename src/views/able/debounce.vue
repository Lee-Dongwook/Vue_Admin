<script setup lang="ts">
import { message } from "@/utils/message";
import { debounce, throttle } from "@pureadmin/utils";

defineOptions({
  name: "Debounce"
});

const handle = () => message("성공 메시지", { type: "success" });

const immediateDebounce = debounce(handle, 1000, true);

const debounceClick = debounce(handle, 1000);

const throttleClick = throttle(handle);
</script>

<template>
  <div>
    <el-card class="mb-5" shadow="never">
      <template #header>
        <div class="font-medium">debounce</div>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/debounce.vue"
          target="_blank"
        >
          코드 링크 src/views/able/debounce.vue
        </el-link>
      </template>
      <div class="mb-5">
        debounce는 이벤트가 트리거 된 후 n초 내에 해당 기능이 한 번만 실행될 수
        있음을 의미합니다.
      </div>
      <el-button @click="immediateDebounce">
        첫 번째 클릭 이벤트만 실행됩니다.
      </el-button>
      <el-button @click="debounceClick">
        마지막 클릭 이벤트만 실행되며 실행이 지연됩니다.
      </el-button>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="font-medium">throttle</div>
      </template>
      <div class="mb-5">
        throttle은 이벤트가 지속적으로 발생하지만 n초이내에 발생함을 의미합니다.
      </div>
      <el-button @click="throttleClick">
        1초에 한번의 클릭 이벤트만 실행됩니다.
      </el-button>
    </el-card>
  </div>
</template>
