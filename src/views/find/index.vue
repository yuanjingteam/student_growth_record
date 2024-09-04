<script setup>
import { getHotPostService } from "@/api/article";
import { useClassStore, useTopicStore } from "@/store";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const useClass = useClassStore();
const useTopic = useTopicStore();

//是否加载骨架屏
const loadingTitle = ref(false);

//话题数据
const topicData = reactive({
  message: "话题分类",
  topicList: []
});
//班级数据
const classData = reactive({
  message: "班级分类",
  classList: []
});

topicData.topicList = useTopic.topicList;
//重新获取班级数据
useClass.getClassList();
classData.classList = useClass.classList;

//监听按钮状态  false意为展开  true意为收起
const btnState = ref(false);
//热帖数据
const hotPost = reactive([]);
//获取热帖列表
const getHotPost = async articleCount => {
  loadingTitle.value = true;
  const {
    data: { article_list }
  } = await getHotPostService({ article_count: articleCount });
  hotPost.value = article_list;
  loadingTitle.value = false;
};
//折叠时先获取三条信息
getHotPost(3);
//处理按钮点击事件
const btnDeal = async state => {
  if (state == true) {
    //此时写着是收起
    btnState.value = false;
    getHotPost(3);
  } else {
    //此时写的是展开
    btnState.value = true;
    getHotPost(8);
  }
};

//阿拉伯语数字转为英文方法
function numberToEnglish(number) {
  switch (number) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    case 10:
      return "ten";
    default:
      return "Number out of range";
  }
}
</script>

<template>
  <div class="find-box">
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <h1>今日热帖</h1>
          <van-skeleton title :row="3" :loading="loadingTitle">
            <ul v-if="hotPost.value.length > 0">
              <li v-for="(item, index) in hotPost.value" :key="index">
                <i-icon :icon="`icon-park:${numberToEnglish(index + 1)}-key`" />
                <p
                  class="hotTitle"
                  @click="router.push(`/postDetail/${item.article_id}`)"
                >
                  {{ item.article_title }}
                </p>
              </li>
            </ul>
            <van-empty
              v-else
              image-size="100"
              description="今天还没有人发帖子哦"
            />
          </van-skeleton>
        </template>
      </van-cell>

      <van-button
        v-if="btnState"
        icon="arrow-up"
        block
        style="border-radius: 0"
        @click="btnDeal(btnState)"
        >收起</van-button
      >
      <van-button
        v-else
        icon="arrow-down"
        block
        style="border-radius: 0"
        @click="btnDeal(btnState)"
        >展开</van-button
      >
    </van-cell-group>

    <topic-card
      v-if="topicData.topicList"
      :message="topicData.message"
      :list="topicData.topicList.slice(1, 3)"
    />
    <class-card
      :message="classData.message"
      :list="classData.classList.slice(0, 2)"
    />
    <div class="star">
      <van-cell-group inset>
        <van-cell
          title="成长之星"
          is-link
          value="全部"
          @click="router.push('/star')"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.find-box {
  overflow: hidden;
  background-color: #f0f1f5;

  .van-cell-group {
    margin-top: 10px;

    .van-cell {
      padding: 15px 15px;
      /* margin-top: 10px; */

      h1 {
        font-size: 20px;
        font-weight: 600;
      }

      ul {
        margin-top: 15px;
      }

      ul > li {
        display: flex;
        margin-bottom: 10px;
      }

      .i-icon {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }
}
.star {
  margin-bottom: 10px;
  .van-cell >>> .van-cell__title {
    font-size: 20px;
    font-weight: 600;
  }
}
.hotTitle {
  width: 250px; /* 设定宽度 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
}

.van-empty {
  height: 150px;
}
</style>
