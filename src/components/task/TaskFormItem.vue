<script setup>
import { defineProps, ref } from "vue";

import taskEnums from "@/enums/taskEnums";
import TextArea from "@/components/form/TextArea.vue";

const props = defineProps({
	data: {
		name: String,
		tickets: [
			{
				id: Number,
				content: String,
			},
		],
	},
});

const isExpanded = ref(false);

const renderStatusName = (status) => {
	switch (status) {
		case taskEnums.COMPLETED:
			return "Completed";

		default:
			return "To Do";
	}
};

const expandAndCollapseTab = () => {
	isExpanded.value = !isExpanded.value;
};

const addTask = (status) => {
	console.log("add", status);
};

const onHandleTaskDelete = (id) => {
	console.log(id, "delete");
};

const onHandleTaskComplete = (id) => {
	console.log(id, "complete");
};

const onHandleTaskReset = (id) => {
	console.log(id, "reset");
};
</script>

<template>
	<div class="flex flex-col w-full mb-5">
		<div
			:class="[props.data.name === taskEnums.COMPLETED ? 'border-lime-300 text-lime-600 ' : 'border-blue-200 text-blue-500 ', 'inline-flex mb-5 justify-between border-b-4 text-sm w-full items-center cursor-pointer']"
			@click="expandAndCollapseTab"
		>
			<div class="flex">
				<p class="leading-normal uppercase dark:text-white dark:opacity-60 m-0 mr-2">{{ renderStatusName(props.data.name) }}</p>

				<span>{{ props.data.tickets.length }}</span>
			</div>

			<i :class="[props.data.name === taskEnums.COMPLETED ? 'text-lime-600 ' : 'text-blue-500 ', isExpanded ? 'pi pi-arrow-circle-up' : 'pi pi-arrow-circle-down']"></i>
		</div>

		<div v-if="isExpanded" class="flex flex-col flex-wrap gap-5">
			<ul v-if="props.data.tickets.length > 0" class="flex gap-5 items-start">
				<li v-for="ticket in props.data.tickets" :key="ticket.id" :data="ticket" class="flex flex-col justify-between basis-[30%] bg-yellow-200 py-4 px-5 rounded-lg">
					<TextArea id="textarea-div" label="" v-model="ticket.content" disabled></TextArea>

					<div class="flex flex-row-reverse items-center mt-5">
						<i class="text-red-600 pi pi-trash ml-3 cursor-pointer" @click="onHandleTaskDelete(ticket.id)"></i>
						<i v-if="props.data.name === taskEnums.COMPLETED" class="text-blue-500 pi pi-undo cursor-pointer" @click="onHandleTaskReset(ticket.id)"></i>
						<i v-else class="text-lime-600 pi pi-check-circle cursor-pointer" @click="onHandleTaskComplete(ticket.id)"></i>
					</div>
				</li>
			</ul>

			<div v-if="props.data.name === taskEnums.TO_DO" @click="addTask(props.data.name)" class="flex items-center justify-center h-[30px] cursor-pointer rounded-2 shadow-slate-200 border border-solid border-gray-100 mb-3">
				<img src="@/assets/img/add-icon.svg" alt="add" />
			</div>
		</div>
	</div>
</template>

<style scoped>
>>> div#textarea-div {
	padding: 0;
}

>>> textarea#textarea-input {
	padding: 0;
	background: inherit;
	outline: none;
	border: 0;
	border-style: none;
}

>>> textarea#textarea-input:focus {
	outline: none;
	border: 0;
	border-style: none;
	box-shadow: none;
}
</style>
