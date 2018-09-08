export default {
  data() {
    return {
      rolesList: [],
      allotDialogVisible: false, // 控制分配权限的对话框显示和隐藏
      rightsTree: [], // 所有权限的数据
      props: {
        label: 'authName', // 指定哪个属性渲染出来供用户看
        children: 'children' // 指定节点之间的嵌套关系
      },
      defaultChecked: [], // 默认勾选的节点的id
      roledId: null // 分配权限确定时所要请求的角色id
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取角色信息失败')
      this.rolesList = res.data
    },
    // 删除角色指定权限
    async remove(role, rightId) {
      console.log(role)
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
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
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      role.children = res.data
    },
    // 分配权限的对话框
    async allotRoles(role) {
      this.roledId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('初始化权限结构失败')
      this.rightsTree = res.data
      const arr = []
      this.getLeafIds(role, arr)
      this.defaultChecked = arr
      this.allotDialogVisible = true
    },
    // 定义一个递归方法  获取最后节点的数据 keys是数组 node是节点
    getLeafIds(node, keys) {
      if (!node.children) {
        return (keys = keys.push(node.id))
      } else {
        node.children.forEach(item => this.getLeafIds(item, keys))
      }
    },
    // 定义对话框关闭后的方法
    empty() {
      this.allotDialogVisible = false
      this.defaultChecked = []
      this.rightsTree = []
      this.roledId = null
    },
    // 定义确定分配的新权限
    async impower() {
      const arr1 = this.$refs.tree.getHalfCheckedKeys()
      const arr2 = this.$refs.tree.getCheckedKeys()
      const rids = [...arr1, ...arr2].join(',')
      const { data: res } = await this.$http.post(`roles/${this.roledId}/rights`, { rids })
      if (res.meta.status !== 200) return this.$message.error('更新权限失败')
      this.$message.success('更新权限成功')
      this.allotDialogVisible = false
      this.getRolesList()
    }
  }
}
