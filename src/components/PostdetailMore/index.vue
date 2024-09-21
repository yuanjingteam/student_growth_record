<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store";
import {
  articleUpvoteService,
  articleCollectService,
  articleCommentService,
  articleReportService,
  articleBanService,
  articleDeleteService
} from "@/api/article";
import { showFailToast, showSuccessToast } from "vant";
import { debounce } from "@/utils/functions";

const props = defineProps({
  post: Object,
  articleId: Number
});
const emit = defineEmits(["refreshComment"]);
//是否点赞
const ifLike = ref(false);
ifLike.value = props.post.is_like;
//是否收藏
const ifCollect = ref(false);
ifCollect.value = props.post.is_collect;
//点赞数量
const likeAmount = ref();
likeAmount.value = props.post.like_amount;
//收藏数量
const collectAmount = ref();
collectAmount.value = props.post.collect_amount;
//是否展示图片
const show = ref(false);
const index = ref(0);
const images = props.post.article_content.article_image;

const onChange = newIndex => {
  index.value = newIndex;
};
//点击图片事件
const showPics = i => {
  show.value = true;
  index.value = i;
};

//是否展示视频
const showVideo = ref(false);

const video = props.post.article_content.article_video;
const videos = [video];

//展示视频
const playVideo = () => {
  showVideo.value = true;
};

const router = useRouter();

const userStore = useUserStore();
//获取当前token
let token = userStore.token;

//未登录去登录弹窗
const showToLogin = ref(false);

//是否展示评论输入框
const showCommentTable = ref(false);

//点击三个点是否展示选择框
const showPopover = ref(false);
//选择框内容
let actions = [{ text: "举报" }, { text: "封禁" }, { text: "删除" }];

//是否打开举报框
const showReport = ref(false);
//是否封禁
const showBan = ref(false);
//确认封禁
const confirmBan = async () => {
  try {
    const res = await articleBanService({
      article_id: props.articleId,
      article_ban: true
    });
    console.log(res);
    showSuccessToast("已成功封禁该文章");
    router.push("/demo");
  } catch {
    showFailToast("您没有该权限");
  }
};

//选中选择框后
const select = (action, index) => {
  if (action.text == "举报") {
    if (token != "") {
      showReport.value = !showReport.value;
    } else {
      showToLogin.value = !showToLogin.value;
    }
  } else if (action.text == "封禁") {
    showBan.value = !showBan.value;
  } else if (action.text == "删除") {
    showDelete.value = !showDelete.value;
  }
};
//评论信息
const comment = ref();
//举报理由
const report = ref();

//点赞文章
const likeBtn = async state => {
  if (token != "") {
    ifLike.value = !state;
    if (ifLike.value) {
      likeAmount.value++;
    } else {
      likeAmount.value--;
    }
    const res = await articleUpvoteService({
      id: props.articleId,
      like_type: 0
    });
    console.log(res);
  } else {
    showToLogin.value = !showToLogin.value;
  }
};
// 创建防抖后的点赞
const debouncedLike = debounce(likeBtn, 400);

//收藏文章
const collectBtn = async state => {
  if (token != "") {
    ifCollect.value = !state;
    if (ifCollect.value) {
      collectAmount.value++;
    } else {
      collectAmount.value--;
    }
    const res = await articleCollectService({
      article_id: props.articleId
    });
    console.log(res);
  } else {
    showToLogin.value = !showToLogin.value;
  }
};
// 创建防抖后的收藏
const debouncedCollect = debounce(collectBtn, 400);
//评论文章
const commentBtn = () => {
  if (token != "") {
    comment.value = "";
    showCommentTable.value = !showCommentTable.value;
  } else {
    showToLogin.value = !showToLogin.value;
  }
};
//评论校验
const commentRef = ref({});
//举报理由校验
const reportRef = ref({});
//提交评论
const submitComment = async () => {
  await commentRef.value.validate();
  const res = await articleCommentService({
    comment_type: "0",
    id: props.articleId,
    comment_content: comment.value
  });
  console.log(res);
  showSuccessToast("发布评论成功");
  comment.value = "";
  showCommentTable.value = !showCommentTable.value;
  emit("refreshComment");
};
//提交举报理由
const submitReport = async () => {
  await reportRef.value.validate();
  try {
    const res = await articleReportService({
      article_id: props.articleId,
      report_msg: report.value
    });
    showSuccessToast("举报信息提交成功");
    console.log(res);
  } catch {
    showFailToast("已经举报过该文章");
  }

  report.value = "";
  showReport.value = !showReport.value;
};
//标志删除文章
const showDelete = ref(false);
//确认删除
const confirmDelete = async () => {
  const res = await articleDeleteService({
    article_id: props.articleId
  });
  console.log(res);
  showSuccessToast("已成功删除该文章");

  router.push("/demo");
};
//跳转进用户主页
const gotoUser = () => {
  if (props.post.username != "") {
    router.push(`/otherInfo/${props.post.username}`);
  } else {
    return;
  }
};
</script>

<template>
  <!-- <div ref="like" /> -->
  <van-image-preview
    v-model:show="show"
    :images="images"
    :startPosition="index"
    @change="onChange"
  />
  <van-image-preview
    v-model:show="showVideo"
    :images="videos"
    :close-on-click-image="false"
  >
    <template #image="{ src }">
      <video style="width: 100%" controls>
        <source :src="src" />
      </video>
    </template>
  </van-image-preview>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            :src="
              post.user_headshot
                ? post.user_headshot
                : 'https://picsum.photos/200/300'
            "
            @click="gotoUser"
          />
          <div class="info">
            <div style="display: flex; justify-content: space-between">
              <p class="name">{{ post.name ? post.name : "用户已被删除" }}</p>
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
            <p v-if="post.username != ''" class="grade">
              {{ post.user_class }}
            </p>
          </div>
        </div>
        <p class="post-content" v-html="post.article_content.article_text" />
        <div class="video-box">
          <ul class="video">
            <li
              v-for="(item, index) in images"
              :key="item"
              @click="showPics(index)"
            >
              <van-image :src="item" />
            </li>
            <li v-if="video != ''" class="video-content" @click="playVideo">
              <van-icon name="video-o" />
            </li>
          </ul>
        </div>
        <div v-for="(item, index) in post.article_tags" :key="index">
          <button class="btn">
            <i-icon icon="icon-park:message" />
            <p class="btn-title">
              {{ item }}
            </p>
          </button>
        </div>
        <p class="time2">{{ post.post_time }}</p>
      </template>

      <template #footer>
        <div class="btn-box">
          <van-button
            v-if="!ifCollect"
            size="mini"
            @click="debouncedCollect(ifCollect)"
            ><van-icon name="star-o" /><span>{{
              collectAmount
            }}</span></van-button
          >
          <van-button v-else size="mini" @click="debouncedCollect(ifCollect)"
            ><van-icon name="star" color="#3371d3" /><span
              style="color: #3371d3"
              >{{ collectAmount }}</span
            ></van-button
          >
          <van-button size="mini" icon="comment-o" @click="commentBtn()">{{
            post.comment_amount
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
          <van-button v-if="!ifLike" size="mini" @click="debouncedLike(ifLike)"
            ><van-icon name="good-job-o" /><span>{{
              likeAmount
            }}</span></van-button
          >
          <van-button v-else size="mini" @click="debouncedLike(ifLike)"
            ><van-icon name="good-job" color="#3371d3" /><span
              style="color: #3371d3"
              >{{ likeAmount }}</span
            ></van-button
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
  <van-dialog
    v-model:show="showDelete"
    title="提示"
    message="您确定要删除当前帖子吗？"
    show-cancel-button
    showConfirmButton
    @confirm="confirmDelete"
  />
  <van-dialog
    v-model:show="showToLogin"
    title="提示"
    message="请先登录才能进行该操作哦"
    confirmButtonText="去登录"
    cancelButtonText="再逛逛"
    show-cancel-button
    showConfirmButton
    @confirm="router.push('/login')"
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
        display: flex;
        flex-direction: column;
        justify-content: center;

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
      word-break: break-all;
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 15px;
      font-weight: 500;
    }

    .btn {
      float: left;
      display: flex;
      height: 23px;
      background-color: rgba(0, 81, 255, 0.1);
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin-right: 2px;

      .btn-title {
        color: rgba(0, 81, 255);
        margin-left: 5px;
      }
    }

    .van-button {
      border: none;
      font-size: 18px;
      .van-icon {
        font-size: 22px;
        margin-right: 6px;
      }
    }

    .btn-box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .time2 {
      margin-left: 280px;
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

.video-box {
  margin-bottom: 15px;
  .video {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3px;
    li {
      height: 100px;
      display: flex;
      border-radius: 8px;
      align-items: center;
      overflow: hidden;
    }
  }
}
.video-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  .van-icon {
    font-size: 50px;
    color: #fff;
  }
}
</style>
