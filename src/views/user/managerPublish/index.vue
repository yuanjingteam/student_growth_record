<script setup>
import { useRouter } from "vue-router";
import { publishSystemMsg, publishManagerMsg } from "@/api/user";
import { ref } from "vue";
import { showConfirmDialog, showSuccessToast } from "vant";
import { useUserStore } from "@/store";

const router = useRouter();
const active = ref(0);
const content = ref("");
const loading = ref(false);
const userStore = useUserStore();
const role = userStore.role;

const onClickTab = () => {
  content.value = "";
};
const isPublished = async () => {
  if (active.value === 1) {
    const { code } = await publishSystemMsg({ msg_content: content.value });
    if (code === 200) {
      loading.value = false; // 关闭 loading 效果
      showSuccessToast("发布成功");
      content.value = "";
    }
  } else {
    const { code } = await publishManagerMsg({ msg_content: content.value });
    if (code === 200) {
      loading.value = false; // 关闭 loading 效果
      showSuccessToast("发布成功");
      content.value = "";
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
    .catch(() => {});
};
</script>

<template>
  <van-overlay :show="loading" z-index="100">
    <van-loading vertical style="justify-content: center; height: 100%">
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
      <van-tab title="系统通知">
        <van-form v-if="role === 'superman'" @submit="onSubmit">
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
        <div v-else>
          <van-empty
            image="https://student-grow.oss-cn-beijing.aliyuncs.com/image/nolimit.png"
            image-size="260"
            description="暂无权限,只有系统管理员才能使用"
          />
        </div>
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
