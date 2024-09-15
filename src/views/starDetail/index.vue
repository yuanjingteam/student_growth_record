<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  getClassStar,
  getGradeStar,
  getSchoolStar,
  getMStarService
} from "@/api/star";

const router = useRouter();

//判断是否为最新展示
const ifNewShow = ref(false);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1);

const list = reactive([
  {
    id: "1",
    title: "班级",
    name: "班级"
  },
  {
    id: "2",
    title: "年级",
    name: "年级"
  },
  {
    id: "3",
    title: "校级",
    name: "校级"
  }
]);

const minDate = ref();
const maxDate = ref();
//获取起止时间
const getMStar = async () => {
  const { data } = await getMStarService();
  maxDate.value = new Date(data.maxDate);
  minDate.value = new Date(data.minDate);
};
getMStar();

//记录展示的时间
const dateStartShow = ref("");
const dateEndShow = ref("");
//检索成长之星数据
const starData = reactive({
  startTime: "",
  endTime: "",
  page: 1,
  limit: 500
});

//成长之星列表
const starList = ref([]);

//tab内容
const activeName = ref("班级");

//获取班级成长之星
const getClassStarList = async () => {
  try {
    const { data } = await getClassStar(starData);
    starList.value = [...starList.value, ...data.starlist];
    page.value++;
    if (data.starlist.length == 0) {
      finished.value = true;
    }
  } catch (error) {
    console.log(error);
    finished.value = true;
  }
};

//获取年级成长之星
const getGradeStarList = async () => {
  try {
    const { data } = await getGradeStar(starData);
    starList.value = [...starList.value, ...data.starlist];
    page.value++;
    if (data.starlist.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};
//获取校级成长之星
const getSchoolStarList = async () => {
  try {
    const { data } = await getSchoolStar(starData);
    starList.value = [...starList.value, ...data.starlist];
    page.value++;

    if (data.starlist.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};

watch(activeName, (newValue, oldValue) => {
  ifNewShow.value = false;
  starData.startTime = "";
  starData.endTime = "";
  // 监听activeName,触发不同的接口请求,更新数据
  // 监听activeName,触发不同的接口请求,更新数据
  finished.value = false;
  page.value = 1;
  starList.value = [];
});

//绑定日历组件
const calendarRef = ref(null);
//是否展示日历
const showCalendar = ref(false);
//选择起止时间
const chooseTime = () => {
  showCalendar.value = true;
};

const onConfirm = () => {
  //关闭日历弹窗
  showCalendar.value = false;
  //渲染开始和结束时间
  dateStartShow.value = formatDate(calendarRef.value.getSelectedDate()[0]);
  dateEndShow.value = formatDate(calendarRef.value.getSelectedDate()[1]);
  ifNewShow.value = true;
  //完善当前数据

  starData.startTime = formatDate2(calendarRef.value.getSelectedDate()[0]);
  starData.endTime = formatDate2(calendarRef.value.getSelectedDate()[1]);
  starData.page = 1;
  //根据当前重新发送请求
  // if (activeName.value == "班级") {
  //   getClassStarList();
  // } else if (activeName.value == "年级") {
  //   getGradeStarList();
  // } else {
  //   getSchoolStarList();
  // }
};

//xxxx年xx月xx日
function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object");
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的月份是 0 到 11，因此需要 +1
  const day = date.getDate();

  // 格式化为两位数
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  return `${year}年${formattedMonth}月${formattedDay}日`;
}
//xxxx-xx-xx格式
function formatDate2(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  const day = String(date.getDate()).padStart(2, "0"); // 日期前补零

  return `${year}-${month}-${day}`;
}

const onLoad = async () => {
  if (refreshing.value) {
    starList.value = [];
    page.value = 1;
    refreshing.value = false;
  }
  if (activeName.value == "班级") {
    getClassStarList();
  } else if (activeName.value == "年级") {
    getGradeStarList();
  } else {
    getSchoolStarList();
  }
  console.log(page.value, 31313);
  loading.value = false;
};

// 刷新列表
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<template>
  <van-nav-bar
    title="成长之星公示"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <div class="title" @click="chooseTime">
    <span v-if="!ifNewShow">最新评选</span>
    <span v-else>{{ dateStartShow }}-{{ dateEndShow }}</span>
  </div>
  <van-calendar
    ref="calendarRef"
    v-model:show="showCalendar"
    :min-date="minDate"
    :max-date="maxDate"
    type="range"
    @confirm="onConfirm"
  />

  <van-tabs v-model:active="activeName" swipeable sticky>
    <van-tab
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    >
      <van-pull-refresh
        v-model="refreshing"
        style="min-height: 100vh"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid v-if="starList" :gutter="10">
            <van-grid-item
              v-for="item in starList"
              :key="item"
              @click="router.push(`/otherInfo/${item.username}`)"
            >
              <div class="star-box">
                <van-image
                  fit="cover"
                  round
                  :lazy-load="true"
                  :src="
                    item.user_headshot ||
                    'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
                  "
                />
                <p>{{ item.name }}</p>
              </div>
            </van-grid-item>
          </van-grid>

          <van-empty v-else description="暂时还没有符合的人选哦" />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<style scoped>
.van-grid {
  margin-top: 20px;
}

.star-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-image {
    width: 50px;
    height: 50px;
  }
  p {
    margin-top: 10px;
  }
}

.van-tabs {
  min-height: 100%;
}
.van-tabs >>> .van-tabs__content {
  height: 100%;
  background-color: #f0f1f5;
}

.title {
  height: 30px;
  font-size: 16px;
  display: flex;
  line-height: 35px;
  justify-content: space-around;
}
</style>
