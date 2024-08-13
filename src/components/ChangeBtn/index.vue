<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["get_type"]);

//是否有当前类（有当前背景）
const isActive = ref(false);
//切换状态，子传父
const getNew = async state => {
  isActive.value = !isActive.value;
  emit("get_type", state);
};
</script>

<template>
  <div class="btn-box">
    <li class="new" :class="{ active: !isActive }" @click="getNew('new')">
      最新
    </li>
    <li class="hot" :class="{ active: isActive }" @click="getNew('hot')">
      最热
    </li>
  </div>
</template>

<style scoped>
* {
  list-style: none;
}

.btn-box {
  border-radius: 12px;
  width: 80px;
  height: 30px;
  background-color: #f0f1f5;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  font-weight: 600;
}

.new,
.hot {
  height: 100%;
  width: 50%;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
  border-radius: 12px;
  color: rgba(166, 168, 173, 1);
}

.active {
  background-color: #fff;
  color: #000;
}
</style>
