<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider theme="light" class="sideBar">
      <div class="logo">
        <a href="/">
          <img :src="logo" alt="Ant Design Pro" />
        </a>
      </div>
      <a-menu
        theme="light"
        class="sideBar__menu"
        mode="inline"
        :selected-keys="[getItemSelectedSideBar ? getItemSelectedSideBar : '']"
      >
        <a-menu-item
          :key="nav.key"
          v-for="nav in navs"
          @click="() => handleClickMenu(nav.key)"
        >
          <router-link :to="nav.path">
            <a-icon :type="nav.icon" />
            <span class="nav-text">{{ nav.name }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <Header></Header>
      <a-layout-content
        :style="{
          padding: '16px 16px 0',
          overflow: 'initial',
          backgroundColor: '#fff',
        }"
      >
        <router-view />
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Header from "@/components/commons/Header";
export default {
  name: "layoutVue",
  computed: {
    ...mapGetters(["getItemSelectedSideBar"]),
  },
  data() {
    return {
      logo: require("@/assets/vigo.svg"),
      navs: [
        {
          key: "1",
          name: "Dashboard",
          path: "/dashboard",
          icon: "home",
        },
        {
          key: "2",
          name: "Route",
          path: "/route",
          icon: "environment",
        },
        {
          key: "3",
          name: "Station",
          path: "/station",
          icon: "table",
        },
        {
          key: "4",
          name: "Driver",
          path: "/driver",
          icon: "contacts",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["SET_ITEM_SELECTED_SIDE_BAR"]),
    handleClickMenu(key) {
      this.SET_ITEM_SELECTED_SIDE_BAR(key);
    },
  },
  created() {
    let itemIsSelecting = this.navs.find(
      item => item.name === this.$router.currentRoute.name
    );
    this.SET_ITEM_SELECTED_SIDE_BAR(itemIsSelecting?.key);
  },
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/commons/variable.scss";
#components-layout-demo-fixed-sider .logo {
  margin: 16px;
  display: flex;
  justify-content: center;
}
.sideBar {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  border-right: 1px solid #e8e8e8;
  height: 100%;
  &__menu {
    border: none;
    .ant-menu-item-active > a {
      &::before {
        background-color: none;
      }
    }
    .ant-menu-item-selected {
      background-color: $green40;
      color: red;
      &::after {
        border-right: 3px solid $green50;
      }
    }
    .ant-menu-item-selected > a,
    .ant-menu-item-selected > a:hover {
      color: $green50;
    }
    .ant-menu-item-selected > a {
      &::before {
        background-color: currentColor;
        opacity: 0.2;
      }
    }
    .ant-menu-item > a {
      &:hover {
        color: $green50;
      }
    }
  }
}
</style>
