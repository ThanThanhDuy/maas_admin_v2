<template>
  <div style="margin-bottom: 10px">
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="12" style="display: flex; align-items: center">
          <p class="label_require ant-form-item-label">
            {{ item.Key.replace(/([A-Z])/g, " $1").trim() }}
          </p>
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>{{ unit }}</span>
            </template>
            <a-icon type="question-circle" />
          </a-tooltip>
        </a-col>
        <a-col :span="6">
          <a-form-item style="position: relative">
            <a-input-number
              v-if="type === 1"
              style="width: 100%"
              v-decorator="[
                item.Id.toString(),
                {
                  rules: [{ required: true, message: `Please input!` }],
                  initialValue: Number(item.Value),
                },
              ]"
              :addonAfter="unit"
            />
            <a-input-number
              v-if="type === 2"
              style="width: 100%"
              v-decorator="[
                item.Id.toString(),
                {
                  rules: [{ required: true, message: `Please input!` }],
                  initialValue:
                    unit === '%'
                      ? Number(item.Value) * 100
                      : Number(item.Value),
                },
              ]"
              :addonAfter="unit"
            />
            <a-time-picker
              v-if="type === 3"
              style="width: 100%"
              format="HH:mm"
              v-decorator="[
                item.Id.toString(),
                {
                  initialValue: moment(item.Value, 'HH:mm'),
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="1" style="margin: 0 20px 0 10px">
          <p class="ant-form-item-label">
            {{ unit }}
          </p>
        </a-col>
        <a-col :span="2" style="margin-left: 20px">
          <a-form-item>
            <a-button icon="save" type="primary" html-type="submit"> </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import moment from "moment";
import { notification } from "@/utils/notification";
import settingService from "@/services/setting";

export default {
  name: "TabInput",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    type: {
      type: Number,
    },
    unit: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      moment,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.$confirm({
            okText: "Yes",
            cancelText: "No",
            title: `Do you want to save change?`,
            content: "",
            onOk: async () => {
              let value = "";
              if (this.type === 3) {
                value = moment(values[this.item.Id.toString()])
                  .format("HH:mm")
                  .concat(":00");
              } else {
                if (this.unit === "%") {
                  value = values[this.item.Id.toString()] / 100;
                } else {
                  value = values[this.item.Id.toString()];
                }
              }
              const res = await settingService.updateSetting(
                this.item.Id,
                value.toString()
              );
              console.log("hi", res);
              if (res && res.StatusCode === 200) {
                notification(
                  this,
                  "success",
                  `Update ${this.item.Key.replace(
                    /([A-Z])/g,
                    " $1"
                  ).trim()} successfully!`,
                  ""
                );
              } else {
                notification(
                  this,
                  "error",
                  `Update ${this.item.Key.replace(
                    /([A-Z])/g,
                    " $1"
                  ).trim()} failed!`,
                  JSON.parse(res.Message)[this.item.Key]
                );
              }
            },
            onCancel() {},
          });
        }
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "setting" });
  },
};
</script>

<style lang="scss">
.label_require {
  &::after {
    content: ":";
    position: relative;
    top: -0.5px;
    margin: 0 8px 0 2px;
  }
}
</style>
