import {defineStore} from 'pinia'
import {ref} from 'vue'

//话题分类列表管理  topicList  setTopicList 
export const useTopicStore =defineStore('topic',()=>{
  const topicList=ref([])
})
