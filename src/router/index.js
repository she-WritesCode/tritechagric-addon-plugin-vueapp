import { createRouter, createWebHashHistory } from "vue-router";
import ListProjects from "../components/ListProjectsPublic.vue";
import ProjectDetails from "../components/ProjectDetails.vue";

const routes = [
	{ path: "/", component: ListProjects },
	{ path: "/:slug", name: "ProjectDetails", component: ProjectDetails },
];

const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export default router;
