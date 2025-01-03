<script setup>
import { defineProps, reactive, ref } from "vue";

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
	addTask: Function,
	onHandleTaskDelete: Function,
	onHandleTaskComplete: Function,
	onHandleTaskReset: Function,
});

const isExpanded = ref(false);
const newTodo = reactive({
	isActive: false,
	content: "",
});

const handleAddTodo = () => {
	newTodo.isActive = true;
};

const handleSubmitNewTask = () => {
	if (newTodo.content.trim()) {
		props.addTask(newTodo.content);
	}

	newTodo.isActive = false;
	newTodo.content = "";
};

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
			<ul v-if="props.data.tickets.length > 0" class="flex gap-5 items-start flex-wrap">
				<li v-for="ticket in props.data.tickets" :key="ticket.id" :data="ticket" class="flex flex-col justify-between basis-[30%] bg-yellow-200 py-4 px-5 rounded-lg">
					<TextArea id="textarea-div" label="" v-model="ticket.content" disabled></TextArea>

					<div class="flex flex-row-reverse items-center mt-5">
						<i v-if="props.data.name === taskEnums.TO_DO" class="text-red-600 pi pi-trash ml-3 cursor-pointer" @click="props.onHandleTaskDelete(ticket.id)"></i>
						<i v-if="props.data.name === taskEnums.COMPLETED" class="text-blue-500 pi pi-undo cursor-pointer" @click="props.onHandleTaskReset(ticket.id)"></i>
						<i v-else class="text-lime-600 pi pi-check-circle cursor-pointer" @click="props.onHandleTaskComplete(ticket.id)"></i>
					</div>
				</li>

				<li v-if="newTodo.isActive" class="flex flex-col justify-between basis-[30%] bg-yellow-200 py-4 px-5 rounded-lg">
					<TextArea id="textarea-div" label="" v-model="newTodo.content" :blurEvent="() => handleSubmitNewTask()" autoFocus></TextArea>
				</li>
			</ul>

			<div
				v-if="props.data.name === taskEnums.TO_DO && !newTodo.isActive"
				@click="handleAddTodo()"
				class="flex items-center justify-center h-[30px] cursor-pointer rounded-2 shadow-slate-200 border border-solid border-gray-100 mb-3"
			>
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
