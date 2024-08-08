import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(persist);
export { store };

export * from "./modules/topicList";
export * from "./modules/classList";
export * from "./modules/useConter";
