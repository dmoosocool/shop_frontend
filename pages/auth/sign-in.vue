<template>
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
                <form method="POST">
                  <b-field label="E-mail Address">
                    <b-input type="email" required></b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input type="passowrd" required></b-input>
                  </b-field>

                  <div class="field">
                    <b-checkbox>Remember me</b-checkbox>
                  </div>

                  <hr />
                  <div class="field is-grouped">
                    <div class="control">
                      <b-button native-type="submit" type="is-black">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
