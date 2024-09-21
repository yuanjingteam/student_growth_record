<script setup>
import { useRouter } from "vue-router";
import { defineProps, ref } from "vue";
import { articleDeleteService, articleChangeState } from "@/api/article";
import { showSuccessToast, showToast } from "vant";
import { formattedContent } from "@/utils/functions/modules/formattedContent";

const props = defineProps({
  article: Object,
  state: {
    // 非必传
    required: false
  },
  isban: Boolean
});
const emit = defineEmits(["informRefresh"]);

const router = useRouter();
//获取传过来的帖子id
const articleId = props.article.article_id;

const loading = ref(false); // 关闭 loading 效果

//跳转到帖子详情页
const gotoArticleDetail = () => {
  router.push(`/postDetail/${articleId}`);
};

const midState = ref(false);
const midContent = ref();
midState.value = props.state;
midContent.value = midState.value === true ? "公开" : "私密";

const showPopover = ref(false);
const actions = [{ text: "公开" }, { text: "私密" }, { text: "删除" }];

// 公开
const isPublic = async () => {
  try {
    await articleChangeState({
      article_id: articleId,
      article_status: !midState.value
    });
    loading.value = false; // 关闭 loading 效果
    showSuccessToast("修改成功!");
    midState.value = !midState.value;
    midContent.value = midState.value === true ? "公开" : "私密";
    emit("informRefresh");
  } catch {
    loading.value = false; // 关闭 loading 效果
    showToast("修改文章状态失败,请稍后重试");
  }
};

// 删除
const isDelete = async () => {
  try {
    await articleDeleteService({ article_id: articleId });
    loading.value = false; // 关闭 loading 效果
    showToast("删除成功");
    emit("informRefresh");
  } catch {
    loading.value = false; // 关闭 loading 效果
    showToast("删除失败,请稍后重试");
  }
};

const showDelete = ref(false);
const showState = ref(false);
const message = ref("");
// 选择选项
const onSelect = async item => {
  if (item.text == midContent.value) {
    return;
  }
  if (item.text === "删除") {
    showDelete.value = true;
    message.value = "确定删除文章吗？";
  } else if (item.text === "公开") {
    message.value = "确定公开文章吗？";
    showState.value = true;
  } else {
    //隐藏
    message.value = "确定隐藏文章吗？";
    showState.value = true;
  }
};

//确定删除
const confirmDelete = () => {
  loading.value = true;
  isDelete();
};
//确定公开/隐藏
const confirmState = () => {
  loading.value = true;
  isPublic();
};
</script>

<template>
  <div class="cell">
    <van-overlay :show="loading" z-index="100">
      <van-loading vertical style="justify-content: center; height: 100%">
        <template #icon>
          <van-icon name="star-o" size="30" />
        </template>
        加载中...
      </van-loading>
    </van-overlay>
    <van-card>
      <template #tags>
        <!-- 如果有状态属性,说明可以设置文章状态 -->
        <div v-if="state !== 'other'" class="shows">
          <van-popover
            v-model:show="showPopover"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <div class="more">
                <span>{{ midContent }}</span>
                <span>
                  <i-icon icon="ant-design:more-outlined" />
                </span>
              </div>
            </template>
          </van-popover>
        </div>
        <div class="article_title">
          <i-icon icon="icon-park:topic" />
          {{ article.article_topic }}
        </div>
        <van-text-ellipsis
          rows="4"
          :content="formattedContent(props.article.article_content)"
          @click="gotoArticleDetail()"
        />
        <div class="info-box">
          <div>{{ article.post_time }}发布</div>
        </div>
      </template>
      <template #footer>
        <div class="litle_tag">
          <button
            v-for="(item, index) in article.article_tags"
            :key="index"
            class="btn"
          >
            <i-icon icon="icon-park:message" />
            <span class="btn-title">#{{ item }}</span>
          </button>
        </div>
        <span v-if="isban" class="ban">
          <i-icon class="ban-icon" icon="ph:warning-diamond-fill" />
          该文章已被封禁
        </span>
        <van-button size="mini" icon="good-job-o">{{
          article.like_amount
        }}</van-button>
        <van-button size="mini" icon="comment-o">{{
          article.collect_amount
        }}</van-button>
        <van-button size="mini" icon="star-o">{{
          article.comment_amount
        }}</van-button>
      </template>
    </van-card>
  </div>
  <van-dialog
    v-model:show="showState"
    title="提示"
    :message="message"
    show-cancel-button
    showConfirmButton
    @confirm="confirmState"
  />
  <van-dialog
    v-model:show="showDelete"
    title="提示"
    :message="message"
    show-cancel-button
    showConfirmButton
    @confirm="confirmDelete"
  />
  <van-dialog
    v-model:show="showState"
    title="提示"
    :message="message"
    show-cancel-button
    showConfirmButton
    @confirm="confirmState"
  />
</template>

<style lang="less" scoped>
.article_title {
  border-radius: 10px;
  padding: 0 5px;
  font-size: 16px;
  margin-bottom: 15px;
}
.shows {
  position: absolute;
  right: 10px;
}
.more {
  background-color: #e5edff;
  font-size: 13px;
  border-radius: 5px;
  padding: 2px 0px 0px 4px;
  text-align: center;

  svg {
    width: 20px;
    height: 18px;
    vertical-align: top;
  }
}
.cell {
  padding: 0 8px;

  .van-card {
    background-color: #fff;
    border-radius: 15px;
    margin-top: 10px;
    padding: 20px;

    .info-box {
      display: flex;
      margin-bottom: 13px;
    }

    .van-text-ellipsis {
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 500;
    }
    .litle_tag {
      display: flex;
      justify-content: flex-start;
      font-size: 14px;
      margin-bottom: 8px;
      span {
        text-align: start;
        width: 70px;
      }

      .btn {
        background-color: rgba(0, 81, 255, 0.1);
        border-radius: 10px;
        padding: 0 10px;
        .btn-title {
          color: rgba(0, 81, 255);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .van-button {
      border: none;
      font-size: 13px;
      color: rgba(203, 202, 204, 1);
    }
  }
}
.ban {
  float: left;
  margin-right: 10px;
  font-size: 14px;
}
.ban-icon {
  vertical-align: top;
  color: red;
  width: 20px;
  height: 20px;
}
</style>
