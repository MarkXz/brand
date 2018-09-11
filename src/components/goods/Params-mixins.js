export default {
  data() {
    return {
      // 渲染出一个级联选择器所需要的数据
      options: [],
      // 用户选中的分类id
      selectedId: [],
      // 配置级联所要的数据
      ruleCate: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeName: 'many', // 标签页的双向绑定 默认first页
      manyTableList: [], // 动态参数的表格数据
      onlyTableList: [], // 静态属性的表格数据
      value: '' // input参数默认值
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      // console.log(res)
      this.options = res.data
    },
    // 监听分类级联选择器
    handleChange() {
      // console.log(this.selectedId)
      if (this.selectedId.length !== 3) {
        this.selectedId = []
        this.manyTableList = []
        this.onlyTableList = []
      } else {
        this.getAttrList()
      }
    },
    // 获取参数的数据
    async getAttrList() {
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: { sel: this.activeName }
      })
      if (res.meta.status !== 200) return this.$message.error('获取参数失败')
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(' ') : []
        item.flag = true
      })
      console.log(res.data)
      if (this.activeName === 'many') {
        this.manyTableList = res.data
      } else {
        this.onlyTableList = res.data
      }
    },
    // 删除标签参数功能
    async removeTag(row, i) {
      row.attr_vals.splice(i, 1)
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
    },
    // 显示添加参数输入框的功能
    showInput(row) {
      row.flag = false
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // input失去焦点添加参数功能
    async addVal(row) {
      if (this.value.trim().length !== 0) {
        row.attr_vals.push(this.value)
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${row.attr_id}`,
          {
            attr_name: row.attr_name,
            attr_sel: row.attr_sel,
            attr_vals: row.attr_vals.join(' ')
          }
        )
        if (res.meta.status !== 200) return this.$message.error('添加失败')
        this.$message.success('添加成功')
      }
      row.flag = true
      this.value = ''
    }
  },
  // 定义一个计算属性获取第3级分类的id
  computed: {
    cateId() {
      if (this.selectedId.length === 3) {
        return this.selectedId[this.selectedId.length - 1]
      } else {
        return null
      }
    }
  },
  // 监听动态参数和静态属性的变换 从而获取不同的数据
  watch: {
    activeName() {
      if (this.cateId !== null) {
        this.getAttrList()
      }
    }
  }
}
