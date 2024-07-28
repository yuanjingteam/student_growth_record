<script setup>
import { useRouter } from "vue-router";
import { showConfirmDialog } from "vant";
import { reactive, ref } from "vue";

const router = useRouter();
const submit_show = ref(false);
const choose_show = ref(false);

const data = reactive({
  actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
  messageValue: 12
});

// 点击发布文章
const onClickRight = () =>
  showConfirmDialog({
    title: "发布文章",
    message:
      "如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。"
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    });

const onSelect = item => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  submit_show.value = false;
  showToast(item.name);
};
</script>

<template>
  <van-dialog v-model:show="submit_show" show-cancel-button />

  <van-nav-bar
    title="发布"
    left-arrow
    right-text="发布"
    @click-left="router.back()"
    @click-right="onClickRight"
  />

  <van-row>
    <van-col span="8">
      <van-cell is-link title="文体活动" @click="choose_show = true" />
      <van-action-sheet
        v-model:show="choose_show"
        :actions="data.actions"
        close-on-click-action
        @select="onSelect"
      />
    </van-col>
    <van-field
      v-model="data.value"
      placeholder="开始你的精彩书写"
      label-align="top"
      clickable="false"
      maxlength="300"
      show-word-limit
    />
    <van-cell title="输出标签" icon="location-o" />
    <van-cell title="图片/视频" icon="location-o" />
  </van-row>
</template>

<style scoped></style>
