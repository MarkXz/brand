export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      cateList: [], // 获取的商品数据
      total: 0, // 总页数
      columns: [
        { label: '分类名称', prop: 'cat_name' },
        {
          label: '是否有效',
          type: 'template',
          template: 'valid'
        },
        {
          label: '排序',
          type: 'template',
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operation',
          width: '200px'
        }
      ],
      // 控制添加分类的对话框显示和隐藏
      addDialogVisible: false,
      // 添加分类表单的数据对象
      addForm: {
        // 分类名称
        cat_name: '',
        // 分类父ID 若1级分类默认为0
        cat_pid: 0,
        // 分类层级 0为1级 1为2级 2为3级
        cat_level: 0
      },
      // 添加分类表单的验证规则
      addFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 级联选择器所用到的数据
      options: [],
      // 所选的分类id
      selectedListId: [],
      // 配置级联选择器的分类
      configAddForm: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.cateList = res.data.result
      this.total = res.data.total
    },
    // 页码值发生变化时触发
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 显示添加分类对话框
    async showAddDialog() {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.options = res.data
      this.addDialogVisible = true
    },
    // 监听用户选择分类触发
    handleChange() {
      console.log(this.selectedListId)
      if (this.selectedListId.length === 0) {
        this.addForm.cat_pid = 0
        this.addForm.cat_level = 0
      } else {
        this.addForm.cat_pid = this.selectedListId[this.selectedListId.length - 1]
        this.addForm.cat_level = this.selectedListId.length
      }
    },
    // 取消重置分类对话框表单
    resetAddForm() {
      this.$refs.addFormRef.resetFields()
      this.selectedListId = []
      this.addForm.cat_pid = 0
      this.addForm.cat_level = 0
    },
    // 添加分类
    addCate() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // console.log(valid)
        const { data: res } = await this.$http.post('categories', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        this.getCateList()
        this.addDialogVisible = false
      })
    }
  }
}
