<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <!-- 搜索框 -->
            <el-col :span="10">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <!-- 表格 -->
            <el-table :data="orderList" style="width: 100%" border stripe>
                <el-table-column type="index" width="40">
                </el-table-column>
                <el-table-column label="订单编号" prop="order_number">
                </el-table-column>
                <el-table-column label="订单价格" prop="order_price" width="70">
                </el-table-column>
                <el-table-column label="是否付款" width="80">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-if="scope.row.order_pay  === '0'">{{ scope.row.order_pay==='0'?'未付款':'已付款' }}</el-tag>
                        <el-tag type="success" v-else>{{ scope.row.order_pay==='0'?'未付款':'已付款' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否发货" prop="is_send" width="70">
                </el-table-column>
                <el-table-column label="下单时间">
                    <template slot-scope="scope">
                        {{ scope.row.create_time | dataForm }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog"></el-button>
                        <el-button type="success" icon="el-icon-location" size="mini" @click="showDialog"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
        </el-card>
        <!-- 物流信息的对话框 -->
        <el-dialog title="物流信息" :visible.sync="wldialogVisible" width="50%">
            <el-steps direction="vertical" :active="0">
                <el-step v-for="(item,i) in wlList" :key="i" :title="item.time" :description="item.context"></el-step>
            </el-steps>
        </el-dialog>
        <!-- 编辑的对话框 -->
        <el-dialog title="修改地址" :visible.sync="editDialogVisible" width="50%">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="省市区/县" prop="area">
                    <el-cascader :options="cityOptions" v-model="selectArea" @change="changeProvince" change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="editForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import mix from './Order-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-col {
  margin-bottom: 15px;
}
</style>
