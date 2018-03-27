<template id="">
  <div id="Home">
    <section class="hero is-fullheight is-bold is-light">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">HOME</h1>
          <p class="subtitle">Please Login</p>
          <div id="fb-root"></div>
          <div class="is-loading" id="spinner">
            <a class="button is-loading" style="background:none; border:none;">Loading</a>
          </div>
          <div class="fb-login-button" data-scope="public_profile, email" onlogin="checkLoginState();" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
          <button type="button" name="button" class="fb-logout-button logout-style" onclick="logout()">
            logout
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Home'
}
</script>

<style media="screen">

</style>
