import { createApp } from "vue";
import ListProjects from "./ListProjects.vue";
import ProjectDetails from "./ProjectDetailsApp.vue";
import router from "./router";

createApp(ListProjects).mount("#ta_projects");

const projectDetails = createApp(ProjectDetails);
projectDetails.use(router);
projectDetails.mount("#ta_project_details");
