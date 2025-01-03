import {createRouter, createWebHistory} from "vue-router";

import {useAuthStore} from "@/stores/AuthStore";

import pathnames from "./pathnames";

import Login from "@/views/Auth/LoginView.vue";
import SignUp from "@/views/Auth/SignUpView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import Dashboard from "@/views/Dashboard.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

import AnnouncementView from "@/views/announcement/AnnouncementView.vue";
import AnnouncementCreateView from "@/views/announcement/AnnouncementCreateView.vue";
import AnnouncementEditView from "@/views/announcement/AnnouncementEditView.vue";

import SubjectCreateView from "@/views/subject/SubjectCreateView.vue";
import SubjectEditView from "@/views/subject/SubjectEditView.vue";
import SubjectView from "@/views/subject/SubjectView.vue";

import AssignmentView from "@/views/assignment/AssignmentView.vue";
import AssignmentEditView from "@/views/assignment/AssignmentEditView.vue";

import AssignmentSubmissionView from "@/views/assignment/AssignmentSubmissionView.vue";
import AssignmentSubmissionDetailsView from "@/views/assignment/AssignmentSubmissionDetailsView.vue";

import GroupView from "@/views/group/GroupView.vue";
import TaskView from "@/views/TaskView.vue";
import DocumentView from "@/views/Document/DocumentView.vue";

import ProfileView from "@/views/ProfileView.vue";
import GroupDetailsView from "@/views/group/GroupDetailsView.vue";
import GroupCreateView from "@/views/group/GroupCreateView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: pathnames.NotFoundView,
            name: "not-found",
            component: NotFoundView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: pathnames.LoginView,
            name: "login",
            component: Login,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: pathnames.SignUpView,
            name: "sign-up",
            component: SignUp,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: pathnames.DefaultView,
            component: DefaultLayout,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: pathnames.DashboardView,
                    name: "dashboard",
                    component: Dashboard,
                },
                {
                    path: pathnames.AnnouncementView,
                    name: "announcement",
                    component: AnnouncementView,
                },
                {
                    path: pathnames.AnnouncementView + "/:id",
                    name: "announcementDetails",
                    component: AnnouncementView,
                },
                {
                    path: pathnames.AnnouncementView + "/new",
                    name: "announcementCreate",
                    component: AnnouncementCreateView,
                },
                {
                    path: pathnames.AnnouncementView + "/update/:id",
                    name: "announcementUpdate",
                    component: AnnouncementEditView,
                },
                {
                    path: pathnames.SubjectView,
                    name: "subject",
                    component: SubjectView,
                },
                {
                    path: pathnames.SubjectView + "/:id",
                    name: "subjectDetails",
                    component: SubjectView,
                },
                {
                    path: pathnames.SubjectView + "/update/:id",
                    name: "subjectUpdate",
                    component: SubjectEditView,
                },
                {
                    path: pathnames.SubjectView + "/new",
                    name: "subjectCreate",
                    component: SubjectCreateView,
                },
                {
                    path: pathnames.AssignmentView,
                    name: "assignment",
                    component: AssignmentView,
                },
                {
                    path: pathnames.AssignmentView + "/:id",
                    name: "assignmentDetails",
                    component: AssignmentView,
                },
                {
                    path: pathnames.AssignmentView + "/update/:id",
                    name: "assignmentUpdate",
                    component: AssignmentEditView,
                },
                {
                    path: pathnames.AssignmentSubmissionView,
                    name: "assignmentSubmission",
                    component: AssignmentSubmissionView,
                },
                {
                    path: pathnames.AssignmentSubmissionView + "/:id",
                    name: "assignmentSubmissionDetails",
                    component: AssignmentSubmissionDetailsView,
                },
                {
                    path: pathnames.Profile,
                    name: "profile",
                    component: ProfileView,
                },
                {
                    path: pathnames.Group,
                    name: "group",
                    component: GroupView,
                },
                {
                    path: pathnames.Group + "/:id",
                    name: "groupDetails",
                    component: GroupDetailsView,
                },
                {
                    path: pathnames.Group + "/create",
                    name: "groupCreate",
                    component: GroupCreateView,
                },
                {
                    path: pathnames.Task,
                    name: "task",
                    component: TaskView,
                },
                {
                    path: pathnames.Task + "/:id",
                    name: "taskDetails",
                    component: TaskView,
                },
                {
                    path: pathnames.Document,
                    name: "document",
                    component: DocumentView,
                },
                // Add more child routes as needed
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (to.name === pathnames.LoginView) {
        //sign out
        authStore.logout();

        next();
    }
    if (to.meta.requiresAuth) {
        //token check
        if (authStore.isAuthenticated) {
            next();
        } else {
            //token check
            next({name: "login"});
        }
    } else {
        next();
    }
});

export default router;
