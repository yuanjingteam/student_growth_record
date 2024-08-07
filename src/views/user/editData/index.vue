<script setup>
import { reactive, ref } from "vue";
import { changeUserData, getUserData } from "@/api/user";
// 导入自定义的 useUserStore 函数,该函数返回 Pinia 中的 useCounterStore 实例
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 调用 useUserStore 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useUserStore();
const userId = userStore.userId;

const anchors = [Math.round(0.8 * window.innerHeight)];
const height = ref(anchors[0]);

// 生日弹出框
const birthday_out = ref(false);

// 当前日期
const currentDate = ref(["2021", "01", "13"]);

// 年月日格式化
const columnsType = ["year", "month", "day"];

const minDate = new Date(2000, 0, 1);
const maxDate = new Date(2023, 5, 1);

const data = ref({
  name: "小明",
  user_class: "教育222",
  user_gender: "男",
  user_motto: "都完全签订日期当前地区",
  phone_number: 18893462838,
  user_email: "3240288774@qq.com",
  user_birthday: currentDate.value.join("-"),
  user_year: currentDate.value.join("-")
});
// 初始化页面
const baseUserData = async () => {
  const res = await getUserData();
  data.value = res.data;
};
// 调用
baseUserData();

// 刷新当前页面
const refreshPage = () => {
  window.location.reload();
};

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

// 定义一个中间变量存储改变之前的值，防止用户不更改
let mid = "";

// 生日弹层
const showBirthday = () => {
  mid = data.value.user_birthday;
  birthday_out.value = true;
};

// 更新当前日期
const updateCurrentDate = async value => {
  // 记录修改之前的值
  mid = value.selectedValues;

  currentDate.value = value.selectedValues;
  birthday_out.value = false;
  // 将修改后的数据传到后端
  submitChange();
};

// 提交修改后的数据
const submitChange = async () => {
  const { code } = await changeUserData({ username: userId });
  if (code == 200) {
    // 刷新页面数据为最新
    refreshPage();
  }
};
</script>
<template>
  <!-- <router-view /> -->
  <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />

  <!-- 生日弹出层 -->
  <van-popup
    v-model:show="birthday_out"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <!-- 生日弹层内容 -->
    <van-date-picker
      v-model="currentDate"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      :columns-type="columnsType"
      @confirm="updateCurrentDate"
    />
  </van-popup>

  <div class="main">
    <div class="bg">
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    </div>
    <van-floating-panel v-model:height="height" :anchors="anchors">
      <div class="userImg">
        <van-uploader>
          <van-image
            round
            width="7em"
            height="7rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
        </van-uploader>
      </div>
      <div>
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
                <div class="both">{{ data.user_email }}</div>
              </template>
            </van-cell>

            <van-cell is-link @click="showBirthday">
              <template #title>
                <span class="custom-title">生日</span>
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
  top: -60px;
  left: 130px;
  z-index: 10;
}
.custom-title {
  width: 10px;
}
.both {
  float: left;
}
.over {
  width: 150px;
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
</style>
