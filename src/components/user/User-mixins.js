export default {
  data() {
    // 自定义表单邮箱校验规则
    const checkEmail = (rule, value, cb) => {
      if (
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
      ) {
        cb()
      } else {
        cb(new Error('邮箱格式不正确'))
      }
    }
    // 自定义表单手机校验规则
    const checkMobile = (rule, value, cb) => {
      if (/^1[34578]\d{9}$/.test(value)) {
        cb()
      } else {
        cb(new Error('手机号格式不正确'))
      }
    }
    return {
      userList: {
        pagenum: 1, // 默认显示第一页
        pagesize: 10, // 默认显示2条数据
        query: '' // 搜索的数据
      },
      list: [], // 列表的data数据
      total: 0, // 控制总页数
      addDialogVisible: false, // 控制添加用户对话框的显示和隐藏
      editDialogVisible: false, // 控制编辑对话框的显示和隐藏
      // 添加用户中表单的数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单的验证规则
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 编辑用户的数据
      editForm: {},
      // 编辑用户的校验规则
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/users', { params: this.userList })
      if (res.meta.status !== 200) return this.$message.error('获取列表失败')
      console.log(res.data)
      this.list = res.data.users
      this.total = res.data.total
    },
    // 更改用户状态功能
    async stateChange(id, newState) {
      const { data: res } = await this.$http.put(`users/${id}/state/${newState}`)
      if (res.meta.status !== 200) return this.$message.error('设置状态失败')
    },
    // 当pagesize改变时触发事件
    handleSizeChange(newPageSize) {
      // console.log(newPageSize)
      this.userList.pagesize = newPageSize
      this.getUserList()
    },
    // 当前页码值发生变化时触发
    handleCurrentChange(newPageNum) {
      // console.log(newPageNum)
      this.userList.pagenum = newPageNum
      this.getUserList()
    },
    // 重置添加表单功能
    resetForm() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加用户功能
    async addUser() {
      const { data: res } = await this.$http.post('users', this.addForm)
      // console.log(res)
      if (res.meta.status !== 201) return this.$message.error('添加失败')
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getUserList()
    },
    // 点击编辑按钮显示对话框的功能
    async showEditDislog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取编辑用户失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 重置编辑表单功能
    resetEditForm() {
      this.$refs.editFormRef.resetFields()
    },
    // 保存编辑用户的功能
    saveEdit() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getUserList()
        this.editDialogVisible = false
      })
    },
    // 删除当前用户
    async remove(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUserList()
    }
  }
}
