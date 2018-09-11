<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <div ref="main" style="width: 900px;height:450px;"></div>
        </el-card>
    </div>
</template>

<script>
import mix from './Reports-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style>
</style>
