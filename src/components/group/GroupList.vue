<script setup>

import { defineProps, reactive } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRoute } from "vue-router";
import GroupListItem from "@/components/group/GroupListItem.vue";

const route = useRoute();

const props = defineProps({
	title: String,
	module: String,
	content: [
		{
			id: Number,
			name: String,
			description: String,
		},
	],
});

const state = reactive({
	isActiveId: Number,
	search: String,
});

const getId = (id) => {
	route.push({ name: props.module, params: { id: id } });
};

const filter = (value) => {
	state.search = value;
};

</script>

<template>
	<div
		class="h-full overflow-y-hidden pb-14 px-1 bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl">
		<div class="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
			<div class="flex flex-wrap -mx-3">
				<div class="flex items-center flex-none w-1/2 max-w-full px-3">
					<h5 class="mb-0 dark:text-white">{{ title }}</h5>
				</div>
				<div class="flex justify-between items-center space-x-4">
					<SearchBar @search-input="filter"></SearchBar>
						<button v-if="!(props.disabled)" class="flex pr-14 font-semibold text-blue-500">
<!--								@click="addGroup() ">-->
							<i class=" text-lg pi pi-plus py-1 mr-1"></i>
							<span>Create</span>
						</button>
				</div>
			</div>
		</div>
		<div class="max-h-full overflow-y-auto break-words bg-clip-border">
			<GroupListItem v-for="content in props.content" :key="content.id" :data="content"></GroupListItem>
		</div>
	</div>
</template>
