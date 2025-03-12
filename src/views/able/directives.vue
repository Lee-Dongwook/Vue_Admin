<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";

defineOptions({
  name: "Directives"
});

const search = ref("");
const searchTwo = ref("");
const searchThree = ref("");
const searchFour = ref("");
const searchFive = ref("");
const searchSix = ref("copy");
const text = ref("복사 가능한 텍스트");
const long = ref(false);
const cbText = ref("");
const idx = ref(0);

function onInput() {
  message(search.value);
}
function onInputTwo() {
  message(searchTwo.value);
}
function onInputThree({ name, sex }) {
  message(`${name}${sex}${searchThree.value}`);
}

function onInputFour() {
  message(searchFour.value);
}
function onInputFive({ name, sex }) {
  message(`${name}${sex}${searchFive.value}`);
}

function onLongpress() {
  long.value = true;
}

function onCustomLongpress() {
  long.value = true;
}
function onCbLongpress() {
  idx.value += 1;
  long.value = true;
  cbText.value = `${idx.value}회 연속 콜백`;
}
function onReset() {
  long.value = false;
  cbText.value = "";
  idx.value = 0;
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <p class="font-medium">Debounce, Throttle, 텍스트 복사, 길게 누르기</p>
        <el-link
          class="mt-2"
          href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/directives.vue"
          target="_blank"
        >
          코드링크 src/views/able/directives.vue
        </el-link>
      </div>
    </template>
    <div class="mb-2">
      Debounce (연속 입력, 첫번째 이벤트만 실행, 즉시 실행)
      <el-input
        v-model="search"
        v-optimize="{
          event: 'input',
          fn: onInput,
          immediate: true,
          timeout: 1000
        }"
        class="!w-[200px]"
        clearable
        @clear="onInput"
      />
    </div>
    <div class="mb-2">
      Debounce (연속 입력, 마지막 이벤트만 실행, 지연 실행)
      <el-input
        v-model="searchTwo"
        v-optimize="{ event: 'input', fn: onInputTwo, timeout: 400 }"
        class="!w-[200px]"
        clearable
      />
    </div>
    <div>
      Debounce (연속 입력, 마지막 이벤트만 실행, 지연 실행)
      <el-input
        v-model="searchThree"
        v-optimize="{
          event: 'input',
          fn: onInputThree,
          timeout: 400,
          params: { name: '샤오밍', sex: '남' }
        }"
        class="!w-[200px]"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      Throttle (연속 입력, 이벤트는 초당 1번만 실행됨)
      <el-input
        v-model="searchFour"
        v-optimize:throttle="{ event: 'input', fn: onInputFour, timeout: 1000 }"
        class="!w-[200px]"
        clearable
      />
    </div>
    <div>
      Throttle (연속 입력, 이벤트는 초당 1번만 실행됨)
      <el-input
        v-model="searchFive"
        v-optimize:throttle="{
          event: 'input',
          fn: onInputFive,
          params: { name: '샤오밍', sex: '남' }
        }"
        class="!w-[200px]"
        clearable
      />
    </div>

    <el-divider />

    <div class="mb-2">
      텍스트 복사(복사할 입력 상자의 내용을 두번 클릭)
      <el-input v-model="searchSix" v-copy="searchSix" class="!w-[200px]" />
    </div>
    <div>
      텍스트 복사(사용자 정의 트리거 이벤트, 복사하려면 클릭하기)
      <span v-copy:click="text" class="text-sky-500">{{ text }}</span>
    </div>

    <el-divider />
    <el-space wrap>
      长按指令
      <el-button v-longpress="onLongpress">길게 누르기(기본 500ms)</el-button>
      <el-button v-longpress:1000="onCustomLongpress">
        길게 누르는 시간 설정(1000ms)
      </el-button>
      <el-button v-longpress:2000:200="onCbLongpress">
        2초 후 200ms마다 연속 콜백
      </el-button>
      <el-button @click="onReset"> 상태 재설정 </el-button>
      <el-tag :type="long ? 'success' : 'info'" class="ml-2" size="large">
        {{ long ? "길게 누른 상태" : "길게 누르지 않은 상태" }}
      </el-tag>
      <el-tag v-if="cbText" type="danger" class="ml-2" size="large">
        {{ cbText }}
      </el-tag>
    </el-space>
  </el-card>
</template>
