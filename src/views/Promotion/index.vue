<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
      :placeholder="placeholder"
      :onClickButton="onClickButton"
    />
    <div style="margin-top: 40px">
      <TableVue
        :header="HEADER_PROMOTION"
        :data="getListPromotion"
        :isLoading="getLoading"
        :rowSelect="rowSelect"
      />
    </div>
    <a-modal
      :title="isCreate ? 'Create promotion' : 'Update promotion'"
      :visible="visible"
      :width="700"
      :footer="null"
      class="modalStation"
      :closable="false"
    >
      <div>
        <a-form :form="form" @submit="handleSubmit">
          <a-row :gutter="16" style="margin-bottom: 15px">
            <a-col :span="12">
              <a-form-item label="Code">
                <a-input
                  style="text-transform: uppercase"
                  :maxLength="10"
                  placeholder="Code"
                  v-decorator="[
                    'Code',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Code!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('Code')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Name">
                <a-input
                  :maxLength="30"
                  placeholder="Name"
                  v-decorator="[
                    'Name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Name!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('Name')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 15px">
            <a-col>
              <a-form-item label="Details">
                <a-textarea
                  :maxLength="500"
                  placeholder="Details"
                  v-decorator="[
                    'Details',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input details promotion!',
                        },
                      ],
                    },
                  ]"
                  :auto-size="{ minRows: 1, maxRows: 3 }"
                  @blur="() => handleBlur('Details')"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16" style="margin-bottom: 15px">
            <a-col :span="6">
              <a-form-item label="Discount Percentage">
                <a-input-number
                  style="width: 100%"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  v-decorator="[
                    'DiscountPercentage',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input discount percentage!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('DiscountPercentage')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Max Decrease">
                <a-input-number
                  style="width: 100%"
                  :formatter="value => `${numberWithCommas(value)}`"
                  :parser="value => value.replace(/,*/g, '')"
                  v-decorator="[
                    'MaxDecrease',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input max decrease!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('MaxDecrease')"
                /> </a-form-item
            ></a-col>
            <a-col :span="6">
              <a-form-item label="Total Usage">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'TotalUsage',
                    {
                      rules: [
                        {
                          required: false,
                          message: 'Please input total usage!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('TotalUsage')"
                /> </a-form-item
            ></a-col>
            <a-col :span="6">
              <a-form-item label="Usage PerUser">
                <a-input-number
                  style="width: 100%"
                  v-decorator="[
                    'UsagePerUser',
                    {
                      rules: [
                        {
                          required: false,
                          message: 'Please input usage per user!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('UsagePerUser')"
                /> </a-form-item
            ></a-col>
          </a-row>
          <a-row :gutter="16" style="margin-bottom: 15px">
            <a-col :span="6">
              <a-form-item label="Min Total Price">
                <a-input-number
                  style="width: 100%"
                  :formatter="value => `${numberWithCommas(value)}`"
                  :parser="value => value.replace(/,*/g, '')"
                  v-decorator="[
                    'MinTotalPrice',
                    {
                      rules: [
                        {
                          required: false,
                          message: 'Please input min total price!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('MinTotalPrice')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Min Tickets">
                <a-input-number
                  style="width: 100%"
                  :formatter="value => `${numberWithCommas(value)}`"
                  :parser="value => value.replace(/,*/g, '')"
                  v-decorator="[
                    'MinTickets',
                    {
                      rules: [
                        {
                          required: false,
                          message: 'Please input min tickets!',
                        },
                      ],
                    },
                  ]"
                  @blur="() => handleBlur('MinTickets')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Payment method">
                <a-select
                  @change="() => handleBlur('Type')"
                  style="width: 100%"
                  v-decorator="[
                    'PaymentMethods',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select payment method!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="pay in PAYMENT_METHODS"
                    :value="pay.id"
                    :key="pay.id"
                    >{{ pay.method }}</a-select-option
                  >
                </a-select>
              </a-form-item></a-col
            >
            <a-col :span="6">
              <a-form-item label="Vehicle Type">
                <a-select
                  @change="() => handleBlur('Type')"
                  style="width: 100%"
                  v-decorator="[
                    'VehicleTypes',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select vehicle type!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="veh in VEHICLE_TYPE_PROMOTION"
                    :value="veh.id"
                    :key="veh.id"
                    >{{ veh.type }}</a-select-option
                  >
                </a-select>
              </a-form-item></a-col
            >
          </a-row>
          <a-row :gutter="16" style="margin-bottom: 15px">
            <a-col :span="8">
              <a-form-item
                label="Valid From"
                :validate-status="isValidFrom ? 'validating' : 'error'"
                :help="messageValidFrom"
              >
                <a-date-picker
                  show-time
                  format="DD-MM-YYYY HH:mm:ss"
                  style="width: 100%"
                  v-model="ValidFrom"
                  placeholder="Select valid from"
                  @change="() => handleBlur('ValidFrom')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="Valid Until"
                :validate-status="isValidUntil ? 'validating' : 'error'"
                :help="messageValidUntil"
              >
                <a-date-picker
                  show-time
                  format="DD-MM-YYYY HH:mm:ss"
                  style="width: 100%"
                  v-model="ValidUntil"
                  placeholder="Select valid until"
                  @change="() => handleBlur('ValidUntil')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Type Promotion">
                <a-select
                  @change="() => handleBlur('Type')"
                  style="width: 100%"
                  v-decorator="[
                    'Type',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select type promotion!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="typePro in TYPE_PROMOTION_ARRAY"
                    :value="typePro.id"
                    :key="typePro.id"
                    >{{ typePro.status }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="Image">
                <div class="promotion">
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
            </a-col>
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
import { HEADER_PROMOTION } from "@/constants/table/header";
import { mapActions, mapGetters } from "vuex";
import { REGEX } from "@/constants/regex";
import moment from "moment";
import { TYPE_PROMOTION_ARRAY } from "@/constants/promotion";
import { numberWithCommas } from "@/utils/numberWithCommas";
import { PAYMENT_METHODS } from "@/constants/payment";
import { VEHICLE_TYPE_PROMOTION } from "@/constants/vehicle";
import promotionService from "@/services/promotion";
import { notification } from "@/utils/notification";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "PromotionVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      HEADER_PROMOTION,
      title: "Promotion",
      isSearch: true,
      titleButton: "Create Promotion",
      iconHeader: "plus",
      placeholder: "Search promotion",
      isCreate: false,
      visible: false,
      form: this.$form.createForm(this, { name: "promotion" }),
      proSelected: {},
      ValidFrom: null,
      isValidFrom: true,
      messageValidFrom: "",
      ValidUntil: null,
      isValidUntil: true,
      messageValidUntil: "",
      TYPE_PROMOTION_ARRAY,
      PAYMENT_METHODS,
      VEHICLE_TYPE_PROMOTION,
      imageUrl: "",
      loading: false,
      file: null,
    };
  },
  computed: {
    ...mapGetters({
      getListPromotion: "promotion/getListPromotion",
      getLoading: "promotion/getLoading",
    }),
  },
  methods: {
    ...mapActions({
      getPromotion: "promotion/getPromotion",
    }),
    numberWithCommas,
    rowSelect(record) {
      let item = this.getListPromotion.find(item => item.Code === record.Code);
      this.proSelected = item ? { ...item } : {};
      this.handleReset();
      this.isCreate = false;
      this.visible = true;
      this.form.getFieldDecorator("Code", {
        initialValue: this.proSelected.Code,
      });
      this.form.getFieldDecorator("Name", {
        initialValue: this.proSelected.Name,
      });
      this.form.getFieldDecorator("Details", {
        initialValue: this.proSelected.Details,
      });
      this.form.getFieldDecorator("DiscountPercentage", {
        initialValue: this.proSelected.DiscountPercentage * 100,
      });
      this.form.getFieldDecorator("MaxDecrease", {
        initialValue: this.proSelected.MaxDecrease,
      });
      this.form.getFieldDecorator("TotalUsage", {
        initialValue: this.proSelected.PromotionCondition.TotalUsage,
      });
      this.form.getFieldDecorator("UsagePerUser", {
        initialValue: this.proSelected.PromotionCondition.UsagePerUser,
      });
      this.ValidFrom = this.proSelected.PromotionCondition.ValidFrom
        ? moment(
            this.proSelected.PromotionCondition.ValidFrom,
            "DD-MM-YYYY HH:mm:ss"
          )
        : null;
      this.ValidUntil = this.proSelected.PromotionCondition.ValidUntil
        ? moment(
            this.proSelected.PromotionCondition.ValidUntil,
            "DD-MM-YYYY HH:mm:ss"
          )
        : null;
      this.form.getFieldDecorator("Type", {
        initialValue: this.proSelected.Type,
      });
      this.form.getFieldDecorator("MinTotalPrice", {
        initialValue: this.proSelected.PromotionCondition.MinTotalPrice,
      });
      this.form.getFieldDecorator("MinTickets", {
        initialValue: this.proSelected.PromotionCondition.MinTickets,
      });
      this.form.getFieldDecorator("PaymentMethods", {
        initialValue: this.proSelected.PromotionCondition.PaymentMethods
          ? this.proSelected.PromotionCondition.PaymentMethods
          : 0,
      });
      this.form.getFieldDecorator("VehicleTypes", {
        initialValue: this.proSelected.PromotionCondition.VehicleTypes
          ? this.proSelected.PromotionCondition.VehicleTypes
          : -1,
      });
      this.imageUrl = this.proSelected.FilePath;
    },
    handleCancel() {
      this.visible = false;
    },
    onClickButton() {
      this.visible = true;
      this.isCreate = true;
      this.handleReset();
      this.proSelected = {};
      this.ValidFrom = null;
      this.ValidUntil = null;
      this.imageUrl = "";
    },
    handleSubmit(e) {
      e.preventDefault();
      // eslint-disable-next-line
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (
            this.handleBlur("Code") &&
            this.handleBlur("Name") &&
            this.handleBlur("Details") &&
            this.handleBlur("DiscountPercentage") &&
            this.handleBlur("MaxDecrease") &&
            this.handleBlur("TotalUsage") &&
            this.handleBlur("UsagePerUser") &&
            this.handleBlur("ValidFrom") &&
            this.handleBlur("ValidUntil") &&
            this.handleBlur("MinTotalPrice") &&
            this.handleBlur("MinTickets") &&
            this.handleBlur("PaymentMethods") &&
            this.handleBlur("VehicleTypes") &&
            this.handleBlur("Type")
          ) {
            this.$confirm({
              title: `Do you want to ${
                this.isCreate ? "create" : "update"
              } this promotion?`,
              content: `This promotion will be ${
                this.isCreate ? "create" : "update"
              } in the system. Please check again before confirm.`,
              onOk: async () => {
                this.proSelected.PromotionCondition.PaymentMethods =
                  this.proSelected.PromotionCondition.PaymentMethods === 0
                    ? ""
                    : this.proSelected.PromotionCondition.PaymentMethods;
                this.proSelected.PromotionCondition.VehicleTypes =
                  this.proSelected.PromotionCondition.VehicleTypes === -1
                    ? ""
                    : this.proSelected.PromotionCondition.VehicleTypes;
                // console.log(this.file);
                console.log(this.proSelected);
                let formData = new FormData();
                formData.append("Code", this.proSelected.Code);
                formData.append("Name", this.proSelected.Name);
                formData.append("Details", this.proSelected.Details);
                formData.append(
                  "DiscountPercentage",
                  this.proSelected.DiscountPercentage
                );
                formData.append("MaxDecrease", this.proSelected.MaxDecrease);
                formData.append(
                  "TotalUsage",
                  this.proSelected.PromotionCondition.TotalUsage
                );
                formData.append(
                  "UsagePerUser",
                  this.proSelected.PromotionCondition.UsagePerUser
                );
                formData.append(
                  "ValidFrom",
                  this.proSelected.PromotionCondition.ValidFrom
                );
                formData.append(
                  "ValidUntil",
                  this.proSelected.PromotionCondition.ValidUntil
                );
                formData.append("Type", this.proSelected.Type);
                formData.append(
                  "MinTotalPrice",
                  this.proSelected.PromotionCondition.MinTotalPrice
                );
                formData.append(
                  "MinTickets",
                  this.proSelected.PromotionCondition.MinTickets
                );
                formData.append(
                  "PaymentMethods",
                  this.proSelected.PromotionCondition.PaymentMethods
                );
                formData.append(
                  "VehicleTypes",
                  this.proSelected.PromotionCondition.VehicleTypes
                );
                formData.append("File", this.file ? this.file : "");
                let res;
                if (this.isCreate) {
                  res = await promotionService.createPromotion(formData);
                } else {
                  res = await promotionService.updatePromotion(
                    formData,
                    this.proSelected.Id
                  );
                }
                console.log(res);
                if (res && res.StatusCode === 200) {
                  notification(
                    this,
                    "success",
                    this.isCreate
                      ? "Create promotion successfully"
                      : "Update promotion successfully",
                    res.Message
                  );
                  this.visible = false;
                  this.handleReset();
                  this.proSelected = {};
                  this.ValidFrom = null;
                  this.ValidUntil = null;
                  this.imageUrl = "";
                  this.getPromotion();
                } else {
                  notification(
                    this,
                    "error",
                    this.isCreate
                      ? "Create promotion fail"
                      : "Update promotion fail",
                    res.Message
                  );
                }
              },
              onCancel() {},
            });
          } else {
            console.log("error submit");
          }
        }
      });
    },
    handleDelete() {
      console.log("delete");
    },
    handleReset() {
      this.form.getFieldDecorator("Code", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Name", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Details", {
        initialValue: "",
      });
      this.form.getFieldDecorator("DiscountPercentage", {
        initialValue: 0,
      });
      this.form.getFieldDecorator("MaxDecrease", {
        initialValue: 0,
      });
      this.form.getFieldDecorator("TotalUsage", {
        initialValue: null,
      });
      this.form.getFieldDecorator("UsagePerUser", {
        initialValue: null,
      });
      this.form.getFieldDecorator("Type", {
        initialValue: 0,
      });
      this.form.getFieldDecorator("MinTotalPrice", {
        initialValue: null,
      });
      this.form.getFieldDecorator("MinTickets", {
        initialValue: null,
      });
      this.form.getFieldDecorator("PaymentMethods", {
        initialValue: 0,
      });
      this.form.getFieldDecorator("VehicleTypes", {
        initialValue: -1,
      });

      this.form.resetFields();
    },
    handleBlur(string, info) {
      const value = this.form.getFieldsValue([string]);
      if (string === "Code") {
        if (value[string]) {
          if (!REGEX.CodePromo.test(value[string].toUpperCase())) {
            this.form.setFields({
              [string]: {
                value: value[string].toUpperCase(),
                errors: [new Error(`${string} must be Vietnamese characters`)],
              },
            });
            return false;
          }
        }
        this.proSelected[string] = value[string].toUpperCase();
        return true;
      } else if (string === "DiscountPercentage") {
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
          } else if (Number(value[string]) > 100 || Number(value[string]) < 1) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 100`
                  ),
                ],
              },
            });
            return false;
          }
        }
        this.proSelected[string] = Number(value[string]) / 100;
        return true;
      } else if (string === "Name") {
        if (value[string]) {
          if (!REGEX.VietNamese.test(value[string])) {
            this.form.setFields({
              [string]: {
                value: value[string],
                errors: [new Error(`${string} must be Vietnamese characters`)],
              },
            });
            return false;
          }
        }
        this.proSelected[string] = value[string];
        return true;
      } else if (string === "Details") {
        if (value[string]) {
          if (!REGEX.VietNameseDetail.test(value[string])) {
            this.form.setFields({
              [string]: {
                value: value[string],
                errors: [new Error(`${string} must be Vietnamese characters`)],
              },
            });
            return false;
          }
        }
        this.proSelected[string] = value[string];
        return true;
      } else if (string === "MaxDecrease") {
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
            Number(value[string]) > 1000000 ||
            Number(value[string]) < 1
          ) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 1,000,000`
                  ),
                ],
              },
            });
            return false;
          }
        }
        this.proSelected[string] = Number(value[string]);
        return true;
      } else if (string === "TotalUsage") {
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
            Number(value[string]) > 1000000 ||
            Number(value[string]) < 1
          ) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 1,000,000`
                  ),
                ],
              },
            });
            return false;
          }
        }
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = value[string]
          ? Number(value[string])
          : "";
        return true;
      } else if (string === "UsagePerUser") {
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
          } else if (Number(value[string]) > 50 || Number(value[string]) < 1) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 50`
                  ),
                ],
              },
            });
            return false;
          }
        }
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = value[string]
          ? Number(value[string])
          : "";
        return true;
      } else if (string === "ValidFrom") {
        if (this.isCreate) {
          if (this.ValidFrom) {
            if (this.ValidFrom.isBefore(moment(), "day")) {
              this.isValidFrom = false;
              this.messageValidFrom =
                "Valid from must be greater or equal today";
              return false;
            }
          }
        }
        this.isValidFrom = true;
        this.messageValidFrom = "";
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = this.ValidFrom
          ? moment(this.ValidFrom).format("DD-MM-YYYY HH:mm:ss")
          : "";
        return true;
      } else if (string === "ValidUntil") {
        if (this.isCreate) {
          if (this.ValidUntil) {
            if (this.ValidFrom) {
              if (this.ValidUntil.isSameOrBefore(this.ValidFrom)) {
                this.isValidUntil = false;
                this.messageValidUntil =
                  "Valid until must be greater than valid from";
                return false;
              }
            } else if (this.ValidUntil.isBefore(moment(), "day")) {
              this.isValidUntil = false;
              this.messageValidUntil =
                "Valid until must be greater or equal today";
              return false;
            }
          }
        }
        this.isValidUntil = true;
        this.messageValidUntil = "";
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = this.ValidUntil
          ? moment(this.ValidUntil).format("DD-MM-YYYY HH:mm:ss")
          : "";
        return true;
      } else if (string === "Type") {
        this.proSelected[string] = value[string];
        return true;
      } else if (string === "MinTotalPrice") {
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
            Number(value[string]) > 5000000 ||
            Number(value[string]) < 1
          ) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 5,000,000`
                  ),
                ],
              },
            });
            return false;
          }
        }
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = value[string]
          ? Number(value[string])
          : "";
        return true;
      } else if (string === "MinTickets") {
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
            Number(value[string]) > 200000 ||
            Number(value[string]) < 1
          ) {
            this.form.setFields({
              [string]: {
                value: Number(value[string]),
                errors: [
                  new Error(
                    `${string
                      .replace(/([A-Z])/g, " $1")
                      .trim()} must be between 1 and 200,000`
                  ),
                ],
              },
            });
            return false;
          }
        }
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = value[string]
          ? Number(value[string])
          : "";
        return true;
      } else if (string === "PaymentMethods") {
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = Number(value[string]);
        return true;
      } else if (string === "VehicleTypes") {
        if (!this.proSelected["PromotionCondition"]) {
          this.proSelected["PromotionCondition"] = {};
        }
        this.proSelected["PromotionCondition"][string] = Number(value[string]);
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
    },
  },
  mounted() {
    this.getPromotion();
  },
};
</script>

<style lang="scss">
.promotion {
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
