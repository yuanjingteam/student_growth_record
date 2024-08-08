<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

defineProps({
  //头部信息
  message: String,
  //渲染数据
  list: Object,
  //是否显示头部（在详情页外或者在详情页内）
  ifNeed: Boolean
});

const getAll = message => {
  if (message == "话题分类") {
    router.push("/topics");
  } else {
    router.push("/class");
  }
};

//跳转进帖子详情页或者班级详情页
const gotoDetail = (need, id) => {
  console.log(need, id);
  if (need == false) {
    router.push(`/topicDetail/${id}`);
  } else {
    router.push(`/ classDetail / ${id}`);
  }
};

// console.log(list);
</script>
<template>
  <van-cell-group inset>
    <van-cell>
      <template #title>
        <!-- ifNeed为true时说明在外面 -->
        <div v-if="!ifNeed" class="topic-box1">
          <span class="topic">{{ message }}</span>
          <div class="right" @click="getAll(message)">
            <span style="color: rgba(166, 168, 173, 1)">全部</span>
            <i-icon
              icon="uiw:right"
              style="
                margin-top: 7px;
                margin-left: 5px;
                color: rgba(166, 168, 173, 1);
              "
            />
          </div>
        </div>
        <div v-else class="topic-box2" @click="router.go(-1)">
          <i-icon icon="uiw:left" />
          <span class="topic">{{ message }}</span>
        </div>
      </template>
    </van-cell>
    <van-cell v-for="(item, index) in list" :key="index">
      <template #title>
        <div style="display: flex" @click="gotoDetail(ifNeed, item.topic_id)">
          <i-icon icon="icon-park:message" style="font-size: 25px" />
          <div class="content">
            <p class="topic-top">{{ item.topic_name }}</p>
            <p class="topic-content">
              {{
                message == "话题分类"
                  ? item.header_name || item.topic_content
                  : "班长：" + item.header_name || item.topic_content
              }}
            </p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped lang="less">
.van-cell-group {
  padding: 10px 0;
  margin-top: 20px;

  .van-cell {
    .topic-box1 {
      display: flex;
      justify-content: space-between;

      .topic {
        font-size: 18px;
        font-weight: 600;
      }

      .right {
        display: flex;
      }
    }

    .topic-box2 {
      display: flex;

      .i-icon {
        margin-top: 4px;
        margin-right: 4px;
      }

      .topic {
        font-size: 15px;
      }
    }

    .content {
      margin-left: 5px;

      .topic-top {
        font-size: 16px;
        font-weight: 600;
      }

      .topic-content {
        width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(166, 168, 173, 1);
        font-size: 13px;
      }
    }
  }
}
</style>
