<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <el-button type="primary">添加角色</el-button>
            <el-table :data="rolesList">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item,i) in scope.row.children" :key="item.id" :style="{'border-bottom':'1px solid #eee','border-top':i === 0?'1px solid #eee':''}" class="rowcenter">
                            <el-col :span="5">
                                <el-tag closable @close="remove(scope.row,item.id)">
                                    {{ item.authName }}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row v-for="(item1,i1) in item.children" :key="item1.id" :style="{'border-top':i1 === 0?'':'1px solid #eee'}" class="rowcenter">
                                    <el-col :span="6">
                                        <el-tag closable type="success" @close="remove(scope.row,item1.id)">
                                            {{ item1.authName }}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag closable type="warning" v-for="item2 in item1.children" :key="item2.id" @close="remove(scope.row,item2.id)"> {{ item2.authName }}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName">
                </el-table-column>
                <el-table-column label="角色描述" prop="roleDesc">
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="allotRoles(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分配权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync="allotDialogVisible" width="50%" @close="empty">
            <el-tree ref="tree" :data="rightsTree" :props="props" show-checkbox node-key="id" default-expand-all :default-checked-keys="defaultChecked">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="impower">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import mix from './Roles-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 5px;
}
.rowcenter{
    display: flex;
    align-items: center;
}
</style>
