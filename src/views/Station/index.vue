<template>
  <div class="station">
    <HeaderPage
      :title="title"
      :searchValue="searchValue"
      :placeholder="placeholder"
      :onClickButton="onClickButton"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div style="margin-top: 40px">
      <TableVue
        :header="HEADER_STATION"
        :data="getStation"
        :isLoading="getLoading"
        :rowSelect="rowSelect"
        :pagination="getPagination"
        :handleTableChange="handleTableChange"
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
      <a-form :form="form" @submit="handleSubmit">
        <div>
          <div>
            <a-form-item label="Name">
              <a-textarea
                :maxLength="256"
                v-decorator="[
                  'Name',
                  {
                    rules: [
                      { required: true, message: 'Please input Name Station!' },
                    ],
                  },
                ]"
                :auto-size="{ minRows: 1, maxRows: 2 }"
                @blur="handleBlurNameStation"
              />
            </a-form-item>
          </div>
          <div>
            <div>
              <p class="label_require ant-form-item-label">Address</p>
            </div>
            <div class="containerAddress_station">
              <a-form-item>
                <a-select
                  show-search
                  placeholder="Select a Province"
                  option-filter-prop="children"
                  style="width: 200px"
                  :filter-option="filterOptionProvince"
                  @change="handleChangeProvince"
                  v-decorator="[
                    'Province',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select Province!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="province in provinces"
                    :value="province.code"
                    :key="province.code"
                  >
                    {{ province.name_with_type }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                  show-search
                  placeholder="Select a District"
                  option-filter-prop="children"
                  style="width: 200px"
                  :filter-option="filterOptionDistrict"
                  @change="handleChangeDistrict"
                  v-decorator="[
                    'District',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select District!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="district in districts"
                    :value="district.code"
                    :key="district.code"
                  >
                    {{ district.name_with_type }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-select
                  show-search
                  placeholder="Select a Ward"
                  option-filter-prop="children"
                  style="width: 200px"
                  :filter-option="filterOptionWard"
                  @change="handleChangeWard"
                  v-decorator="[
                    'Ward',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please select Ward!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="ward in wards"
                    :value="ward.code"
                    :key="ward.code"
                  >
                    {{ ward.name_with_type }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div style="margin-top: 10px">
              <a-form-item>
                <a-textarea
                  placeholder="Street"
                  :auto-size="{ minRows: 2, maxRows: 2 }"
                  :maxLength="256"
                  v-decorator="[
                    'Street',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Street!',
                        },
                      ],
                    },
                  ]"
                  @change="handleChangeStreet"
                  @blur="handleBlurStreet"
                />
              </a-form-item>
            </div>
            <p style="margin-top: 10px">
              <a-icon type="environment" />
              {{ street }}{{ street ? ", " : "" }}{{ textWard
              }}{{ textWard ? ", " : "" }}{{ textDistrict
              }}{{ textDistrict ? ", " : "" }}{{ textProvince }}
            </p>
          </div>
          <a-row>
            <div>
              <p class="label_require ant-form-item-label">Location</p>
            </div>
            <a-col :span="10">
              <a-form-item>
                <a-input
                  placeholder="Longitude"
                  v-decorator="[
                    'Longitude',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Longitude!',
                        },
                      ],
                    },
                  ]"
                  @blur="handleBlurLongitude"
                /> </a-form-item
            ></a-col>
            <a-col :span="2"></a-col>
            <a-col :span="10">
              <a-form-item>
                <a-input
                  placeholder="Latitude"
                  v-decorator="[
                    'Latitude',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input Latitude!',
                        },
                      ],
                    },
                  ]"
                  @blur="handleBlurLatitude"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <div v-if="!isCreate">
            <p class="label_require ant-form-item-label">Status</p>
          </div>
          <a-form-item v-if="!isCreate">
            <a-radio-group
              v-decorator="[
                'Status',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select Status!',
                    },
                  ],
                },
              ]"
            >
              <a-radio value="1">Active</a-radio>
              <a-radio value="0">Inactive</a-radio>
            </a-radio-group>
          </a-form-item>
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
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import HeaderPage from "@/components/commonsPage/Header";
import { REGEX } from "@/constants/regex";
import { mapActions, mapGetters } from "vuex";
import TableVue from "@/components/commons/Table";
import { HEADER_STATION } from "@/constants/table/header";
import stationService from "@/services/station";
import { notification } from "@/utils/notification";

export default {
  name: "StationVue",
  components: {
    HeaderPage,
    TableVue,
  },
  data() {
    return {
      title: "Station",
      placeholder: "Search station",
      titleButton: "Create station",
      iconHeader: "plus",
      visible: false,
      provinces: [],
      districts: [],
      wards: [],
      textProvince: undefined,
      textDistrict: undefined,
      textWard: undefined,
      street: "",
      nameStation: "",
      form: this.$form.createForm(this, { name: "station" }),
      REGEX,
      HEADER_STATION,
      recordSelected: {},
      isCreate: false,
      pageSize: 8,
      currentPage: 1,
      total: 0,
      pagi: {},
      valueSearch: "",
    };
  },
  computed: {
    ...mapGetters({
      getStation: "station/listStation",
      getLoading: "station/getLoading",
      getPagination: "station/getPagination",
    }),
  },
  methods: {
    ...mapActions({
      getStationPaging: "station/getStationPaging",
    }),
    async searchValue(value) {
      this.valueSearch = value;
      const res = await this.getStationPaging({
        search: value,
        page: 1,
        pageSize: 8,
        loading: true,
      });
      this.pagi = {
        total: res.Data.TotalItemsCount,
        current: res.Data.Page,
        pageSize: res.Data.PageSize,
      };
    },
    onClickButton() {
      this.isCreate = true;
      this.showModal();
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      let allField = this.form.getFieldsValue();
      if (this.isCreate) {
        if (
          allField.Name ||
          allField.District ||
          allField.Ward ||
          allField.Street ||
          allField.Longitude ||
          allField.Latitude
        ) {
          this.$confirm({
            title: "Do you want to close this form?",
            content:
              "This form has been changed. If you close this form, your changes will not be saved.",
            onOk: () => {
              this.resetField();
              this.visible = false;
              this.isCreate = false;
            },
            onCancel() {},
          });
        } else {
          this.resetField();
          this.visible = false;
          setTimeout(() => {
            this.isCreate = false;
          }, 500);
        }
      } else {
        console.log();
        if (
          allField.Name !== this.recordSelected.Name ||
          allField.Province !== this.recordSelected.Province ||
          allField.District !== this.recordSelected.District ||
          allField.Ward !== this.recordSelected.Ward ||
          allField.Street !== this.recordSelected.Street ||
          allField.Longitude !== this.recordSelected.Longitude ||
          allField.Latitude !== this.recordSelected.Latitude ||
          Number(allField.Status) !== this.recordSelected.Status
        ) {
          this.$confirm({
            title: "Do you want to close this form?",
            content:
              "This form has been changed. If you close this form, your changes will not be saved.",
            onOk: () => {
              this.resetField();
              this.visible = false;
              this.isCreate = false;
            },
            onCancel() {},
          });
        } else {
          this.resetField();
          this.visible = false;
          setTimeout(() => {
            this.isCreate = false;
          }, 500);
        }
      }
    },
    handleChangeProvince(value) {
      const readDistrict = require(`@/hanhchinhvn/quan-huyen/${value}.json`);
      const district = Object.entries(readDistrict).map(item => item[1]);
      this.districts = district.sort((a, b) =>
        a.name_with_type.localeCompare(b.name_with_type, "vi")
      );
      this.textProvince = this.provinces.find(
        item => item.code === value
      ).name_with_type;
      this.textDistrict = undefined;
      this.form.setFieldsValue({
        District: undefined,
      });
      this.textWard = undefined;
      this.form.setFieldsValue({
        Ward: undefined,
      });
    },
    filterOptionProvince(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeDistrict(value) {
      const readWard = require(`@/hanhchinhvn/xa-phuong/${value}.json`);
      const ward = Object.entries(readWard).map(item => item[1]);
      this.wards = ward.sort((a, b) =>
        a.name_with_type.localeCompare(b.name_with_type, "vi")
      );
      this.textDistrict = this.districts.find(
        item => item.code === value
      ).name_with_type;
      this.textWard = undefined;
      this.form.setFieldsValue({
        Ward: undefined,
      });
    },
    filterOptionDistrict(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeWard(value) {
      this.textWard = this.wards.find(
        item => item.code === value
      ).name_with_type;
    },
    filterOptionWard(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$confirm({
            okText: "Yes",
            cancelText: "No",
            title: `Do you want to ${
              this.isCreate ? "submit" : "save change"
            }?`,
            content: "",
            onOk: async () => {
              // this.visible = false;

              let params = {
                ...values,
                Province: this.textProvince,
                District: this.textDistrict,
                Ward: this.textWard,
                Street: this.street,
                StationStatus: Number(values.Status),
              };
              let res = null;
              if (this.isCreate) {
                res = await stationService.createStation(params);
              } else {
                res = await stationService.updateStation({
                  ...params,
                  Code: this.recordSelected.Code,
                  Address: `${this.street}, ${this.textWard}, ${this.textDistrict}, ${this.textProvince}`,
                });
              }
              if (res && res.StatusCode === 200) {
                notification(
                  this,
                  "success",
                  `${this.isCreate ? "Create" : "Update"} station successfully`,
                  ""
                );
                this.resetField();
                this.visible = false;
                this.isCreate = false;
                // this.getAllStation();
                this.getStationPaging({
                  search: this.valueSearch,
                  page: this.pagi.current,
                  pageSize: this.pagi.pageSize,
                  loading: true,
                });
              }
            },
            onCancel() {},
          });
        }
      });
    },
    handleChangeStreet(e) {
      this.street = e.target.value;
    },
    handleBlurLatitude() {
      const lat = this.form.getFieldsValue(["Latitude"]);
      if (lat) {
        if (!REGEX.LatLng.test(lat.Latitude)) {
          this.form.setFields({
            Latitude: {
              value: lat.Latitude,
              errors: [new Error("Please input Latitude right format!")],
            },
          });
        }
      }
    },
    handleBlurLongitude() {
      const lot = this.form.getFieldsValue(["Longitude"]);
      if (lot.Longitude) {
        if (!REGEX.LatLng.test(lot.Longitude)) {
          this.form.setFields({
            Longitude: {
              value: lot.Longitude,
              errors: [new Error("Please input Longitude right format!")],
            },
          });
        }
      }
    },
    handleBlurStreet() {
      const street = this.form.getFieldsValue(["Street"]);
      if (street.Street) {
        if (!REGEX.VietNamese.test(street.Street)) {
          this.form.setFields({
            Street: {
              value: street.Street,
              errors: [
                new Error(
                  "Please input Street right format! Remove special characters"
                ),
              ],
            },
          });
        }
      }
    },
    handleBlurNameStation() {
      const nameStation = this.form.getFieldsValue(["Name"]);
      if (nameStation.Name) {
        if (!REGEX.VietNamese.test(nameStation.Name)) {
          this.form.setFields({
            Name: {
              value: nameStation.Name,
              errors: [
                new Error(
                  "Please input Name Station right format! Remove special characters"
                ),
              ],
            },
          });
        }
      }
    },
    rowSelect(record) {
      this.visible = true;
      this.isCreate = false;
      let address = record.Address.split(", ");
      this.form.getFieldDecorator("Name", {
        initialValue: record.Name,
      });
      // province
      const readProvince = require("@/hanhchinhvn/tinh_tp.json");
      const province = Object.entries(readProvince).map(item => item[1]);
      let pro = province.find(item =>
        item.name_with_type.trim().includes(address[3].trim())
      );
      this.form.getFieldDecorator("Province", {
        initialValue: pro.code,
      });
      this.textProvince = pro.name_with_type;
      // district
      const readDistrict = require(`@/hanhchinhvn/quan-huyen/${pro.code}.json`);
      const district = Object.entries(readDistrict).map(item => item[1]);
      this.districts = district.sort((a, b) =>
        a.name_with_type.localeCompare(b.name_with_type, "vi")
      );
      let dis = district.find(item =>
        item.name_with_type.trim().includes(address[2].trim())
      );
      this.form.getFieldDecorator("District", {
        initialValue: dis.code,
      });
      this.textDistrict = dis.name_with_type;
      // ward
      const readWard = require(`@/hanhchinhvn/xa-phuong/${dis.code}.json`);
      const ward = Object.entries(readWard).map(item => item[1]);
      this.wards = ward.sort((a, b) =>
        a.name_with_type.localeCompare(b.name_with_type, "vi")
      );
      let codeWard = ward.find(item =>
        item.name_with_type.includes(address[1])
      ).code;
      this.form.getFieldDecorator("Ward", {
        initialValue: codeWard,
      });
      this.textWard = ward.find(item => item.code === codeWard).name_with_type;
      // street
      this.form.getFieldDecorator("Street", {
        initialValue: address[0],
      });
      this.street = address[0];
      // lat
      this.form.getFieldDecorator("Longitude", {
        initialValue: record.Longitude,
      });
      // lot
      this.form.getFieldDecorator("Latitude", {
        initialValue: record.Latitude,
      });
      // status
      this.form.getFieldDecorator("Status", {
        initialValue: record.Status.toString(),
      });
      this.recordSelected = {
        ...record,
        Province: pro.code,
        District: dis.code,
        Ward: codeWard,
        Street: address[0],
      };
    },
    resetField() {
      this.form.getFieldDecorator("Name", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Province", {
        initialValue: "79",
      });
      this.form.getFieldDecorator("District", {
        initialValue: undefined,
      });
      this.form.getFieldDecorator("Ward", {
        initialValue: undefined,
      });
      this.form.getFieldDecorator("Street", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Longitude", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Latitude", {
        initialValue: "",
      });
      this.form.getFieldDecorator("Status", {
        initialValue: 1,
      });
      this.textProvince = this.provinces.find(
        item => item.code === "79"
      ).name_with_type;
      // reset data to initial
      this.form.resetFields();
      this.textDistrict = "";
      this.textWard = "";
      this.street = "";
    },
    handleDelete() {
      this.$confirm({
        okText: "Yes",
        cancelText: "No",
        title: "Do you want to delete this station?",
        content: "",
        onOk: async () => {
          if (this.recordSelected) {
            console.log(this.recordSelected);
            const res = await stationService.deleteStation(
              this.recordSelected.Code
            );
            if (res && res.StatusCode === 200) {
              notification(this, "success", "Delete station successfully", "");
              this.resetField();
              this.visible = false;
              this.isCreate = false;
              // this.getAllStation();
              this.getStationPaging({
                search: this.valueSearch,
                page: this.pagi.current,
                pageSize: this.pagi.pageSize,
                loading: true,
              });
            }
          }
        },
        onCancel() {},
      });
    },
    handleTableChange(pagination) {
      this.pagi = pagination;
      this.getStationPaging({
        search: this.valueSearch,
        page: pagination.current,
        pageSize: pagination.pageSize,
        loading: true,
      });
    },
  },
  async mounted() {
    const res = await this.getStationPaging({
      search: this.valueSearch,
      page: 1,
      pageSize: 8,
      loading: true,
    });
    this.pagi = {
      total: res.Data.TotalItemsCount,
      current: res.Data.Page,
      pageSize: res.Data.PageSize,
    };
    const readProvince = require("@/hanhchinhvn/tinh_tp.json");
    const province = Object.entries(readProvince).map(item => item[1]);
    this.provinces = province.sort((a, b) =>
      a.name.localeCompare(b.name, "vi")
    );
    this.form.getFieldDecorator("Province", {
      initialValue: "79",
    });
    this.textProvince = this.provinces.find(
      item => item.code === "79"
    ).name_with_type;

    // district
    const readDistrict = require(`@/hanhchinhvn/quan-huyen/79.json`);
    const district = Object.entries(readDistrict).map(item => item[1]);
    this.districts = district.sort((a, b) =>
      a.name_with_type.localeCompare(b.name_with_type, "vi")
    );
  },
};
</script>

<style lang="scss">
.containerAddress_station {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.modalStation {
  .ant-form-item {
    margin-bottom: 0px;
  }
  .ant-form-item-label {
    line-height: 30px;
  }
  .label_require {
    margin-top: 20px;
    &::before {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*";
    }
    &::after {
      content: ":";
      position: relative;
      top: -0.5px;
      margin: 0 8px 0 2px;
    }
  }
}
</style>
