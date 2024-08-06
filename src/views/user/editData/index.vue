<script setup>
import { reactive, ref } from "vue";
import { changeUserData } from "@/api/user";
// 导入自定义的 useCounterStoreHook 函数,该函数返回 Pinia 中的 useCounterStore 实例
import { useCounterStoreHook } from "@/store/modules/useConter";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 调用 useCounterStoreHook 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useCounterStoreHook();
const userId = userStore.userId;

const anchors = [Math.round(0.8 * window.innerHeight)];
const height = ref(anchors[0]);

// 生日弹出框
const birthday_out = ref(false);

//个签弹出框
const motto_out = ref(false);

// 当前日期
const currentDate = ref(["2021", "01", "13"]);

// 年月日格式化
const columnsType = ["year", "month", "day"];

const minDate = new Date(2000, 0, 1);
const maxDate = new Date(2023, 5, 1);

const data = reactive({
  name: "小明",
  class: "教育222",
  phone: 18893462838,
  motto: "都完全签订日期当前地区",
  gender: "男",
  birthday: currentDate.value.join("-")
});

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

// 生日弹层响应
const showBirthday = () => {
  birthday_out.value = true;
};

// 个性签名弹出层
const showMotto = () => {
  motto_out.value = true;
};

const updateCurrentDate = async value => {
  console.log(value.selectedValues);
  currentDate.value = value.selectedValues;
  birthday_out.value = false;
  // 将修改后的数据传到后端
  const { data } = await changeUserData({ username: userId });
  if (code == 200) {
    // 更新页面数据为最新
    refreshPage();
  }
};
</script>
<template>
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

  <!-- 个签弹出层 -->
  <van-dialog v-model:show="motto_out" title="编辑个签" show-cancel-button>
    <van-field
      v-model="data.motto"
      placeholder="发表你的个性签名吧"
      maxlength="20"
      :autosize="{ minHeight: 30, maxHeight: 50 }"
      show-word-limit
      autocomplete="off"
      type="textarea"
    >
      <template #label>
        <i-icon icon="twemoji:sun" />
      </template>
    </van-field>
  </van-dialog>

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
        <p>面板显示高度 {{ height.toFixed(0) }} px</p>
        <van-form @submit="onSubmit">
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
                <div class="both">{{ data.gender }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <span class="custom-title">班级</span>
              </template>
              <template #value>
                <div class="both">{{ data.class }}</div>
              </template>
            </van-cell>
            <van-cell is-link @click="showMotto">
              <template #title>
                <span class="custom-title">个性签名</span>
              </template>
              <template #value>
                <div class="both over">{{ data.motto }}</div>
              </template>
            </van-cell>
            <van-cell is-link @click="showBirthday">
              <template #title>
                <span class="custom-title">生日</span>
              </template>
              <template #value>
                <div class="both">{{ data.birthday }}</div>
              </template>
            </van-cell>
            <van-cell>
              <template #title>
                <span class="custom-title">入学年份</span>
              </template>
              <template #value>
                <div class="both">{{ data.birthday }}</div>
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
