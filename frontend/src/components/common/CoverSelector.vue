<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" @click.self="close">
    <div class="w-full max-w-3xl overflow-hidden bg-paper shadow-2xl">
      <div class="flex items-center justify-between border-b border-ink/10 p-5">
        <div>
          <h3 class="font-display text-2xl text-ink">选择封面</h3>
          <p class="mt-1 text-sm text-ink/60">从「{{ boardName }}」的收藏图中挑选一张作为封面</p>
        </div>
        <button class="text-ink/40 transition hover:text-ink" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="max-h-[60vh] overflow-y-auto p-5">
        <div v-if="availableImages.length" class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            v-for="image in availableImages"
            :key="image.id"
            class="group relative cursor-pointer overflow-hidden ring-2 transition hover:ring-clay"
            :class="selectedId === image.id ? 'ring-clay' : 'ring-transparent'"
            @click="selectImage(image)"
          >
            <img :src="image.imageUrl" :alt="image.sourceDescription" class="aspect-square w-full object-cover" />
            <div
              v-if="selectedId === image.id"
              class="absolute inset-0 flex items-center justify-center bg-clay/30"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-paper">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <p class="text-xs text-paper line-clamp-2">{{ image.sourceDescription }}</p>
            </div>
          </div>
        </div>
        <div v-else class="py-12 text-center">
          <p class="text-ink/50">该灵感板还没有收藏图片</p>
          <p class="mt-2 text-sm text-ink/40">先去图库收藏一些图片吧</p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 border-t border-ink/10 bg-ink/5 p-4">
        <button class="px-4 py-2 text-sm font-medium text-ink/70 transition hover:text-ink" @click="close">
          取消
        </button>
        <button
          class="bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!selectedId"
          @click="confirm"
        >
          设为封面
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { InspirationImage } from '../../types';

const props = defineProps<{
  visible: boolean;
  boardId: string;
  boardName: string;
  boardImageIds: string[];
  allImages: InspirationImage[];
  currentCoverId?: string;
}>();

const emit = defineEmits<{
  close: [];
  confirm: [imageId: string, imageUrl: string];
}>();

const selectedId = ref<string | undefined>(props.currentCoverId);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      selectedId.value = props.currentCoverId;
    }
  }
);

const availableImages = computed(() => {
  return props.allImages.filter((img) => props.boardImageIds.includes(img.id));
});

function selectImage(image: InspirationImage) {
  selectedId.value = image.id;
}

function close() {
  emit('close');
}

function confirm() {
  if (!selectedId.value) return;
  const selectedImage = availableImages.value.find((img) => img.id === selectedId.value);
  if (selectedImage) {
    emit('confirm', selectedImage.id, selectedImage.imageUrl);
  }
}
</script>
