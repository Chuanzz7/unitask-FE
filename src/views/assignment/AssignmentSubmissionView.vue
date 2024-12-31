<script setup>

import BigLists from "@/components/big-list/Big-lists.vue";
import { onMounted, reactive } from "vue";
import pathnames from "@/router/pathnames.js";
import { apiClient, LIST_ASSESSMENT_SUBMISSION } from "@/api/index.js";
import { POSITION } from "vue-toastification";
import moment from "moment/moment.js";
import TextInput from "@/components/form/TextInput.vue";
import DateInput from "@/components/form/DateInput.vue";

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

		<div class="mx-5 my-5 border-4 border-blue-500 rounded-xl py-6 px-6">
			<h6 class="mb-2 text-lg dark:text-white">Advanced Search</h6>
			<div class="grid grid-cols-1 sm:grid-cols-3">
				<TextInput label="Subject" v-model="search.subject"></TextInput>
				<TextInput label="Assignment Name" v-model="search.assignment"></TextInput>
				<TextInput label="Group Name" v-model="search.group"></TextInput>
				<DateInput label="Start Date" v-model="search.beforeDate"></DateInput>
				<DateInput label="End Date" v-model="search.afterDate"></DateInput>
			</div>
			<div class="mt-6 flex justify-center">
				<button @click="listingApi" class="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>

			</div>
		</div>
		<BigLists :route="pathnames.AssignmentSubmissionView" :header="tableHeader"
				  :data="state.listData.content"></BigLists>
	</div>
</template>

<style scoped>

</style>