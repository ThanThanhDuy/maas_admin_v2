<template>
  <a-layout-header
    :style="{
      background: '#fff',
      padding: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '20px',
      borderBottom: '1px solid #e8e8e8',
    }"
  >
    <a-popover placement="bottomRight">
      <template slot="content">
        <div style="width: 170px; display: flex; flex-direction: column">
          <router-link to="/" style="margin-bottom: 10px">
            <a-icon type="user" style="color: #25282b; font-size: 15px" />
            <span style="font-size: 15px; color: #25282b; margin-left: 10px"
              >Profile</span
            >
          </router-link>
          <router-link to="/">
            <a-badge dot>
              <a-icon
                type="notification"
                style="color: #25282b; font-size: 15px"
              />
            </a-badge>
            <span style="font-size: 15px; color: #25282b; margin-left: 10px"
              >Notification</span
            >
          </router-link>
          <a-divider style="margin-top: 10px; margin-bottom: 10px" />
          <span @click="handleLogout" style="cursor: pointer">
            <a-icon :type="icon" style="color: #ed646a; font-size: 18px" />
            <span style="font-size: 18px; color: #ed646a; margin-left: 10px">
              Log out
            </span>
          </span>
        </div>
      </template>
      <div>
        <span style="margin-right: 10px; font-size: 18px">{{ name }}</span>
        <a-avatar :size="40" icon="user" />
      </div>
    </a-popover>
  </a-layout-header>
</template>

<script>
import userService from "@/services/user";
import { auth } from "@/utils/firebase";
import { notification } from "@/utils/notification";
import { signOut } from "@firebase/auth";

export default {
  name: "HeaderVue",
  data() {
    return {
      name: "",
      icon: "logout",
    };
  },
  created() {
    const USER = JSON.parse(localStorage.getItem("USER"));
    this.name = USER.User.Name;
  },
  methods: {
    handleLogout() {
      signOut(auth)
        .then(() => {
          this.icon = "loading";
          const res = userService.logout();
          return res;
        })
        .then(res => {
          if (res && res.StatusCode === 200) {
            localStorage.removeItem("USER");
            notification(this, "success", "Logout Successfully", "");
            this.icon = "logout";
            this.$router.push({
              name: "Login",
            });
          }
        })
        .catch(error => {
          console.log(
            "🚀 ~ file: index.vue ~ line 70 ~ handleLogout ~ error",
            error
          );
        });
    },
  },
};
</script>

<style></style>
