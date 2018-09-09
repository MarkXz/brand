<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <el-button type="primary" @click="showAddDialog">添加分类</el-button>
            <!-- 插件 树形表格 -->
            <tree-table :data="cateList" :columns="columns" :show-index="true" index-text="#" border :expand-type="false" :selection-type="false">
                <!-- 是否有效的插槽 -->
                <template slot="valid" slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false"></i>
                    <i class="el-icon-error" v-else></i>
                </template>
                <!-- 排序的插槽 -->
                <template slot="sort" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
                <!-- 操作的插槽 -->
                <template slot="operation" slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </tree-table>
            <!-- 分页 -->
            <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加分类的对话框 -->
        <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%" @close="resetAddForm">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader expand-trigger="hover" clearable change-on-select :props="configAddForm" :options="options" v-model="selectedListId" @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import mix from './Cate-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-icon-success {
  color: green;
}
.el-icon-error {
  color: red;
}
.el-button {
  margin-bottom: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
