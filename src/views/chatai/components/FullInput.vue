<script setup lang="ts">
import "deep-chat";
import { ref, onMounted } from "vue";

const chatRef = ref();

onMounted(() => {
  chatRef.value.demo = {
    response: message => {
      console.log(message);
      return {
        text: "데모만 가능하며 AI 서비스가 필요한 경우 https://deepchat.dev/docs/connect를 참고하세요"
      };
    }
  };
});
</script>

<template>
  <deep-chat
    ref="chatRef"
    style="border-radius: 10px"
    :textInput="{
      styles: {
        container: {
          width: '100%',
          margin: '0',
          border: 'unset',
          borderTop: '1px solid #d5d5d5',
          borderRadius: '0px',
          boxShadow: 'unset'
        },
        text: {
          fontSize: '1.05em',
          paddingTop: '11px',
          paddingBottom: '13px',
          paddingLeft: '12px',
          paddingRight: '2.4em'
        }
      },
      placeholder: { text: '发送消息', style: { color: '#bcbcbc' } }
    }"
    :submitButtonStyles="{
      submit: {
        container: {
          default: {
            transform: 'scale(1.21)',
            marginBottom: '-3px',
            marginRight: '0.4em'
          }
        }
      }
    }"
    :history="[
      { text: '심근경색, 뇌경색을 예방하려면?', role: 'user' },
      {
        text: '심근경색과 뇌경색을 예방하는 주요 방법에는 균형잡힌 식사, 규칙적인 운동, 혈압 및 혈중 지질 조절, 금연 및 음주 제한, 스트레스 관리 등 건강한 생활 습관 유지가 포함됩니다.',
        role: 'ai'
      }
    ]"
    :demo="true"
    :connect="{ stream: true }"
  />
</template>
