<script setup lang="ts">
import { reactive, ref } from "vue";
import { formUpload } from "@/api/mock";
import { message } from "@/utils/message";
import { type UserInfo, getMine } from "@/api/user";
import type { FormInstance, FormRules } from "element-plus";
import ReCropperPreview from "@/components/ReCropperPreview";
import { createFormData, deviceDetection } from "@pureadmin/utils";
import uploadLine from "@iconify-icons/ri/upload-line";

defineOptions({
  name: "Profile"
});

const imgSrc = ref("");
const cropperBlob = ref();
const cropRef = ref();
const uploadRef = ref();
const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();

const userInfos = reactive({
  avatar: "",
  nickname: "",
  email: "",
  phone: "",
  description: ""
});

const rules = reactive<FormRules<UserInfo>>({
  nickname: [
    { required: true, message: "닉네임은 필수입니다.", trigger: "blur" }
  ]
});

function queryEmail(queryString, callback) {
  const emailList = [
    { value: "@qq.com" },
    { value: "@126.com" },
    { value: "@163.com" }
  ];
  let results = [];
  let queryList = [];
  emailList.map(item =>
    queryList.push({ value: queryString.split("@")[0] + item.value })
  );
  results = queryString
    ? queryList.filter(
        item =>
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    : queryList;
  callback(results);
}

const onChange = uploadFile => {
  const reader = new FileReader();
  reader.onload = e => {
    imgSrc.value = e.target.result as string;
    isShow.value = true;
  };
  reader.readAsDataURL(uploadFile.raw);
};

const handleClose = () => {
  cropRef.value.hidePopover();
  uploadRef.value.clearFiles();
  isShow.value = false;
};

const onCropper = ({ blob }) => (cropperBlob.value = blob);

const handleSubmitImage = () => {
  const formData = createFormData({
    files: new File([cropperBlob.value], "avatar")
  });
  formUpload(formData)
    .then(({ success, data }) => {
      if (success) {
        message("아바타 업데이트가 되었습니다.", { type: "success" });
        handleClose();
      } else {
        message("아바타를 업데이트 하지 못했습니다.");
      }
    })
    .catch(error => {
      message(`${error}`, { type: "error" });
    });
};

const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(userInfos);
      message("정보가 업데이트되었습니다.", { type: "success" });
    } else {
      console.log("error submit!", fields);
    }
  });
};

getMine().then(res => {
  Object.assign(userInfos, res.data);
});
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">개인정보</h3>
    <el-form
      ref="userInfoFormRef"
      label-position="top"
      :rules="rules"
      :model="userInfos"
    >
      <el-form-item label="아바타">
        <el-avatar :size="80" :src="userInfos.avatar" />
        <el-upload
          ref="uploadRef"
          accept="image/*"
          action="#"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChange"
        >
          <el-button plain class="ml-4">
            <IconifyIconOffline :icon="uploadLine" />
            <span class="ml-2">아바타 업데이트</span>
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="닉네임" prop="nickname">
        <el-input
          v-model="userInfos.nickname"
          placeholder="닉네임을 입력해주세요"
        />
      </el-form-item>
      <el-form-item label="이메일" prop="email">
        <el-autocomplete
          v-model="userInfos.email"
          :fetch-suggestions="queryEmail"
          :trigger-on-focus="false"
          placeholder="이메일을 입력해주세요"
          clearable
          class="w-full"
        />
      </el-form-item>
      <el-form-item label="휴대번호">
        <el-input
          v-model="userInfos.phone"
          placeholder="휴대번호를 입력해주세요"
          clearable
        />
      </el-form-item>
      <el-form-item label="소개">
        <el-input
          v-model="userInfos.description"
          placeholder="소개를 입력해주세요"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          maxlength="56"
          show-word-limit
        />
      </el-form-item>
      <el-button type="primary" @click="onSubmit(userInfoFormRef)">
        정보 업데이트
      </el-button>
    </el-form>
    <el-dialog
      v-model="isShow"
      width="40%"
      title="아바타 편집"
      destroy-on-close
      :closeOnClickModal="false"
      :before-close="handleClose"
      :fullscreen="deviceDetection()"
    >
      <ReCropperPreview ref="cropRef" :imgSrc="imgSrc" @cropper="onCropper" />
      <template #footer>
        <div class="dialog-footer">
          <el-button bg text @click="handleClose">cancel</el-button>
          <el-button bg text type="primary" @click="handleSubmitImage">
            confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
