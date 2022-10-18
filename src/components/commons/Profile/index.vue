<template>
  <div class="wapperContent__right">
    <div class="right__box">
      <div class="box__content">
        <div class="box__content__fullname">
          <a-form-item label="Name">
            <a-input
              allowClear
              placeholder="Name"
              v-model="name"
              @change="e => handleChange(e, 'Name')"
            />
          </a-form-item>
        </div>
        <div class="box__content__phone">
          <a-form-item label="Phone">
            <a-input
              allowClear
              placeholder="Phone"
              v-model="phone"
              addon-before="+84"
              @change="e => handleChange(e, 'Phone')"
            />
          </a-form-item>
        </div>
      </div>
    </div>
    <!-- email and birthdate -->
    <div class="right__box">
      <div class="box__content">
        <div class="box__content__email">
          <a-form-item label="Email">
            <a-input
              allowClear
              placeholder="Fullname"
              v-model="email"
              type="email"
              @change="e => handleChange(e, 'Gmail')"
            />
          </a-form-item>
        </div>
        <div class="box__content__birthdate">
          <a-form-item label="Birthdate">
            <a-date-picker
              v-model="dateOfBirth"
              @change="date => handleChange(date, 'DateOfBirth')"
            />
          </a-form-item>
        </div>
      </div>
    </div>
    <!-- status and gender -->
    <div class="right__box">
      <div class="box__more">
        <a-form-item label="Gender">
          <a-radio-group
            v-model="gender"
            :options="options"
            @change="e => handleChange(e, 'Gender')"
          />
        </a-form-item>
        <a-form-item label="Status">
          <a-select
            v-model="status"
            style="width: 120px"
            @change="e => handleChange(e, 'Status')"
          >
            <a-select-option :value="1"> Working </a-select-option>
            <a-select-option :value="0"> Blocked </a-select-option>
          </a-select>
        </a-form-item>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end">
      <ButtonVue iconHeader="save" titleButton="Save" />
    </div>
  </div>
</template>

<script>
import ButtonVue from "@/components/commons/Button";
import moment from "moment";
const options = [
  { label: "Female", value: 0 },
  { label: "Male", value: 1 },
];
export default {
  name: "ProfileVue",
  components: {
    ButtonVue,
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
  },
  data() {
    return {
      options,
      name: this.user?.Name,
      phone: this.user?.Phone,
      email: this.user?.Gmail,
      dateOfBirth: moment(this.user?.DateOfBirth, "YYYY-MM-DD"),
      gender: this.user?.Gender,
      status: this.user?.Status,
    };
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
      console.log(`selected ${value}`);
    },
  },
};
</script>
