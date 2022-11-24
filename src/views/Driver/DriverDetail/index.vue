<template>
  <div>
    <HeaderPage
      :title="title"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :isSearch="isSearch"
    />
    <div class="conatinerTab">
      <!-- <a-form :form="form" @submit="handleSubmit"> -->
      <a-tabs :activeKey="tab" @change="callback">
        <a-tab-pane key="1" tab="Profile & Wallet">
          <div class="containerSubTab" v-if="!getLoadingDetail">
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
                      v-if="user?.AvatarUrl"
                      :src="user?.AvatarUrl"
                      alt="avatar"
                    />
                    <div v-else>
                      <!-- <a-icon :type="loading ? 'loading' : 'plus'" /> -->
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
              <ProfileVue
                ref="profile"
                :user="user"
                :handleChangeValue="handleChangeValue"
                :handleUpdateUser="handleUpdateUser"
                :handleChangeValueVehicle="handleChangeValueVehicle"
                :listVehicle="listVehicle"
              />
            </div>

            <a-divider v-if="user?.Status === 0 || user?.Status === 1" />
            <TitleUser
              title="Wallet"
              subtitle="Driver's wallet is here!"
              v-if="user?.Status === 0 || user?.Status === 1"
            />
            <div
              class="wapperContent"
              v-if="user?.Status === 0 || user?.Status === 1"
            >
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
          <div
            v-else
            style="
              display: flex;
              justify-content: center;
              width: 100%;
              margin-top: 20px;
            "
          >
            <a-spin />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Lisence">
          <div class="containerSubTab">
            <LicenseVue
              :title="user.Identification?.LicenseType"
              :licenseImageFacade="user.Identification?.FrontSideImage"
              :licenseImageBackside="user.Identification?.BackSideImage"
              :licenseCode="user.Identification?.Code"
              :licenseId="licIden"
              :handlePreviewImageLicense="handlePreviewImageLicense"
              :handlePrepareFileToUploadLicense="
                handlePrepareFileToUploadLicense
              "
              :handleChangeValueLicense="handleChangeValueLicense"
              :handleUpdateUser="handleUpdateUser"
              :ref="licIden"
            />
            <LicenseVue
              :title="user.DriverLicense?.LicenseType"
              :licenseImageFacade="user.DriverLicense?.FrontSideImage"
              :licenseImageBackside="user.DriverLicense?.BackSideImage"
              :licenseCode="user.DriverLicense?.Code"
              :licenseId="licDir"
              :handlePreviewImageLicense="handlePreviewImageLicense"
              :handlePrepareFileToUploadLicense="
                handlePrepareFileToUploadLicense
              "
              :handleChangeValueLicense="handleChangeValueLicense"
              :handleUpdateUser="handleUpdateUser"
              :ref="licDir"
            />
            <LicenseVue
              :title="user.VehicleRegistration?.LicenseType"
              :licenseImageFacade="user.VehicleRegistration?.FrontSideImage"
              :licenseImageBackside="user.VehicleRegistration?.BackSideImage"
              :licenseCode="user.VehicleRegistration?.Code"
              :licenseId="licVeh"
              :handlePreviewImageLicense="handlePreviewImageLicense"
              :handlePrepareFileToUploadLicense="
                handlePrepareFileToUploadLicense
              "
              :handleChangeValueLicense="handleChangeValueLicense"
              :handleUpdateUser="handleUpdateUser"
              :ref="licVeh"
            />
          </div>
        </a-tab-pane>
        <a-button
          slot="tabBarExtraContent"
          type="primary"
          icon="save"
          @click="handleUpdateDriver"
        >
          Save
        </a-button>
      </a-tabs>
      <!-- </a-form> -->
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import TitleUser from "@/components/commons/TitleUser";
import LicenseVue from "@/components/commons/License";
import ProfileVue from "@/components/commons/Profile";
import { mapActions, mapGetters } from "vuex";
import { REGEX } from "@/constants/regex";
import { notification } from "@/utils/notification";
import vehicleService from "@/services/vehicle";
import driverService from "@/services/driver";

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
      tab: "1",
      user: {},
      fileAvatar: null,
      licIden: "Identification",
      licDir: "DriverLicense",
      licVeh: "VehicleRegistration",
      fileIdentificationFrontSideImage: null,
      fileIdentificationBackSideImage: null,
      fileDriverLicenseFrontSideImage: null,
      fileDriverLicenseBackSideImage: null,
      fileVehicleRegistrationFrontSideImage: null,
      fileVehicleRegistrationBackSideImage: null,
      listVehicle: [],
    };
  },
  computed: {
    ...mapGetters({
      getterDriverDetail: "driver/getterDriverDetail",
      getLoadingDetail: "driver/getLoadingDetail",
    }),
  },
  methods: {
    ...mapActions({
      getDriverByCode: "driver/getDriverByCode",
    }),
    handleCancel() {
      this.previewVisible = false;
    },
    callback(key) {
      this.tab = key;
    },
    handlePreview(info) {
      getBase64(info.file.originFileObj, imageUrl => {
        this.user.AvatarUrl = imageUrl;
      });
    },
    // eslint-disable-next-line
    uploadfiles({ onSuccess, onError, file }) {
      if (file) {
        this.fileAvatar = file;
      }
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleChangeValue(value, position) {
      this.user[position] = value;
    },
    handleChangeValueVehicle(value, position) {
      this.user["Vehicle"][position] = value;
    },
    handleChangeValueLicense(value, lic, position) {
      this.user[lic][position] = value;
    },
    handlePreviewImageLicense(imgUrl, upFor, position) {
      this.user[upFor][position] = imgUrl;
    },
    handlePrepareFileToUploadLicense(file, upFor, position) {
      this[`file${upFor}${position}`] = file;
    },
    // eslint-disable-next-line
    async handleUpdateUser() {
      let formData = new FormData();
      formData.append(
        "PhoneNumber",
        this.user.PhoneNumber.length === 10
          ? `+84${this.user.PhoneNumber.substring(1)}`
          : `+84${this.user.PhoneNumber}`
      );
      formData.append("Email", this.user.Gmail);
      formData.append("Name", this.user.Name);
      formData.append("Gender", this.user.Gender);
      formData.append("DateOfBirth", this.user.DateOfBirth);
      formData.append("status", this.user.Status);
      if (this.fileAvatar) {
        formData.append("Avatar", this.fileAvatar);
      }
      formData.append("IdentificationCode", this.user.Identification.Code);
      if (this.fileIdentificationFrontSideImage) {
        formData.append(
          "IdentificationFrontSideImage",
          this.fileIdentificationFrontSideImage
        );
      }
      if (this.fileIdentificationBackSideImage) {
        formData.append(
          "IdentificationBackSideImage",
          this.fileIdentificationBackSideImage
        );
      }
      formData.append("DriverLicenseCode", this.user.DriverLicense.Code);
      if (this.fileDriverLicenseFrontSideImage) {
        formData.append(
          "DriverLicenseFrontSideImage",
          this.fileDriverLicenseFrontSideImage
        );
      }
      if (this.fileDriverLicenseBackSideImage) {
        formData.append(
          "DriverLicenseBackSideImage",
          this.fileDriverLicenseBackSideImage
        );
      }
      formData.append(
        "VehicleRegistrationCode",
        this.user.VehicleRegistration.Code
      );
      if (this.fileVehicleRegistrationFrontSideImage) {
        formData.append(
          "VehicleRegistrationFrontSideImage",
          this.fileVehicleRegistrationFrontSideImage
        );
      }
      if (this.fileVehicleRegistrationBackSideImage) {
        formData.append(
          "VehicleRegistrationBackSideImage",
          this.fileVehicleRegistrationBackSideImage
        );
      }
      formData.append("VehicleName", this.user.Vehicle.Name);
      formData.append("LicensePlate", this.user.Vehicle.LicensePlate);
      formData.append("VehicleTypeId", this.user.Vehicle.VehicleTypeId);
      const res = await driverService.updateDriverByCode(
        this.user.Code,
        formData
      );
      console.log(res);
      if (res && res.StatusCode === 200) {
        notification(this, "success", "Update Driver Success", "");
      } else {
        notification(this, "error", "Update Driver Fail", "");
      }
    },
    checkEmpty(value) {
      return value === "" || value === null || value === undefined;
    },
    handleUpdateDriver() {
      let check = true;
      let checkIden = true;
      let checkDir = true;
      let checkVeh = true;
      check = this.$refs.profile.handleSubmit();
      if (this.$refs[this.licIden]) {
        checkIden = this.$refs[this.licIden].handleSubmit();
        checkDir = this.$refs[this.licDir].handleSubmit();
        checkVeh = this.$refs[this.licVeh].handleSubmit();
        if (!checkIden || !checkDir || !checkVeh) {
          this.tab = "2";
          setTimeout(() => {
            this.$refs[this.licIden].handleSubmit();
            this.$refs[this.licDir].handleSubmit();
            this.$refs[this.licVeh].handleSubmit();
          }, 100);
        }
      } else {
        if (
          this.checkEmpty(this.user.Identification.Code) ||
          !REGEX.NumberIden.test(this.user.Identification.Code) ||
          this.checkEmpty(this.user.DriverLicense.Code) ||
          !REGEX.NumberIden.test(this.user.DriverLicense.Code) ||
          this.checkEmpty(this.user.VehicleRegistration.Code) ||
          !REGEX.NumberIden.test(this.user.VehicleRegistration.Code)
        ) {
          check = false;
          this.tab = "2";
          setTimeout(() => {
            this.$refs[this.licIden].handleSubmit();
            this.$refs[this.licDir].handleSubmit();
            this.$refs[this.licVeh].handleSubmit();
          }, 100);
        }
      }
      if (check) {
        this.handleUpdateUser();
      } else {
        notification(
          this,
          "error",
          "Please check driver's information again",
          ""
        );
      }
    },
  },
  async mounted() {
    const res = await this.getDriverByCode(
      this.$router.currentRoute.params.code
    );
    if (res.StatusCode === 200) {
      this.user = { ...res.Data };
    }
  },
  async created() {
    const res = await vehicleService.getAllVehicle();
    if (res && res.StatusCode === 200) {
      let result = [];
      for (const item of res.Data) {
        for (const vehicle of item?.VehicleTypes) {
          result.push({
            Id: vehicle.Id,
            Name: vehicle.Name,
          });
        }
      }
      console.log(result);
      this.listVehicle = result;
    }
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
