<template>
  <div class="input-select-container">
    <div class="input-group">
      <el-select placeholder="选择期刊" style="width: 120px">
        <el-option label="ISSN" value="journal1" />
        <el-option label="期刊名称" value="journal2" />
        <el-option label="简称" value="journal3" />
        <el-option label="学科分类" value="journal4" />
        <!-- 添加更多期刊选项 -->
      </el-select>

      <el-input
        placeholder="请输入内容"
        :value="searchQuery"
        clearable
        @clear="handleClear"
        @input="updateSearchQuery"
        style="width: 360px"
        class="custom-input"
      />

      <el-button type="primary" @click="handleSearch">
        <el-icon>
          <Search />
        </el-icon>
      </el-button>
    </div>

    <div class="select-group">
      <label for="impactFactor" class="label">影响因子</label>
      <el-select
        :value="impactFactor"
        placeholder="不限"
        @change="updateImpactFactor"
        style="width: 120px; margin-right: 120px"
      >
        <el-option label="不限" value="" />
        <el-option label="≥ 5" value="5" />
        <el-option label="≥ 3" value="3" />
        <el-option label="≥ 1" value="1" />
      </el-select>

      <label for="jcr" class="label">JCR分区</label>
      <el-select
        :value="jcr"
        placeholder="不限"
        @change="updateJCR"
        style="width: 120px; margin-right: 120px"
      >
        <el-option label="不限" value="" />
        <el-option label="Q1" value="Q1" />
        <el-option label="Q2" value="Q2" />
        <el-option label="Q3" value="Q3" />
        <el-option label="Q4" value="Q4" />
      </el-select>

      <label for="region" class="label">分区</label>
      <el-select
        :value="region"
        placeholder="不限"
        @change="updateregion"
        style="width: 120px; margin-right: 120px"
      >
        <el-option label="不限" value="" />
        <el-option label="1区" value="1区" />
        <el-option label="2区" value="2区" />
        <el-option label="3区" value="3区" />
        <el-option label="4区" value="4区" />
      </el-select>

      <label for="rate" class="label">综述占比</label>
      <el-select
        :value="rate"
        placeholder="不限"
        @change="updaterate"
        style="width: 120px; margin-right: 120px"
      >
        <el-option label="不限" value="" />
        <el-option label="0~5%" value="0~5%" />
        <el-option label="5%~10%" value="5%~10%" />
        <el-option label="10%~20%" value="10%~20%" />
        <el-option label="20%~30%" value="20%~30%" />
        <el-option label="30%~50%" value="30%~50%" />
        <el-option label="50%以上" value="50%以上" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'

// 这里的 props 和 methods 需要使用 defineProps 和 defineEmits
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  impactFactor: {
    type: String,
    required: true,
  },
  jcr: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  handleClear: {
    type: Function,
    required: true,
  },
  handleSearch: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedJournal',
  'update:impactFactor',
  'update:jcr',
  'update:rate',
  'update:region',
])

function updateSearchQuery(value) {
  emit('update:searchQuery', value)
}

function updateImpactFactor(value) {
  emit('update:impactFactor', value)
}

function updateJCR(value) {
  emit('update:jcr', value)
}

function updaterate(value) {
  emit('update:rate', value)
}

function updateregion(value) {
  emit('update:region', value)
}

// 使用 props 以消除未使用的警告
console.log(props.searchQuery, props.impactFactor, props.jcr, props.region, props.rate)
</script>

<style scoped>
.input-select-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 居中对齐 */
  margin: 20px;
}

.input-group,
.select-group {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-bottom: 20px; /* 每组之间的间距 */
}
.label {
  margin-right: 10px; /* 标签与选择框之间的间距 */
  align-self: center; /* 标签垂直居中 */
  font-size: 14px; /* 设置字体大小 */
  color: #606266; /* 设置字体颜色，与 Element Plus 的选择框一致 */
}
</style>
