<script setup>
import { reactive, ref } from "vue";
import { changeUserData, getUserData } from "@/api/user";

import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 调用 useUserStore 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useUserStore();

// 内容弹层高度
const anchors = [Math.round(0.8 * window.innerHeight)];
const height = ref(anchors[0]);

// 初始化学号
const userId = userStore.username;

// const initialImage = ;

const files = ref([{ url: userStore.userData.user_headshot }]);

// 生日弹出框
// const birthday_out = ref(false);

// 当前日期
const currentDate = ref(["2021", "01", "13"]);

// 年月日格式化
const columnsType = ["year", "month", "day"];

const minDate = new Date(2000, 0, 1);
const maxDate = new Date(2023, 5, 1);

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
const baseUserData = async () => {
  const res = await getUserData();
  data.value = res.data;
};
// 调用
baseUserData();

// 初始化页面
data.value = userStore.userData;

// 年月日格式化代码
const formatter = (type, option) => {
  if (type === "year") {
    option.text += "年";
  }
  if (type === "month") {
    option.text += "月";
  }
  if (type === "day") {
    option.text += "日";
  }
  return option;
};

// 生日弹层
// const showBirthday = () => {
//   // 定义一个中间值
//   birthday_out.value = true;
// };

// 更新生日
// const updateCurrentDate = async value => {
//   // 当前值修改为被选的值
//   currentDate.value = value.selectedValues;
//   // 弹窗隐藏
//   birthday_out.value = false;
//   // 将修改后的数据传到后端
//   userStore.submitHeadshot(currentDate.value);
//   window.location.reload();
// };

// 更新头像
const updataUserHeadshot = () => {
  const formData = new FormData();
  // 将当前最新的数据提交到后端
  formData.append("file", files.value[0].file);
  userStore.submitHeadshot({ username: userId, user_headshot: formData });
};
</script>
<template>
  <!-- <router-view /> -->
  <!-- <router-view /> -->
  <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />

  <!-- 生日弹出层 -->
  <!-- <van-popup
    v-model:show="birthday_out"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <van-date-picker
      v-model="currentDate"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      :columns-type="columnsType"
      @confirm="updateCurrentDate"
    />
  </van-popup> -->

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
        <van-form>
        <!-- <p>面板显示高度 {{ height.toFixed(0) }} px</p> -->
        <van-form>
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

            <van-cell is-link @click="showBirthday">
              <template #title>
                <span class="custom-title">电子邮箱</span>
              </template>
              <template #value>
                <div class="both">{{ data.user_birthday }}</div>
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
        </van-form>
      </div>
      <template #header> dada </template>
    </van-floating-panel>
  </div>
</template>

<style scoped>
/* .van-floating-panel {
  position: relative;
} */
.userImg {
  position: absolute;
  top: -45px;
  left: 146px;
  z-index: 10;
}
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
