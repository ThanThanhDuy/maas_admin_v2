<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :placeholder="placeholder"
    />
    <div style="margin-top: 40px">
      <TableVue
        :header="HEADER_BANNER"
        :data="getterListBanner"
        :isLoading="getLoading"
        :rowSelect="rowSelect"
      />
    </div>
    <a-modal
      :title="isCreate ? 'Create Station' : 'Update Station'"
      :visible="visible"
      :width="700"
      :footer="null"
      class="modalStation"
      :closable="false"
    >
      <div>
        <a-row> </a-row>
      </div>
      <a-divider />
      <div style="display: flex; justify-content: flex-end">
        <div style="display: flex; gap: 10px; align-items: center">
          <a-button key="back" @click="handleCancel"> Close </a-button>
          <a-button v-if="!isCreate" type="danger" @click="handleDelete">
            Delete
          </a-button>
          <a-form-item>
            <a-button key="submit" type="primary" html-type="submit">
              {{ isCreate ? "Create" : "Update" }}
            </a-button>
          </a-form-item>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TableVue from "@/components/commons/Table";
import { HEADER_BANNER } from "@/constants/table/header";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BannerVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      title: "Banner",
      isSearch: true,
      HEADER_BANNER,
      titleButton: "Create Banner",
      iconHeader: "plus",
      placeholder: "Search Banner",
      isCreate: false,
      visible: false,
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
    rowSelect(record) {
      this.visible = true;
      console.log(record);
    },
    handleCancel() {
      this.visible = false;
    },
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
