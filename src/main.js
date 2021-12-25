import { createApp } from "vue";
import ListProjects from "./ListProjects.vue";
import ProjectDetails from "./ProjectDetailsApp.vue";
import router from "./router";
import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./index.css";

createApp(ListProjects).mount("#ta_projects");

const projectDetails = createApp(ProjectDetails);
projectDetails.use(router);
projectDetails.mount("#ta_project_details");
