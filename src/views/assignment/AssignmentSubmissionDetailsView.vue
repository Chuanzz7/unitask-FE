<script setup>

import AppButton from "@/components/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {apiClient, GET_ASSESSMENT_SUBMISSION, GRADE_ASSESSMENT, RESUBMIT_ASSESSMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute} from "vue-router";
import AssignmentSubmissionForm from "@/components/assignment/AssignmentSubmissionForm.vue";
import AssignmentForm from "@/components/assignment/AssignmentForm.vue";

const toast = useToast();
const route = useRoute();
const isLoading = ref(true);

const formData = reactive({
  data: {
    assessment: {
      subject: {}
    }
  }
});

const grade = async (x) => {
  try {
    const payload = {
      score: x.score
    };
    const response = await apiClient.put(`${GRADE_ASSESSMENT(x.id)}`, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

const resubmit = async () => {
  try {
    const response = await apiClient.put(`${RESUBMIT_ASSESSMENT(formData.data.id)}`);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
}

const readApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_ASSESSMENT_SUBMISSION(id)}`);
      isLoading.value = false;
      formData.data = response.data;
    } catch (error) {
      toast.error("Something Wrong", {position: "top-center"});
    }
  }
};

onMounted(() => {
  readApi(route.params.id);
});

</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <AssignmentSubmissionForm class="mb-5" :grade="grade" :loading="isLoading"
                              v-model="formData.data"></AssignmentSubmissionForm>
    <AssignmentForm back disabled v-model="formData.data.assessment"></AssignmentForm>
    <AppButton @click="resubmit" class="mb-5">Resubmit</AppButton>
  </div>
</template>

<style scoped>

</style>