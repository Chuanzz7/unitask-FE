<script setup>

import {onMounted, reactive, ref} from "vue";
import {POSITION, useToast} from "vue-toastification";
import {useRoute} from "vue-router";
import GroupForm from "@/components/group/GroupForm.vue";
import {apiClient} from "@/api/index.js";
import {GET_GROUP, GET_STUDENT_ASSESSMENT} from "@/api/group.js";
import AppButton from "@/components/AppButton.vue";

const toast = useToast();
const route = useRoute();
const isLoading = ref(true);
const formData = reactive({
  option: [],
  data: {
    name: "",
    assessment: {
      subject: {},
    },
    groupMembers: [{}]
  }
});

const readApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_GROUP(id)}`);
      formData.data = response.data;
    } catch (error) {
      toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
    }
  }
  await studentOption(formData.data.assessment.id)
};

const studentOption = async (id) => {
  try {
    const response = await apiClient.get(`${GET_STUDENT_ASSESSMENT(id)}`);
    isLoading.value = false;
    let data = response.data;
    data.forEach(x => formData.option.push({
      value: x.id,
      label: x.name,
    }));
    console.log(formData.option)
  } catch (error) {
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
}

const update = async (id) => {

}


onMounted(() => {
  readApi(route.params.id);
});

</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <GroupForm :disabled="formData.locked"
               :loading="isLoading"
               v-model:data="formData.data"
               v-model:option="formData.option"></GroupForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>

  </div>
</template>

<style scoped>

</style>