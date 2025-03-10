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
    auxiliaryStyle="
    .deep-chat-top-message .message-bubble {
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
    }
    .deep-chat-middle-message .message-bubble {
        margin-top: 0px;
    }
    .deep-chat-bottom-message .message-bubble {
        margin-top: 0px;
        border-bottom-left-radius: 5px !important;
        border-bottom-right-radius: 5px !important;
    }
    .deep-chat-top-message.deep-chat-bottom-message .message-bubble {
      margin-top: 10px;
    }"
    :messageStyles="{
      default: {
        shared: {
          bubble: {
            borderRadius: '0px'
          }
        }
      }
    }"
    :textInput="{
      placeholder: { text: '메시지 보내기' }
    }"
    :history="[
      { text: '그룹 1', role: 'group1' },
      { text: '그룹 2-1', role: 'group2' },
      { text: '그룹 2-2', role: 'group2' },
      { text: '그룹 2-3', role: 'group2' },
      { text: '그룹 3-1', role: 'group3' },
      { text: '그룹 3-2', role: 'group3' }
    ]"
    :demo="true"
  />
</template>
