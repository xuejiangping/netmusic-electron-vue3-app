<script setup lang="ts">

const { $utils, $http, $COMMON, $store, $message } = getCurrentInstance()!.appContext.config.globalProperties
const { Comment_ACTION_TYPE, Comment_SOURCE_TYPE } = $COMMON

const { loginStatus, cookie } = storeToRefs($store.userLoginStore())
interface CommentItem {
  content: string, time: number
  user: { nickname: string, userId: number, avatarUrl: string },
  likedCount: number,
  liked: boolean,
  commentId: string,
  beReplied: (Pick<CommentItem, 'content' | 'user'> & { beRepliedCommentId: number })[]
}
type CommentData = { comments: CommentItem[], total: number, hotComments: CommentItem[] }
const props = defineProps<{
  layout?: 'relative' | 'absolute'
  info: { id: string, name?: string }
  type: keyof typeof Comment_SOURCE_TYPE
}>()

// $http.comment({})
// $http.likeSong
const word_limit = 140
const default_placeholder = '(❁´◡`❁) 评论也要美美哒~ '

const { placeholder, text, commentData, inputBoxStatus } = toRefs(shallowReactive({
  placeholder: default_placeholder,
  text: '',
  commentData: {} as CommentData,
  inputBoxStatus: false
}))
/***********************评论api的参数*************************/
const inited_comment_params = {
  t: Comment_ACTION_TYPE.发送,
  type: Comment_SOURCE_TYPE.歌曲,
  id: '',
  content: '',
  commentId: '',
  timestamp: 0,
  cookie: ''
}

let comment_params = reactive({ ...inited_comment_params })
const formatedData = computed(() => {
  const obj: Record<string, CommentItem[]> = {}
  const _commentData = unref(commentData)
  if (_commentData.hotComments?.length) obj['热门评论'] = _commentData.hotComments
  if (_commentData.comments?.length) obj['最新评论'] = _commentData.comments
  return obj
})
/**********************更新评论*************************/
const init = () => {
  if (!(props.type && props.info)) return
  const id = props.info.id
  comment_params.id = id
  comment_params.type = Comment_SOURCE_TYPE[props.type]
  const timestamp = Date.now()
  switch (props.type) {
    case 'mv':
      $http.commentMv({ id, timestamp, cookie: cookie.value }).then(res => commentData.value = res)
      break;
    case '歌曲':
      $http.commentSong({ id, timestamp, cookie: cookie.value }).then(res => commentData.value = res)
      break;
    case '歌单':
      $http.playlistComment({ id, timestamp, cookie: cookie.value }).then(res => commentData.value = res)
      break;
    case '专辑':
      $http.albumComment({ id, timestamp, cookie: cookie.value }).then(res => commentData.value = res)
      break;
    case '视频':
      $http.commentMv({ id, timestamp, cookie: cookie.value }).then(res => commentData.value = res)
      break;
  }
}
watchEffect(init)



function setInputBoxStatus(val: boolean) {
  inputBoxStatus.value = val
}
defineExpose({
  setInputBoxStatus,
  comment
})
function reply({ commentId, uname }: { commentId: string, uname: string }) {
  placeholder.value = `回复 ${uname}:`
  inputBoxStatus.value = true
  comment_params.commentId = commentId
  comment_params.t = Comment_ACTION_TYPE.回复

}
function comment() {
  placeholder.value = default_placeholder
  inputBoxStatus.value = true
  comment_params.t = Comment_ACTION_TYPE.发送

}

function reset() {
  comment_params = reactive({ ...inited_comment_params })
  text.value = ''
  inputBoxStatus.value = false
  placeholder.value = ''
}

function send() {
  if (!loginStatus.value) return $message({ message: '请登录后再试', type: 'error' })
  if (!text.value) return $message({ message: '内容不能为空', type: 'error' })
  comment_params.cookie = cookie.value
  comment_params.content = text.value
  comment_params.timestamp = Date.now()
  // console.log(toValue(comment_params))
  // console.log(toValue(comment_params))

  $http.comment(toValue(comment_params)).then(() => {
    $message('评论成功')
    init()
  }).catch(() => $message('评论失败'))
  reset()
}

function commentLike({ liked, commentId }: { liked: boolean, commentId: string }) {
  if (!loginStatus.value) return $message({ message: '请登录后再试', type: 'error' })
  let t = liked ? 0 : 1
  const { id, type } = comment_params
  $http.commentLike({ id, cid: commentId, type, t, timestamp: Date.now(), cookie: cookie.value })
    .then(res => {
      console.log('评论喜欢', res)
      init()
      liked ? $message({ message: '已取消点赞', type: 'success' }) : $message({ message: '已点赞', type: 'success' })
    })
}
</script>

<template>
  <div class="box">
    <div v-if="inputBoxStatus">
      <Teleport to="body">
        <div style="position: absolute;top: 50%;left: 50%; transform:translate(-50%,-50%);z-index: 3;width: 50%;">
          <el-card shadow="always">
            <div style="padding: 10px 0;">
              <el-link @click="setInputBoxStatus(false)"
                style="position: absolute;right: 5px;top:5px;font-size: 10px;">✖️</el-link>
              <h3 v-if="info" style="text-align: center;margin-bottom: 1rem;"> <span>{{ type }}</span>:
                <span>{{ info.name }}</span>
              </h3>
              <div class="input-box">
                <el-input v-model="text" resize="none" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
                  :placeholder="placeholder" :maxlength="word_limit" show-word-limit />
                <div class="send">
                  <el-button size="small" round @click="send">评论</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </Teleport>
    </div>

    <div v-if="layout !== 'absolute'" class="input-box">
      <el-input v-model="text" resize="none" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
        :placeholder="placeholder" :maxlength="word_limit" show-word-limit />
      <div class="send">
        <el-button size="small" round @click="send">评论</el-button>
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
                  name: 'index', query: {
                    name: comment.user.nickname, id: comment.user.userId
                  }
                }">{{ comment.user.nickname }}</RouterLink>
              </span> :
              <span> {{ comment.content }}</span>
            </div>
            <!-- 回复的贴子 -->
            <div class="beReplied" v-for="({ content, user }) in comment.beReplied">
              <span class="uname">
                <RouterLink :to="{
                  name: 'index', query: {
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
            <el-link @click="commentLike({ liked: comment.liked, commentId: comment.commentId })"
              :type="comment.liked ? 'danger' : 'info'"><span>{{ comment.liked ? '已点赞' : '点赞' }}</span>
              <span v-if="comment.likedCount > 0">({{ comment.likedCount }})</span></el-link>
            <el-link @click="reply({ commentId: comment.commentId, uname: comment.user.nickname })">回复</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  margin: 1rem 0;
}

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
  gap: 1rem;

  .item1 {
    grid-column: 1;
    grid-row: 1;

  }

  .item2 {
    grid-row: 1;
    grid-column: 2 / -1;
    line-height: 1.5rem;

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
    grid-column: 8/-1;
    color: var(--color-text);
  }


}
</style>
