<template>
  <v-container fluid class="mt-10">
    <v-row>
      <v-col md="8" offset-md="2">
        <v-row>
          <v-col md="5" offset="1">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card
                flat
                class="d-flex flex-column align-center bg-transparent"
              >
                <v-text-field
                  v-model="userId"
                  :placeholder="$t('general.user_id')"
                  class="f-s-22 mb-2 w-100"
                  hide-details="auto"
                  :rules="userIdRules"
                  outlined
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  type="password"
                  :placeholder="$t('login.password')"
                  class="f-s-22 mb-2 w-100"
                  hide-details="auto"
                  :rules="passwordRules"
                  outlined
                ></v-text-field>

                <v-btn
                  color="primary"
                  dark
                  class="btn-main mt-10"
                  @click="login"
                >
                  {{ $t('login.buttons.login') }}
                </v-btn>
              </v-card>
            </v-form>
            <v-divider class="mt-13 mb-5"></v-divider>

            <p class="text-center f-s-14">{{ $t('login.forgot_password') }}</p>
            <p class="text-center font-weight-bold f-s-14">
              {{ $t('login.limit_company') }}
            </p>

            <v-row>
              <v-col cols="10" offset="1" class="f-s-14 bold-400">
                <v-row>
                  <v-col cols="3" class="pr-0"
                    >{{ $t('login.hotline') }}
                  </v-col>
                  <v-col cols="9">：080-XXXX-XXXX</v-col>
                </v-row>
                <v-divider class="mt-2 mb-2"></v-divider>
                <v-row>
                  <v-col cols="3" class="pr-0">{{ $t('login.email') }}</v-col>
                  <v-col cols="9">：support@XXXXXX.com</v-col>
                </v-row>
                <v-divider class="mt-2 mb-2"></v-divider>
                <v-row>
                  <v-col cols="3" class="pr-0">{{
                    $t('login.working_hours')
                  }}</v-col>
                  <v-col cols="9"
                    >：{{ $t('login.working_hours_from') }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <div class="note">
              <div v-for="(note, i) in notes" :key="i" class="mb-2">
                <span class="font-weight-bold">{{ note.title }}</span>
                <br />
                <span>{{ note.content }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        show1: false,
        userId: null,
        password: null,
        notes: [],
        valid: false,
        passwordRules: [
          (v) => this.requiredRule(v, this.$t('login.password')),
          (v) => this.minLengthRule(v, this.$t('login.password'), 6),
        ],
        userIdRules: [(v) => this.requiredRule(v, this.$t('general.user_id'))],
      }
    },
    methods: {
      login() {
        if (!this.$refs.form.validate()) return
        this.$store.dispatch('login', {
          user_id: this.userId,
          password: this.password,
        })
      },
    },
  }
</script>
<style lang="scss">
  .note {
    background-color: #efefef;
    border: 1px solid #a9a9a8;
    margin-left: 36px;
    height: 350px;
    width: 100%;
    border-radius: 10px;
    padding: 20px;
  }
</style>
