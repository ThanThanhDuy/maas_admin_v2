<template>
  <div>
    <HeaderPage
      :title="title"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :isSearch="isSearch"
    />
    <div class="conatinerTab">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Profile & Wallet">
          <div class="containerSubTab">
            <TitleUser
              title="Driver Profile"
              subtitle="Update driver's profile"
            />
            <div class="wapperContent">
              <div class="wapperContent__left">
                <p class="left__title">Avatar</p>
                <p class="left__subtitle">Update driver's avatar</p>
              </div>
              <div class="wapperContent__right">
                <div class="clearfix">
                  <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :customRequest="uploadfiles"
                    @change="handlePreview"
                  >
                    <img
                      v-if="user.AvartarUrl"
                      :src="user.AvartarUrl"
                      alt="avatar"
                    />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                  <a-modal
                    :visible="previewVisible"
                    :footer="null"
                    @cancel="handleCancel"
                  >
                    <img
                      alt="example"
                      style="width: 100%"
                      :src="previewImage"
                    />
                  </a-modal>
                </div>
              </div>
            </div>
            <div class="wapperContent">
              <div class="wapperContent__left">
                <p class="left__title">Basic Information</p>
              </div>
              <ProfileVue :user="user" :handleChangeValue="handleChangeValue" />
            </div>

            <a-divider />
            <TitleUser title="Wallet" subtitle="Driver's wallet is here!" />
            <div class="wapperContent">
              <div class="wapperContent__left">
                <p class="left__title">Balance & Linking</p>
              </div>
              <div class="wapperContent__right">
                <div class="right__box">
                  <div class="box__content">
                    <div class="box__content__wallet">
                      <div class="box_wallet">
                        <img :src="logo" alt="logo" />
                        <p class="box_wallet__blanceLabel">Available Balance</p>
                        <p class="box_wallet__blance">
                          150.000 <span>VND</span>
                        </p>
                        <p class="box_wallet__code">
                          6bb6b872-f27b-4e2b-b9c2-921b4c2aafcf
                        </p>
                      </div>
                    </div>
                    <div class="box__content__linking">
                      <a-form-item label="Linking">
                        <!-- <a-input
                          placeholder="Linking"
                          v-model="Linking"
                          addon-before="MoMo"
                          readOnly
                        >
                          /></a-input
                        > -->
                      </a-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a-divider />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Lisence">
          <div class="containerSubTab">
            <LicenseVue
              v-for="license in user.License"
              :key="license.LicenseCode"
              :title="license.LicenseName"
              :licenseImageFacade="license.LicenseImageFacade"
              :licenseImageBackside="license.LicenseImageBackside"
              :licenseCode="license.LicenseCode"
              :licenseId="license.LicenseId"
              :handlePreviewImageLicense="handlePreviewImageLicense"
              :handleSaveLicense="handleSaveLicense"
              :handlePrepareFileToUploadLicense="
                handlePrepareFileToUploadLicense
              "
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TitleUser from "@/components/commons/TitleUser";
import LicenseVue from "@/components/commons/License";
import ProfileVue from "@/components/commons/Profile";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "DriverDetail",
  components: {
    HeaderPage,
    TitleUser,
    LicenseVue,
    ProfileVue,
  },
  data() {
    return {
      logo: require("@/assets/vigo.svg"),
      title: "Driver Detail",
      isSearch: false,
      titleButton: "",
      iconHeader: "",
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
      AvartarUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",

      user: {
        Name: "Thân Thanh Duy",
        Phone: "0961234567",
        Gmail: "duyttse140971@fpt.edu.vn",
        Gender: 1,
        Linking: "6bb6b872-f27b-4e2b-b9c2-921b4c2aafcf",
        DateOfBirth: "2022-10-18T17:39:24.495+07:00",
        Status: 1,
        FileAvatar: null,
        AvartarUrl:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        License: [
          {
            LicenseId: "1",
            LicenseCode: "123456789",
            LicenseName: "Identification",
            FileImageFacade: null,
            LicenseImageFacade:
              "https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2021/01/27/can-cuoc-cong-dan-gan-chip-2(1).jpg",
            FileImageBackside: null,
            LicenseImageBackside:
              "https://congan.tiengiang.gov.vn/documents/2261410/28879612/m%E1%BA%B7t+sau+th%E1%BA%BB+cccd.jpg/ab0f4a7e-69a7-46a4-8b88-e84c36cb2271?t=1612512711938",
          },
          {
            LicenseId: "2",
            LicenseCode: "987654321",
            LicenseName: "Driving License",
            FileImageFacade: null,
            LicenseImageFacade:
              "https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2020/08/29/12-hang-giay-phep-lai-xe.png",
            FileImageBackside: null,
            LicenseImageBackside:
              "https://cdn.thuvienphapluat.vn/tintuc/uploads/image/2020/08/29/12-hang-giay-phep-lai-xe.png",
          },
        ],
      },
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },

    handlePreview(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.user.AvartarUrl = imageUrl;
      });
    },

    // eslint-disable-next-line
    uploadfiles({ onSuccess, onError, file }) {
      if (file) {
        this.user.FileAvatar = file;
      }
      console.log(this.user);
    },

    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleChangeValue(value, position) {
      this.user[position] = value;
      console.log(this.user);
    },
    handlePreviewImageLicense(imgUrl, upFor, position) {
      let index = this.user?.License.findIndex(
        item => item.LicenseId === upFor
      );
      if (index !== -1) {
        this.user.License[index][position] = imgUrl;
      }
    },
    handlePrepareFileToUploadLicense(file, upFor, position) {
      let index = this.user?.License.findIndex(
        item => item.LicenseId === upFor
      );
      if (index !== -1) {
        this.user.License[index][position] = file;
      }
    },
    // eslint-disable-next-line
    handleSaveLicense(licenseId) {
      // let formData = new FormData();
      // formData.append("Avatar", file);
    },
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.containerSubTab {
  padding: 20px 150px 0px;
  .wapperContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__left {
      width: 25%;
      .left__title {
        font-size: 16px;
        font-weight: 400;
        color: $black50;
      }
      .left__subtitle {
        font-size: 12px;
        font-weight: 400;
        color: $black50;
        opacity: 0.7;
      }
    }
    &__right {
      width: 75%;
      .right__box {
        .box__content {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          .box__content__fullname {
            width: 60%;
          }
          .box__content__phone {
            width: 40%;
          }
          .box__content__email {
            width: 60%;
          }
          .box__content__birthdate {
            width: 40%;
          }
          .box__content__wallet {
            width: 50%;
            .box_wallet {
              width: 400px;
              height: 150px;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              border-radius: 10px;
              padding: 15px;
              img {
                width: 50px;
                margin-bottom: 20px;
              }
              &__blanceLabel {
                font-size: 12px;
                font-weight: 400;
                color: $black50;
                opacity: 0.5;
              }
              &__blance {
                font-size: 24px;
                font-weight: 700;
                color: $green50;
                margin-bottom: 10px;
                span {
                  font-size: 16px;
                  font-weight: 700;
                  color: $green50;
                }
              }
              &__code {
                font-size: 14px;
                font-weight: 400;
                color: $black50;
                opacity: 0.5;
              }
            }
          }
          .box__content__linking {
            width: 50%;
          }
        }
        .box__more {
          display: flex;
          gap: 100px;
        }
      }
    }
  }
}
</style>
