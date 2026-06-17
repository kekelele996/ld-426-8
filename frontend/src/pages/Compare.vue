<template>
  <section class="space-y-7">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-clay">Compare</p>
      <h1 class="page-title mt-3">并排看见方案差异</h1>
    </div>
    <div class="grid gap-5 lg:grid-cols-2">
      <ComparisonPanel v-for="plan in store.plans" :key="plan.id" :plan="plan" :mood-board="boards.getBoardById(plan.moodBoardId)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ComparisonPanel from '../components/common/ComparisonPanel.vue';
import { useComparisonStore } from '../stores/comparisonStore';
import { useMoodboardStore } from '../stores/moodboardStore';

const store = useComparisonStore();
const boards = useMoodboardStore();

onMounted(async () => {
  await boards.load();
  await store.load();
});
</script>
