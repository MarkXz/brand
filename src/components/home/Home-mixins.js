export default {
  data() {
    return {
      list: [],
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      collapse: false,
      ActivePath: ''
    }
  },
  created() {
    this.getMenus()
    this.ActivePath = window.sessionStorage.getItem('path')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus() {
      const { data: res } = await this.$http.get('/menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取菜单数据失败')
      this.list = res.data
    },
    saveAcitvePath(path) {
      // console.log(path)
      this.ActivePath = path
      window.sessionStorage.setItem('path', path)
    }
  }
}
