<script setup lang="ts">
const { $utils } = getCurrentInstance()!.appContext.config.globalProperties

const text = ref('')
interface CommentItem {
  content: string, time: number
  user: { nickname: string, userId: number, avatarUrl: string },
  likedCount: number,
  beReplied: (Pick<CommentItem, 'content' | 'user'> & { beRepliedCommentId: number })[]
}
const props = defineProps<{
  commentData: { comments: CommentItem[], total: number, hotComments: CommentItem[] },
  info?: { type: string, title: string },
  layout?: 'relative' | 'absolute'
}>()

const inputBoxStatus = ref(false)
function setInputBoxStatus(val: boolean) {
  inputBoxStatus.value = val
}
defineExpose({
  setInputBoxStatus
})


const formatedData = computed(() => {
  const obj: Record<string, CommentItem[]> = {}
  if (props.commentData?.hotComments?.length > 0) obj['热门评论'] = props.commentData.hotComments
  if (props.commentData?.comments?.length > 0) obj['最新评论'] = props.commentData.comments
  return obj
})

</script>

<template>
  <div>
    <div v-if="layout === 'absolute'">
      <Teleport to="body">
        <div v-show="inputBoxStatus"
          style="position: absolute;top: 50%;left: 50%; transform:translate(-50%,-50%);z-index: 3;width: 50%;">
          <el-card shadow="always">
            <div style="padding: 10px 0;">
              <span @click="setInputBoxStatus(false)"
                style="position: absolute;right: 5px;top:5px;font-size: 10px;">✖️</span>
              <h3 v-if="info" style="text-align: center;"> <span>{{ info?.type }}</span>: <span>{{ info?.title }}</span>
              </h3>
              <div class="input-box">
                <el-input v-model="text" resize="none" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
                  placeholder="Please input" />
                <div class="send">
                  <el-button size="small" round>评论</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </Teleport>
    </div>

    <div v-else class="input-box">
      <el-input v-model="text" resize="none" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
        placeholder="Please input" />
      <div class="send">
        <el-button size="small" round>评论</el-button>
      </div>
    </div>

    <div v-if="formatedData">
      <div v-for="(comments, type) in formatedData">
        <h2>{{ type }}</h2>
        <div v-for="(comment) in comments" class="comment-item">
          <div class="item1"><el-avatar :src="comment.user.avatarUrl"></el-avatar>
          </div>
          <div class="item2">
            <!-- 主帖 -->
            <div><span class="uname">
                <RouterLink :to="{
                  name: 'singer', query: {
                    name: comment.user.nickname, id: comment.user.userId
                  }
                }">{{ comment.user.nickname }}</RouterLink>
              </span>:
              <span> {{ comment.content }}</span>
            </div>
            <!-- 回复的贴子 -->
            <div class="beReplied" v-for="({ content, user }) in comment.beReplied">
              <span class="uname">
                <RouterLink :to="{
                  name: 'singer', query: {
                    name: user.nickname, id: user.userId
                  }
                }">@{{ user.nickname }}</RouterLink>
              </span>:
              <span> {{ content }}</span>
            </div>
          </div>
          <div class="item3">
            {{ $utils.formartDate(comment.time, 'MM月dd日 HH:mm') }}
          </div>
          <div class="item4">
            <div>点赞<span v-if="comment.likedCount > 0">({{ comment.likedCount }})</span></div>
            <div>分享</div>
            <div>评论</div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.input-box {
  .send {
    text-align: right;
    margin: 10px 0;
  }


}

.comment-item {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2);
  margin: 1.8rem 0;
  border-bottom: 1px dashed #e9e9e9;
  font-size: 0.9rem;
  // justify-items: center;

  .item1 {
    grid-column: 1;
    grid-row: 1;

  }

  .item2 {
    grid-row: 1;
    grid-column: 2 / -1;

    .beReplied {
      background-color: var(--color-bg-main);
      padding: 0.8rem 0.5rem;
      border-radius: 0.5rem;
      margin: 0.5rem 0;
    }
  }

  .item3 {
    grid-column: 2 / 9;
    grid-row: 2;
    color: var(--color-text-light);

  }

  .item4 {
    display: flex;
    justify-content: space-evenly;
    grid-row: 2;
    grid-column: 10/-1;
    color: var(--color-text);
  }


}
</style>
