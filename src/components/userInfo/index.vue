<script setup>
import { showImagePreview } from "vant";
import { changeUserHeadshot } from "@/api/user";
import { ref } from "vue";
import {
  getUserInfo,
  userIsBan,
  userUnBan,
  getConcernOther,
  changeAttentionState
} from "@/api/user";
import { useUserStore } from "@/store";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

// const userStore = useUserStore();
const router = useRouter();
const userStore = useUserStore();

const route = useRoute();

// 判断是否为管理员
const role = userStore.role;

// 判断是否为本人
const own = ref(true);
const is_concern = ref(true);

// 获取当前用户id
let username = userStore.username;
let myname = userStore.username;

let othername = route.params.username;

// 解析路由获取是否为本人
let routername = route.params.username;
if (routername) {
  if (routername !== username) {
    own.value = false;
  }
  username = routername;
}

// 展示头像
const show = ref(false);
const handleImagePreview = src => {
  showImagePreview({
    images: [src],
    closeable: true
  });
};

// 封禁用户显示
const showPopover = ref(false);
const actions = [
  { text: "封禁一天", ban_time: 1 },
  { text: "封禁三天", ban_time: 3 },
  { text: "封禁十天", ban_time: 10 }
];

// 封禁用户
const ban = async action => {
  const { code } = await userIsBan({
    ban_username: username,
    ban_time: action.ban_time
  });
  if (code === 200) {
    showToast(`已将该用户封禁${action.ban_time}天`);
    UerInfo();
  }
};
// 解封用户
const unBan = async () => {
  const { code } = await userUnBan({
    unban_username: username
  });
  if (code === 200) {
    showToast("解封成功");
    UerInfo();
  }
};

const data = ref({
  username: "",
  name: "",
  user_headshot: "",
  ban: false,
  user_motto: "",
  user_fans: 0,
  user_point: 0,
  user_concern: 0,
  user_like: 0,
  user_class: ""
});

// 默认头像
const defaultAvatars = [
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_1.png",
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_2.png",
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_3.png",
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_4.png",
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_5.png",
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_headshot/user_headshot_6.png"
];

// 获取关注状态
const concernGet = async () => {
  const { data } = await getConcernOther({
    other_username: othername
  });
  is_concern.value = data.is_concern;
};
const concernChange = async () => {
  const { data } = await changeAttentionState({
    othername: othername
  });
  is_concern.value = !is_concern.value;
};

// 获取用户基本信息
const UerInfo = async () => {
  const res = await getUserInfo({ username: username });
  data.value = res.data;
  // 存储/更新
  userStore.userData.user_headshot = res.data.user_headshot;

  // 当前获取没有默认头像
  if (userStore.userData.user_headshot === "") {
    const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
    // 赋值默认头像
    data.value.user_headshot = defaultAvatars[randomIndex];
    try {
      // 获取图片文件
      const response = await fetch(data.value.user_headshot);
      // 将其转换为 Blob
      const blob = await response.blob();
      const file = new File([blob], "user_headshot.png", { type: blob.type }); // 创建 File 对象
      const formData = new FormData();
      formData.append("file", file);

      // 上传用户头像
      const res = await changeUserHeadshot(formData);
    } catch {
      data.value.user_headshot = "";
      // showToast("获取头像失败,请稍后重试");
    }
  }
};
UerInfo();
if (routername) {
  concernGet();
}
</script>

<template>
  <van-image-preview v-model:show="show">
    <!-- <template v-slot:index>第{{ index + 1 }}页</template> -->
  </van-image-preview>
  <div class="my-self">
    <div class="my-outside">
      <!-- 头像 -->
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="data.user_headshot"
        @click="handleImagePreview(data.user_headshot)"
      />
      <!-- 昵称 -->
      <div class="my-name">
        {{ data.name }}
      </div>
      <div v-if="userStore.ifTeacher" class="teacher">
        <i-icon icon="ph:chalkboard-teacher" />
        <span>教师</span>
      </div>
    </div>
    <!-- 头部总组件 -->
    <van-cell-group>
      <div class="user-header">
        <div v-if="!own" name="other">
          <div class="my-attention" @click="concernChange">
            <span v-if="is_concern">已关注</span>
            <span v-else>关注</span>
          </div>
          <div class="my-inside" />
          <div
            class="change-info"
            @click="router.push(`./otherIntroduce/${othername}`)"
          >
            <button>个人简介</button>
          </div>
        </div>

        <div v-else name="self">
          <div class="my-inside" />
          <div class="change-info">
            <button @click="router.push('/editData')">编辑资料</button>
          </div>
        </div>

        <div v-if="role !== 'user' && !own" name="ban" class="user_ban">
          <van-popover
            v-if="!data.ban"
            v-model:show="showPopover"
            :actions="actions"
            @select="ban"
          >
            <template #reference>
              <van-button type="primary" size="small">封禁用户</van-button>
            </template>
          </van-popover>
          <van-button v-else type="primary" size="small" @click="unBan"
            >解封用户</van-button
          >
        </div>

        <!-- 我的座右铭 -->
        <div class="my-motto">
          <i-icon icon="uil:edit-alt" />
          <van-text-ellipsis
            rows="1"
            :content="data.user_motto"
            class="my-motto"
          />
        </div>
        <!-- 我的个人信息 -->
        <div class="user-info">
          <div @click="router.push(`/userFans/${username}`)">
            粉丝：{{ data.user_fans }}
          </div>
          <div @click="router.push(`/userAttention/${username}`)">
            关注：{{ data.user_concern }}
          </div>
          <div>获赞：{{ data.user_like }}</div>
          <div>积分：{{ data.user_point }}</div>
        </div>
        <!-- 职位 -->
        <div v-if="!own" name="office">
          <span class="other">{{ data.user_class }}</span>
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<style scoped>
.teacher {
  display: flex;
  justify-content: center;
  padding: 7px 0px 0px 8px;
  font-size: 14px;
  font-weight: 700;
  color: #3762c1;
  .i-icon {
    width: 20px;
    height: 20px;
  }
}
.my-self {
  position: relative;
  margin-top: 55px;
}

.van-image {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
}
.van-cell-group {
  width: 340px;
  margin: 0 auto;
  border-radius: 10px;
}
.user-header {
  position: relative;
  padding: 10vmin 3.6667vmin 15px;
  overflow: hidden;
}
.my-motto {
  height: 24px;
}
.my-motto .i-icon {
  margin-top: 3px;
  float: left;
}

.my-attention {
  position: absolute;
  top: 5px;
  left: 85px;
  background-color: #004ae9;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 12px;
  color: #ffffff;
  z-index: 20;
}
.my-inside {
  position: absolute;
  top: -4.4vmin;
  right: -6.3333vmin;
  width: 24.6667vmin;
  height: 12.6667vmin;
  border-radius: 9.3333vmin;
  background-color: #e5edff;
}

.change-info {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #4580ff;
  font-weight: 700;
}

.my-outside {
  position: absolute;
  display: flex;
  top: -30px;
  left: 31px;
  z-index: 2;
}

.my-outside .my-name {
  margin-top: 1.6667vmin;
  margin-left: 12px;
  font-size: 15px;
  font-weight: 700;
}

.my-name span {
  font-size: 11px;
  font-weight: 700;
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.other {
  border-radius: 5px;
  padding: 3px;
  background-color: #e5edff;
  margin-right: 10px;
  font-size: 12px;
}

.user_ban {
  position: absolute;
  top: 0px;
  right: 80px;
  z-index: 200;
}
</style>
