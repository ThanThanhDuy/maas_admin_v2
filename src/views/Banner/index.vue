<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div v-if="getLoading" class="loading">
      <a-spin />
    </div>
    <a-row v-else>
      <a-col
        class="containerBox"
        :span="8"
        v-for="(banner, index) in getterListBanner"
        :key="index"
      >
        <div>
          <div class="containerItem">
            <div class="containerItem__image">
              <img :src="banner.FilePath" alt="" />
            </div>
            <p class="containerItem__title">{{ banner.Title }}</p>
            <p class="containerItem__content">{{ banner.Content }}</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BannerVue",
  components: {
    HeaderPage,
  },
  data() {
    return {
      title: "Banner",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
    };
  },
  computed: {
    ...mapGetters({
      getterListBanner: "banner/getListBanner",
      getLoading: "banner/getLoading",
    }),
  },
  methods: {
    ...mapActions({
      getListBanner: "banner/getListBanner",
    }),
  },
  mounted() {
    this.getListBanner();
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  width: 100%;
  height: calc(100vh - 64px - 16px);
  justify-content: center;
  padding-top: 100px;
}
.containerBox {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .containerItem {
    background-color: #f0f2f5;
    width: 95%;
    border-radius: 10px;
    padding-bottom: 10px;
    &__image {
      width: 100%;
      img {
        width: 100%;
      }
    }
    &__title {
      font-size: 20px;
      font-weight: 600;
      margin: 10px 0 10px 10px;
    }
    &__content {
      font-size: 16px;
      margin: 0 0 0px 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      line-height: 1.25;
    }
  }
}
</style>
