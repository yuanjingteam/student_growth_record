import { defineStore } from "pinia";
import { ref } from "vue";
// import { getClassListService } from "@/api/class";

//班级分类列表管理
export const useClassStore = defineStore(
  "class",
  () => {
    const classList = ref([
      {
        class_id: "1",
        header_name: "全部",
        class_name: "计科222"
      },
      {
        class_id: "2",
        header_name: "学习",
        class_name: "计科221"
      },
      {
        class_id: "3",
        header_name: "奖项",
        class_name: " 计科223"
      },
      {
        class_id: "4",
        header_name: "志愿",
        class_name: "计科224"
      },
      {
        class_id: "5",
        header_name: "文体",
        class_name: "计科225"
      },

      {
        class_id: "6",
        header_name: "日常",
        class_name: "计科226"
      }
    ]);

    const getClassList = async () => {
      // const {
      //   data: { class_list }
      // } = await getClassListService();
      // classList.value = class_list;
      console.log("班级已更新");
    };

    const findClassId = className => {
      const classOne = classList.value.find(
        classOne => classOne.class_name === className
      );
      return classOne ? classOne.class_id : null;
    };
    const findClassName = classId => {
      const classOne = classList.value.find(
        classOne => classOne.class_id === classId
      );
      return classOne ? classOne.class_name : null;
    };
    return {
      classList,
      getClassList,
      findClassId,
      findClassName
    };
  },
  {
    persist: true
  }
);
