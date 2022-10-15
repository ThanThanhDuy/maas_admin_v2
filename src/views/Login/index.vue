<template>
  <div class="container">
    <div class="container__right">
      <!-- login with google -->
      <div class="container__right__login">
        <div class="container__right__login__title">
          <span>Hello Again!</span>
        </div>
        <div class="container__right__login__subtitle">
          <span>ViGo - Routine trip booking application</span>
        </div>
        <div class="container__right__login__button">
          <a-button type="primary" @click="handleLogin">
            <img :src="googleIcon" alt="" width="25" />
            <span>Login with google</span>
            <a-spin :spinning="spinning">
              <a-icon
                slot="indicator"
                type="loading"
                class="container__right__login__button__iconLoading"
                spin
              />
            </a-spin>
          </a-button>
        </div>
        <span class="container__right__login__copyright"
          >ViGo System ©2022 Created by ViGo Team -
          <a href="#" target="_blank" class="container__right__login__register"
            >Register for driver</a
          >
        </span>
        <img :src="logo" alt="logo" class="container__right__login__logo" />
        <div class="container__right__login__round1"></div>
        <div class="container__right__login__round2"></div>
        <div class="container__right__login__round3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ICONS, LOGOS } from "@/assets/index";
import { auth, provider } from "@/utils/firebase";
import { mapActions } from "vuex";
import { notification } from "@/utils/notification";
export default {
  name: "LoginVue",
  data() {
    return {
      logo: LOGOS.logo,
      googleIcon: ICONS.googleIcon,
      spinning: false,
    };
  },
  methods: {
    ...mapActions({ loginWithGoogle: "auth/login" }),
    async handleLogin() {
      const accessToken = await auth.signInWithPopup(provider).then(result => {
        return result.user.getIdToken();
      });
      this.spinning = true;
      const res = await this.loginWithGoogle(accessToken);
      if (res && res.StatusCode === 200) {
        localStorage.setItem("USER", JSON.stringify(res.Data));
        setTimeout(() => {
          this.spinning = false;
          notification(this, "success", "Login Successfully", "");
          this.$router.push({
            name: "Default",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          this.spinning = false;
          notification(this, "error", res.Message, "");
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/commons/variable.scss";
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
  &__left {
    flex: 1;
    background-color: #f0f2f5;
  }
  &__right {
    flex: 1;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &__login {
      width: 300px;
      &__title {
        color: $black50;
        font-size: $h2;
        font-weight: 500;
        margin-bottom: 10px;
      }
      &__subtitle {
        color: $black50;
        font-size: $medium;
        font-weight: 400;
        margin-bottom: 30px;
      }
      &__button {
        .ant-btn {
          height: 50px;
          border-radius: 5px;
          font-size: $large;
          font-weight: 400;
          color: $black50;
          background-color: $white;
          border-color: $black50;
          display: flex;
          align-items: center;
          gap: 20px;
          padding-right: 20px;
          border-width: 2px;
          &:hover {
            background-color: #eee;
            border-color: $black50;
          }
        }
        &__iconLoading {
          color: $green50;
          font-size: 24px;
        }
      }
      &__logo {
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
      }
      &__copyright {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: $black50;
        opacity: 0.7;
      }
      &__register {
        color: $green50;
        opacity: 0.7;
      }
      &__round1 {
        position: absolute;
        bottom: -120px;
        left: -50px;
        width: 300px;
        height: 300px;
        background-color: $green40;
        border-radius: 30% 70% 25% 75% / 49% 35% 65% 35%;
        filter: blur(10px);
        // border-radius: 100%;
      }
      &__round2 {
        position: absolute;
        top: -70px;
        right: -50px;
        width: 200px;
        height: 200px;
        border-radius: 30% 70% 25% 75% / 49% 35% 65% 35%;
        background-color: $red40;
        filter: blur(10px);
        // border-radius: 100%;
      }
      &__round3 {
        position: absolute;
        bottom: -70px;
        right: -50px;
        width: 200px;
        height: 200px;
        border-radius: 30% 70% 25% 75% / 49% 35% 65% 35%;
        background-color: $yellow50;
        filter: blur(10px);
        // border-radius: 100%;
      }
    }
  }
}
</style>
