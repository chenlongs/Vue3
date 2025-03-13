<template>
  <div class="header">
    <div class="logo">
      <span class="topedit">TOPEDIT</span>
      <span class="ijournal">| iJournal</span>
    </div>
    <div class="nav-links">
      <el-button type="text" class="nav-item">期刊详情查询</el-button>
      <el-divider direction="vertical" />
      <el-button type="text" class="nav-item">AI智能选刊</el-button>
      <el-divider direction="vertical" />
      <el-button type="text" class="nav-item">期刊解析与推荐</el-button>
      <el-divider direction="vertical" />
      <el-button type="text" class="nav-item">iThenticate查重</el-button>
      <el-divider direction="vertical" />
      <el-button type="text" class="nav-item">关于我们</el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" class="register-button">登录/注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerDesign',
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  width: 80%;
  /* 居中对齐 */
  margin: 0 auto;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.topedit {
  color: #007bff;
}

.ijournal {
  color: #333;
}

.nav-links {
  display: flex;
  align-items: center;
}

/* 设置字体颜色为黑色 */
.nav-item {
  padding: 0 10px;
  font-size: 14px;
  font-weight: normal;
  color: #606266;
}

.register-button {
  margin-left: 20px;
}
</style>
