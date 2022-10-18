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
          <a-form-item label="Code">
            <a-input allowClear placeholder="Code" v-model="code" />
          </a-form-item>
        </div>
        <div>
          <ButtonVue
            iconHeader="save"
            titleButton="Save"
            :handleClickButton="handleSave"
          />
        </div>
      </div>
      <a-divider />
    </div>
  </div>
</template>

<script>
import TitleUser from "@/components/commons/TitleUser";
import UploadImage from "@/components/commons/UploadImage";
import ButtonVue from "@/components/commons/Button";

export default {
  name: "LicenseVue",
  components: {
    TitleUser,
    UploadImage,
    ButtonVue,
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
    handleSaveLicense: {
      type: Function,
      default: () => {},
    },
    handlePrepareFileToUploadLicense: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      code: this.licenseCode,
      idenFacade:
        "https://vigo-app-bucket.s3.ap-southeast-1.amazonaws.com/user/avatar/5631bcef-4992-4857-a6a4-6e2fe39d348f.png?X-Amz-Expires=3600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZJOTSEPVXCOZ7NML/20221017/ap-southeast-1/s3/aws4_request&X-Amz-Date=20221017T055258Z&X-Amz-SignedHeaders=host&X-Amz-Signature=4f054e7cfa1f20584101d70344284990f0ca5f739c8facb5bdbb69e2879233e6",
    };
  },
  methods: {
    changeImagePreview(imgUrl, upFor, position) {
      if (position === "Facade") {
        position = "LicenseImageFacade";
      } else {
        position = "LicenseImageBackside";
      }
      this.handlePreviewImageLicense(imgUrl, upFor, position);
    },
    handleSave() {
      this.handleSaveLicense(this.licenseId);
    },
    handlePrepareFileToUpload(file, upFor, position) {
      if (position === "Facade") {
        position = "FileImageFacade";
      } else {
        position = "FileImageBackside";
      }
      this.handlePrepareFileToUploadLicense(file, upFor, position);
    },
  },
};
</script>

<style></style>
