<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :searchValue="searchValue"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :placeholder="placeholder"
      :onClickButton="onClickButton"
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
      :title="isCreate ? 'Create Banner' : 'Update Banner'"
      :visible="visible"
      :width="700"
      :footer="null"
      class="modalStation"
      :closable="false"
    >
      <div>
        <a-form :form="form" @submit="handleSubmit">
          <a-row>
            <a-col :span="24">
              <a-form-item label="Title">
                <a-input
                  placeholder="Title"
                  v-decorator="[
                    'Title',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Title!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('Title')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="Content">
                <a-textarea
                  v-decorator="[
                    'Content',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Content!',
                        },
                      ],
                    },
                  ]"
                  :auto-size="{ minRows: 1, maxRows: 4 }"
                  @blur="() => handleBlur('Content')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item label="Priority">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'Priority',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Priority!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('Priority')"
                />
              </a-form-item>
            </a-col>
            <a-col v-if="!isCreate" :span="6">
              <a-form-item label="Status">
                <a-select
                  @change="() => handleBlur('Active')"
                  style="width: 100%"
                  v-decorator="[
                    'Active',
                    {
                      rules: [
                        {
                          required: false,
                          message: 'Please select Status!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option value="0">Inactive</a-select-option>
                  <a-select-option value="1">Active</a-select-option>
                </a-select>
              </a-form-item></a-col
            >
          </a-row>
          <a-row>
            <a-form-item
              label="Image"
              :validate-status="isFileValid ? 'validating' : 'error'"
              :help="messageFileValid"
            >
              <div class="banner">
                <a-upload
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  :customRequest="uploadfiles"
                  @change="info => handleBlur('File', info)"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
              </div>
            </a-form-item>
          </a-row>
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
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TableVue from "@/components/commons/Table";
import { HEADER_BANNER } from "@/constants/table/header";
import { mapActions, mapGetters } from "vuex";
import { REGEX } from "@/constants/regex";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
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
      search: "",
      form: this.$form.createForm(this, { name: "banner" }),
      bannerSelected: {},
      imageUrl: "",
      loading: false,
      file: null,
      isFileValid: true,
      messageFileValid: "",
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
    onClickButton() {
      this.isCreate = true;
      this.visible = true;
      this.file = null;
      this.imageUrl = "";
      this.isFileValid = true;
      this.messageFileValid = "";
      this.handleReset();
    },
    rowSelect(record) {
      this.isCreate = false;
      this.visible = true;
      this.bannerSelected = { ...record };
      this.form.getFieldDecorator("Title", {
        initialValue: this.bannerSelected.Title,
      });
      this.form.getFieldDecorator("Content", {
        initialValue: this.bannerSelected.Content,
      });
      this.form.getFieldDecorator("Priority", {
        initialValue: this.bannerSelected.Priority,
      });
      this.imageUrl = this.bannerSelected.FilePath;
      // console.log(record);
    },
    handleCancel() {
      this.visible = false;
    },
    searchValue(value) {
      this.search = value;
      this.getListBanner(value);
    },
    handleSubmit(e) {
      e.preventDefault();
      // eslint-disable-next-line
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (
            this.handleBlur("Title") &&
            this.handleBlur("Content") &&
            this.handleBlur("Priority") &&
            this.handleBlur("Active")
          ) {
            if (this.isCreate) {
              if (this.file) {
                console.log("Received values of form: ", values);
                console.log("file", this.file);
              } else {
                this.isFileValid = false;
                this.messageFileValid = "Please select file!";
              }
            } else {
              console.log("Received values of form: ", values);
              console.log("file", this.file);
            }
          } else {
            console.log("loi luon roi");
          }
        } else {
          console.log("loi roi");
          console.log(err);
        }
      });
    },
    handleReset() {
      this.form.getFieldDecorator("Title", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Content", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Priority", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Active", {
        initialValue: "",
      });
      this.imageUrl = "";
      this.form.resetFields();
    },
    handleBlur(string, info) {
      const value = this.form.getFieldsValue([string]);
      if (string === "Title" || string === "Content") {
        if (value[string]) {
          if (!REGEX.VietNameseDetail.test(value[string])) {
            this.form.setFields({
              [string]: {
                value: value[string],
                errors: [new Error(`${string} is not valid!`)],
              },
            });
            return false;
          }
        }
        this.bannerSelected[string] = value[string];
        return true;
      } else if (string === "Priority") {
        if (value[string] !== null && value[string] !== undefined) {
          if (!REGEX.Number.test(value[string])) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string.replace(/([A-Z])/g, " $1").trim()} must be number`
                  ),
                ],
              },
            });
            return false;
          } else if (
            Number(value[string]) >
              (this.isCreate
                ? this.getterListBanner.length + 1
                : this.getterListBanner.length) ||
            Number(value[string]) < 1
          ) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and ${
                      this.isCreate
                        ? this.getterListBanner.length + 1
                        : this.getterListBanner.length
                    }`
                  ),
                ],
              },
            });
            return false;
          }
        }
        this.bannerSelected[string] = Number(value[string]);
        return true;
      } else if (string === "Active") {
        this.bannerSelected[string] = value[string];
        return true;
      } else if (string === "File") {
        this.loading = true;
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
        return true;
      }
    },
    uploadfiles({ file }) {
      this.file = file;
      this.isFileValid = true;
      this.messageFileValid = "";
    },
  },
  mounted() {
    this.getListBanner(this.search);
  },
};
</script>

<style lang="scss">
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
.banner {
  .avatar-uploader > .ant-upload {
    width: 378px;
    height: 223px;
    img {
      width: 378px;
      height: 205px;
    }
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>
