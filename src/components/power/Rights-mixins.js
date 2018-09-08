export default {
  data() {
    return {
      powerList: []
    }
  },
  created() {
    this.getPowerList()
  },
  methods: {
    async getPowerList() {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取列表数据失败')
      this.powerList = res.data
    }
  }
}
