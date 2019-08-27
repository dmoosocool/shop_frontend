<template>
  <div class="admin-container columns is-desktop">
    <div class="admin-navbar column is-2">
      <b-menu>
        <div class="admin-navbar-brand">
          <h3 class="title">Shopoo</h3>
        </div>
        <b-menu-list label="Menu">
          <b-menu-item
            icon="information-outline"
            icon-pack="mdi"
            :active="activeMenu('index')"
            label="后台管理首页"
            tag="router-link"
            :to="{ name: 'index' }"
          ></b-menu-item>
          <b-menu-item icon="settings" icon-pack="mdi" expanded>
            <template slot="label" slot-scope="props">
              常用管理
              <b-icon
                class="is-pulled-right"
                icon-pack="mdi"
                :icon="props.expanded ? 'menu-down' : 'menu-up'"
              ></b-icon>
            </template>
            <b-menu-item
              icon="account"
              icon-pack="mdi"
              :active="activeMenu('user')"
              label="用户管理"
              tag="router-link"
              :to="{ name: 'user' }"
            ></b-menu-item>
            <b-menu-item
              icon="cellphone-link"
              :active="activeMenu('order')"
              icon-pack="mdi"
              label="订单管理"
            ></b-menu-item>
            <b-menu-item
              icon="cash-multiple"
              :active="activeMenu('goods')"
              icon-pack="mdi"
              label="商品管理"
            ></b-menu-item>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>

    <div class="admin-main column">
      <div class="admin-main-header columns">
        <div class="column is-2 is-offset-10">
          <b-dropdown
            hoverable
            aria-role="menu"
            class="admin-user-action"
            position="is-bottom-left"
          >
            <a
              slot="trigger"
              class="navbar-item button is-primary is-unselectable"
              role="button"
            >
              <span
                >Hello~
                {{ $store.state.user && $store.state.user.nickname }}</span
              >
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item aria-role="listitem">
              <div class="media logout">
                <b-icon
                  class="media-left"
                  icon="exit-to-app"
                  pack="mdi"
                ></b-icon>
                <div class="media-content">
                  <h3>退出</h3>
                </div>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="admin-main-content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'check-token',
  methods: {
    activeMenu(routerName) {
      return this.$nuxt.$route.name === routerName;
    }
  }
};
</script>

<style lang="scss">
.admin-container {
  min-height: 100vh;
  margin: 0;
  .admin-navbar {
    padding: 0;
    box-sizing: border-box;
    background-color: #1e1e2d;
    box-shadow: 0 0 4px rgba(30, 30, 45, 0.6);

    .admin-navbar-brand {
      height: 65px;
      line-height: 65px;
      background: #1a1a27;
      text-align: center;
      h3.title {
        line-height: inherit;
        color: rgba(255, 255, 255, 0.8);
        font-style: italic;
      }
    }

    .menu-label {
      margin-left: 25px;
    }

    .menu-label:first-child {
      margin-top: 1em;
    }
    ul.menu-list li {
      margin: 0;
      .icon.is-small {
        width: calc(1rem + 10px);
      }
      ul li a {
        padding-left: 40px;
      }
    }
  }

  .admin-main {
    padding: 0;
    .admin-main-header {
      height: 65px;
      line-height: 65px;
      background-color: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      margin: 0;

      .column {
        padding: 0;
        text-align: right;
      }

      .dropdown.admin-user-action {
        vertical-align: middle;
        margin-right: 10px;
        .dropdown-menu .dropdown-content .dropdown-item {
          user-select: none;
          outline: none;
        }
        .logout {
          line-height: 1.8;
        }
      }
    }

    .admin-main-content {
      padding: 1.5rem;

      .notification {
        box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.1);
        .media {
          align-items: center;
          .media-left {
            margin-right: 1.5rem;
          }
        }
      }

      .user-list-filter {
        .control.has-icons-left {
          box-sizing: content-box;
          width: calc(100% - 2.5em);
          .input {
            padding-left: 2.5em;
          }
          .icon.is-left {
            font-size: 0.8em;
            padding: 0.6em;
          }
        }

        .field-label {
          padding-top: 0.75em;

          .label {
            font-size: 11px;
            width: 80px;
            font-weight: 400;
          }
        }

        .control {
          box-sizing: content-box;

          select {
            padding: 0.65em 2.5em 0.65em 0.6em;
            min-width: 10em;
            height: 100%;
          }

          .select {
            height: 100%;
          }
          .select::after {
            top: calc(50%);
            border-color: #595d6e;
          }
        }
      }

      .b-table {
        width: 100%;
        table {
          user-select: none;
          outline: none;
          width: 100%;

          .th-wrap {
            font-size: 11px;
            line-height: 2;
          }

          td {
            font-size: 11px;
            line-height: 2;
          }
        }
      }
    }
  }
}
</style>
