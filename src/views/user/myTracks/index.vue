<script setup>
import { getUserTracks } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const myname = userStore.username;
const headshot = userStore.userData.user_headshot;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1);
const inter_info = ref([]);

const getTracks = async () => {
  try {
    const { data } = await getUserTracks({
      username: myname,
      page: page.value++,
      limit: 10
    });
    inter_info.value = [...inter_info.value, ...data.inter_info];
    if (data.inter_info.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
    inter_info.value = [];
  }
};
getTracks();
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
    left-text="返回"
    left-arrow
    fixed
    placeholder
    z-index="3"
    @click-left="router.push('/user')"
  />
  <div class="main">
    <van-pull-refresh
      v-if="inter_info.length > 0"
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
              :content="item.comment_content"
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
                  <span
                    ><i-icon icon="ph:eye-bold" />{{ item.like_amount }}</span
                  >
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
    <van-empty
      v-else
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      :image-size="80"
      description="暂无更多"
    />
  </div>
  <van-back-top bottom="100px" />
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}

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
  background: linear-gradient(to right, #f0f9ff, #d1ecf1);
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
.van-empty {
  width: 100vw;
  height: 100vh;
}
</style>
