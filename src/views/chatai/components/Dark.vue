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
    style="background-color: #292929; border: unset; border-radius: 10px"
    :messageStyles="{
      default: {
        ai: { bubble: { backgroundColor: '#545454', color: 'white' } }
      },
      loading: {
        message: {
          styles: {
            bubble: { backgroundColor: '#545454', color: 'white' }
          }
        }
      }
    }"
    :textInput="{
      styles: {
        container: {
          backgroundColor: '#666666',
          border: 'unset',
          color: '#e8e8e8'
        }
      },
      placeholder: {
        text: '发送消息',
        style: { color: '#bcbcbc' }
      }
    }"
    :submitButtonStyles="{
      submit: {
        container: {
          default: { bottom: '0.7rem' }
        },
        svg: {
          styles: {
            default: {
              filter:
                'brightness(0) saturate(100%) invert(70%) sepia(52%) saturate(5617%) hue-rotate(185deg) brightness(101%) contrast(101%)'
            }
          }
        }
      }
    }"
    auxiliaryStyle="
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: grey;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: unset;
    }"
    :history="[
      {
        text: '체지방 감량 중에 섭취하기에 적합한 과일은 무엇인가요?',
        role: 'user'
      },
      {
        text: '체지방 감량 중에는 사과, 감귤류, 블루베리, 딸기 등 저칼로리, 고섬유질 과일을 섭취하는 것이 적합하며 포만감을 높이고 신진대사를 촉진하는 데 도움이 됩니다.',
        role: 'ai'
      }
    ]"
    :demo="true"
    :connect="{ stream: true }"
  />
</template>
