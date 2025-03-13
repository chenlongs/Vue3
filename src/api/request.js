import axios from 'axios'

const API_URL =
  'https://test-ijournal-service.topeditsci.com/api/v1/journal/search?&pageSize=10&total=0&keywordType=title&keyword=&ifStart_2019=&ifEnd_2019=&ifStart=&ifEnd=&jcr=&sub=&selfCitingRate=all&compatriotRate=all&isDomestic=&totalReviewRatio=all&categoryId=1e78b26454e2878930f44c6a571be497&recommend=0&selfStart=&selfEnd=&numberStart=&numberEnd=&trrl=&trrr=&order=totalReviewRatio&orderType=asc'

export const fetchJournals = async (pageNum, pageSize, keyword) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        pageNum,
        pageSize,
        total: 0,
        keywordType: 'title',
        keyword,
        ifStart_2019: '',
        ifEnd_2019: '',
        ifStart: '',
        ifEnd: '',
        jcr: '',
        sub: '',
        selfCitingRate: 'all',
        compatriotRate: 'all',
        isDomestic: '',
        totalReviewRatio: 'all',
        categoryId: '1e78b26454e2878930f44c6a571be497',
        recommend: 0,
        selfStart: '',
        selfEnd: '',
        numberStart: '',
        numberEnd: '',
        trrl: '',
        trrr: '',
        order: 'open_ratio',
        orderType: 'asc',
      },
    })
    return response.data // 返回数据
  } catch (error) {
    console.error('Error fetching journals:', error)
    throw error // 抛出错误以便处理
  }
}
