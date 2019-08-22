<template>
  <div id="sign-in">
    <b-navbar fixed-top>
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img
            class="image is-128x128"
            src="~/static/logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section hero is-fullheight is-error-section">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-two-fifths">
              <div class="card has-card-header-background login">
                <header class="card-header">
                  <p class="card-header-title">
                    <span class="icon">
                      <b-icon pack="fas" icon="lock" size="is-small" />
                    </span>
                    <span>Login</span>
                  </p>
                </header>
                <div class="card-content">
                  <b-field label="E-mail Address">
                    <b-input v-model="email" type="email" required />
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      v-model="password"
                      type="password"
                      required
                      password-reveal
                    >
                    </b-input>
                  </b-field>

                  <div class="field">
                    <b-checkbox>Remember me</b-checkbox>
                  </div>

                  <hr />
                  <div class="field is-grouped">
                    <div class="control">
                      <b-button type="is-black" @click="signin()">
                        Login
                      </b-button>
                    </div>

                    <div class="control">
                      <b-button
                        class="is-outlined"
                        tag="router-link"
                        to="/password-recovery"
                        type="is-black"
                      >
                        Forgot Password?
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },

  methods: {
    async signin() {
      const { email, password } = this;
      // const { error } = this.$parent.nuxt;
      // console.log(this.$parent.nuxt.error);
      try {
        const result = await this.$axios.$post('/auth/login', {
          name: email,
          password
        });

        if (result) {
          window.localStorage.setItem('user', JSON.stringify(result));

          this.$router.replace('/');
        }
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
.card {
  box-shadow: none;
  border-radius: 6px;
  border: 1px solid rgba(24, 28, 33, 0.06);
}

.login {
  .card-header {
    background-color: #f5f5f5;
    border-bottom: 0px;
    box-shadow: none;
  }
  .card-header-title {
    font-weight: 400;
  }
  label {
    font-weight: 600;
  }
  .b-checkbox input[type='checkbox'] + .check {
    border-width: 1px;
  }
  hr {
    height: 1px;
  }
}
</style>
