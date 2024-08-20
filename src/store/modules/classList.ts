import { defineStore } from "pinia";
import { ref } from "vue";
import { getClassListService } from "@/api/class";

//班级分类列表管理
export const useClassStore = defineStore(
  "class",
  () => {
    const classList = ref([]);

    const getClassList = async () => {
      const {
        data: { class_list }
      } = await getClassListService();
      classList.value = class_list;
      console.log("班级已更新");
    };

    // const findClassId = className => {
    //   const classOne = classList.value.find(
    //     classOne => classOne.class_name === className
    //   );
    //   return classOne ? classOne.class_id : null;
    // };
    const findClassName = classId => {
      const classOne = classList.value.find(
        classOne => classOne.class_id === classId
      );
      return classOne ? classOne.class_name : null;
    };
    return {
      classList,
      getClassList,
      // findClassId,
      findClassName
    };
  },
  {
    persist: true
  }
);
