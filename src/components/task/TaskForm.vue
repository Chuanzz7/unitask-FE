<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import pathnames from "@/router/pathnames.js";

import taskEnums from "@/enums/taskEnums";

import TaskFormItem from "@/components/task/TaskFormItem.vue";

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);

const form = reactive({
	isLoaded: false,
	id: 0,
	contents: [
		{
			name: taskEnums.TO_DO,
			tickets: [
				{
					id: 1,
					content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
				},
				{
					id: 2,
					content:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley ozxczxczxasdasdasdasdasdasdasdasdasdasdasdz asdfajsgdfjh dhsgfjhagdhjsfg asdashjdfghjasgdf ashjdgfgwiueyri qw",
				},
			],
		},
		{
			name: taskEnums.COMPLETED,
			tickets: [
				{
					id: 3,
					content: "ba ba black ship",
				},
			],
		},
	],
});

const handleClose = () => {
	router.push(pathnames.Task);
};

const getTaskDetails = async () => {};

onMounted(() => {
	getTaskDetails();
	form.isLoaded = true;
});
</script>

<template>
	<div class="relative h-full flex-wrap overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
			<div class="flex items-center">
				<button type="button" @click="handleClose" class="pr-2 leading-normal text-center align-middle">
					<i class="text-blue-500 pi pi-angle-left"></i>
				</button>
			</div>
		</div>

		<div v-if="form.isLoaded" class="flex flex-col flex-wrap items-start justify-center px-6">
			<TaskFormItem v-for="content in form.contents" :key="content.id" :data="content"></TaskFormItem>
		</div>
	</div>
</template>
