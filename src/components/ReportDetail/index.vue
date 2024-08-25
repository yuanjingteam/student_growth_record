<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { articleBanService, articleIgnoreService } from "@/api/article";
import { readEmailNotice } from "@/api/user";
import { showSuccessToast, showToast } from "vant";
const props = defineProps({
  articleBan: Object
});
const emit = defineEmits(["report"]);
const articleId = props.articleBan.article_id;
const activeNames = ref(["0"]);
const router = useRouter();

const gotoArticle = () => {
  router.push(`/postDetail/${articleId}`);
};
//是否展示提示框
const showTip = ref(false);
//提示框信息
const message = ref("");
//是否封禁该帖子
const ban = ref(false);
//操作帖子
const dealReport = msg => {
  message.value = `您确定对该帖子进行${msg}操作吗?`;
  showTip.value = true;
  if (msg == "封禁") {
    ban.value = true;
  } else {
    ban.value = false;
  }
};

// 已处理帖子
const checkEmaill = async () => {
  await readEmailNotice({ article_id: props.articleBan.article_id });
};
//处理帖子
const confirmDeal = async () => {
  try {
    if (ban.value == true) {
      const res = await articleBanService({
        article_id: articleId,
        article_ban: true
      });
      showSuccessToast("封禁成功");
    } else {
      const res = await articleIgnoreService({ article_id: articleId });
      showSuccessToast("不处理成功");
    }
    checkEmaill();
    emit("report");
  } catch {
    showToast("修改失败,请稍后重试");
  }
};
</script>

<template>
  <van-cell-group inset>
    <van-cell title="举报文章" is-link @click="gotoArticle()">
      <template #label>
        <van-text-ellipsis rows="1" :content="articleBan.article_content" />
      </template>
    </van-cell>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="举报理由" name="1">
        <div v-for="(item, index) in articleBan.report_content" :key="index">
          <van-tag type="warning">{{ item.report_time }}</van-tag>
          <van-text-ellipsis
            rows="1"
            :content="item.report_msg"
            expand-text="展开"
            collapse-text="收起"
          />
        </div>
      </van-collapse-item>
    </van-collapse>

    <div class="dealbtn">
      <van-button type="primary" text="不处理" @click="dealReport('不处理')" />
      <van-button type="primary" text="封禁" @click="dealReport('封禁')" />
    </div>
    <van-divider>对该帖子的处理操作</van-divider>
  </van-cell-group>
  <van-dialog
    v-model:show="showTip"
    title="提示"
    :message="message"
    show-cancel-button
    show-confirm-button
    @confirm="confirmDeal()"
  />
</template>

<style scoped>
.van-cell-group {
  margin-top: 20px;
  overflow: hidden;
}
.dealbtn {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  .van-button {
    width: 100px;
    height: 30px;
  }
}
</style>
