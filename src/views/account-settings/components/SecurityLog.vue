<script setup lang="ts">
import dayjs from "dayjs";
import { getMineLogs } from "@/api/user";
import { reactive, ref, onMounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import type { PaginationProps } from "@pureadmin/table";

defineOptions({
  name: "SecurityLog"
});

const loading = ref(true);
const dataList = ref([]);

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  background: true,
  layout: "prev, pager, next"
});

const columns: TableColumnList = [
  {
    label: "요약",
    prop: "summary",
    minWidth: 140
  },
  {
    label: "IP",
    prop: "ip",
    minWidth: 100
  },
  {
    label: "주소",
    prop: "address",
    minWidth: 140
  },
  {
    label: "시스템",
    prop: "system",
    minWidth: 100
  },
  {
    label: "브라우저",
    prop: "browser",
    minWidth: 100
  },
  {
    label: "실행시간",
    prop: "operatingTime",
    minWidth: 180,
    formatter: ({ operatingTime }) =>
      dayjs(operatingTime).format("YYYY-MM-DD HH:mm:ss")
  }
];

async function onSearch() {
  loading.value = true;
  const { data } = await getMineLogs();
  dataList.value = data.list;
  pagination.total = data.total;
  pagination.pageSize = data.pageSize;
  pagination.currentPage = data.currentPage;

  setTimeout(() => {
    loading.value = false;
  }, 200);
}

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">보안로그</h3>
    <pure-table
      row-key="id"
      table-layout="auto"
      :loading="loading"
      :data="dataList"
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</template>
