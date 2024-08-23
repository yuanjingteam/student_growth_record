<script setup>
import { ref, defineProps, reactive } from "vue";
import {
  getCommentsSecondService,
  articleCommentService,
  deleteCommentsService,
  articleUpvoteService
} from "@/api/article";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { showSuccessToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
//获取token
const token = userStore.token;
const props = defineProps({
  data: Object
});
//是否点赞
const ifLike = ref(false);
ifLike.value = props.data.comment_if_like;
//点赞数量
const likeAmount = ref();
likeAmount.value = props.data.comment_like_num;

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
      id: props.data.id,
      like_type: 1
    });
    console.log(res);
  } else {
    showToLogin.value = !showToLogin.value;
  }
};
// 创建防抖后的点赞
const debouncedLike = debounce(likeBtn, 400);

const emit = defineEmits(["refresh", "reloadCommentTwo"]);
// 防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

//二级评论列表
const commentSeList = ref();
const showPopover = ref(false);

//二级评论数据
const commentSeData = reactive({
  username: userStore.username,
  comment_id: props.data.id,
  page: 1,
  limit: 3
});
//控制当前哪个下拉框展开
const activeNames = ref(["0"]);
//标志下拉框展开或合上
const commentFold = ref(false);

//点击下拉框触发事件
const changeComment = async state => {
  commentSeList.value = [];
  if (!state) {
    const {
      data: { comment_se_list }
    } = await getCommentsSecondService(commentSeData);
    commentSeList.value = comment_se_list;
  }
  commentFold.value = !state;
};
// 创建防抖后的下拉框触发
const debouncedchangeComment = debounce(changeComment, 300);
const showCommentDetail = ref(false);
const handleComment = () => {
  showCommentDetail.value = true;
};

//子传父，重新发起请求接收二级评论
const reloadCommentSec = async () => {
  const {
    data: { comment_se_list }
  } = await getCommentsSecondService(commentSeData);
  commentSeList.value = comment_se_list;
};
//评论内容
const comment = ref("");
//是否展示评论输入框
const showCommentTable = ref(false);
//点击评论
const commentClick = () => {
  comment.value = "";
  showCommentTable.value = !showCommentTable.value;
};
//评论校验
const commentRef = ref();
//提交评论
const submitComment = async () => {
  await commentRef.value.validate();
  showCommentTable.value = !showCommentTable.value;
  const res = await articleCommentService({
    comment_type: "1",
    id: props.data.id,
    comment_content: comment.value
  });
  console.log(res);
  reloadCommentSec();
};

//下拉选择框数据
let actions = [];
if (userStore.role != "user") {
  actions = [{ text: "删除" }];
}

const select = (action, index) => {
  if (action.text == "删除") {
    showDelete.value = !showDelete.value;
  }
};
//是否删除
const showDelete = ref(false);
//确认删除
const confirmDelete = async () => {
  const res = await deleteCommentsService({
    comment_id: props.data.id
  });
  showSuccessToast("删除评论成功");
  console.log(res);
  emit("refresh");
};
//点击评论头像去用户主页
const gotoUser = () => {
  router.push(`/otherInfo/${props.data.username}`);
};
</script>

<template>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            :src="data.user_headshot"
            width="3rem"
            height="3rem"
            @click="gotoUser"
          />
          <div class="info">
            <div class="info-row">
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
            <p class="comment-comtent">{{ data.comment_content }}</p>
            <div class="comment-footer">
              <p class="btn-title">{{ data.comment_time }}</p>
              <div>
                <van-button
                  size="mini"
                  icon="comment-o"
                  @click="commentClick"
                />
                <van-button
                  v-if="!ifLike"
                  size="mini"
                  @click="debouncedLike(ifLike)"
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
            </div>
            <van-collapse
              v-if="data.comment_son_num != 0"
              v-model="activeNames"
              @change="debouncedchangeComment(commentFold)"
            >
              <van-collapse-item
                :title="`共有${data.comment_son_num}条回复`"
                name="1"
              >
                <div
                  v-for="(item, index) in commentSeList"
                  :key="index"
                  @click="handleComment"
                >
                  <span>{{ item.name }}：</span>
                  <span>{{ item.comment_content }}</span>
                </div>
                <div>...</div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </template>
    </van-card>
  </div>
  <van-action-sheet v-model:show="showCommentDetail" title="评论详情">
    <div class="content">
      <comment-more
        v-for="(item, index) in commentSeList"
        :key="index"
        :comment_com="item"
        :commentId="data.id"
        @reload="reloadCommentSec"
      />
    </div>
  </van-action-sheet>
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
  <van-dialog
    v-model:show="showDelete"
    title="提示"
    message="您确定要删除当前评论吗？"
    show-cancel-button
    showConfirmButton
    @confirm="confirmDelete"
  />
</template>

<style scoped>
.cell {
  .van-card {
    background-color: #fff;
    margin-top: 1px;
    padding: 15px 15px;
    overflow: hidden;

    .info-box {
      display: flex;

      .info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 100%;

        .info-row {
          display: flex;
          justify-content: space-between;

          .name {
            margin-top: 5px;
            font-size: 16px;
            color: rgba(166, 168, 173, 1);
          }

          .i-icon {
            font-size: 25px;
            color: rgba(166, 168, 173, 1);
          }
        }

        .comment-comtent {
          margin-top: 10px;
          margin-bottom: 10px;
          font-weight: 500;
          font-size: 15px;
          color: #000;
        }

        .comment-footer {
          display: flex;
          justify-content: space-between;

          .btn-title {
            font-size: 12px;
            color: rgba(166, 168, 173, 1);
          }

          .van-button {
            border: none;
            font-size: 13px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.van-collapse >>> .van-collapse-item__title {
  background-color: #f0f1f5;
}
.van-collapse-item {
  background-color: rgba(166, 168, 173, 1);
  --van-collapse-item-content-background: #f0f1f5;
}

.comment-detail {
  float: right;
}
</style>
