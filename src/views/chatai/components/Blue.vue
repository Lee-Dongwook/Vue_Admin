<script setup lang="ts">
import "deep-chat";
import { ref, onMounted } from "vue";

const chatRef = ref();

onMounted(() => {
  chatRef.value.demo = {
    response: message => {
      console.log(message);
      return {
        text: "데모 전용입니다. AI 서비스가 필요한 경우 https://deepchat.dev/docs/connect를 참고하세요."
      };
    }
  };
});
</script>

<template>
  <deep-chat
    ref="chatRef"
    style="
      border-radius: 10px;
      border: unset;
      background-image: url(&quot;https://xiaoxian521.github.io/hyperlink/img/vue-pure-admin/chatai/blue.jpg&quot;);
      background-size: cover;
    "
    :messageStyles="{
      default: {
        user: {
          bubble: { backgroundColor: '#2670ff' }
        },
        ai: { bubble: { backgroundColor: '#004f97', color: 'white' } }
      }
    }"
    :submitButtonStyles="{
      submit: {
        svg: {
          styles: {
            default: {
              filter:
                'brightness(0) saturate(100%) invert(60%) sepia(79%) saturate(643%) hue-rotate(185deg) brightness(102%) contrast(100%)'
            }
          }
        }
      }
    }"
    :textInput="{
      styles: {
        container: {
          backgroundColor: '#004f97',
          color: 'white',
          boxShadow: 'unset'
        }
      },
      placeholder: { text: '发送消息', style: { color: '#d1d1d1' } }
    }"
    auxiliaryStyle="
    ::-webkit-scrollbar-thumb {
      background-color: #0174db;
    }
    ::-webkit-scrollbar-track {
      background-color: unset;
    }"
    :history="[
      { text: '늦게까지 깨어 있으면 어떤 단점이 있나요？', role: 'user' },
      {
        text: '늦잠을 자면 건강에 해로울 수 있으며 면역력 저하, 에너지 부족, 업무 효율 저하로 이어질 수 있습니다.',
        role: 'ai'
      }
    ]"
    :demo="true"
    :connect="{ stream: true }"
  />
</template>
