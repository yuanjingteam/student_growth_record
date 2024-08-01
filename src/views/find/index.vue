<script setup>
import { reactive, ref } from 'vue';
//监听按钮状态
const btnState = ref(false)
//热帖数据
const hotPost = reactive([
  {
    id: 'first',
    content: 'hsifjasiofjsofifjsdoigjdskognsiognao'
  }, {
    id: 'second',
    content: 'hsifjasghdsfghdgnsiognao'
  }, {
    id: 'third',
    content: 'hsifjasidfgdfhsdskognsiognao'
  },
])
//话题数据
const topicData = reactive({
  message: '话题分类',
  topicList: [
    {
      id: 1,
      topic: '学习模块',
      content: '考研不仅接送454564就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾'
    },
    {
      id: 2,
      topic: '文体活动',
      content: '考研不仅接送大454尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾考研不仅接送i金佛寺就覅就覅文件结尾'
    }
  ]
})
//班级数据
const classData = reactive({
  message: '班级分类',
  classList: [
    {
      id: 1,
      topic: '计科222',
      content: '超级大美女韩硕博'
    },
    {
      id: 2,
      topic: '计科223',
      content: '王2晗'
    }
  ]
})

//处理按钮点击事件
const btnDeal = (state) => {
  btnState.value = !state
}
</script>

<template>
  <div class="find-box">
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <h1>今日热帖</h1>
          <ul>
            <li v-for="item in hotPost"><i-icon :icon="`hugeicons:medal-${item.id}-place`"></i-icon>
              <p>{{ item.content }}</p>
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
      }
    }
  }
}
</style>