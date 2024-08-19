<script setup>
import { useRouter } from "vue-router";
import { publishSystemMsg, publishManagerMsg } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { showConfirmDialog, showDialog, showSuccessToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const active = ref(0);
const content = ref("");
const loading = ref(false);

const onClickTab = () => {
  content.value = "";
};
const isPublished = async () => {
  if (active.value === 0) {
    try {
      await publishSystemMsg({ msg_content: content });
      loading.value = false; // 关闭 loading 效果
      showSuccessToast("发布成功");
      content.value = "";
    } catch {
      loading.value = false; // 关闭 loading 效果
      showDialog("发布失败,请稍后重试");
    }
  } else {
    try {
      await publishManagerMsg({ msg_content: content });
      loading.value = false; // 关闭 loading 效果
      showSuccessToast("发布成功");
      content.value = "";
    } catch {
      loading.value = false; // 关闭 loading 效果
      showDialog("发布失败,请稍后重试");
    }
  }
};

const onSubmit = () => {
  showConfirmDialog({
    message: "确认发布吗?"
  })
    .then(() => {
      loading.value = true; // 开启 loading 效果
      isPublished();
    })
    .catch(() => {
      showDialog("发布失败,请稍后重试");
    });
};
</script>

<template>
  <van-overlay :show="loading" z-index="100">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      加载中...
    </van-loading>
  </van-overlay>
  <div>
    <van-nav-bar
      title="发布通知"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
    />
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="系统通知">
        <van-form @submit="onSubmit">
          <van-field
            v-model="content"
            rows="3"
            type="textarea"
            name="content"
            label="内容"
            placeholder="请输入内容"
            :autosize="{ minHeight: 100, maxHeight: 260 }"
            :rules="[{ required: true, message: '请输入内容' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              发布
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="管理员通知">
        <van-form @submit="onSubmit">
          <van-field
            v-model="content"
            rows="3"
            :autosize="{ minHeight: 100, maxHeight: 260 }"
            type="textarea"
            name="content"
            label="内容"
            placeholder="请输入内容"
            :rules="[{ required: true, message: '请输入内容' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              发布
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
}
.my-w {
  overflow: hidden;
  margin: 0 10px;
}
</style>
