<script setup lang="ts">
import { ref } from "vue";
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";

type GuideStep = {
  element: string | HTMLElement;
  title: string;
  intro: string;
  position: "left" | "right" | "top" | "bottom";
};

defineOptions({
  name: "Guide"
});

const GUIDE_STEPS = [
  {
    element: document.querySelector(".sidebar-logo-container") as
      | string
      | HTMLElement,
    title: "프로젝트 이름과 Logo",
    intro: "프로젝트 이름과 Logo",
    position: "left"
  },
  {
    element: document.querySelector("#header-search") as string | HTMLElement,
    title: "검색 메뉴",
    intro: "보고 싶은 메뉴를 검색할 수 있습니다.",
    position: "left"
  },
  {
    element: document.querySelector("#header-translation") as
      | string
      | HTMLElement,
    title: "국제화",
    intro: "언어를 전환할 수 있습니다.",
    position: "left"
  },
  {
    element: document.querySelector("#full-screen") as string | HTMLElement,
    title: "전체 화면",
    intro: "전체 화면으로 전환할 수 있습니다.",
    position: "left"
  },
  {
    element: document.querySelector("#header-notice") as string | HTMLElement,
    title: "메시지 알림",
    intro: "관리자가 보낸 메시지를 볼 수 있습니다.",
    position: "left"
  },
  {
    element: document.querySelector(".set-icon") as string | HTMLElement,
    title: "시스템 구성",
    intro: "시스템 구성을 볼 수 있습니다.",
    position: "left"
  },
  {
    element: document.querySelector(".tags-view") as string | HTMLElement,
    title: "다중 탭",
    intro: "귀하가 방문한 페이지 기록이 있습니다.",
    position: "bottom"
  }
] as Partial<GuideStep>[];

const tourOpen = ref(false);

const onGuide = () => {
  intro()
    .setOptions({
      steps: GUIDE_STEPS
    })
    .start();
};

const onTour = () => {
  tourOpen.value = true;
};
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"
          >소개 페이지는 프로젝트의 기본 기능이나 하이라이트를 안내 방식으로
          소개하는 데 사용됩니다.</span
        >
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/guide/index.vue"
        target="_blank"
      >
        코드링크 src/views/guide/index.vue
      </el-link>
    </template>
    <el-button @click="onGuide">페이지 열기 (intro.js) </el-button>
    <el-button @click="onTour">페이지 열기 (el-tour) </el-button>
    <el-tour v-model="tourOpen">
      <el-tour-step
        v-for="step in GUIDE_STEPS"
        :key="step.title"
        :target="() => step.element"
        :title="step.title"
        :description="step.intro"
        :placement="step.position"
      />
    </el-tour>
  </el-card>
</template>
