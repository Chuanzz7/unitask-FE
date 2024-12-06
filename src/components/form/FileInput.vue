<script setup>
import { ref } from "vue";
import { apiClient } from "@/api/index.js";
import { POSITION, useToast } from "vue-toastification";

const props = defineProps({
	caseId: Number || String,
	uploadApi: Function || String,
	deleteApi: Function || String,
	isLecturer: Boolean,
	label: String,
	disabled: Boolean,
});
const model = defineModel();
const selectedFile = ref(null);
const toast = useToast();

const handleFileChange = (event) => {
	const file = event.target.files[0];
	if (file) {
		console.log(file);
		selectedFile.value = file;
		model.value.push({ name: file.name });
	}

	uploadFile(file);
};

const remove = (index) => {
	deleteFile(model.value[index]);
	model.value.splice(index, 1);
};

const openNewTab = (url) => {
	if (!url.includes("https://")) {
		url = `https://${url}`;
	}
	window.open(url, "_blank");
};

const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append("multipartFile", file);

	try {
		const response = await apiClient.post(props.uploadApi(props.caseId), formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === 200) {
			toast.success("Uploaded Successfully", { position: POSITION.TOP_CENTER });
		} else {
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	} catch (error) {
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

const deleteFile = async (file) => {
	console.log(file)
	if (file?.url != null) {
		try {
			const response = await apiClient.delete(props.deleteApi(file.id));
			if (response.status === 200) {
				toast.success("Deleted Successfully", { position: POSITION.TOP_CENTER });
			} else {
				toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
			}
		} catch (error) {
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	}
};

</script>

<template>
	<div>
		<div class="w-full">
			<label class="w-full ml-1 text-left font-bold text-xs text-slate-700 dark:text-white/80">{{ props.label
				}}</label>
			<label v-if="!props.disabled && props.uploadApi"
				   class="font-semibold text-blue-500 px-3 py-3  border-0 rounded-lg transition-all ease-in cursor-pointer hover:shadow-xs hover:-translate-y-px active:opacity-85">
				<i class="text-lg pi pi-upload py-1 mr-3"></i>
				<span>Upload</span>
				<input class="hidden" type="file" @change="handleFileChange" />
			</label>
			<label class="w-full ml-1 my-2 text-left text-slate-700 dark:text-white/80">File Name</label>
		</div>


		<div v-for="(file, index) in modelValue" :key="index"
			 class="flex flex-wrap px-1 mb-3 justify-between ">
			<button class="underline font-semibold text-blue-500" @click="openNewTab(file.url)">{{ file.name }}
			</button>
			<div v-if="!props.disabled && props.deleteApi">
				<button @click="remove(index)">
					<i class="text-lg pi pi-trash mr-8"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>