<script setup>
import { useRouter } from "vue-router";
import { showConfirmDialog, showSuccessToast, showToast } from "vant";
import { reactive, ref, nextTick, computed } from "vue";
import {
  newArticlePublish,
  getArticleTags,
  getLittleTags
} from "@/api/article";
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

// 获取小话题
// 存储dom数组
const myRef = ref([]);
// 存储所有ref
const setSmallRef = el => {
  if (el) {
    myRef.value.push(el);
  }
};
nextTick(() => {
  console.dir(myRef.value);
});

// 当前话题索引
let defaultIndex = 0; // 默认选中"选项一"

// 小标签项,动态添加
const littleTag = ref([]);

// 存储图片/视频
const imageFormData = new FormData();
const videoFormData = new FormData();

// 文件列表
const fileList = ref([
  // { url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" }
  // Uploader 根据文件后缀来判断是否为图片文件
  // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
  // { url: "https://cloud-image", isImage: true }
]);

// 文章内容
const content = ref("");
// 文章字数
const contentLength = computed(() => content.value.length);

// 文章校验
const formRef = ref();

// 校验函数返回 true 表示校验通过，false 表示不通过
//  Form 组件提供的一个方法,不需要自己实现。
const validator = val => {
  // console.log(val);
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
let actions = [{ name: "文体活动", aa: 112 }, { name: "选项二" }];

// 渲染话题/tag
const childs = ref([
  { text: "杭州", id: 0 },
  { text: "温州", id: 1 },
  { text: "宁波", id: 2 }
]);

// 发送的数据包
const data = reactive({
  username: username,
  article_content: content,
  word_count: contentLength,
  article_topic: actions[defaultIndex].name,
  article_tags: littleTag.value,
  imageForm: imageFormData,
  videoForm: videoFormData
});

// 获取话题
const getArticleTag = async () => {
  const serve = await getArticleTags();
  console.log(serve.data);
  actions = serve.data;
};

// 获取小标签
const getLittleTag = async () => {
  const serve = await getLittleTags({ topic_id: data.article_topic });
  childs.value = serve.data;
};

// 选择文章类别
const onSelect = item => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  let selectedIndex = actions.findIndex(action => action.name === item.name);

  defaultIndex = selectedIndex;
  data.article_topic = actions[defaultIndex].name;
  littleTag.value = [];
  data.article_content = "";

  // 移除所有带有 "active" 类的元素
  myRef.value.forEach(ref => {
    ref.$el.classList.remove("active");
  });
  // 获取新的小标签
  getLittleTag(data.article_topic);

  // 设置小标签元素的 ref(定义了一个方法,重新收集这些元素的引用(ref))
  const setSmallRef = el => {
    if (el) {
      myRef.value.push(el);
    }
  };
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
// 500 毫秒的节流延迟时间。这意味着在 500 毫秒内,toggleGridItemActive 函数只会被执行一次。
const toggleGridItemActive = throttle(function (item, id) {
  // 检查当前项是否存在littleTag.value数组中
  const isItemInList = littleTag.value.some(tag => tag.id === item.id);
  // 获取当前盒子
  const targetRef = myRef.value[id].$el;
  // 改变当前选中状态
  targetRef.classList.toggle("active");
  //存在就去掉
  if (isItemInList) {
    // tag 是原数组的每一项，过滤出不等于 itme.text的项
    littleTag.value = littleTag.value.filter(tag => tag.id !== item.id);
  } else {
    // 不存在就添加
    littleTag.value.unshift(item);
  }
}, 300);

// 关闭tag小标签
const close = (item, id) => {
  console.log(item);
  // 将当前项删除
  littleTag.value = littleTag.value.filter(tag => tag.id !== id);
  const targetRef = myRef.value[id].$el;
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
  console.log(fileList.value, "12312321");
  fileList.value.forEach((file, index) => {
    // 判断文件类型
    if (file.file.type.startsWith("image/")) {
      imageFormData.append(`image_files${index}`, file.file);
      console.log(file, "图片");
    } else if (file.file.type.startsWith("video/")) {
      videoFormData.append(`video_files${index}`, file.flie);
      console.log(file, "视频");
    }
  });
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
    showConfirmDialog({
      title: "发布文章",
      message: "确认要发布文章吗?\n温馨提示:同种类型的文章一天只能发布两篇哦~"
    })
      .then(async () => {
        loading.value = true; // 开启 loading 效果
        // 调用发布文章
        isPublished(data);
      })
      .catch(() => {
        // on cancel
        // fileList.value = [];
      });
  } catch (error) {
    console.log("validate failed", error);
  }
};

// 发布文章请求
const isPublished = async baseData => {
  try {
    const { data } = await newArticlePublish({ baseData });
    loading.value = false; // 关闭 loading 效果
    showSuccessToast("发布成功");
    setTimeout(() => {
      router.push("./demo");
    }, 1500); // 1.5秒后跳转
  } catch (error) {
    loading.value = false; // 关闭 loading 效果
    if (error.response && error.response.status === 400) {
      showSuccessToast("重复文章类型发布,请明天再来吧~");
    } else {
      console.error("发布文章失败:", error);
      showToast("发布文章失败,请稍后重试");
    }
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
        :ref="setSmallRef"
        icon="photo-o"
        clickable
        @click="toggleGridItemActive(item, item.id)"
      >
        <template #default>
          {{ item.tag_name }}
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
      >
        <!-- <template v-slot:label>
        <div class="label-content">内容</div>
      </template> -->
      </van-field>
      <van-uploader
        ref="mediaUploader"
        v-model="fileList"
        multiple
        class="uploader-container"
        accept="image/*,video/*"
        max-count="6"
        @oversize="onOversize"
      />
      <!-- <van-cell title="图片/视频" icon="location-o" class="select" /> -->

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
            <i-icon icon="mdi:tag-outline" />{{ item.tag_name }}
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
    </van-form>
  </div>
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
