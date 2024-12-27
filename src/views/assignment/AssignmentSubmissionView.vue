<script setup>

import BigLists from "@/components/big-list/Big-lists.vue";
import {onMounted, reactive} from "vue";
import pathnames from "@/router/pathnames.js";
import {apiClient, LIST_ANNOUNCEMENT, LIST_ASSESSMENT, LIST_ASSESSMENT_SUBMISSION} from "@/api/index.js";
import {POSITION} from "vue-toastification";
import moment from "moment/moment.js";

const state = reactive({
  listData: {isLoading: true, content: []}
});
const tableHeader = [{name: 'Subject Code', field: 'subjectCode', width: 20},
  {name: 'Assignment', field: 'assignmentName', width: 30},
  {name: 'Group', field: 'groupName', width: 30},
  {name: 'Submission Date', field: 'submissionDate', width: 15}]

const listingApi = async () => {
  try {
    const response = await apiClient.get(LIST_ASSESSMENT_SUBMISSION, {
      params: {
        page: 1,
        pageSize: 999,
      },        // search: state.search,

    });
    state.listData.isLoading = false;
    state.listData.content = [];
    response.data.content.map((x) => {
      state.listData.content.push(
          {
            id: x.id,
            subjectCode: x.subjectCode,
            assignmentName: x.assignmentName,
            groupName: x.groupName == null ? "-" : x.groupName,
            submissionDate: moment(x?.submissionDate).format("DD/MM/yyyy HH:mmA"),
          });
    });
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

// const listingApi = () => {
//   state.data = [{id: 1, subjectCode: "123", assignmentName: "test", groupName: "Ali", submissionDate: "12/2/2024"},
//     {id: 2, subjectCode: "123", assignmentName: "test", groupName: "Ali", submissionDate: "12/2/2024"}];
// }


onMounted(() => {
  listingApi()
})
</script>

<template>
  <div class="w-full justify-items-center">
    <div
        class="relative w-full flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
      <div class="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
        <h6 class="dark:text-white">Assignment Submission</h6>
      </div>
      <BigLists :route="pathnames.AssignmentSubmissionView" :header="tableHeader" :data="state.listData.content"></BigLists>
    </div>
  </div>
</template>

<style scoped>

</style>