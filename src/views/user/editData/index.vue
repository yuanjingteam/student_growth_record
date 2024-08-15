<script setup>
import { ref } from "vue";
import { getUserData, changeUserHeadshot } from "@/api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
// 路由
const router = useRouter();
// 调用 useUserStore 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useUserStore();
const username = userStore.username;
// 内容弹层高度
const anchors = [Math.round(0.8 * window.innerHeight)];
const height = ref(anchors[0]);
// 初始化学号
const userId = userStore.username;

const files = ref([{ url: userStore.userData.user_headshot }]);
// 当前日期
const currentDate = ref(["2021", "01", "13"]);

// Loading效果
const loading = ref(false);
// 初始化数据
const data = ref({
  name: "",
  user_headshot: userStore.userData.user_headshot,
  user_class: "",
  user_gender: "",
  user_Identity: "",
  user_motto: "",
  phone_number: "",
  user_email: "",
  user_year: currentDate.value.join("-")
});

// 初始化页面
userStore.baseUserData();
data.value = userStore.userData;

// 更新头像
const updataUserHeadshot = async () => {
  const formData = new FormData();
  formData.append("file", files.value[0].file);
  const { code } = await changeUserHeadshot({
    username: username,
    user_headshot: formData
  });
  if (code == 200) {
    console.log("yeah");
    userStore.userData.user_headshot = formData;
  }
};
</script>
<template>
  <van-overlay :show="loading">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      加载中...
    </van-loading>
  </van-overlay>
  <!-- 其他内容 -->

  <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />

  <div class="main">
    <div class="bg">
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    </div>
    <van-floating-panel v-model:height="height" :anchors="anchors">
      <div class="userImg">
        <van-uploader
          v-model="files"
          reupload
          max-count="1"
          :deletable="false"
          @click-reupload="updataUserHeadshot"
        />
      </div>
      <div>
        <!-- <p>面板显示高度 {{ height.toFixed(0) }} px</p> -->
        <van-cell-group inset>
          <van-cell>
            <template #title>
              <span class="custom-title">学号</span>
            </template>
            <template #value>
              <div class="both">{{ userId }}</div>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <span class="custom-title">姓名</span>
            </template>
            <template #value>
              <div class="both">{{ data.name }}</div>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <span class="custom-title">性别</span>
            </template>
            <template #value>
              <div class="both">{{ data.user_gender }}</div>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <span class="custom-title">班级</span>
            </template>
            <template #value>
              <div class="both">{{ data.user_class }}</div>
            </template>
          </van-cell>
          <van-cell is-link @click="router.push('/editData/motto')">
            <template #title>
              <span class="custom-title">个性签名</span>
            </template>
            <template #value>
              <div class="both over">{{ data.user_motto }}</div>
            </template>
          </van-cell>
          <van-cell is-link @click="router.push('/editData/phone')">
            <template #title>
              <span class="custom-title">电话</span>
            </template>
            <template #value>
              <div class="both">{{ data.phone_number }}</div>
            </template>
          </van-cell>
          <van-cell is-link @click="router.push('/editData/email')">
            <template #title>
              <span class="custom-title">电子邮箱</span>
            </template>
            <template #value>
              <div class="both over">{{ data.user_email }}</div>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <span class="custom-title">入学年份</span>
            </template>
            <template #value>
              <div class="both">{{ data.user_year }}</div>
              <div class="both">{{ data.user_year }}</div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- <template #header> dada </template> -->
    </van-floating-panel>
  </div>
</template>

<style scoped>
.van-loading {
  justify-content: center;
  height: 100%;
}
.userImg {
  position: absolute;
  top: -45px;
  left: 146px;
  z-index: 10;
}
/* .userImg::before {
  position: absolute;
  left: 0px;
  top: 0;
  width: 80px;
  height: 80px;
  content: "";
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 40px;
} */
.van-uploader >>> .van-uploader__preview-image {
  border-radius: 50px;
}
.custom-title {
  width: 10px;
}
.both {
  float: left;
}
.over {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-nav-bar {
  position: absolute;
  width: 100%;
  --van-nav-bar-background: rgba(255, 255, 255, 0);
  --van-nav-bar-icon-color: black;
  --van-nav-bar-text-color: black;
}
.van-cell {
  padding: 15px 25px;
}
</style>
