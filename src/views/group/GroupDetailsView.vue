<script setup>

import {onMounted, reactive, ref} from "vue";
import {useToast} from "vue-toastification";
import {useRoute} from "vue-router";
import GroupForm from "@/components/group/GroupForm.vue";

const toast = useToast();
const route = useRoute();
const isLoading = ref(true);
const formData = reactive({
  data:{
    subject:{},
    groupMembers:[{}]
  }
});

const readApi = async (id) => {
  // if (id != null) {
  //   try {
  //     const response = await apiClient.get(`${GET_ASSESSMENT_SUBMISSION(id)}`);
  //     isLoading.value = false;
  //     formData.data = response.data;
  //   } catch (error) {
  //     toast.error("Something Wrong", {position: "top-center"});
  //   }
  // }
};

onMounted(() => {
  readApi(route.params.id);
});

</script>


<template>
  <div class="h-screen_content px-6">
    <GroupForm class="my-5" :loading="isLoading" v-model="formData.data"></GroupForm>
  </div>
</template>

<style scoped>

</style>