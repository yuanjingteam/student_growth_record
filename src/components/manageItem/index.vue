<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store";
import { formattedContent } from "@/utils/functions/modules/formattedContent";
import { delManagerInfo } from "@/api/user";
import { showToast } from "vant";

const userStore = useUserStore();
const props = defineProps({
  data: Object
});
const emit = defineEmits(["refresh"]);
const showPopover = ref(false);
const actions = [{ text: "删除" }];

// 选择选项
const onSelect = async () => {
  delInfo(props.data.info_id);
};

const delInfo = async (id: string) => {
  try {
    await delManagerInfo({ id });
    emit("refresh");
    showToast("删除成功");
  } catch (error) {
    showToast(error.msg);
  }
};
// let userImg = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
</script>
<template>
  <van-cell-group inset>
    <van-cell is-link>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="data.user_headshot" />
      </template>
      <template #title>
        {{ data.ID }}
      </template>
      <template #label>
        <van-text-ellipsis :content="data.msg_time" />
      </template>
      <template #right-icon>
        <!-- userStore.role === 'manager' -->
        <div v-if="true">
          <van-popover
            v-model:show="showPopover"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <div class="more">
                <span>
                  <i-icon icon="ri:more-fill" />
                </span>
              </div>
            </template>
          </van-popover>
        </div>
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <van-text-ellipsis
          rows="2"
          :content="formattedContent(data.msg_content)"
          expand-text="展开"
          collapse-text="收起"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>
.van-cell-group {
  margin: 15px;
}
.van-cell {
  background: linear-gradient(to right, #e7f1fa, #bfdbfe);
}
.van-image {
  margin: 2px 8px 0px 0px;
}
.van-popup {
  padding-right: 60px;
}
</style>
