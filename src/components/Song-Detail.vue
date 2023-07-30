<script setup lang="ts">

const a = ref(false)

const comment = ref()
</script>

<template>
  <div class="bg">

    <div class="container">

      <div class="top">
        <h2 class="title">不分手</h2>
        <div>alias</div>
        <div><span>singer</span> <span>专辑</span></div>
      </div>
      <div class="middle">
        <div>
          <div style="position: relative;" :class="{ 'active-playing': a }">
            <img src="../assets/img/stylus.png" class="stylus">
            <div class="cover" @click="a = !a">
              <!-- <my-image :lazy="false" :src="'../assets/img/hello.webp'"></my-image>
           -->
              <img src="../assets/img/hello.webp" class="img">
            </div>
          </div>
        </div>
        <div>2</div>
        <div v-show="true">
          <div>
            <h5>包含这首歌的歌单</h5>
          </div>
          <div>
            <h5>喜欢这首歌的人也喜欢</h5>
          </div>
        </div>
      </div>
      <el-affix position="bottom" :offset="20">
        <el-button type="primary">发表评论</el-button>
      </el-affix>
      <div class="bottom">
        <Comment ref="comment" layout='absolute' :comment-data="{}"></Comment>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bg {
  background: linear-gradient(to bottom, #c2c2c4, #fff);
  height: 100%;
  overflow: auto;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 14px;

    .top {
      text-align: center;
      // padding: 1rem 0;
      line-height: 1.5rem;
      color: var(--color-text);

      .title {
        font-size: larger;
        color: var(--color-text-main);

      }
    }

    .middle {
      display: flex;
      margin: 2rem 0;
      height: 20rem;

      // justify-content: space-evenly;
      >div {
        flex: 1;
      }

      .active-playing {
        .stylus {
          transform: rotate(-45deg);
        }

        .cover {
          animation-play-state: running;

        }
      }

      // background-color: blue;

      .stylus {
        position: absolute;
        top: -15%;
        left: 40%;
        z-index: 1;
        transform-origin: top;
        transform: rotate(-70deg);
        transition: all 0.5s;
        height: 60%;
      }

      .cover {
        position: relative;
        aspect-ratio: 1/1;
        width: 65%;
        border-radius: 50%;
        background: url('../assets/img/vinyl.png') no-repeat;
        background-size: cover;
        border: 10px solid #cacbca;
        animation: soundPaying 15s linear infinite;
        margin: 0 auto;
        animation-play-state: paused;

        .img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 65%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 8px solid #000;

        }


      }

      @keyframes soundPaying {
        from {
          -webkit-transform: rotate(10deg);
          transform: rotate(10deg)
        }

        to {
          -webkit-transform: rotate(370deg);
          transform: rotate(370deg)
        }
      }
    }

    .bottom {
      background: red;

      height: 800px;
      width: 60%;
      margin: 0 auto;
      min-width: 400px;
    }
  }
}
</style>
