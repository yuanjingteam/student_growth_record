<script setup>
import { getUserClass } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const userClass = ref({
  teacher_total: [
    {
      username: 0,
      user_headshot: "",
      name: "小明"
    }
  ],
  student_total: [
    {
      username: 0,
      user_headshot: "",
      name: "小李"
    }
  ]
});
const getclass = async () => {
  const { data } = await getUserClass({ username: username });
  userClass.value = data;
};
getclass();
</script>
<template>
  <van-nav-bar
    title="我的班级"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <div class="main">
    <div v-if="userClass.teacher_total">
      <p class="title">教师</p>
      <van-cell-group>
        <van-cell
          v-for="(item, index) in userClass.teacher_total"
          :key="index"
          @click="userStore.otherSwitch(item.username)"
        >
          <template #title>{{ item.name }}</template>
          <template #icon>
            <van-image
              round
              width="3rem"
              height="3rem"
              :src="item.user_headshot"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-if="userClass.student_total">
      <p class="title">学生</p>
      <van-cell-group>
        <van-cell
          v-for="(item, index) in userClass.student_total"
          :key="index"
          @click="userStore.otherSwitch(item.username)"
        >
          <template #title>{{ item.name }}</template>
          <template #icon>
            <van-image
              round
              width="3rem"
              height="3rem"
              :src="item.user_headshot"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<style>
/* .main {
  margin: 0 10px;
} */
.title {
  padding: 10px 20px;
  background-color: #f7f8fa;
}
.van-cell .van-cell__title {
  line-height: 40px;
  margin-left: 10px;
}
</style>
