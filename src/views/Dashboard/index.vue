<template>
  <div>
    <HeaderPage
      :title="title"
      :isSearch="isSearch"
      :titleButton="titleButton"
      :iconHeader="iconHeader"
    />
    <div class="cotainerDashboard">
      <div>
        <a-row :gutter="16">
          <a-col :span="6">
            <div class="recData shadow">
              <p class="recData__budget">Budget</p>
              <div style="display: flex; justify-content: center">
                <ICountUp
                  style="font-size: 32px; font-weight: 500"
                  :delay="delay"
                  :endVal="getBudget ? getBudget : 0"
                />
                <span style="margin-left: 5px">VND</span>
              </div>
              <div class="recData__budget__line"></div>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="recData shadow">
              <p class="recData__totalbooking">Total Booking</p>
              <div style="display: flex; justify-content: center">
                <ICountUp
                  style="font-size: 32px; font-weight: 500"
                  :delay="delay"
                  :endVal="getTotalBooking"
                />
                <span style="margin-left: 5px">{{
                  getTotalBooking > 1 ? "Trips" : "Trip"
                }}</span>
              </div>
              <div class="recData__totalbooking__line"></div>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="recData shadow">
              <p class="recData__totalbookingcompleted">
                Total Booking Completed
              </p>
              <div style="display: flex; justify-content: center">
                <ICountUp
                  style="font-size: 32px; font-weight: 500"
                  :delay="delay"
                  :endVal="getTotalBookingCompleted"
                />
                <span style="margin-left: 5px">{{
                  getTotalBookingCompleted > 1 ? "Trips" : "Trip"
                }}</span>
              </div>
              <div class="recData__totalbookingcompleted__line"></div>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="recData shadow">
              <p class="recData__totalbookingcancelled">
                Total Booking Cancelled
              </p>
              <div style="display: flex; justify-content: center">
                <ICountUp
                  style="font-size: 32px; font-weight: 500"
                  :delay="delay"
                  :endVal="getTotalBookingCancelled"
                />
                <span style="margin-left: 5px">{{
                  getTotalBookingCancelled > 1 ? "Trips" : "Trip"
                }}</span>
              </div>
              <div class="recData__totalbookingcancelled__line"></div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="containerBoxChart">
        <div>
          <div style="width: 920px">
            <div style="margin: 0 25px 30px">
              <vue-horizontal responsive>
                <section
                  v-for="(das, index) in DASHBOARD"
                  :key="index"
                  @click="() => handleSelect(index)"
                >
                  <div v-if="selected === index" class="boxChart_active">
                    <span> {{ das }}</span>
                  </div>
                  <div v-else class="boxChart_inactive">
                    <span> {{ das }}</span>
                  </div>
                </section>
              </vue-horizontal>
            </div>
            <div style="height: 500px">
              <Chart :chartData="chartData" />
            </div>
          </div>
        </div>
        <div></div>
        <div style="height: 100%; width: 100%">
          <a-row style="height: 60px; display: flex; align-items: center">
            <a-col :span="12">
              <a-select
                size="large"
                :default-value="year"
                style="width: 150px"
                @change="handleChangeYear"
              >
                <a-select-option
                  v-for="year in getListYear"
                  :value="year"
                  :key="year"
                >
                  {{ year }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="12" style="display: flex; justify-content: flex-end">
              <a-select
                :default-value="LABEL_CHART[Number(month) - 1]"
                style="width: 150px"
                size="large"
                @change="handleChangeMonth"
              >
                <a-select-option
                  v-for="(month, index) in LABEL_CHART"
                  :value="month"
                  :key="index"
                >
                  {{ month }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row style="margin-top: 10px">
            <a-col :span="24" style="text-align: center">
              <span
                style="
                  color: #51c273;
                  font-weight: 500;
                  text-decoration: underline;
                "
                >{{ `${LABEL_CHART[Number(month) - 1]} - ${year}` }}</span
              >
            </a-col>
          </a-row>
          <div style="margin-top: 10px">
            <a-row
              v-for="(das, index) in DASHBOARD"
              :key="index"
              style="margin-bottom: 15px"
            >
              <a-col :span="16">{{ das }}</a-col>
              <a-col :span="4" :offset="1">{{
                getValueDataDetail(index)
              }}</a-col>
            </a-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/commons/Chart";
import HeaderPage from "@/components/commonsPage/Header";
import ICountUp from "vue-countup-v2";
import { mapActions, mapGetters } from "vuex";
import VueHorizontal from "vue-horizontal";
import { DASHBOARD, LABEL_CHART } from "@/constants/dashboard";
import moment from "moment";
// import { numberWithCommas } from "@/utils/numberWithCommas";

export default {
  name: "DashboardVue",
  components: {
    Chart,
    HeaderPage,
    ICountUp,
    VueHorizontal,
  },
  data() {
    return {
      title: `Dashboard - ${moment().format("YYYY")}`,
      isSearch: false,
      titleButton: "",
      iconHeader: "",
      delay: 100,
      DASHBOARD,
      LABEL_CHART,
      selected: 0,
      chartData: {
        labels: LABEL_CHART,
        datasets: [
          {
            label: `${DASHBOARD[0]} - ${moment().format("YYYY")}`,
            backgroundColor: "#51c273",
            data: [],
          },
        ],
      },
      year: moment().format("YYYY"),
      month: moment().format("MM"),
      dataMonthSelected: {},
    };
  },
  computed: {
    ...mapGetters({
      getterDashboard: "dashboard/dashboard",
    }),
    getListYear() {
      let listYear = [];
      for (let i = -1; i < 2; i++) {
        listYear.push(moment(new Date()).add(i, "years").format("YYYY"));
      }
      return listYear;
    },
    getBudget() {
      return this.getterDashboard.Budget;
    },
    getTotalBooking() {
      if (this.getterDashboard.Items) {
        const data = Object?.entries(this.getterDashboard.Items)?.map(
          item => item[1]
        );
        return data?.reduce(
          (result, current) => result + current.BookingDetailInfo.Total,
          0
        );
      }
      return 0;
    },
    getTotalBookingCompleted() {
      if (this.getterDashboard.Items) {
        const data = Object?.entries(this.getterDashboard.Items)?.map(
          item => item[1]
        );
        return data?.reduce(
          (result, current) =>
            result + current.BookingDetailInfo.TotalCompleted,
          0
        );
      }
      return 0;
    },
    getTotalBookingCancelled() {
      if (this.getterDashboard.Items) {
        const data = Object?.entries(this.getterDashboard.Items)?.map(
          item => item[1]
        );
        return data?.reduce(
          (result, current) =>
            result + current.BookingDetailInfo.TotalCancelled,
          0
        );
      }
      return 0;
    },
  },
  methods: {
    ...mapActions({
      getDashboard: "dashboard/getDashboard",
    }),
    handleSelect(index) {
      this.selected = index;
      let arrayData = [];
      if (this.getterDashboard.Items) {
        const data = Object?.entries(this.getterDashboard.Items)?.map(
          item => item[1]
        );
        switch (index) {
          case 0:
            arrayData = data.map(item => {
              return item.Finance?.TotalRevenue;
            });
            break;
          case 1:
            arrayData = data.map(item => {
              return item.Finance?.Profit;
            });
            break;
          case 2:
            arrayData = data.map(item => {
              return item.Finance?.TotalRefund;
            });
            break;
          case 3:
            arrayData = data.map(item => {
              return item.Finance?.TotalPayForDriver;
            });
            break;
          case 4:
            arrayData = data.map(item => {
              return item.BookingDetailInfo?.Total;
            });
            break;
          case 5:
            arrayData = data.map(item => {
              return item.BookingDetailInfo?.TotalCompleted;
            });
            break;
          case 6:
            arrayData = data.map(item => {
              return item.BookingDetailInfo?.TotalCancelled;
            });
            break;
          case 7:
            arrayData = data.map(item => {
              return item.BookingDetailInfo?.TotalPending;
            });
            break;
          case 8:
            arrayData = data.map(item => {
              return item.BookingDetailDrvierInfo?.Total;
            });
            break;
          case 9:
            arrayData = data.map(item => {
              return item.BookingDetailDrvierInfo?.TotalCompleted;
            });
            break;
          case 10:
            arrayData = data.map(item => {
              return item.BookingDetailDrvierInfo?.TotalCancelled;
            });
            break;
          case 11:
            arrayData = data.map(item => {
              return item.BookingDetailDrvierInfo?.TotalPending;
            });
            break;
          case 12:
            arrayData = data.map(item => {
              return (
                item.ReportInfo?.TotalDriverReport +
                item.ReportInfo?.TotalBookerReport
              );
            });
            break;
          case 13:
            arrayData = data.map(item => {
              return item.ReportInfo?.TotalDriverReport;
            });
            break;
          case 14:
            arrayData = data.map(item => {
              return item.ReportInfo?.TotalBookerReport;
            });
            break;
          default:
            break;
        }
      }
      let tmp = {
        labels: LABEL_CHART,
        datasets: [
          {
            label: `${DASHBOARD[index]} - ${this.year}`,
            backgroundColor: "#51c273",
            data: arrayData,
          },
        ],
      };
      this.chartData = tmp;
    },
    async handleChangeYear(value) {
      this.year = value;
      const date = {
        from: `01-${value}`,
        to: `12-${value}`,
      };
      await this.getDashboard(date);
      this.handleSelect(this.selected);
      let tmp = { ...this.chartData };
      tmp.datasets[0].label = `${DASHBOARD[this.selected]} - ${this.year}`;
      this.chartData = tmp;
      this.title = `Dashboard - ${this.year}`;
      this.dataMonthSelected =
        this.getterDashboard.Items[`${this.month}-${this.year}`];
    },
    handleChangeMonth(vallue) {
      let month = this.LABEL_CHART.findIndex(item => item === vallue) + 1;
      month = month < 10 ? `0${month}` : month;
      this.month = month;
      this.dataMonthSelected =
        this.getterDashboard.Items[`${month}-${this.year}`];
    },
    getValueDataDetail(index) {
      let result;
      switch (index) {
        case 0:
          result = this.dataMonthSelected?.Finance?.TotalRevenue;
          result = result ? result : 0;
          result = result.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
          break;
        case 1:
          result = this.dataMonthSelected?.Finance?.Profit;
          result = result ? result : 0;
          result = result.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
          break;
        case 2:
          result = this.dataMonthSelected?.Finance?.TotalRefund;
          result = result ? result : 0;
          result = result.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
          break;
        case 3:
          result = this.dataMonthSelected?.Finance?.TotalPayForDriver;
          result = result ? result : 0;
          result = result.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
          break;
        case 4:
          result = this.dataMonthSelected?.BookingDetailInfo?.Total;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 5:
          result = this.dataMonthSelected?.BookingDetailInfo?.TotalCompleted;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 6:
          result = this.dataMonthSelected?.BookingDetailInfo?.TotalCancelled;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 7:
          result = this.dataMonthSelected?.BookingDetailInfo?.TotalPending;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 8:
          result = this.dataMonthSelected?.BookingDetailDrvierInfo?.Total;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 9:
          result =
            this.dataMonthSelected?.BookingDetailDrvierInfo?.TotalCompleted;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 10:
          result =
            this.dataMonthSelected?.BookingDetailDrvierInfo?.TotalCancelled;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 11:
          result =
            this.dataMonthSelected?.BookingDetailDrvierInfo?.TotalPending;
          result = `${result ? result : 0} ${result > 1 ? "Trips" : "Trip"}`;
          break;
        case 12:
          result =
            this.dataMonthSelected?.ReportInfo?.TotalDriverReport +
            this.dataMonthSelected?.ReportInfo?.TotalBookerReport;
          result = `${result ? result : 0} ${
            result > 1 ? "Reports" : "Report"
          }`;
          break;
        case 13:
          result = this.dataMonthSelected?.ReportInfo?.TotalDriverReport;
          result = `${result ? result : 0} ${
            result > 1 ? "Reports" : "Report"
          }`;
          break;
        case 14:
          result = this.dataMonthSelected?.ReportInfo?.TotalBookerReport;
          result = `${result ? result : 0} ${
            result > 1 ? "Reports" : "Report"
          }`;
          break;
        default:
          break;
      }
      return result;
    },
  },
  async mounted() {
    const date = {
      from: moment().startOf("year").format("MM-YYYY"),
      to: moment().endOf("year").format("MM-YYYY"),
    };
    const res = await this.getDashboard(date);
    let arrayData = [];
    if (res.Items) {
      const data = Object?.entries(res.Items)?.map(item => item[1]);
      arrayData = data.map(item => {
        return item.Finance.TotalRevenue;
      });
    }
    let tmp = {
      labels: LABEL_CHART,
      datasets: [
        {
          label: `${DASHBOARD[0]} - ${this.year}`,
          backgroundColor: "#51c273",
          data: arrayData,
        },
      ],
    };
    this.chartData = tmp;
    this.dataMonthSelected = res.Items[`${this.month}-${this.year}`];
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.cotainerDashboard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
  gap: 40px;
  .ant-row {
    .ant-col {
      .recData {
        padding: 20px 0px 0;
        height: 150px;
        width: 100%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        &__budget {
          text-align: center;
          padding: 10px 20px;
          color: #ff9a5c;
          font-size: 16px;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            height: 35px;
            background-color: #ff9a5c;
            top: 0;
            left: 0;
            position: absolute;
            border-radius: 5px;
            opacity: 0.2;
          }
        }
        &__budget__line {
          width: 100%;
          height: 5px;
          background-color: #ff9a5c;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &__totalbooking {
          text-align: center;
          padding: 10px 20px;
          color: #5ba0f5;
          font-size: 16px;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            height: 35px;
            background-color: #5ba0f5;
            top: 0;
            left: 0;
            position: absolute;
            border-radius: 5px;
            opacity: 0.2;
          }
        }
        &__totalbooking__line {
          width: 100%;
          height: 5px;
          background-color: #5ba0f5;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &__totalbookingcompleted {
          text-align: center;
          padding: 10px 20px;
          color: #51c273;
          font-size: 16px;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            height: 35px;
            background-color: #51c273;
            top: 0;
            left: 0;
            position: absolute;
            border-radius: 5px;
            opacity: 0.2;
          }
        }
        &__totalbookingcompleted__line {
          width: 100%;
          height: 5px;
          background-color: #51c273;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &__totalbookingcancelled {
          text-align: center;
          padding: 10px 20px;
          color: #ed646a;
          font-size: 16px;
          position: relative;
          &::before {
            content: "";
            width: 100%;
            height: 35px;
            background-color: #ed646a;
            top: 0;
            left: 0;
            position: absolute;
            border-radius: 5px;
            opacity: 0.2;
          }
        }
        &__totalbookingcancelled__line {
          width: 100%;
          height: 5px;
          background-color: #ed646a;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
  .containerBoxChart {
    display: flex;
    // align-items: flex-end;
    // height: calc(100vh - 360px);
    gap: 30px;
  }
  .shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 100%;
  }
  .vue-horizontal {
    padding: 0 25px !important;
  }
  .boxChart_active {
    padding: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #51c273;
    background-color: #51c273;
    color: #fff;
    cursor: pointer;
  }
  .boxChart_inactive {
    padding: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
