<template>
  <div id="admin-users">
    <b-notification type="is-warning" icon-pack="mdi" has-icon>
      The Metronic Datatable component supports local or remote data source. For
      remote data you can specify a remote data source that returns data in
      JSON/JSONP format. In this example the grid fetches its data from a remote
      JSON file. It also defines the schema model of the data source received
      from the remote data source. In addition to the visualization, the
      Datatable provides built-in support for operations over data such as
      sorting, filtering and paging performed in user browser(frontend).
    </b-notification>

    <div class="user-list panel-box-shadow">
      <div class="user-list-header columns">
        <div class="user-list-header-title column is-one-fifth">
          <b-icon pack="fas" icon="user"></b-icon>
          <span>用户管理</span>
        </div>
        <div class="column"></div>
        <div class="user-list-header-action column is-one-fifth"></div>
      </div>
      <div class="user-list-filter columns">
        <div class="column is-three-quarters">
          <div class="columns">
            <div class="column is-one-quarter">
              <b-field>
                <b-input
                  placeholder="搜索"
                  size="is-default"
                  type="search"
                  icon-pack="fas"
                  icon="search"
                  :value="listQuery.email"
                >
                </b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field label="用户状态" horizontal class="inline-flex">
                <b-select>
                  <option checked value="flint">Flint</option>
                  <option value="silver">Silver</option>
                </b-select>
              </b-field>
              <b-field label="类型" horizontal class="inline-flex">
                <b-select>
                  <option value="flint">Flint</option>
                  <option value="silver">Silver</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>

        <div class="column search-bar">
          <div class="notification is-twitter">
            <b-button
              type="is-primary"
              icon-left="search"
              icon-pack="fas"
              @click="queryList()"
            >
              <span>查询</span>
            </b-button>

            <b-button type="is-primary" icon-left="plus" icon-pack="fas">
              <span>添加</span>
            </b-button>

            <b-button type="is-primary" icon-left="trash" icon-pack="fas">
              <span>批量删除</span>
            </b-button>
          </div>
        </div>
      </div>
      <div class="user-list-table columns">
        <b-table
          :data="userList"
          :check-row.sync="checkedRows"
          paginated
          per-page="10"
          aria-next-label="下一页"
          aria-previous-label="上一页"
          aria-page-label="页码"
          aria-current-label="当前页"
          checkable
          focusable
          striped
          :checkbox-position="checkboxPosition"
        >
          <template slot-scope="props">
            <b-table-column label="编号" field="id" width="50" numeric>
              <template slot="header" slot-scope="{ column }">
                <b-tooltip :label="column.label" dashed>
                  {{ column.label }}
                </b-tooltip>
              </template>
              {{ props.row.id }}
            </b-table-column>

            <b-table-column label="昵称" field="nickname" width="150" sortable>
              {{ props.row.nickname }}
            </b-table-column>

            <b-table-column label="电子邮箱" field="email" width="150" sortable>
              {{ props.row.email }}
            </b-table-column>

            <b-table-column label="注册时间" field="date" sortable>
              {{ props.row.created }}
            </b-table-column>

            <b-table-column label="修改时间" field="date" sortable>
              {{ props.row.updated }}
            </b-table-column>

            <b-table-column label="类型" field="type" sortable>
              <span></span>
              {{ props.row.type == '1' ? '成员' : '管理员' }}
            </b-table-column>

            <b-table-column label="性别" field="gender" width="200" sortable>
              <span>
                <b-icon
                  pack="fas"
                  :style="
                    `color: ${props.row.sex == '1' ? '#0abb87' : '#fd397a'};`
                  "
                  :icon="props.row.sex == '1' ? 'mars' : 'venus'"
                >
                </b-icon>
              </span>
              {{ props.row.sex == '1' ? '男' : '女' }}
            </b-table-column>

            <b-table-column label="操作" field="actions" width="240">
              <span>
                <b-button
                  type="is-warning"
                  size="is-small"
                  icon-left="lead-pencil"
                >
                  <span>修改</span>
                </b-button>
                <b-button type="is-danger" size="is-small" icon-left="delete">
                  <span>删除</span>
                </b-button>
              </span>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      title: '管理后台-用户管理',
      loggedUser: this.$store.state.user,
      isPublic: false,
      checkedRows: [],
      checkboxPosition: 'left',
      listQuery: {
        email: ''
      }
    };
  },
  head() {
    return {
      title: this.title
    };
  },

  methods: {
    queryList() {
      console.log(this.listQuery);
    }
  },

  async asyncData({ $axios }) {
    const userList = await $axios.get('/users/');
    return {
      userList: userList.data
    };
  }
};
</script>

<style lang="scss">
.user-list {
  background-color: #fff;

  .user-list-header {
    padding: 0.6rem;
    transition: height 0.3s;
    border-bottom: 1px solid #ebedf2;
  }

  .user-list-filter {
    padding: 1.5rem;
  }

  .columns {
    margin: 0;
  }
}

.admin-container .admin-main .admin-main-content .search-bar {
  text-align: right;
  .notification {
    background: transparent;
    box-shadow: none;
  }
}
</style>
