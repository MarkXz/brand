<template>
    <div>
        <div class="login-container">
            <div class="avatar">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username">
                        <i slot="prefix" class="iconfont icon-users"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password">
                        <i slot="prefix" class="iconfont icon-3702mima"></i>
                    </el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import mix from './Login-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 304px;
  background: #fff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    img {
      width: 130px;
      border-radius: 50%;
      border: 1px solid #eee;
      background: #ccc;
    }
  }
  .el-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
