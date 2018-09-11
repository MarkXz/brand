<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 警告 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" :closable="false" type="warning" show-icon>
      </el-alert>
      <!-- 选择商品分类 -->
      <div class="cascader">
        <span>选择商品分类：</span>
        <el-cascader expand-trigger="hover" :props="ruleCate" :options="options" v-model="selectedId" @change="handleChange">
        </el-cascader>
      </div>
      <!-- tab标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="manyTableList.length === 0?true:false">添加参数</el-button>
          <!-- 动态参数表格Start -->
          <el-table :data="manyTableList" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag closable v-for="(item,i) in scope.row.attr_vals" :key="i" @close="removeTag(scope.row,i)">{{item}}</el-tag>
                <el-button size="small" v-if="scope.row.flag" @click="showInput(scope.row)">+ New Tag</el-button>
                <el-input ref="saveTagInput" size="small" v-else @blur="addVal(scope.row)" v-model="value" @keyup.enter.native="addVal(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column type="index" width="180">
            </el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit">修改</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 动态参数表格End -->
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="onlyTableList.length === 0?true:false">添加属性</el-button>
          <!-- 静态属性表格Start -->
          <el-table :data="onlyTableList" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag closable v-for="(item,i) in scope.row.attr_vals" :key="i" @close="removeTag(scope.row,i)">{{item}}</el-tag>
                <el-button size="small" v-if="scope.row.flag" @click="showInput(scope.row)">+ New Tag</el-button>
                <el-input ref="saveTagInput" size="small" v-else @blur="addVal(scope.row)" v-model="value" @keyup.enter.native="addVal(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit">修改</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 静态属性表格End -->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mix from './Params-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.cascader {
  margin: 15px 0;
}
.el-tag {
  margin: 5px;
}
.el-input {
  width: 120px;
}
</style>
