<script setup>
import { ref, watch } from "vue";
import { changeUserHeadshot } from "@/api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { showDialog } from "vant";
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

watch(files, async (newValue, oldValue) => {
  console.log(newValue, oldValue);
  const formData = new FormData();
  formData.append("file", files.value[0].file);
  const { code } = await changeUserHeadshot(formData);
  if (code == 200) {
    userStore.userData.user_headshot = formData;
  }
});
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
  <div class="bg">
    <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  </div>
  <div class="main">
    <van-floating-panel v-model:height="height" :anchors="anchors">
      <div class="camera">
        <i-icon icon="icon-park:camera" />
      </div>
      <div class="userImg">
        <van-uploader
          v-model="files"
          reupload
          max-count="1"
          :deletable="false"
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
              <span class="custom-title both over">个性签名</span>
            </template>
            <template #value>
              <div class="both over">{{ data.user_motto }}</div>
            </template>
          </van-cell>
          <van-cell is-link @click="router.push('/editData/phone')">
            <template #title>
              <span class="custom-title both">电话</span>
            </template>
            <template #value>
              <div class="both">{{ data.phone_number }}</div>
            </template>
          </van-cell>
          <van-cell is-link @click="router.push('/editData/email')">
            <template #title>
              <span class="custom-title both">电子邮箱</span>
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
.camera {
  position: absolute;
  top: 0;
  left: 200px;
  z-index: 5;
  background: rgba(216, 214, 214, 0.9);
  padding: 5px 5px;
  border-radius: 20px;
}
.camera .i-icon {
  width: 20px;
  height: 20px;
}
.userImg {
  position: absolute;
  top: -45px;
  left: 146px;
  z-index: 4;
}
.van-uploader >>> .van-uploader__preview-image {
  border-radius: 50px;
}
.custom-title {
  width: 10px;
}
.both {
  text-align: start;
}
.over {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; /* 确保导航栏位于背景图片上方 */
  --van-nav-bar-background: rgba(255, 255, 255, 0.8); /* 设置半透明背景 */
  --van-nav-bar-icon-color: black;
  --van-nav-bar-text-color: black;
  --van-nav-bar-border-color: transparent; /* 去除底部边框 */
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(2px); /* 模糊背景图片 */
}

.van-cell {
  padding: 15px 25px;
}
</style>
