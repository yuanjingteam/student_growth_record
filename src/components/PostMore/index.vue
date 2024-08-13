<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  articleUpvoteService,
  articleCollectService,
  articleCommentService,
  articleReportService,
  articleBanService
} from "@/api/article";
const props = defineProps({
  data: Object,
  articleId: String
});
const router = useRouter();
const route = useRoute();

// 防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
//是否展示评论输入框
const showCommentTable = ref(false);
//是否点赞
const ifLike = ref(false);
//是否收藏
const ifCollect = ref(false);
//点击三个点是否展示选择框
const showPopover = ref(false);
//选择框内容
const actions = [{ text: "举报" }, { text: "封禁" }];
//是否打开举报框
const showReport = ref(false);
//是否封禁
const showBan = ref(false);
//确认封禁
const confirmBan = async () => {
  const res = await articleBanService({
    article_id: props.articleId,
    article_ban: true
  });
  console.log(res);
  router.push("/demo");
};

//选中选择框后
const select = (action, index) => {
  if (action.text == "举报") {
    showReport.value = !showReport.value;
  } else if (action.text == "封禁") {
    showBan.value = !showBan.value;
  }
};
//评论信息
const comment = ref();
//举报理由
const report = ref();

//点赞文章
const likeBtn = async state => {
  ifLike.value = !state;
  const res = await articleUpvoteService({
    id: props.articleId,
    like_type: 0
  });
  console.log(res);
};
// 创建防抖后的点赞
const debouncedLike = debounce(likeBtn, 400);

//收藏文章
const collectBtn = async state => {
  ifCollect.value = !state;
  const res = await articleCollectService({
    id: props.articleId
  });
  console.log(res);
};
// 创建防抖后的收藏
const debouncedCollect = debounce(collectBtn, 400);
//评论文章
const commentBtn = () => {
  comment.value = "";
  showCommentTable.value = !showCommentTable.value;
};
//评论校验
const commentRef = ref();
//举报理由校验
const reportRef = ref();
//提交评论
const submitComment = async () => {
  await commentRef.value.validate();
  showCommentTable.value = !showCommentTable.value;
  const res = await articleCommentService();
  console.log(res);
};
//提交举报理由
const submitReport = async () => {
  await reportRef.value.validate();
  const res = await articleReportService({
    article_id: props.articleId,
    report_msg: report.value
  });
  console.log(res);
  report.value = "";
  showReport.value = !showReport.value;
};
</script>

<template>
  <van-cell-group v-if="route.name == 'PostDetail'">
    <div class="cell">
      <van-card>
        <template #tags>
          <div class="info-box">
            <van-image round :src="data.user_headshot" />
            <div class="info">
              <div style="display: flex; justify-content: space-between">
                <p class="name">{{ data.name }}</p>
                <van-popover
                  v-model:show="showPopover"
                  theme="dark"
                  :actions="actions"
                  placement="left"
                  @select="select"
                >
                  <template #reference>
                    <i-icon icon="ant-design:more-outlined" />
                  </template>
                </van-popover>
              </div>
              <p class="grade">{{ data.user_class }}</p>
            </div>
          </div>
          <p class="post-content">{{ data.article_content.article_text }}</p>
          <div>
            <button class="btn">
              <i-icon icon="icon-park:message" />
              <p class="btn-title">{{ data.tag_name }}</p>
            </button>
          </div>
          <p class="time">{{ data.post_time }}</p>
        </template>
        <template #footer>
          <div class="btn-box">
            <van-button
              v-if="!ifCollect"
              size="mini"
              icon="star-o"
              @click="debouncedCollect(ifCollect)"
              >{{ data.article_collect_sum }}</van-button
            >
            <van-button
              v-else
              size="mini"
              icon="star-o"
              color="#3371d3"
              @click="debouncedCollect(ifCollect)"
              >{{ data.article_collect_sum + 1 }}</van-button
            >
            <van-button size="mini" icon="comment-o" @click="commentBtn()">{{
              data.article_comment_sum
            }}</van-button>
            <van-action-sheet v-model:show="showCommentTable" title="发布评论">
              <div class="content">
                <van-cell-group inset>
                  <van-form ref="commentRef">
                    <van-field
                      v-model="comment"
                      rows="2"
                      autosize
                      type="textarea"
                      maxlength="70"
                      placeholder="请输入您的评论信息"
                      show-word-limit
                      :rules="[{ required: true, message: '评论信息不能为空' }]"
                    />
                  </van-form>
                </van-cell-group>
                <van-button round block type="primary" @click="submitComment()">
                  提交
                </van-button>
              </div>
            </van-action-sheet>
            <van-button
              v-if="!ifLike"
              size="mini"
              icon="good-job-o"
              @click="debouncedLike(ifLike)"
              >{{ data.article_like_sum }}</van-button
            >
            <van-button
              v-else
              size="mini"
              icon="good-job-o"
              color="#3371d3"
              @click="debouncedLike(ifLike)"
              >{{ data.article_like_sum + 1 }}</van-button
            >
          </div>
        </template>
      </van-card>
    </div>
  </van-cell-group>
  <div v-else class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            :src="data.user_headshot"
            @click="router.push(`/otherInfo/${data.username}`)"
          />
          <div class="info">
            <div style="display: flex; justify-content: space-between">
              <p class="name">{{ data.name }}</p>
              <van-popover
                v-model:show="showPopover"
                theme="dark"
                :actions="actions"
                placement="left"
                @select="select"
              >
                <template #reference>
                  <i-icon icon="ant-design:more-outlined" />
                </template>
              </van-popover>
            </div>
            <p class="grade">{{ data.user_class }}</p>
          </div>
        </div>
        <p class="post-content">{{ data.article_content.article_text }}</p>
        <div>
          <button class="btn">
            <i-icon icon="icon-park:message" />
            <p class="btn-title">{{ data.tag_name }}</p>
          </button>
        </div>
        <p class="time">{{ data.post_time }}</p>
      </template>
      <template #footer>
        <div class="btn-box">
          <van-button
            v-if="!ifCollect"
            size="mini"
            icon="star-o"
            @click="collectBtn(ifCollect)"
            >{{ data.article_collect_sum }}</van-button
          >
          <van-button
            v-else
            size="mini"
            icon="star-o"
            color="#3371d3"
            @click="collectBtn(ifCollect)"
            >{{ data.article_collect_sum + 1 }}</van-button
          >
          <van-button size="mini" icon="comment-o" @click="commentBtn()">{{
            data.article_comment_sum
          }}</van-button>
          <van-action-sheet v-model:show="showCommentTable" title="发布评论">
            <div class="content">
              <van-cell-group inset>
                <van-form>
                  <van-field
                    v-model="comment"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="70"
                    placeholder="请输入您的评论信息"
                    show-word-limit
                    :rules="[{ required: true, message: '评论信息不能为空' }]"
                  />
                </van-form>
              </van-cell-group>
              <van-button round block type="primary" @click="submitComment()">
                提交
              </van-button>
            </div>
          </van-action-sheet>
          <van-button
            v-if="!ifLike"
            size="mini"
            icon="good-job-o"
            @click="likeBtn(ifLike)"
            >{{ data.article_like_sum }}</van-button
          >
          <van-button
            v-else
            size="mini"
            icon="good-job-o"
            color="#3371d3"
            @click="likeBtn(ifLike)"
            >{{ data.article_like_sum + 1 }}</van-button
          >
        </div>
      </template>
    </van-card>
  </div>
  <van-popup
    v-model:show="showReport"
    round
    closeable
    :style="{ padding: '25px' }"
  >
    <van-cell-group inset>
      <van-form ref="reportRef">
        <van-field
          v-model="report"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入您的举报理由"
          show-word-limit
          :rules="[{ required: true, message: '举报理由不能为空' }]"
        />
      </van-form>
    </van-cell-group>
    <van-button round block type="primary" @click="submitReport()">
      提交
    </van-button>
  </van-popup>
  <van-dialog
    v-model:show="showBan"
    title="提示"
    message="您确定要封禁当前帖子吗？"
    show-cancel-button
    showConfirmButton
    @confirm="confirmBan"
  />
</template>

<style scoped lang="less">
.cell {
  .van-card {
    background-color: #fff;
    padding: 20px;

    .info-box {
      display: flex;
      margin-bottom: 10px;

      .van-image {
        margin-right: 15px;
        width: 40px;
        height: 40px;
      }

      .info {
        width: 100%;

        .name {
          font-size: 16px;
        }

        .grade {
          font-size: 12px;
          color: rgba(203, 202, 204, 1);
        }

        .i-icon {
          font-size: 25px;
          color: rgba(166, 168, 173, 1);
        }
      }
    }

    .post-content {
      margin-bottom: 20px;
      font-weight: 500;
      font-size: 15px;
      font-weight: 500;
    }

    .btn {
      float: left;
      display: flex;
      width: 85px;
      height: 23px;
      background-color: rgba(0, 81, 255, 0.1);
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .btn-title {
        color: rgba(0, 81, 255);
      }
    }

    .van-button {
      border: none;
      font-size: 18px;
    }

    .btn-box {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .time {
      margin-left: 250px;
      font-size: 12px;
      color: rgba(166, 168, 173, 1);
    }
  }
}

.van-cell-group {
  margin-top: 10px;
}
.content {
  padding: 16px 16px 160px;
}
</style>
