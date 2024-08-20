<script setup>
import { useRouter } from "vue-router";
import { defineProps, ref } from "vue";
import { articleDeleteService, articleChangeState } from "@/api/article";
import { showConfirmDialog, showSuccessToast } from "vant";
const props = defineProps({
  article: Object,
  state: {
    type: Boolean,
    // 非必传
    required: false
  }
});
const router = useRouter();
//获取传过来的帖子id
const articleId = props.article.article_id;
const loading = ref(false); // 关闭 loading 效果

//跳转到帖子详情页
const gotoArticleDetail = () => {
  router.push(`/postDetail/${articleId}`);
};

const midState = ref();
const midContent = ref();
midState.value = props.state;
midContent.value = midState.value === true ? "私密" : "公开";

const showPopover = ref(false);
const actions = [{ text: "公开" }, { text: "私密" }, { text: "删除" }];

// 公开
const isPublic = async () => {
  try {
    await articleChangeState();
    loading.value = false; // 关闭 loading 效果
    showSuccessToast("修改成功!");
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1.5秒后刷新页面
  } catch (error) {
    loading.value = false; // 关闭 loading 效果
    console.error("修改文章状态失败:", error);
    showToast("修改文章状态失败,请稍后重试");
  }
};

// 删除
const isDelete = async () => {
  try {
    await articleDeleteService();
    loading.value = false; // 关闭 loading 效果
    showSuccessToast("删除成功");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1500); // 1.5秒后刷新页面
  } catch (error) {
    loading.value = false; // 关闭 loading 效果
    console.error("删除文章失败:", error);
    showToast("删除失败,请稍后重试");
  }
};

// 选择选项
const onSelect = async item => {
  if (item.text == midContent.value) {
    return;
  }
  if (item.text === "删除") {
    showConfirmDialog({
      message: "确认要删除该文章吗?"
    })
      .then(async () => {
        loading.value = true; // 开启 loading 效果
        await isDelete({ articleId: articleId });
      })
      .catch(() => {
        // on cancel
      });
  } else if (item.text === "公开") {
    showConfirmDialog({
      message: "确认要公开该文章吗?"
    })
      .then(async () => {
        loading.value = true; // 开启 loading 效果
        await isPublic({
          articleId: articleId,
          article_status: midState
        });
      })
      .catch(() => {
        // on cancel
      });
  } else {
    showConfirmDialog({
      message: "确认要隐藏该文章吗?"
    })
      .then(async () => {
        loading.value = true; // 开启 loading 效果
        await isPublic({
          articleId: articleId,
          article_status: midState
        });
      })
      .catch(() => {
        // on cancel
      });
  }
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
        <div v-if="typeof state !== 'undefined'" class="shows">
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
        <div class="article_title">#{{ article.article_topic }}</div>
        <van-text-ellipsis
          rows="4"
          :content="article.article_content"
          @click="gotoArticleDetail()"
        />
        <div class="info-box">
          <div>{{ article.post_time }}发布</div>
        </div>
      </template>
      <template #footer>
        <div class="litle_tag">
          <span>文章话题：</span>
          <button
            v-for="(item, index) in article.article_tags"
            :key="index"
            class="btn"
          >
            <i-icon icon="icon-park:message" />
            <span class="btn-title">#{{ item }}</span>
          </button>
        </div>
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
</template>

<style lang="less" scoped>
.article_title {
  background-color: rgb(234, 239, 246);
  width: 80px;
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
      margin-bottom: 8px;
      span {
        text-align: start;
        width: 60px;
      }

      .btn {
        background-color: rgba(0, 81, 255, 0.1);
        border-radius: 10px;
        padding: 0 10px;
        margin: 0 5px;
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
</style>
