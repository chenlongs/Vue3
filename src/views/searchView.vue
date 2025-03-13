<template>
  <div class="search-container">
    <!-- 引入 Header 组件 -->
    <headerDesign />
    <!-- 引入输入框和选择框组件 -->
    <InputSelect
      v-model:searchQuery="searchQuery"
      v-model:impactFactor="impactFactor"
      v-model:journalTitle="journalTitle"
      v-model:jcrZone="jcrZone"
      v-model:subZone="subZone"
      v-model:rate="rate"
      :handleClear="handleClear"
      :handleSearch="handleSearch"
    />

    <!-- 表格展示模块 -->
    <el-table
      :data="paginatedJournals"
      style="width: 100%; margin-top: 20px"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column label="期刊名称" align="center" width="250px">
        <template #default="{ row }">
          <div>
            {{ row.journalTitle }}
            <div style="font-size: 12px; color: gray">{{ row.abbrJournal }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="journalDb" label="数据库" sortable align="center" />
      <el-table-column prop="impactFactor" label="影响因子" sortable align="center" width="120px" />
      <el-table-column prop="quote_factor" label="引文指标" sortable align="center" width="120px" />
      <el-table-column prop="jcrZone" label="JCR分区" align="center" />
      <el-table-column prop="subZone" label="国内分区" align="center" />
      <el-table-column
        prop="publicationPeriod"
        label="年发表文献"
        sortable
        align="center"
        width="120px"
      />
      <el-table-column
        prop="annualPublication"
        label="总被引频次"
        sortable
        align="center"
        width="120px"
      />
      <el-table-column
        prop="totalReviewRatio"
        label="综合占比"
        align="center"
        sortable
        :formatter="formatPercentage"
        width="120px"
      />
      <el-table-column prop="open_ratio" label="是否开源/开源占比" sortable align="center" />
      <el-table-column prop="isDomestic" label="是否国产" align="center" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper"
      :total="filteredJournals.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import headerDesign from '../components/Header.vue'
import InputSelect from '../components/InputSelect.vue'
import { fetchJournals } from '../api/request'

const searchQuery = ref('')
const impactFactor = ref('')
const jcrZone = ref('')
const subZone = ref('')
const rate = ref('')
const journals = ref([]) // 存储获取到的期刊数据
const background = ref(true)
const disabled = ref(false)
const currentPage = ref(1) // 当前页
const pageSize = ref(10) // 每页条数

const handleSizeChange = (val) => {
  pageSize.value = val // 更新每页条数
  handleSearch() // 重新搜索
}
const handleCurrentChange = (val) => {
  currentPage.value = val // 更新当前页
}
const handleSearch = async () => {
  try {
    const data = await fetchJournals(1, 500, searchQuery.value) // 获取更多数据
    journals.value = data.data_original.data
    console.log('Search results:', journals.value)
  } catch (error) {
    console.error('Error during search:', error)
  }
}
handleSearch()

const filteredJournals = computed(() => {
  return journals.value.filter((journal) => {
    const matchesSearch = journal.journalTitle
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesImpactFactor = impactFactor.value
      ? journal.impactFactor >= impactFactor.value
      : true
    const matchesJCR = jcrZone.value ? journal.jcrZone === jcrZone.value : true
    const matchesRegion = subZone.value ? journal.subZone === subZone.value : true
    const matchesRate = rate.value ? journal.totalReviewRatio >= parseFloat(rate.value) : true

    // 使用数组映射 JCR 分区
    const jcrDisplay = ['', 'Q1', 'Q2', 'Q3', 'Q4'][parseInt(journal.subZone)] || ''

    // 使用数组映射国内分区
    const subDisplay = ['', '1区', '2区', '3区', '4区'][parseInt(journal.subZone)] || ''

    // 转换是否国产
    const isDomesticDisplay = journal.isDomestic === '1' ? '是' : '否'

    // 更新 journal 对象以包含转换后的值
    journal.jcrZone = jcrDisplay
    journal.subZone = subDisplay
    journal.isDomestic = isDomesticDisplay

    return matchesSearch && matchesImpactFactor && matchesJCR && matchesRegion && matchesRate
  })
})

const paginatedJournals = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredJournals.value.slice(start, end) // 仅返回当前页的数据
})

const handleClear = () => {
  searchQuery.value = ''
  impactFactor.value = ''
  jcrZone.value = ''
  subZone.value = ''
  rate.value = ''
}
const formatPercentage = (row) => {
  return row.totalReviewRatio ? `${row.totalReviewRatio}%` : ''
}
</script>

<style scoped>
.search-container {
  padding: 20px;
  width: 80%; /* 设置容器宽度为 80% */
  margin: 0 auto; /* 居中对齐 */
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
