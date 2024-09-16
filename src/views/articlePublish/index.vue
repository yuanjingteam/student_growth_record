<script setup>
import { useRouter } from "vue-router";

import { showToast } from "vant";
import {
  reactive,
  ref,
  nextTick,
  computed,
  onMounted,
  onBeforeUpdate
} from "vue";
import { newArticlePublish, getLittleTags } from "@/api/article";
import { getTopicListService } from "@/api/topic";
import { useUserStore } from "@/store";
const userStore = useUserStore();

// 获取用户id
const username = userStore.username;

// 路由跳转
const router = useRouter();

// 提交回显框
const submit_show = ref(false);

// 选项回显框
const choose_show = ref(false);

// loading效果
const loading = ref(false);

// 小话题选项
const small_show = ref(false);

// 文章状态弹窗
const article_show = ref(false);

const showState = ref(false);
// 获取小话题
const refs = ref([]);
const setRef = (id, el) => {
  if (el) {
    refs.value[id] = el;
  } else {
    delete refs.value[id];
  }
};
nextTick(() => {
  console.dir(refs.value);
});
onMounted(() => {
  console.log(refs.value);
});
onBeforeUpdate(() => {
  // 在更新前清空 refs
  refs.value = [];
});

// 当前话题索引
let defaultIndex = 0; // 默认选中"选项一"

// 文章私密状态
const checkState = ref("所有人可见");
const article_state = ref(true);

// 小标签项,动态添加
const littleTag = ref([]);

// 存储图片/视频
let assetsFormData = new FormData();

// 文件列表
const fileList = ref([]);
const isvideo = ref(false);
const v_count = ref(0);
// 文章内容
const content = ref("");
// 文章小标签
const litTag = ref([]);
// 文章字数
const contentLength = computed(() => content.value.length);

// 文章校验
const formRef = ref();

const validator = val => {
  if (val.trim() === "") {
    return "内容不能为空";
  }
  if (contentLength.value < 10) {
    return "内容不能少于10个字";
  }
  if (data.article_topic === "选择话题") {
    return "必须选择标签类型";
  }
};
// 校验规则
const rules = [{ validator, message: error => error }];

// 渲染大标题
let actions = [
  { name: "学习成绩", ID: 1 },
  { name: "选项二", ID: 213 }
];

// 渲染可见状态
let state = [
  {
    name: "所有人可见"
  },
  {
    name: "私密"
  }
];
// 渲染话题/tag
const childs = ref([
  { name: "杭州", id: 0 },
  { name: "温州", id: 1 },
  { name: "宁波", id: 2 }
]);

// 是否可见
const toShow = item => {
  if (item.name === "所有人可见") {
    article_state.value = true;
  } else {
    article_state.value = false;
  }
  checkState.value = item.name;
  article_show.value = false;
};

// 发送的数据包
const data = reactive({
  article_status: article_state,
  article_content: content,
  word_count: contentLength,
  article_topic: actions[defaultIndex].name,
  article_tags: litTag
});

// 获取话题
const getArticleTag = async () => {
  const serve = await getTopicListService();
  const res = serve.data.topic_list;
  actions = res.map(item => {
    return {
      ID: item.ID,
      name: item.topic_name
    };
  });
  console.log(actions);
};

// 获取小标签
const getLittleTag = async () => {
  const serve = await getLittleTags({ topic_id: actions[defaultIndex].ID });
  childs.value = serve.data;
};

// 选择文章类别
const onSelect = item => {
  let selectedIndex = actions.findIndex(action => action.name === item.name);
  defaultIndex = selectedIndex;
  data.article_topic = actions[defaultIndex].name;
  // 清空
  littleTag.value = [];
  assetsFormData = new FormData();
  setRef.value = [];
  // 移除所有带有 "active" 类的元素
  refs.value.forEach(ref => {
    ref.$el.classList.remove("active");
  });
  // 获取新的小标签
  getLittleTag(data.article_topic);
};

// 小标签弹窗
const showLittleTag = () => {
  small_show.value = true;
};

// 节流函数
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

// 添加/删除tag
const toggleGridItemActive = throttle((item, id) => {
  const isItemInList = littleTag.value.some(tag => tag.id === item.id);
  // 获取当前盒子
  const targetRef = refs.value[id].$el;
  // 改变当前选中状态
  targetRef.classList.toggle("active");

  if (isItemInList) {
    littleTag.value = littleTag.value.filter(tag => tag.id !== item.id);
  } else {
    littleTag.value.unshift(item);
  }
}, 300);

// 关闭tag小标签
const close = (item, id) => {
  // 将当前项删除
  littleTag.value = littleTag.value.filter(tag => tag.id !== id);
  const targetRef = refs.value[id].$el;
  targetRef.classList.toggle("active");
};

// 限制文件上传大小
const maxFileSize = 50 * 1024 * 1024; // 50MB

const onOversize = file => {
  if (file.size > maxFileSize) {
    showToast(`文件大小不能超过 ${maxFileSize / (1024 * 1024)}MB`);
    return false;
  }
  return true;
};

// 存储图片/视频
const handleSubmit = async () => {
  fileList.value.forEach(file => {
    // 判断文件类型
    if (file.file.type.startsWith("image/")) {
      assetsFormData.append("pic", file.file);
      console.log(file, "图片");
    } else if (file.file.type.startsWith("video/")) {
      if (!isvideo.value) {
        assetsFormData.append("video", file.file);
        isvideo.value = true;
      }
      v_count.value++;
    }
  });
};

const showConfirm = () => {
  loading.value = true; // 开启 loading 效果
  // 调用发布文章
  // 20221544308
  assetsFormData.append("username", username);
  assetsFormData.append(
    "article_content",
    data.article_content.replace(/\n+/g, "<br/>")
  );
  assetsFormData.append("word_count", data.word_count);
  assetsFormData.append("article_topic", data.article_topic);
  for (const tag of data.article_tags) {
    assetsFormData.append("article_tags", tag);
  }
  assetsFormData.append("article_status", data.article_status);
  isPublished(assetsFormData);
};
const showCancel = () => {
  // 清空提交
  fileList.value = [];
  assetsFormData = new FormData();
};
// 点击发布文章
const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value.validate();
    if (littleTag.value.length === 0) {
      showToast("必须选择热点标签");
      return;
    }
    if (littleTag.value.length > 3) {
      console.log(data.article_tags.length, 1111);
      showToast("最多选择三个热点标签");
      return;
    }
    // 文件上传
    handleSubmit();
    if (v_count.value > 1) {
      showToast("最多上传一个视频,请重新上传");
      v_count.value = 0;
      fileList.value = [];
      return;
    }
    litTag.value = littleTag.value.map(tag => tag.name);
    showState.value = true;
  } catch (error) {
    console.log("validate failed", error);
  }
};

// 发布文章请求
const isPublished = async baseData => {
  try {
    await newArticlePublish(baseData);
    showToast("发布成功");
    router.push("./demo");
  } catch (error) {
    showToast(error.msg);
  } finally {
    loading.value = false; // 关闭 loading 效果
  }
};

// 获取话题
getArticleTag();
// 获取小标签
getLittleTag();
</script>

<template>
  <van-overlay :show="loading" z-index="100">
    <van-loading vertical>
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
      加载中...
    </van-loading>
  </van-overlay>
  <!-- 提交弹框 -->
  <van-dialog v-model:show="submit_show" show-cancel-button />

  <!-- 选择小标签弹框 -->
  <van-dialog v-model:show="small_show">
    <template #title>
      <p>{{ data.article_topic }}</p>
      <p class="limit">(最多选择三个小标签)</p>
    </template>
    <!-- 小标签弹框内部 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in childs"
        :key="item.id"
        :ref="el => setRef(item.id, el)"
        icon="photo-o"
        clickable
        @click="toggleGridItemActive(item, item.id)"
      >
        <template #default>
          {{ item.name }}
        </template>
      </van-grid-item>
    </van-grid>
  </van-dialog>

  <!-- 头部导航 -->
  <van-nav-bar
    title="发布"
    left-arrow
    right-text="发布"
    @click-right="onSubmit"
    @click-left="router.back()"
  />
  <div class="main">
    <van-form ref="formRef">
      <van-row>
        <van-col span="10">
          <van-cell
            is-link
            :title="data.article_topic"
            class="title"
            @click="choose_show = true"
          >
            <template #icon>
              <i-icon icon="icon-park:topic" />
            </template>
          </van-cell>
          <van-action-sheet
            v-model:show="choose_show"
            :actions="actions"
            close-on-click-action
            :default-index="defaultIndex"
            @select="onSelect"
          />
        </van-col>
      </van-row>
      <van-field
        v-model="content"
        placeholder="开始你的精彩书写"
        label-align="top"
        maxlength="300"
        minlength="100"
        show-word-limit
        autocomplete="off"
        name="articleContent"
        :rules="rules"
        :autosize="{ minHeight: 100, maxHeight: 260 }"
        type="textarea"
        validate-trigger="onSubmit"
      />
      <van-uploader
        ref="mediaUploader"
        v-model="fileList"
        multiple
        class="uploader-container"
        accept="image/*,video/*"
        max-count="6"
        @oversize="onOversize"
      />
      <van-cell class="select">
        <template #title>
          <!-- 在这里添加多个标题元素 -->
          <van-tag
            v-for="item in littleTag"
            :key="item.id"
            type="primary"
            closeable
            size="medium"
            @close="close(item, item.id)"
          >
            <i-icon icon="mdi:tag-outline" />{{ item.name }}
          </van-tag>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-button
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            size="small"
            @click="showLittleTag"
          >
            #添加热点标签
          </van-button>
        </template>
      </van-cell>
      <van-cell is-link @click="article_show = true">
        <template #title> 谁可以看 </template>
        <template #value>{{ checkState }}</template>
      </van-cell>
      <van-action-sheet
        v-model:show="article_show"
        :actions="state"
        @select="toShow"
      />
    </van-form>
  </div>
  <van-dialog
    v-model:show="showState"
    title="发布文章"
    message="确认要发布文章吗?
    温馨提示:同种类型的文章一天只能发布两篇哦~"
    show-cancel-button
    showConfirmButton
    @confirm="showConfirm"
    @cancel="showCancel"
  />
</template>

<style scoped>
.van-loading {
  justify-content: center;
  height: 100%;
}
.limit {
  margin-bottom: 15px;
  font-size: 12px;
}
.main {
  margin: 0 5px;
}
.title {
  font-size: 17px;
  font-weight: 700;
  color: black;
  text-align: center;
  .i-icon {
    width: 24px;
    height: 24px;
  }
}
.active {
  --van-grid-item-content-background: #f2f2f2;
}
/* .acitve >>> .van-grid-item__content {
  background: #000;
} */

.select {
  width: 100%;
  color: #79b0ee;
}
.van-tag {
  margin-right: 3px;
}
</style>
