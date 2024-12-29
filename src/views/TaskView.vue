<script setup>
import {reactive, ref} from "vue";
import {OnClickOutside} from "@vueuse/components";
import SmallHorizontalNav from "@/components/SmallHorizontalNav.vue";
import AddTask from "@/components/task/AddTask.vue";
import Task from "@/components/task/Task.vue";

const active = ref(false);
const state = reactive({
  activeTab: "INDIVIDUAL",
  todoTask: [{task: "a", assignmentName: "b", assignedName: "c"}],
  completedTask: [],
  selectedValue: 0,
});

const checkTask = (index) => {
  state.completedTask.push(state.todoTask[index]);
  state.todoTask.splice(index, 1);
}

const uncheckTask = (index) => {
  state.todoTask.push(state.completedTask[index]);
  state.completedTask.splice(index, 1);
}

// const listingApi = () => {
//   // if (error.response.status === 401) {
//   //   toast.error("Bad Credential", {position: "top-center"});
//   // } else {
//   //   toast.error("Something Wrong", {position: "top-center"});
//   // }
//
//   let data = [
//     {
//       id: 1,
//       subjectName: "Software Testing",
//       subjectCode: "SWE3033",
//       projectName: "Assignment 1",
//       totalTask: 4,
//     },
//     {
//       id: 2,
//       subjectName: "Test2",
//       subjectCode: "456",
//       projectName: "Assignment 2",
//       totalTask: 5,
//     },
//   ];
//
//   data.map((x) => {
//     state.listData.push(x);
//   });
// };

</script>

<template>

  <div class="flex-col w-full justify-items-center">
    <div
        class="relative w-full flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
      <div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
        <h5 :class="`relative top-0.5 leading-normal pi pi-list-check text-cyan-500 pr-2`"></h5>
        <h5 class="mb-0 dark:text-white">Tasks</h5>
      </div>
      <SmallHorizontalNav v-model="state.activeTab" class="my-5"></SmallHorizontalNav>

      <OnClickOutside
          :options="{ignore:['.p-dropdown-panel']}"
          @click="active=true"
          @trigger="active=false">
        <AddTask v-model="state.todoTask" :group="state.activeTab" :active="active" class="mx-5"></AddTask>
      </OnClickOutside>

      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

      <h6 class="mx-5">To Do</h6>
      <Task v-for="(task,index) in state.todoTask"
            @click="checkTask(index)"
            :data="task"
            :group="state.activeTab"
            class="mx-5 mb-1"></Task>

      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

      <h6 class="mx-5">Completed</h6>
      <Task v-for="(task,index) in state.completedTask"
            @click="uncheckTask(index)"
            check
            :data="task"
            :group="state.activeTab" class="mx-5 mb-1"></Task>

    </div>
  </div>
</template>
