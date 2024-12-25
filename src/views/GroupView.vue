<script setup>

import { useRouter } from "vue-router";
import GroupList from "@/components/group/GroupList.vue";
import { onMounted, reactive } from "vue";
import { apiClient } from "@/api/index.js";
import { LIST_GROUP } from "@/api/group.js";
import { POSITION } from "vue-toastification";

const router = useRouter();

const state = reactive({
	listData: { isLoading: true, content: [] },
	selectedValue: 0,
	search: "",
});

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_GROUP, {
			params:{
				page: 1,
				pageSize: 10,
				search: state.search,
			}
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((item) => {
			state.listData.content.push({
				id: item.id,
				name: item.name,
				description: item.description,
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something went wrong", {position: POSITION.TOP_CENTER})
	}
};
onMounted(() => {
	listingApi();
});


</script>

<template>
	<GroupList class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Group" module="groupDetails"
			   :content="state.listData.content"></GroupList>
</template>
