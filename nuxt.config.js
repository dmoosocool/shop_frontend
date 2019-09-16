const {NODE_ENV} = process.env;
let env = '';

switch (NODE_ENV) {
  case 'development':
    env = '';
    break;
  case 'production':
    env = '.prod';
    break;
}

export default {
  mode: 'spa',

  /**
   *  Router Config
   */
  router: {
    middleware: 'check-auth',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {color: 'rgba(53, 84, 224, 0.8)'},
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss', 'mavon-editor/dist/css/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios', {src: '@/plugins/vue-mavon-editor', srr: false}],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', {materialDesignIcons: false}],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast',

    // Doc: https://github.com/nuxt-community/axios-module
    ['@nuxtjs/dotenv', {filename: `.env${env}`}],
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },

  /**
   * Setting proxy.
   */
  proxy: {
    /** 验权相关 */
    '/auth/': 'http://localhost:3001/',
    /** 用户相关 */
    '/users/': 'http://localhost:3001/',
    /** 商品相关 */
    '/goods/': 'http://localhost:3001/',
    /** 商品分类相关 */
    '/goods-categories/': 'http://localhost:3001/',
  },

  /**
   * Setting toast.
   */
  toast: {
    position: 'top-center',
    duration: 3000,
    register: [
      // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops.. something went wrong.',
        options: {
          type: 'error',
        },
      },
    ],
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend() {},
    babel: {
      presets({isServer}) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {version: 3},
            },
          ],
        ];
      },
    },
  },
};
