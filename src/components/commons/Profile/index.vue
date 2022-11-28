<template>
  <div class="wapperContent__right">
    <a-form :form="form" @submit="handleSubmit">
      <a-row :gutter="[24, 8]">
        <a-col :span="12"
          ><a-form-item label="Name">
            <a-input
              allowClear
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
                  initialValue: user.Name,
                },
              ]"
              @blur="handleChangeName"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item label="Email">
            <a-input
              allowClear
              placeholder="Fullname"
              type="email"
              v-decorator="[
                'Gmail',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Email!',
                    },
                  ],
                  initialValue: user.Gmail,
                },
              ]"
              @blur="handleChangeEmail"
            /> </a-form-item
        ></a-col>
      </a-row>
      <a-row :gutter="[24, 8]">
        <a-col :span="6"
          ><a-form-item label="Phone">
            <a-input
              allowClear
              placeholder="Phone"
              addon-before="+84"
              v-decorator="[
                'PhoneNumber',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Phone!',
                    },
                  ],
                  initialValue: user.PhoneNumber?.replace('+84', ''),
                },
              ]"
              @blur="handleChangePhone"
            /> </a-form-item
        ></a-col>
        <a-col :span="6"
          ><a-form-item
            label="Birthdate"
            :validate-status="isBirthdateValid ? 'validating' : 'error'"
            :help="messageBirthdateValid"
          >
            <a-date-picker
              style="width: 100%"
              v-model="birthDate"
              @change="handleChangeBirthdate"
            /> </a-form-item
        ></a-col>
        <a-col :span="6"
          ><a-form-item label="Gender">
            <a-radio-group
              @change="handleChangeGender"
              :options="options"
              v-decorator="[
                'Gender',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select Gender!',
                    },
                  ],
                  initialValue: user.Gender,
                },
              ]"
            /> </a-form-item
        ></a-col>
        <a-col :span="6">
          <a-form-item label="Status">
            <a-select
              style="width: 100%"
              @change="handleChangeStatus"
              v-decorator="[
                'Status',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select Status!',
                    },
                  ],
                  initialValue: user.Status,
                },
              ]"
            >
              <a-select-option
                v-if="
                  user.Status === 1 ||
                  user.Status === 0 ||
                  user.Status === 2 ||
                  user.Status === 3
                "
                :value="1"
              >
                Active
              </a-select-option>
              <a-select-option
                v-if="user.Status === 1 || user.Status === 0"
                :value="0"
              >
                Blocked
              </a-select-option>
              <a-select-option
                v-if="user.Status === 2 || user.Status === 3"
                :value="2"
              >
                Pending
              </a-select-option>
              <a-select-option
                v-if="user.Status === 2 || user.Status === 3"
                :value="3"
              >
                Reject
              </a-select-option>
            </a-select>
          </a-form-item></a-col
        >
      </a-row>

      <a-row :gutter="[24, 8]">
        <a-col :span="6">
          <a-form-item label="Vehicle Name">
            <a-input
              allowClear
              placeholder="Vehicle Name"
              v-decorator="[
                'VehicleName',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Vehicle Name!',
                    },
                  ],
                  initialValue: user.Vehicle?.Name,
                },
              ]"
              @blur="handleChangeVehicleName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="License Plate">
            <a-input
              allowClear
              placeholder="License Plate ex: 51B.000.04"
              v-decorator="[
                'LicensePlate',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input License Plate!',
                    },
                  ],
                  initialValue: user.Vehicle?.LicensePlate,
                },
              ]"
              @blur="handleChangeLicensePlate"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Vehicle Type">
            <a-select
              style="width: 100%"
              @change="e => handleChangeVehicleType(e)"
              v-decorator="[
                'VehicleTypeId',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please Select Vehicle Type!',
                    },
                  ],
                  initialValue: user.Vehicle?.VehicleTypeId,
                },
              ]"
            >
              <a-select-option
                :value="veh.Id"
                :key="veh.Id"
                v-for="veh in listVehicle"
              >
                {{ veh?.Name?.replace("-", " ") }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <div style="display: flex; justify-content: flex-end">
        <a-button icon="save" key="submit" type="primary" html-type="submit">
          Save
        </a-button>
      </div> -->
    </a-form>
  </div>
</template>

<script>
// import ButtonVue from "@/components/commons/Button";
import { REGEX } from "@/constants/regex";
import moment from "moment";
import { STATUS_DRIVER } from "@/constants/status";

const options = [
  { label: "Female", value: 0 },
  { label: "Male", value: 1 },
];

export default {
  name: "ProfileVue",
  components: {
    // ButtonVue,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    handleChangeValue: {
      type: Function,
      default: () => {},
    },
    handleClickButton: {
      type: Function,
      default: () => {},
    },
    handleUpdateUser: {
      type: Function,
      default: () => {},
    },
    handleChangeValueVehicle: {
      type: Function,
      default: () => {},
    },
    listVehicle: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options,
      form: this.$form.createForm(this, { name: "profile" }),
      isBirthdateValid: true,
      messageBirthdateValid: "",
      birthDate: moment(this.user?.DateOfBirth)
        ? moment(this.user?.DateOfBirth)
        : null,
      STATUS_DRIVER,
    };
  },
  watch: {
    user() {
      this.birthDate = moment(this.user?.DateOfBirth)
        ? moment(this.user?.DateOfBirth)
        : null;
    },
  },
  methods: {
    handleChange(e, position) {
      if (position === "DateOfBirth") {
        this.handleChangeValue(moment(e).toISOString(), position);
      } else if (position === "Status") {
        this.handleChangeValue(e, position);
      } else {
        this.handleChangeValue(e.target.value, position);
      }
    },
    handleChangeStatus(value) {
      this.handleChangeValue(value, "Status");
    },
    handleChangeGender(e) {
      this.handleChangeValue(e.target.value, "Gender");
    },
    handleSubmit() {
      // e.preventDefault();
      if (
        this.handleChangeBirthdate(this.birthDate) &&
        this.handleChangeName() &&
        this.handleChangePhone() &&
        this.handleChangeEmail()
      ) {
        // this.handleUpdateUser();
        return true;
      } else {
        return false;
        // console.log("not ok");
      }
    },
    handleChangeName() {
      const nameUser = this.form.getFieldsValue(["Name"]);
      if (nameUser.Name) {
        if (!REGEX.VietNamese.test(nameUser.Name)) {
          this.form.setFields({
            Name: {
              value: nameUser.Name,
              errors: [
                new Error(
                  "Name must be in Vietnamese and not contain special characters"
                ),
              ],
            },
          });
          return false;
        }
      }
      this.handleChangeValue(nameUser.Name, "Name");
      return true;
    },
    handleChangePhone() {
      const phoneUser = this.form.getFieldsValue(["PhoneNumber"]);
      if (phoneUser.PhoneNumber) {
        if (!REGEX.Phone.test(phoneUser.PhoneNumber)) {
          this.form.setFields({
            PhoneNumber: {
              value: phoneUser.PhoneNumber,
              errors: [new Error("Please check phone again!")],
            },
          });
          return false;
        } else if (
          (phoneUser.PhoneNumber.length === 10 &&
            phoneUser.PhoneNumber[0] !== "0") ||
          (phoneUser.PhoneNumber.length < 10 &&
            phoneUser.PhoneNumber[0] === "0")
        ) {
          this.form.setFields({
            PhoneNumber: {
              value: phoneUser.PhoneNumber,
              errors: [new Error("Please check phone again!")],
            },
          });
          return false;
        }
      }
      this.handleChangeValue(phoneUser.PhoneNumber, "PhoneNumber");
      return true;
    },
    handleChangeEmail() {
      const emailUser = this.form.getFieldsValue(["Gmail"]);
      if (emailUser.Gmail) {
        if (!REGEX.Email.test(emailUser.Gmail)) {
          this.form.setFields({
            Gmail: {
              value: emailUser.Gmail,
              errors: [new Error("Please check email again!")],
            },
          });
          return false;
        }
      }
      this.handleChangeValue(emailUser.Gmail, "Gmail");
      return true;
    },
    handleChangeBirthdate(e) {
      if (e) {
        this.birthDate = e;
        if (moment().diff(e, "years") < 18) {
          this.isBirthdateValid = false;
          this.messageBirthdateValid = "Please select birthdate lager than 18!";
          return false;
        } else {
          this.isBirthdateValid = true;
          this.messageBirthdateValid = "";
          this.handleChangeValue(
            moment(this.birthDate).toISOString(),
            "DateOfBirth"
          );
          return true;
        }
      } else {
        this.isBirthdateValid = false;
        this.messageBirthdateValid = "Please select birthdate!";
        return false;
      }
    },
    handleChangeVehicleName() {
      const nameVeh = this.form.getFieldsValue(["VehicleName"]);
      if (nameVeh.VehicleName) {
        if (!REGEX.VietNamese.test(nameVeh.VehicleName)) {
          this.form.setFields({
            VehicleName: {
              value: nameVeh.VehicleName,
              errors: [new Error("Name can't contain special characters")],
            },
          });
          return false;
        }
      }
      this.handleChangeValueVehicle(nameVeh.VehicleName, "Name");
      return true;
    },
    handleChangeLicensePlate() {
      const plateVeh = this.form.getFieldsValue(["LicensePlate"]);
      if (plateVeh.LicensePlate) {
        if (!REGEX.Plate.test(plateVeh.LicensePlate)) {
          this.form.setFields({
            LicensePlate: {
              value: plateVeh.LicensePlate,
              errors: [new Error("License Plate invalid. Please check aagin!")],
            },
          });
          return false;
        }
      }
      this.handleChangeValueVehicle(plateVeh.LicensePlate, "LicensePlate");
      return true;
    },
    handleChangeVehicleType(e) {
      // const vehId = this.form.getFieldsValue(["VehicleTypeId"]);
      // console.log(vehId.VehicleTypeId);
      this.handleChangeValueVehicle(e, "VehicleTypeId");
      return true;
    },
  },
};
</script>
