<script setup>
import { getHotPostService } from '@/api/article';
import { getTopicListService } from '@/api/topic'
import { getClassListService } from '@/api/class'
import { onMounted, reactive, ref } from 'vue';
//监听按钮状态
const btnState = ref(false)
//热帖数据
const hotPost = reactive([])
//话题数据
const topicData = reactive({
  message: '话题分类',
  topicList: []
})
//班级数据
const classData = reactive({
  message: '班级分类',
  classList: []
})

//处理按钮点击事件
const btnDeal = async (state) => {
  btnState.value = !state
  const { data } = await getHotPostService({ article_count: '10' })
  hotPost.value = data.article_list
}

onMounted(async () => {
  const { data: { article_list } } = await getHotPostService({ article_count: '3' })
  hotPost.value = article_list
  const { data: { topic_list } } = await getTopicListService({ topic_count: '2' })
  topicData.topicList = topic_list
  const { data: { class_list } } = await getClassListService({ class_count: '2' })
  classData.classList = class_list
  console.log(classData.classList);

})

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
          <ul>
            <li v-for="(item, index) in hotPost.value" :key="index"><i-icon
                :icon="`icon-park:${numberToEnglish(index + 1)}-key`"></i-icon>
              <p>{{ item.article_title }}</p>
            </li>
          </ul>
        </template>
      </van-cell>
      <van-button v-if="btnState" icon="arrow-up" block @click="btnDeal(btnState)">收起</van-button>
      <van-button v-else icon="arrow-down" block @click="btnDeal(btnState)">展开</van-button>

    </van-cell-group>

    <category-card :message="topicData.message" :list="topicData.topicList"></category-card>
    <category-card :message="classData.message" :list="classData.classList"></category-card>

  </div>

</template>


<style lang="less" scoped>
.find-box {
  overflow: hidden;

  .van-cell-group {
    margin-top: 10px;

    .van-cell {
      padding: 15px 15px;
      margin-top: 10px;

      h1 {
        font-size: 20px;
        font-weight: 600;
      }

      ul {
        margin-top: 15px;
      }

      ul>li {
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
</style>