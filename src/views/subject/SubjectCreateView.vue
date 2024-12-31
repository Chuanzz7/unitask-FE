<script setup>

import SubjectForm from "@/components/subject/SubjectForm.vue";
import AppButton from "@/components/AppButton.vue";
import { reactive } from "vue";
import { apiClient, POST_SUBJECT } from "@/api/index.js";
import { POSITION, useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import pathnames from "@/router/pathnames.js";

const toast = useToast();
const router = useRouter();

const formData = reactive({
	isDisabled: false,
	name: "",
	code: "",
	course: "",
	creditHour: 0,
	description: "",
	learningOutcome: "",
	lecturerName: "",
	lecturerContact: "",
	lecturerEmail: "",
	lecturerOffice: "",
	assessment:
		[{ name: "", weightage: "" }],
	color: "#5e72e4",
});


const create = async () => {
	console.log(formData);
	try {
		const payload = {
			name: formData.name,
			code: formData.code,
			course: formData.course,
			creditHour: formData.creditHour,
			description: formData.description,
			learningOutcome: formData.learningOutcome,
			lecturerName: formData.lecturerName,
			lecturerContact: formData.lecturerContact,
			lecturerEmail: formData.lecturerEmail,
			lecturerOffice: formData.lecturerOffice,
			color: formData.color,
			assessment: [],
			status: "ACTIVE",
		};

		formData.assessment.map((x) => {
			payload.assessment.push({ name: x.name, assignmentMode: x.assignmentMode, weightage: x.weightage });
		});

		const response = await apiClient.post(POST_SUBJECT, payload);
		if (response.status === 200) {
			toast.success("Successfully created!", { position: POSITION.TOP_CENTER });
		}
	} catch (error) {
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	} finally {
		router.push(pathnames.SubjectView);
	}
};
</script>


<template>
	<div class="flex-col w-full justify-items-center">
		<SubjectForm v-model="formData"></SubjectForm>
		<AppButton @click="create" class="mb-5">Create</AppButton>
	</div>
</template>

<style scoped>

</style>