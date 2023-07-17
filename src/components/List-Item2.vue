<script setup lang="ts">

type Items = 'index' | 'action' | 'title' | 'singer' | 'album' | 'dt' | 'pop';
withDefaults(defineProps<{
  items?: Items[]
}>(), {
  items: () => ['index', 'action', 'title', 'singer', 'album', 'dt', 'pop']
});
const itemOptions = {
  index: '',
  action: '操作',
  title: '标题',
  singer: '歌手',
  album: '专辑',
  dt: '时间',
  pop: '热度'
}
</script>

<template>
  <div class="list">
    <span v-for="(label, key) in itemOptions" :class="key" v-show="items.includes(key)">
      <slot :name="key">{{ label }}</slot>
    </span>
  </div>
</template>

<style scoped lang="less">
.list {
  display: flex;
  color: var(--color-text);
  column-gap: 1rem;

  .index {
    flex: 1;
  }

  .action {
    flex: 2;
  }

  .title {
    flex: 4;
  }

  .singer {
    flex: 2;
  }

  .album {
    flex: 1;
  }

  .dt {
    flex: 1;
  }

  .pop {
    flex: 2;
  }


}
</style>
