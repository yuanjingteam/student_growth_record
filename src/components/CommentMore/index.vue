<script setup>
import { ref, defineProps, reactive } from "vue";
import { deleteCommentsService, articleUpvoteService } from "@/api/article";
import { useUserStore } from "@/store";
import { showFailToast } from "vant/es";
import { debounce } from "@/utils/functions";

const userStore = useUserStore();
let token = userStore.token;
const props = defineProps({
  comment_com: Object,
  commentId: Number
});
console.log(props.comment_com);

const showToLogin = ref(false);
const emit = defineEmits(["reload"]);

//是否点赞
const ifLike = ref(false);
ifLike.value = props.comment_com.comment_if_like;

const showPopover = ref(false);
let actions = [{ text: "删除" }];

const select = (action, index) => {
  if (action.text == "删除") {
    showDelete.value = !showDelete.value;
  }
};

//是否删除
const showDelete = ref(false);
//确认删除
const confirmDelete = async () => {
  try {
    const res = await deleteCommentsService({
      comment_id: props.commentId
    });
    console.log(res);
    emit("reload");
  } catch {
    showFailToast("您没有该权限");
  }
};

//点赞数量
const likeAmount = ref();
likeAmount.value = props.comment_com.comment_like_num;

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
      id: props.comment_com.id,
      like_type: 1
    });
    console.log(res);
  } else {
    showToLogin.value = !showToLogin.value;
  }
};
// 创建防抖后的点赞
const debouncedLike = debounce(likeBtn, 400);
</script>

<template>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            width="3rem"
            height="3rem"
            round
            :src="comment_com.user_headshot"
          />
          <div class="info">
            <div class="info-row">
              <p class="name">{{ comment_com.name }}</p>
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
            <p class="comment-comtent">{{ comment_com.comment_content }}</p>
            <div class="comment-footer">
              <p class="btn-title">{{ comment_com.comment_time }}</p>
              <div>
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
          </div>
        </div>
      </template>
    </van-card>
  </div>
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
          margin-bottom: 20px;
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
</style>
