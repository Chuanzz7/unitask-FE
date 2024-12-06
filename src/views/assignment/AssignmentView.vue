<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AssignmentForm from "@/components/assignment/AssignmentForm.vue";
import { apiClient, LIST_ASSESSMENT } from "@/api/index.js";
import { POSITION } from "vue-toastification";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const id = ref(route.params.id);

const state = reactive({
	search: "",
	isLoading: true,
	listData: { isLoading: true, content: [] },
	formData: { isLoading: true, content: { isDisabled: true } },
});

const listingApi = async () => {
	// call listing api
	try {
		const response = await apiClient.get(LIST_ASSESSMENT, {
			params: {
				page: 1,
				pageSize: 999,
				search: state.search,
			},
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push({
				id: x.id,
				title: x.name,
				description: x.subjectName,
				code: x.dueDate,
				color: x.color,
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

const assignmentApi = async (id) => {
	state.formData.formLoading = false;
	state.formData.content.id = id;
	state.formData.content.assessmentName = "Test One";
	state.formData.content.assessmentWeightage = "20%";
	state.formData.content.assessmentMode = "Group";
	state.formData.content.dueDate = "20/12/2024";
	state.formData.content.lecturerInstruction = "a\na\na\na\na\na\na\na\na\na\na\na";
	state.formData.content.subjectCode = "Test";
	state.formData.content.subjectName = "Code Camp";
	state.formData.content.markingRubric = [{ criteriaName: "Test", criteriaWeightage: "20%" }];
	state.formData.content.uploadedDocument = [{ fileName: "Mid term.pdf", url: "www.google.com" }];
	state.formData.content.attachedDocument = [{ fileName: "Mid term.pdf", url: "www.google.com" }];
};

onMounted(() => {
	listingApi();
	assignmentApi(id.value);
});

watch(
	() => route.params.id,
	(newId) => {
		id.value = newId;
		assignmentApi(newId); // Fetch data when the ID changes
	},
	{ immediate: true }, // Trigger on initial mount
);

</script>

<template>
	<div class="h-full flex flex-wrap max-w-full pb-4 ">
		<SmallLists class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Assignment"
					editable
					details-page="assignmentDetails"
					update-page="assignmentUpdate"
					:content="state.listData.content"></SmallLists>
		<AssignmentForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[60%]"
						disabled
						v-if="currentValue != null"
						v-model="state.formData.content"
						:loading="state.formData.isLoading"></AssignmentForm>
	</div>
</template>


<style scoped>

</style>