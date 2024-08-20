<script setup>
import { ref, defineProps, reactive } from "vue";
import { deleteCommentsService } from "@/api/article";
import { useUserStore } from "@/store";

const userStore = useUserStore();
const props = defineProps({
  comment_com: Object,
  commentId: Number
});
const emit = defineEmits(["reload"]);

const showPopover = ref(false);
let actions = [];
if (userStore.role != "0") {
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
    comment_id: props.commentId
  });
  console.log(res);
  emit("reload");
};
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
                <van-button size="mini" icon="good-job-o">{{
                  comment_com.comment_like_num
                }}</van-button>
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
