<template>
  <article class="overflow-hidden bg-paper ring-1 ring-ink/10">
    <div class="group relative">
      <img :src="board.coverImageUrl" :alt="board.name" class="h-44 w-full object-cover" />
      <div
        class="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition group-hover:opacity-100"
      >
        <button
          class="flex items-center gap-2 rounded bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-lg transition hover:bg-clay hover:text-paper"
          @click="$emit('selectCover')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          更换封面
        </button>
      </div>
      <div
        v-if="board.coverImageId"
        class="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-ink/60 px-2 py-1 text-xs text-paper"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        自定义封面
      </div>
    </div>
    <div class="space-y-3 p-5">
      <h3 class="font-display text-2xl text-ink">{{ board.name }}</h3>
      <p class="text-sm text-ink/70">{{ board.description }}</p>
      <div class="flex gap-2">
        <span v-for="tag in board.tags" :key="tag" class="bg-moss/10 px-2 py-1 text-xs text-moss">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { MoodBoard } from '../../types';
defineProps<{ board: MoodBoard }>();
defineEmits<{ selectCover: [] }>();
</script>
