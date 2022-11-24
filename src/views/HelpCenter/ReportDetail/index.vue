<template>
  <div style="margin-bottom: 50px">
    <HeaderBack />
    <p
      style="
        font-size: 20px;
        font-weight: 500;
        margin-top: 25px;
        margin-left: 100px;
      "
    >
      Report
    </p>
    <div class="containerReportDetail">
      <div style="width: 100%">
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Code</span>
          </a-col>
          <a-col :span="16">
            <span>{{ reportInfo?.Code }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Title</span>
          </a-col>
          <a-col :span="16">
            <span>{{ reportInfo?.Title }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Content</span>
          </a-col>
          <a-col :span="16">
            <span>{{ reportInfo?.Content }}</span>
          </a-col>
        </a-row>
      </div>
      <div style="width: 100%">
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Date report</span>
          </a-col>
          <a-col :span="16">
            <span>{{ getDateTime }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px; display: flex; align-items: center">
          <a-col :span="8">
            <span class="labelDetail">Status</span>
          </a-col>
          <a-col :span="16">
            <a-tag :color="STATUS_REPORT[reportInfo?.Status]?.color">
              {{ STATUS_REPORT[reportInfo?.Status]?.status }}
            </a-tag>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px" v-if="reportInfo?.Status !== 1">
          <a-col :span="8">
            <span class="labelDetail">Process by Admin</span>
          </a-col>
          <a-col :span="16">
            <span>{{ reportInfo?.UpdatedAdmin?.Name }}</span>
          </a-col>
        </a-row>
      </div>
    </div>
    <div style="margin: 0 100px; width: calc(100% - 200px)">
      <a-divider />
    </div>
    <p style="font-size: 20px; font-weight: 500; margin-left: 100px">User</p>
    <div class="containerUserReport">
      <BoxUser :user="user" :isDriver="false" />
      <BoxUser
        v-if="report?.Driver"
        :user="report?.Driver"
        :isDriver="true"
        :loading="getLoadingDataReport"
      />
      <div v-else style="width: 100%"></div>
    </div>
    <div style="margin: 0 100px; width: calc(100% - 200px)">
      <a-divider />
    </div>
    <div class="containerReportDetail">
      <div style="width: 100%">
        <p style="font-size: 20px; font-weight: 500; margin-bottom: 25px">
          Booking
        </p>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Code</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.BookingCode }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Type</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.BookingType }}</span>
          </a-col>
        </a-row>
        <a-divider />
        <p style="font-size: 20px; font-weight: 500; margin-bottom: 25px">
          Booking Detail
        </p>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Code</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.Code }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px; display: flex; align-items: center">
          <a-col :span="8">
            <span class="labelDetail">Status</span>
          </a-col>
          <a-col :span="16">
            <!-- <span>{{ report?.Status }}</span> -->
            <a-tag :color="STATUS_BOOKING_DETAIL[report?.Status]?.color">
              {{ STATUS_BOOKING_DETAIL[report?.Status]?.status }}
            </a-tag>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Date</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.Date }}</span>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Time</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.Time }}</span>
          </a-col>
        </a-row>
        <a-divider />
        <p
          v-if="report?.Driver"
          style="font-size: 20px; font-weight: 500; margin-bottom: 25px"
        >
          Booking Detail Driver
        </p>
        <a-row
          v-if="report?.Driver"
          style="margin-bottom: 15px; display: flex; align-items: center"
        >
          <a-col :span="8">
            <span class="labelDetail">Code</span>
          </a-col>
          <a-col :span="16">
            <span>{{ report?.Driver?.BookingDetailDriverCode }}</span>
          </a-col>
        </a-row>
        <a-row v-if="report?.Driver" style="margin-bottom: 15px">
          <a-col :span="8">
            <span class="labelDetail">Status</span>
          </a-col>
          <a-col :span="12">
            <a-tag
              :color="
                STATUS_BOOKING_DETAIL_DRIVER[report?.Driver?.TripStatus]?.color
              "
            >
              {{
                STATUS_BOOKING_DETAIL_DRIVER[report?.Driver?.TripStatus]?.status
              }}
            </a-tag>
          </a-col>
        </a-row>
        <div v-if="report?.Driver" style="height: 80px"></div>
      </div>
      <div style="width: 100%; height: 100px">
        <div style="margin-left: 20px">
          <p style="font-size: 20px; font-weight: 500; margin-bottom: 25px">
            Pick up - Drop off Location
          </p>
          <BoxAdress :startStation="startStation" :endStation="endStation" />
          <p
            style="
              font-size: 20px;
              font-weight: 500;
              margin-bottom: 25px;
              margin-top: 25px;
            "
          >
            Payment
          </p>
          <a-row style="margin-bottom: 15px">
            <a-col :span="8">
              <span class="labelDetail">Price</span>
            </a-col>
            <a-col :span="16">
              <span>{{ getPrice }} VND</span>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 15px">
            <a-col :span="8">
              <span class="labelDetail">Discount</span>
            </a-col>
            <a-col :span="16">
              <span>{{ getDiscountPrice }} VND</span>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 15px">
            <a-col :span="8">
              <span
                class="labelDetail"
                style="font-weight: 500; font-size: 18px"
                >Total</span
              >
            </a-col>
            <a-col :span="16">
              <span style="font-weight: 500; font-size: 18px"
                >{{ getTotal }} VND</span
              >
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div
      v-if="reportInfo?.Status === 1"
      style="margin: 0 100px; width: calc(100% - 200px)"
    >
      <a-divider />
    </div>
    <div v-if="reportInfo?.Status === 1" class="containerReportDetailHandle">
      <div style="display: flex; gap: 20px">
        <a-button type="danger" icon="close" @click="handleDeny">
          Deny
        </a-button>
        <a-button type="primary" icon="check" @click="handleProcess">
          Process
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBack from "@/components/commons/HeaderBack";
import BoxUser from "@/components/commons/BoxUser";
import { mapActions, mapGetters } from "vuex";
import {
  STATUS_BOOKING_DETAIL,
  STATUS_BOOKING_DETAIL_DRIVER,
  STATUS_REPORT,
} from "@/constants/status";
import BoxAdress from "@/components/commons/BoxAdress";
import { numberWithCommas } from "@/utils/numberWithCommas";
import moment from "moment";
import reportService from "@/services/report";
import { notification } from "@/utils/notification";

export default {
  name: "ReportDetail",
  components: {
    HeaderBack,
    BoxUser,
    BoxAdress,
  },
  data() {
    return {
      user: {},
      report: {},
      STATUS_BOOKING_DETAIL,
      STATUS_BOOKING_DETAIL_DRIVER,
      STATUS_REPORT,
      startStation: {},
      endStation: {},
      reportInfo: {},
    };
  },
  computed: {
    ...mapGetters({
      getLoadingDataReport: "report/getLoadingDataReport",
    }),
    getPrice() {
      return numberWithCommas(this.report?.Price);
    },
    getDiscountPrice() {
      return numberWithCommas(this.report?.DiscountPrice);
    },
    getTotal() {
      return numberWithCommas(this.report?.Price - this.report?.DiscountPrice);
    },
    getDateTime() {
      return moment(this.reportInfo?.DateTime).format("DD-MM-YYYY HH:mm:ss");
    },
  },
  methods: {
    ...mapActions({
      getDataReport: "report/getDataReport",
    }),
    handleDeny() {
      this.$confirm({
        okText: "Yes",
        cancelText: "No",
        title: "Are you sure you want to deny this report?",
        content: "",
        onOk: async () => {
          try {
            const res = await reportService.updateReport(
              this.reportInfo.Code,
              STATUS_REPORT["ProcessingDenied"]
            );
            if (res.StatusCode === 200) {
              notification(this, "success", `Deny report successfully`, "");
              this.$router.push("/help");
            } else {
              notification(this, "error", res.Message, "");
            }
          } catch (error) {
            notification(this, "error", error, "");
          }
        },
        onCancel() {},
      });
    },
    handleProcess() {
      this.$confirm({
        okText: "Yes",
        cancelText: "No",
        title: "Are you sure you want to process this report?",
        content: "",
        onOk: async () => {
          try {
            const res = await reportService.updateReport(
              this.reportInfo.Code,
              STATUS_REPORT["Processed"]
            );
            if (res.StatusCode === 200) {
              notification(
                this,
                "success",
                `Processed report successfully`,
                ""
              );
              this.$router.push("/help");
            } else {
              notification(this, "error", res.Message, "");
            }
          } catch (error) {
            notification(this, "error", error, "");
          }
        },
        onCancel() {},
      });
    },
  },
  async mounted() {
    const res = await this.getDataReport(this.$route.params.code);
    if (res.Data) {
      this.report = res.Data.Data;
      this.user = res.Data.User;
      this.startStation = res.Data.Data.StartStation;
      this.endStation = res.Data.Data.EndStation;
      this.reportInfo = res.Data;
    }
  },
};
</script>

<style lang="scss">
.containerUserReport {
  display: flex;
  justify-content: space-between;
  gap: 100px;
  margin: 20px 100px 0;
}
.containerReportDetail {
  display: flex;
  justify-content: space-between;
  gap: 80px;
  margin: 20px 100px 0;
}
.containerReportDetailHandle {
  display: flex;
  justify-content: flex-end;
  gap: 80px;
  margin: 20px 100px 0;
}
.labelDetail {
  &::after {
    content: ":";
    position: relative;
    top: -0.5px;
    margin: 0 8px 0 2px;
  }
}
</style>
