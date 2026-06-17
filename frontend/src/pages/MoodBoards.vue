<template>
  <section class="space-y-7">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-clay">Moodboards</p>
        <h1 class="page-title mt-3">把收藏重排成方案线索</h1>
      </div>
      <button class="bg-ink px-5 py-3 font-semibold text-paper" @click="create">新建灵感板</button>
    </div>
    <div class="grid gap-5 lg:grid-cols-3">
      <MoodBoardCard v-for="board in boards.boards" :key="board.id" :board="board" @select-cover="openCoverSelector(board)" />
    </div>
    <div class="bg-paper p-6 ring-1 ring-ink/10">
      <h2 class="font-display text-3xl text-ink">拖拽排列</h2>
      <DraggableGrid class="mt-5" :images="selectedImages" @reorder="selectedImages = $event" />
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
import { computed, onMounted, ref } from 'vue';
import CoverSelector from '../components/common/CoverSelector.vue';
import DraggableGrid from '../components/common/DraggableGrid.vue';
import MoodBoardCard from '../components/common/MoodBoardCard.vue';
import { useInspirationStore } from '../stores/inspirationStore';
import { useMoodboardStore } from '../stores/moodboardStore';
import { InspirationImage, MoodBoard } from '../types';

const boards = useMoodboardStore();
const inspirations = useInspirationStore();
const selectedImages = ref<InspirationImage[]>([]);
const coverSelectorVisible = ref(false);
const selectedBoard = ref<MoodBoard | null>(null);

const imageMap = computed(() => new Map(inspirations.images.map((image) => [image.id, image])));

async function create() {
  await boards.createBoard('材质实验 ' + (boards.boards.length + 1), '手动整理的风格方向', []);
}

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
  await boards.load();
  const first = boards.boards[0];
  selectedImages.value = first ? first.imageIds.map((id) => imageMap.value.get(id)).filter(Boolean) as InspirationImage[] : inspirations.images.slice(0, 4);
});
</script>
