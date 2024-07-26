<script setup>

</script>

<template>
  <div class="login-box">
    <h2>数学科学学院</h2>
    <h1>大学生成长档案</h1>
    <van-cell-group inset>
      <van-field v-model="value" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group inset>
      <van-field v-model="value" placeholder="请输入密码" />
    </van-cell-group>
    <van-button round block type="primary" native-type="submit" color="#004ae9">
      登录
    </van-button>
  </div>

</template>

<style lang="less" scoped>
.login-box {
  background-color: pink;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: 800;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: 800;
  }

  .van-cell-group {
    margin-bottom: 30px;
  }

  .van-cell-group--inset {
    border-radius: 20px;
    width: 100%;
    border: 1px solid rgba(204, 204, 204, 1)
  }

  .van-button {
    margin-top: 30px;
  }
}
</style>