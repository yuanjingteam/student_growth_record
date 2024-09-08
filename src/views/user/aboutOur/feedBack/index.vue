<script setup>
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { ref } from "vue";
import { toFeedBack } from "@/api/user";
const router = new useRouter();

let feedback = ref("");
const Feedback = async () => {
  if (feedback.value.trim()) {
    // 处理反馈提交逻辑
    try {
      console.log(feedback.value);
      const { msg } = await toFeedBack({ advice: "111" });
      showToast("反馈提交成功！");
      feedback.value = "";
    } catch {
      showToast("msg");
    }
  } else {
    showToast("请填写反馈内容");
  }
};
</script>
<template>
  <div class="feedback-page">
    <van-nav-bar
      title="意见反馈"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
    />

    <div class="feedback-content">
      <van-field
        v-model="feedback"
        placeholder="留下您宝贵的意见,您的反馈是我们不断成长的动力..."
        label-align="top"
        :autosize="{ minHeight: 80, maxHeight: 260 }"
        type="textarea"
        maxlength="100"
        show-word-limit
        :rules="[{ required: true, message: '请填写反馈内容' }]"
      />
    </div>

    <div class="submit-button">
      <van-button type="primary" @click="Feedback">提交反馈</van-button>
    </div>
  </div>
</template>

<style scoped>
.feedback-content {
  margin-top: 20px;
}

.submit-button {
  margin-top: 30px;
  text-align: center;
}
</style>
