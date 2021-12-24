import { createRouter, createWebHashHistory } from "vue-router";
import ProjectDetailsApp from "../ProjectDetailsApp.vue";
import ProjectDetails from "../components/ProjectDetails.vue";

const routes = [
	{ path: "/", component: ProjectDetailsApp },
	{ path: "/:slug", component: ProjectDetails },
];

const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export default router;
