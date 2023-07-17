<script setup lang="ts">
const { $http, $COMMON, $utils } = getCurrentInstance()?.proxy!
const A_Z = Array(26).fill('A'.charCodeAt(0)).map((v, i) => {
  let val = String.fromCharCode(v + i)
  return { label: val, val }
})
const LIMIT = 10
const cats = {
  语种: $COMMON.ARTIST_TYPE,
  分类: $COMMON.ARTIST_AREA,
  筛选: [{ label: '热门', val: '-1' }, { label: '#', val: '0' }].concat(A_Z)
}

const { type, area, initial, data, currentPage } = toRefs(reactive({
  type: -1, area: -1, initial: '-1',
  data: [] as any[], currentPage: 1
}))
watchEffect(getData)

function getData() {
  $http.artistList({ type: type.value, area: area.value, initial: initial.value })
    .then(res => $utils.formatList('singerlist', res.artists, 'middle')).then(val => data.value = val)
}

function getMore() {
  let offset = (++currentPage.value - 1) * LIMIT
  $http.artistList({
    type: type.value, area: area.value, initial: initial.value, offset, limit: LIMIT
  })
    .then(res => $utils.formatList('singerlist', res.artists, 'middle'))
    .then(val => data.value.push(...val))
}
const debouncedGetMore = $utils.debounce(getMore, 1000)

function choose(cat: keyof typeof cats, val: any) {
  if (cat === '语种') type.value = val
  else if (cat === '分类') area.value = val
  else initial.value = val
  console.log(cat, val)
}

function isSelected(cat: keyof typeof cats, val: any) {
  if (cat === '语种') return type.value === val
  else if (cat === '分类') return area.value === val
  else return initial.value === val
}



</script>

<template>
  <div>
    <div>
      <div class="box" v-for="(items, catName) in cats">
        <span class="title">{{ catName }}: </span>
        <ul>
          <li v-for="({ label, val }, i) in items" :class="{ borderLeft: i > 0 }">
            <span class="item" :class="{ selected: isSelected(catName, val) }"
              @click="choose(catName, val)">{{ label }}</span>
          </li>
        </ul>
      </div>

    </div>

    <div class="container" v-if="data.length" v-infinite-scroll="debouncedGetMore">
      <VideoTable route-name="singer" squar :data-list="data"></VideoTable>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  display: flex;
  font-size: 0.8rem;

  ul {
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    .borderLeft {
      border-left: 1px solid var(--color-text-light);
    }

    li {
      padding: 0 1rem;
      margin-bottom: 0.8rem;

      // border: 1px solid;0.8rem
      .item {
        padding: 0.3rem 0.5rem;
        border-radius: 6px;
      }

      .selected {
        background-color: var(--color-bg-main);
      }
    }
  }
}
</style>
