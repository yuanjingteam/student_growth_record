<script setup>
import { getUserTracks } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const myname = userStore.userData.name;
const headshot = userStore.userData.user_headshot;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(0);
const inter_info = ref([]);

const getTracks = async () => {
  try {
    const { data } = await getUserTracks({
      username: myname,
      page: page.value++
    });
    inter_info.value = [...inter_info.value, ...data.inter_info];
  } catch {
    console.error("获取我的足迹失败");
    finished.value = true;
  }
};

const onLoad = async () => {
  if (refreshing.value) {
    inter_info.value = [];
    page.value = 0;
    refreshing.value = false;
  }
  await getTracks();
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
    title="我的足迹"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group v-for="item in inter_info" :key="item.article_id" inset>
        <van-cell center>
          <template #title>
            <div v-if="item.i_type == '点赞'">{{ myname }} 赞了文章</div>
            <div v-else>{{ myname }} 发表了评论</div>
          </template>
          <template #label>{{ item.i_time }}</template>
          <template #icon>
            <van-image round width="3rem" height="3rem" :src="headshot" />
          </template>
        </van-cell>
        <div v-if="item.i_type == '评论'" class="comment">
          <van-text-ellipsis
            rows="2"
            :content="item.content"
            expand-text="展开"
            collapse-text="收起"
          />
        </div>
        <van-cell center>
          <template #title>
            <div
              class="content"
              @click="router.push(`/postDetail/${item.article_id}`)"
            >
              <van-text-ellipsis rows="2" :content="item.article_content" />
              <p class="remark">
                <span>{{ item.name }}</span>
                <span><i-icon icon="ph:eye-bold" />{{ item.like_total }}</span>
                <span
                  ><i-icon icon="lets-icons:comment" />{{
                    item.comment_amount
                  }}</span
                >
              </p>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </van-pull-refresh>
</template>
<style scoped>
.comment {
  margin: 0 20px;
}
.van-cell-group {
  border: 1px solid;
  margin-bottom: 10px;
}
.van-image {
  margin-right: 13px;
}

.content {
  background-color: pink;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
}
.remark {
  margin: 5px 0 2px;
  font-size: 12px;
  font-weight: 700;
  span {
    margin: 0 2px;
  }
}
</style>
