<template id="">
  <section class="hero is-bold is-light" id="Post">
    <div class="hero-body">
      <div class="w-100">

        <!-- send form data through vue -->
        <div class="field">
          <label class="label">Title</label>
          <div class="control has-icons-left">
            <input v-model="title" class="input" type="text" name="" placeholder="The title...">
            <span class="icon is-small is-left">
              <i class="fas fa-tasks"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea v-model="description" class="textarea" placeholder="Describe your day"></textarea>
          </div>
        </div>

        <div class="level">
          <div class="level-left">
            <div class="level-item">

              <div class="field">
                <div class="file">
                  <label class="file-label">
                    <input v-on:change="onFileChange" class="file-input" type="file" name="image" accept="image/*">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div class="level-right">
            <div class="level-item">

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" v-on:click="confirmData">Submit</button>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>

    </div>
  </section>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'Edit',
  data () {
    return {
      title: '',
      description: '',
      file: ''
    }
  },
  computed: {
    ...mapState([
      'postRedirect'
    ])
  },
  methods: {
    confirmData () {
      let form = new FormData()
      if (this.title !== '') { form.append('title', this.title) }
      if (this.description !== '') { form.append('text', this.description) }
      if (this.file !== '') { form.append('field', this.file) }
      this.baseAxios.put(`article/edit/${this.$route.params.articleId}`, form, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes.data.message)
        let article = serverRes.data.updatedArticle
        console.log(article)
        this.$store.dispatch('getArticles')
        this.$router.push({ path: `/article/${article._id}` })
        this.$store.dispatch('postRedirectAct', {status: true})
      }).catch(err => { console.log(err) })
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.file = files[0]
    }
  },
  postRedirect (newVal, oldVal) {
    if (newVal === true) {
      this.deactivateModal()
      this.$store.dispatch('postRedirectAct', {status: false})
    }
  }
}
</script>

<style media="screen">
.w-100 {
  width: 100%;
}
</style>
