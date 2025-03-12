<script setup lang="ts">
import { ref } from "vue";
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";

defineOptions({
  name: "InfiniteScroll"
});

const dataTemplate = new Array(10).fill({
  date: "2022-08-24",
  name: "RealityBoy",
  age: "18"
});

const data = ref([]);
const page = ref(0);
const total = ref(10);
const isBottom = ref(false);

const load = () => {
  if (isBottom.value) return;

  page.value++;
  if (page.value <= total.value) {
    data.value = data.value.concat(dataTemplate);
  }

  if (page.value === total.value) {
    isBottom.value = true;
  }
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="font-medium">
        <el-link
          href="https://github.com/yujinpan/el-table-infinite-scroll"
          target="_blank"
          style="margin: 0 5px 4px 0; font-size: 16px"
        >
          무한 스크롤
        </el-link>
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/able/infinite-scroll.vue"
        target="_blank"
      >
        코드링크 src/views/able/infinite-scroll.vue
      </el-link>
    </template>
    <p class="mb-2">
      {{ isBottom ? "모든 페이지가 로드되었습니다." : `${page} 페이지 로드` }}
    </p>
    <el-table
      v-el-table-infinite-scroll="load"
      border
      height="435px"
      :data="data"
      :infinite-scroll-disabled="isBottom"
    >
      <el-table-column width="80" type="index" label="일련번호" />
      <el-table-column prop="date" label="날짜" />
      <el-table-column prop="name" label="이름" />
      <el-table-column prop="age" label="나이" />
    </el-table>
  </el-card>
</template>
