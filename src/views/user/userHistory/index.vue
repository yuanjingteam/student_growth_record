<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { getUserHistory } from "@/api/user";
import { ref } from "vue";
import { showToast } from "vant";
import { formattedContent } from "@/utils/functions/modules/formattedContent";

const userStore = useUserStore();
const router = useRouter();
const myname = userStore.userData.username;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1);

const userHistory = ref([]);
const myHistory = async () => {
  try {
    const { data } = await getUserHistory({
      username: myname,
      page: page.value++,
      limit: 10
    });
    userHistory.value = [...userHistory.value, ...data.history];
    if (data.history.length == 0) {
      finished.value = true;
    }
  } catch (error) {
    console.log(error);

    finished.value = true;
  }
};
myHistory();
const onLoad = async () => {
  if (refreshing.value) {
    userHistory.value = [];
    page.value = 1;
    refreshing.value = false;
  }
  await myHistory();
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
    left-text="返回"
    title="浏览记录"
    left-arrow
    fixed
    placeholder
    z-index="3"
    @click-left="router.go(-1)"
  />
  <div class="main">
    <van-pull-refresh
      v-if="userHistory.length > 0"
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
        <van-cell-group v-for="(item, index) in userHistory" :key="index">
          <van-cell @click="router.push(`/postDetail/${item.article_id}`)">
            <template #title
              >{{ item.name }}
              <div class="content">
                <van-text-ellipsis
                  rows="2"
                  :content="formattedContent(item.article_content)"
                />
                <p class="remark">
                  <!-- <span>{{ item.name }}</span> -->
                  <span
                    ><i-icon icon="mage:thumbs-up" />{{
                      item.like_amount
                    }}</span
                  >
                  <span
                    ><i-icon icon="lets-icons:comment" />{{
                      item.comment_amount
                    }}</span
                  >
                </p>
              </div>
            </template>
            <template #icon>
              <van-image
                round
                width="3rem"
                height="3rem"
                :src="item.user_headshot"
              />
            </template>
            <template #right-icon>
              <van-image
                v-if="item.article_pic"
                :src="item.article_pic"
                class="right"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-empty
      v-else
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      :image-size="80"
      description="暂无浏览记录"
    />
  </div>
  <van-back-top bottom="100px" />
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
.right {
  width: 110px;
  height: 90px;
  object-fit: cover;
}
.van-image {
  margin: 0 10px 0 5px;
}
.remark {
  margin: 5px 0 2px;
  font-size: 12px;
  font-weight: 700;
  span {
    margin: 0 2px;
  }
}
.van-empty {
  width: 100vw;
  height: 100vh;
}
</style>
