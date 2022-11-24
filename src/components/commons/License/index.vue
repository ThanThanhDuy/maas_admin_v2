<template>
  <div>
    <TitleUser :title="title" subtitle="" />
    <div>
      <div style="display: flex; gap: 100px">
        <UploadImage
          :upFor="licenseId"
          label="Facade"
          :imageUrl="licenseImageFacade"
          :changeImagePreview="changeImagePreview"
          :handlePrepareFileToUpload="handlePrepareFileToUpload"
        />
        <UploadImage
          :upFor="licenseId"
          label="Backside"
          :imageUrl="licenseImageBackside"
          :changeImagePreview="changeImagePreview"
          :handlePrepareFileToUpload="handlePrepareFileToUpload"
        />
      </div>
      <div
        style="
          width: calc(378px + 378px + 110px);
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div style="width: 400px">
          <a-form :form="form">
            <a-form-item label="Code">
              <a-input
                allowClear
                placeholder="Name"
                v-decorator="[
                  'Code',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input Code!',
                      },
                    ],
                    initialValue: licenseCode,
                  },
                ]"
                @blur="handleChangeCode"
              />
            </a-form-item>
          </a-form>
        </div>
        <div>
          <!-- <ButtonVue
            iconHeader="save"
            titleButton="Save"
            :handleClickButton="handleSave"
          /> -->
        </div>
      </div>
      <a-divider />
    </div>
  </div>
</template>

<script>
import TitleUser from "@/components/commons/TitleUser";
import UploadImage from "@/components/commons/UploadImage";
import { REGEX } from "@/constants/regex";
// import ButtonVue from "@/components/commons/Button";

export default {
  name: "LicenseVue",
  components: {
    TitleUser,
    UploadImage,
    // ButtonVue,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    licenseImageFacade: {
      type: String,
      default: "",
    },
    licenseImageBackside: {
      type: String,
      default: "",
    },
    licenseCode: {
      type: String,
      default: "",
    },
    licenseId: {
      type: String,
      default: "",
    },
    handlePreviewImageLicense: {
      type: Function,
      default: () => {},
    },
    handlePrepareFileToUploadLicense: {
      type: Function,
      default: () => {},
    },
    handleChangeValueLicense: {
      type: Function,
      default: () => {},
    },
    handleUpdateUser: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: this.licenseId }),
    };
  },
  methods: {
    changeImagePreview(imgUrl, upFor, position) {
      if (position === "Facade") {
        position = "FrontSideImage";
      } else {
        position = "BackSideImage";
      }
      this.handlePreviewImageLicense(imgUrl, upFor, position);
    },
    handlePrepareFileToUpload(file, upFor, position) {
      if (position === "Facade") {
        position = "FrontSideImage";
      } else {
        position = "BackSideImage";
      }
      this.handlePrepareFileToUploadLicense(file, upFor, position);
    },
    handleChangeCode() {
      const lic = this.form.getFieldsValue(["Code"]);
      if (lic.Code) {
        if (!REGEX.NumberIden.test(lic.Code)) {
          this.form.setFields({
            Code: {
              value: lic.Code,
              errors: [new Error(`Please input a valid ${this.title} Number!`)],
            },
          });
          return false;
        }
      }
      this.handleChangeValueLicense(lic.Code, this.licenseId, "Code");
      return true;
    },
    handleSubmit() {
      if (this.handleChangeCode()) {
        return true;
      } else {
        console.log("error" + this.licenseId);
        return false;
      }
    },
  },
};
</script>

<style></style>
