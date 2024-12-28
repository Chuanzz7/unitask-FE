<script setup>

import BigLists from "@/components/big-list/Big-lists.vue";
import { onMounted, reactive } from "vue";
import pathnames from "@/router/pathnames.js";
import { apiClient, LIST_ASSESSMENT_SUBMISSION } from "@/api/index.js";
import { POSITION } from "vue-toastification";
import moment from "moment/moment.js";

const state = reactive({
	listData: { isLoading: true, content: [] },
});

const search = reactive({ subject: "", assignment: "", group: "", beforeDate: "", afterDate: "" });

const tableHeader = [{ name: "Subject Code", field: "subjectCode", width: 20 },
	{ name: "Assignment", field: "assignmentName", width: 30 },
	{ name: "Group", field: "groupName", width: 30 },
	{ name: "Submission Date", field: "submissionDate", width: 15 }];

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_ASSESSMENT_SUBMISSION, {
			params: {
				page: 1,
				pageSize: 999,
				subjectCode: search.subject,
				assignmentName: search.assignment,
				groupName: search.group,
				beforeDate: search.beforeDate ? new Date(search.beforeDate).toISOString() : null,
				afterDate: search.afterDate ? new Date(search.afterDate).toISOString() : null,
			},

		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push(
				{
					id: x.id,
					subjectCode: x.subjectCode,
					assignmentName: x.assignmentName,
					groupName: x.groupName == null ? "-" : x.groupName,
					submissionDate: moment(x?.submissionDate).format("DD/MM/yyyy HH:mmA"),
				});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

onMounted(() => {
	listingApi();
});
</script>

<template>
	<div
		class="relative w-full flex flex-col justify-items-center min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent"><h5
			:class="`relative top-0.5 leading-normal pi pi-clone text-orange-500 pr-2`"></h5> <h5
			class="mb-0 dark:text-white">Submissions</h5></div>
		<div class="p-6"><h6 class="mb-2 text-lg dark:text-white">Advanced Search</h6>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
				<div><label for="subject" class="block text-sm font-medium text-gray-700">Subject Code</label> <input
					v-model="search.subject" type="text" id="subject"
					class="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md text-black"></div>
				<div><label for="assignment" class="block text-sm font-medium text-gray-700">Assignment Name</label>
					<input v-model="search.assignment" type="text" id="assignment"
						   class="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md text-black"></div>
				<div><label for="group" class="block text-sm font-medium text-gray-700">Group Name</label> <input
					v-model="search.group" type="text" id="group"
					class="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md text-black"></div>
				<div><label for="beforeDate" class="block text-sm font-medium text-gray-700">Before Date</label> <input
					v-model="search.beforeDate" type="date" id="beforeDate"
					class="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md text-black"></div>
				<div><label for="afterDate" class="block text-sm font-medium text-gray-700">After Date</label> <input
					v-model="search.afterDate" type="date" id="afterDate"
					class="mt-1 block w-full shadow-sm text-lg border-gray-300 rounded-md text-black"></div>
			</div>
			<div class="mt-6 flex justify-end">
				<button @click="listingApi" class="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
			</div>
		</div>
		<BigLists :route="pathnames.AssignmentSubmissionView" :header="tableHeader"
				  :data="state.listData.content"></BigLists>
	</div>
</template>

<style scoped>

</style>