<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getClassStar, getGradeStar, getSchoolStar } from "@/api/star";

const router = useRouter();

//成长之星列表
const starList = ref([]);
//当前tab
const activeName = ref("班级");

//获取班级成长之星
const getClassStarList = async () => {
  const {
    data: { starlist }
  } = await getClassStar();
  starList.value = starlist;
};

//获取年级成长之星
const getGradeStarList = async () => {
  const {
    data: { starlist }
  } = await getGradeStar();
  starList.value = starlist;
};
//获取校级成长之星
const getSchoolStarList = async () => {
  const {
    data: { starlist }
  } = await getSchoolStar();
  starList.value = starlist;
};

watch(activeName, (newValue, oldValue) => {
  // 监听activeName,触发不同的接口请求,更新数据
  if (newValue == "班级") {
    getClassStarList();
  } else if (newValue == "年级") {
    getGradeStarList();
  } else {
    getSchoolStarList();
  }
});

onMounted(() => {
  // 数据初始化
  getClassStarList();
});

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
</script>

<template>
  <van-nav-bar
    title="成长之星公示"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-tabs v-model:active="activeName" swipeable sticky>
    <van-tab
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :name="item.name"
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
  height: 100%;
}
.van-tabs >>> .van-tabs__content {
  height: 100%;
  background-color: #f0f1f5;
}
</style>
