<template>
  <div class="uploadImage">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :customRequest="uploadfiles"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <p style="text-align: center">{{ label }}</p>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "UploadImage",
  props: {
    label: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    upFor: {
      type: String,
      require: true,
    },
    changeImagePreview: {
      type: Function,
      default: () => {},
    },
    handlePrepareFileToUpload: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleChange(info) {
      // if (info.file.status === "uploading") {
      //   this.loading = true;
      //   return;
      // }
      // if (info.file.status === "done") {
      // Get this url from response in real world.
      // eslint-disable-next-line
      getBase64(info.file.originFileObj, imageUrl => {
        this.changeImagePreview(imageUrl, this.upFor, this.label);
        // this.loading = false;
      });
      // }
    },
    // eslint-disable-next-line
    uploadfiles({ onSuccess, onError, file }) {
      this.handlePrepareFileToUpload(file, this.upFor, this.label);
      // console.log(file);
      // let formData = new FormData();
      // formData.append("Avatar", file);
      // formData.append("Name", "Than Thanh Duy");
      // formData.append("Gender", 1);
      // formData.append("PhoneNumber", "+84376826328");
    },
  },
};
</script>

<style lang="scss">
.uploadImage {
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
