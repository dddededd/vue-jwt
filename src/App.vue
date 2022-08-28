<template>
  <v-app id="inspire" class="resort-admin">
    <the-left-menu @onSubDrawerShow="onSubDrawerShow" />
    <the-top-bar />
    <v-main app :class="$route.name">
      <v-container
        class="resort-admin--main"
        :class="{ 'sub-menu-pd': subDrawerShow }"
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
    <the-footer />
    <v-snackbar />
  </v-app>
</template>

<script>
  import TheLeftMenu from '@/components/layouts/TheLeftMenu'
  import TheTopBar from '@/components/layouts/TheTopBar'
  import TheFooter from '@/components/layouts/TheFooter'
  import VSnackbar from '@/components/common/VSnackbar'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      TheLeftMenu,
      TheTopBar,
      TheFooter,
      VSnackbar,
    },
    data: () => {
      return {
        subDrawerShow: false,
      }
    },
    head: {
      title: function () {
        return {
          inner: this.appConfig.name,
        }
      },
    },
    computed: {
      ...mapGetters({
        getAuth: 'getAuth',
      }),
    },
    created() {
      //Change HTML Tag Lang
      const getHTMLTag = document.documentElement
      getHTMLTag.setAttribute('lang', this.$i18n.locale)

      this.$store.dispatch('checkLogin')
      // Do not allow access from url when user not authority
      const authorityTypes = this.$route.meta?.authorityTypes
      const authorityFunctionType = this.$route.meta?.authorityFunctionType

      if (!this.hasAuthority(authorityTypes, authorityFunctionType)) {
        // showing error message in snack bar.
        this.showSnack({
          text: this.$t('general.permission_view'),
        })
        // redirect to home page
        this.$router.push({ name: 'Home' })
      }
    },
    methods: {
      ...mapActions(['showSnack']),
      onSubDrawerShow(subDrawerShow) {
        this.subDrawerShow = subDrawerShow
      },
    },
  }
</script>

<style lang="scss">
  .v-application {
    .copyright {
      font-weight: 400;
      color: #212529;
    }

    .sub-menu-pd {
      padding-left: 200px;
    }
  }
</style>
