<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getSelfCotnent, changeSelfCotnent } from "@/api/user";
import { showConfirmDialog, showToast, showSuccessToast } from "vant";
const userStore = useUserStore();
const router = new useRouter();

// 获取用户id
const username = userStore.username;
const formRef = ref();

// loading效果
const loading = ref(false);

// 分享面板
const showShare = ref(false);
const options = [
  { name: "微信", icon: "wechat" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link" },
  { name: "分享海报", icon: "poster" },
  { name: "二维码", icon: "qrcode" }
];
// 分享的对象
const selectShare = option => {
  showToast(option.name);
  showShare.value = false;
};

// 获取自述内容
const content = ref();

// 存储自述内容
let inputMid = "";

// 获取文本框对象
const fieldText = ref(null);

// 是否出现导航栏
const isNav = ref(true);

// 是否可编辑
const isEditing = ref(false);

// 表单校验规则
const rules = [
  {
    validator: value => {
      // 自述不能为空
      if (!value.trim()) {
        return "请填写自述内容";
      }
      // 自述长度限制
      if (value.length > 2000) {
        return "自述内容不能超过2000个字符";
      }
      return true;
    },
    message: error => error
  }
];
// 可修改的状态
const changeState = function () {
  inputMid = content.value;

  isEditing.value = true;
  isNav.value = false;
  // 获得焦点
  fieldText.value.focus();
};

// 退出编辑
const returnBack = () => {
  content.value = inputMid;
  isEditing.value = false;
  isNav.value = true;
  // 失去焦点
  fieldText.value.blur();
};

// 获取自述
const getSelf = async () => {
  try {
    const { data } = await getSelfCotnent({ username: username });
    content.value = data.selfContent;
    console.log(content, 111222);
  } catch (error) {
    console.error("获取个人自述失败:", error);
    showToast("获取个人自述失败");
    // 你可以在这里添加错误提示等其他处理逻辑
  }
};

// 初始化文章内容
getSelf();

// 提交修改后的自述
const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value.validate();
    showConfirmDialog({
      title: "发布文章",
      message: "确认要更改个人介绍吗?"
    })
      .then(async () => {
        loading.value = true;
        // 调用修改文章请求
        changeContent();
      })
      .catch(() => {
        // on cancel
        console.log("取消");
      });
  } catch (error) {
    console.log("validate failed", error);
  }
};

// 发送修改文章请求
const changeContent = async () => {
  try {
    const { data } = await changeSelfCotnent({
      username: username,
      self_content: content.value
    });
    // 更新
    // 修改成功弹窗
    loading.value = false;
    content.value = data.result;
    isEditing.value = false;
    isNav.value = true;
    fieldText.value.blur();
  } catch {
    // 修改失败弹窗
    loading.value = false;
    showToast("修改失败");
  }
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

  <!-- 更多分享面板 -->
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
    @select="selectShare"
  />

  <div class="main">
    <van-nav-bar v-if="isNav" title="编辑自述">
      <template #left>
        <div class="top">
          <span class="back" @click="router.go(-1)"
            ><i-icon icon="weui:back-filled" />
          </span>
          <span class="home" @click="router.push('./demo')"
            ><i-icon icon="fa6-solid:house"
          /></span>
        </div>
      </template>
      <template #right>
        <div class="top">
          <span class="more"
            ><i-icon icon="ri:more-fill" @click="showShare = true"
          /></span>
          <!-- <span class="handle"
            ><i-icon icon="icon-park-solid:handle-round"
          /></span> -->
        </div>
      </template>
    </van-nav-bar>
    <div class="my-w">
      <van-form ref="formRef">
        <van-cell>
          <template #title>
            <span class="self-title">个人介绍</span>
          </template>
          <van-button
            v-if="isEditing"
            type="primary"
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="returnBack"
            >退出编辑</van-button
          >
          <van-button
            v-else
            type="primary"
            size="small"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            @click="changeState"
            >编辑/修改</van-button
          >
        </van-cell>
        <van-field
          ref="fieldText"
          v-model="content"
          placeholder="介绍一下自己吧"
          maxlength="2000"
          show-word-limit
          autocomplete="off"
          name="self_account"
          :rules="rules"
          :autosize="{ minHeight: 630, maxHeight: 630 }"
          type="textarea"
          :readonly="!isEditing"
        />
        <div v-if="isEditing" class="sub">
          <van-button type="primary" block @click="onSubmit"
            >确认提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.van-loading {
  justify-content: center;
  height: 100%;
}
.main {
  height: 100%;
}
.my-w {
  overflow: hidden;
  height: 100%;
  margin: 0 5px;
}
.van-nav-bar {
  margin-bottom: 10px;
}
.sub {
  margin-top: 20px;
  padding: 10px;
}
.sub .van-button {
  border-radius: 20px;
  background-color: #004ae9;
}
.i-icon {
  color: black;
  font-size: 18px;
}
.home {
  margin-left: 10px;
}
.more {
  margin-right: 10px;
}
/* .top {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 3px 0;
  span {
    margin: 0 5px;
  }
} */
.self-title {
  line-height: 32px;
}
</style>
