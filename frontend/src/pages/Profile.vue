<template>
  <section class="space-y-7">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-clay">Profile</p>
      <h1 class="page-title mt-3">个人风格档案</h1>
    </div>
    <div v-if="profile.profile" class="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div class="bg-paper p-8 ring-1 ring-ink/10">
        <p class="text-sm text-ink/60">最近测试</p>
        <h2 class="font-display text-5xl text-ink">{{ profile.profile.primaryStyle }}</h2>
        <p class="mt-4 text-ink/70">{{ styleDescriptions[profile.profile.primaryStyle] }}</p>
      </div>
      <StyleRadarChart :scores="profile.profile.scores" />
    </div>
    <EmptyState v-else text="完成一次风格测试后，这里会出现你的长期偏好档案" />
    <div class="grid gap-4 lg:grid-cols-3">
      <MoodBoardCard v-for="board in boards.boards" :key="board.id" :board="board" @select-cover="openCoverSelector(board)" />
    </div>
    <CoverSelector
      :visible="coverSelectorVisible"
      :board-id="selectedBoard?.id || ''"
      :board-name="selectedBoard?.name || ''"
      :board-image-ids="selectedBoard?.imageIds || []"
      :all-images="inspirations.images"
      :current-cover-id="selectedBoard?.coverImageId"
      @close="coverSelectorVisible = false"
      @confirm="handleCoverConfirm"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CoverSelector from '../components/common/CoverSelector.vue';
import EmptyState from '../components/common/EmptyState.vue';
import MoodBoardCard from '../components/common/MoodBoardCard.vue';
import StyleRadarChart from '../components/common/StyleRadarChart.vue';
import { styleDescriptions } from '../constants/styleDescriptions';
import { useInspirationStore } from '../stores/inspirationStore';
import { useMoodboardStore } from '../stores/moodboardStore';
import { useProfileStore } from '../stores/profileStore';
import { MoodBoard } from '../types';

const profile = useProfileStore();
const boards = useMoodboardStore();
const inspirations = useInspirationStore();
const coverSelectorVisible = ref(false);
const selectedBoard = ref<MoodBoard | null>(null);

function openCoverSelector(board: MoodBoard) {
  selectedBoard.value = board;
  coverSelectorVisible.value = true;
}

async function handleCoverConfirm(imageId: string, imageUrl: string) {
  if (selectedBoard.value) {
    await boards.setCoverImage(selectedBoard.value.id, imageId, imageUrl);
  }
  coverSelectorVisible.value = false;
}

onMounted(async () => {
  await inspirations.seed();
  await profile.loadProfile();
  await boards.load();
});
</script>
