// 导入省市区县的数据
import cityOptions from './city_data2017_element.js'
export default {
  data() {
    return {
      queryInfo: {
        pagenum: 1, // 当前页码
        pagesize: 10 // 每页显示条数
      },
      total: 0, // 总条数
      orderList: [], // 这是要渲染的数据
      wldialogVisible: false, // 控制物流对话框的显示和隐藏
      wlList: [], // 物流数据
      editDialogVisible: false,
      // 修改地址的表单数据对象
      editForm: {
        area: '',
        address: ''
      },
      // 修改地址的表单验证规则
      editFormRules: {
        area: [{ required: true, message: '不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      // 省市区县的数据
      cityOptions,
      // 选中的省市区县
      selectArea: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.orderList = res.data.goods
    },
    // 显示物流对话框
    async showDialog() {
      const { data: res } = await this.$http.get(`/kuaidi/1106975712662`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取物流信息失败')
      this.wlList = res.data
      this.wldialogVisible = true
    },
    // 显示编辑的对话框
    showEditDialog() {
      this.editDialogVisible = true
    },
    // 级联选择器的监听事件
    changeProvince() {}
  }
}
