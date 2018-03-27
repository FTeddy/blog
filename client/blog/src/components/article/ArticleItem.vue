<template id="">
  <div class="tile is-9" id="ArticleItem">
    <div class="tile is-vertical is-6" v-show="articleData.imgUrl !== 'undefined'">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child notification is-info">
            <figure class="image">
              <img :src="articleData.imgUrl">
            </figure>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">{{articleData.title}}</p>
          <p class="subtitle">By {{username}}, posted at {{articleData.createdAt}}</p>
          <div class="content">
            <button type="button" class="button" name="button" v-on:click="activateModal">Edit</button>
            <button type="button" class="button" name="button">Delete</button>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent is-vertical">
      <article class="tile is-child notification is-info is-tall-2" v-show="articleData.imgUrl === 'undefined'" >
        <p class="title">{{articleData.title}}</p>
        <p class="subtitle">By {{username}}, posted at {{articleData.createdAt}}</p>
        <div class="content">
          <button type="button" class="button" name="button" v-on:click="activateModal">Edit</button>
          <button type="button" class="button" name="button" v-on:click="deleteArticle">Delete</button>
        </div>
      </article>
      <article class="tile is-child notification is-light">
        <div class="content">
          <p class="title">Content</p>
          <p class="subtitle">{{articleData.text}}</p>
          <div class="content">
            <!-- Content -->
          </div>
        </div>
      </article>
    </div>

    <div :class="editModalClass">
      <div class="modal-background" v-on:click="deactivateModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Blogpost</p>
          <button class="delete" aria-label="close" v-on:click="deactivateModal"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <edit></edit>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="deactivateModal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
import Edit from '@/components/pages/Edit'
export default {
  name: 'ArticleItem',
  components: {
    'edit': Edit
  },
  created: function () {
    // this.articleId = this.$route.params.articleId
    this.getOneArt()
  },
  data: () => {
    return {
      // articleId: '',
      articleData: '',
      username: '',
      editModalClass: 'modal'
    }
  },
  props: ['articleId'],
  methods: {
    getOneArt: function () {
      this.baseAxios.get(`article/${this.articleId}`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        // console.log(serverRes.data.articles)
        this.articleData = serverRes.data.article
        this.username = serverRes.data.article.userId.name
      }).catch(err => { console.log(err) })
    },
    activateModal () {
      this.editModalClass = 'modal is-active'
    },
    deactivateModal () {
      this.editModalClass = 'modal'
    },
    deleteArticle () {
      confirm('Are you sure?')
      this.baseAxios.delete(`article/delete/${this.articleId}`, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes.data.message)
        console.log(serverRes.data.deletedArticle)
        this.$store.dispatch('getArticles')
        this.$router.push({ path: `/article/` })
      }).catch(err => { console.log(err) })
    }
  },
  watch: {
    '$route.params.articleId': function () {
      this.getOneArt()
    }
  }

}
</script>

<style media="screen">
.is-tall-2 {
  height: 200px;
}
</style>
