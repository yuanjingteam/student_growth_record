// import { defineStore } from "pinia";
// import { ref } from "vue";
// import {
//   getUserThumNotification,
//   getUserStarNotification,
//   getUserComNotification
// } from "@/api/user";

// //用户信息管理
// export const useInformation = defineStore(
//   "notication",
//   () => {
//     // 用户通知
//     // 点赞,评论,收藏
//     const thumbs = ref({
//       thumbsUp: [
//         {
//           username: "",
//           article_content: "",
//           user_headshot: "",
//           not_time: ""
//         }
//       ],
//       unread_count: 0
//     });
//     const star = ref({
//       star: [
//         {
//           username: "",
//           article_content: "",
//           user_headshot: "",
//           not_time: ""
//         }
//       ],
//       unread_count: 0
//     });
//     const comments = ref({
//       comments: [
//         {
//           username: "",
//           article_content: "",
//           user_headshot: "",
//           not_time: ""
//         }
//       ],
//       unread_count: 0
//     });

//     // 获取点赞列表
//     const thumNotification = async () => {
//       const { data } = await getUserThumNotification();
//       thumbs.value = data;
//     };

//     // 获取收藏列表
//     const starNotification = async () => {
//       const { data } = await getUserStarNotification();

//       star.value = data;
//     };

//     // 获取评论列表
//     const comNotification = async () => {
//       const { data } = await getUserComNotification();

//       comments.value = data;
//     };
//     thumNotification();
//     starNotification();
//     comNotification();
//     return {
//       thumbs,
//       star,
//       comments,
//       thumNotification,
//       starNotification,
//       comNotification
//     };
//   },
//   {
//     persist: true
//   }
// );
