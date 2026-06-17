<template>
  <article class="overflow-hidden bg-paper ring-1 ring-ink/10">
    <img v-if="coverImageUrl" :src="coverImageUrl" :alt="plan.name" class="h-48 w-full object-cover" />
    <div class="p-6">
      <h3 class="font-display text-3xl text-ink">{{ plan.name }}</h3>
      <div class="mt-4 flex gap-2">
        <StyleTag v-for="style in plan.styleTags" :key="style" :style-name="style" />
      </div>
      <div class="mt-6 flex gap-3">
        <ColorSwatch v-for="color in plan.colors" :key="color" :color="color" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComparisonPlan, MoodBoard } from '../../types';
import ColorSwatch from './ColorSwatch.vue';
import StyleTag from './StyleTag.vue';

const props = defineProps<{
  plan: ComparisonPlan;
  moodBoard?: MoodBoard;
}>();

const coverImageUrl = computed(() => props.moodBoard?.coverImageUrl);
</script>
