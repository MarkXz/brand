<template>
    <el-container class="home-container">
        <el-header>
            <div class="left">
                <img src="../../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="collapse?'65px':'200px'">
                <div class="toggleBar" @click="collapse=!collapse">|||</div>
                <!-- Start 菜单 -->
                <el-menu default-active="2" background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="collapse" :collapse-transition="false" router>
                    <el-submenu :index="item.id +''" v-for="(item,i) in list" :key="item.id" :style="collapse?'width:65px;':'width:200px;'">
                        <template slot="title">
                            <i :class="['iconfont',iconlist[i]]"></i>
                            <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{ subItem.authName }}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <!-- End 菜单 -->
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import mix from './Home-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    user-select: none;
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    .left {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
        width: 50px;
      }
      span {
        color: #fff;
        font-size: 22px;
      }
    }
  }
  .el-container {
    .el-aside {
      user-select: none;
      background: #333744;
      .toggleBar {
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        background: #4a5064;
        letter-spacing: 0.1em;
        cursor: pointer;
      }
    }
    .el-main {
      background: #eaedf1;
    }
  }
}
</style>
