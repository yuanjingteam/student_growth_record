<script setup>
import { showImagePreview } from "vant";
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
  userStore.userData.user_headshot = res.data.user_headshot;
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
    </div>
    <!-- 头部总组件 -->
    <van-cell-group inset>
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
          <div class="change-info" @click="router.push('./editData')">
            <button>编辑资料</button>
          </div>
        </div>

        <div
          v-if="(role === '1' || role === 'class') && !own"
          name="ban"
          class="user_ban"
        >
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
          <van-text-ellipsis :content="data.user_motto" class="my-motto" />
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
.my-self {
  position: relative;
  margin-top: 55px;
}

.van-image {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
}

.user-header {
  position: relative;
  padding: 10vmin 3.6667vmin 15px;
  border-radius: 7px;
  overflow: hidden;
}
.my-motto {
  width: 240px;
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
