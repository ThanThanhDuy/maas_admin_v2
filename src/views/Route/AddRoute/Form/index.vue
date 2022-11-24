<template>
  <div>
    <div class="containerFormSave" v-if="listStationProps.length > 0">
      <ButtonVue
        v-if="showDelete"
        :iconHeader="iconDelete"
        :titleButton="titleDelete"
        :handleClickButton="handleDeleteRouteByCode"
      />
      <ButtonVue
        :iconHeader="iconSave"
        :titleButton="titleSave"
        :handleClickButton="handleClickButtonSave"
        :isDisabled="listStationProps.length >= 2 ? false : true"
      />
    </div>
    <div class="containerFormRoute" v-if="listStationProps.length > 0">
      <div
        class="containerFormRoute__box"
        v-for="(station, index) in listStationProps"
        :key="index"
      >
        <div class="containerFormRoute__box__order">
          <span>#{{ index + 1 }}</span>
        </div>
        <div class="containerFormRoute__box__input">
          <a-input
            placeholder="Code Station"
            v-model="station.Code"
            :maxLength="36"
            @change="() => handleChangeCodeStation(index)"
          ></a-input>
        </div>
        <div class="containerFormRoute__box__input">
          <a-auto-complete
            v-model="station.Name"
            :data-source="dataSource.map(item => item.Name)"
            placeholder="Name Station"
            @select="value => onSelect(value, index)"
            @search="onSearch"
            @change="value => handleChangeValue(value, index)"
          >
            <!-- <template slot="dataSource"> -->
            <!-- <a-select-opt-group v-for="group in dataSource" :key="group.code"> -->
            <!-- <a-select-option
                v-for="group in dataSource"
                :value="group.Name"
                :key="group.Code"
              >
                {{ group.Name }}
              </a-select-option> -->
            <!-- </a-select-opt-group> -->
            <!-- </template> -->
          </a-auto-complete>
        </div>
        <div class="containerFormRoute__box__button">
          <a-popover
            placement="bottomRight"
            trigger="click"
            :visible="visible && indexSelected === index ? true : false"
          >
            <template slot="content">
              <div
                style="
                  display: flex;
                  align-items: center;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                  padding: 10px;
                  border-radius: 5px;
                  margin-bottom: 15px;
                "
              >
                <span style="margin-right: 10px"
                  >Change station to position</span
                >
                <a-input-number
                  style="width: 60px; margin-right: 10px"
                  v-model="position"
                />
                <a-button
                  type="primary"
                  icon="save"
                  :disabled="position === index + 1 ? true : false"
                  @click="() => handleChangePositionValue(index)"
                />
              </div>
              <div
                class="box_popover_route"
                @click="() => handleInsertStationAbove(index)"
              >
                <span>Insert station above</span>
                <a-button type="primary" icon="arrow-up" />
              </div>
              <div
                class="box_popover_route"
                @click="() => handleInsertStationBelow(index)"
              >
                <span>Insert station below</span>
                <a-button type="primary" icon="arrow-down" />
              </div>
              <div
                class="box_popover_route"
                @click="() => handleDeleteStationRoute(index)"
              >
                <p>Delete station</p>
                <a-button type="danger" icon="delete" />
              </div>
            </template>
            <a-button
              @click="() => handleOpenMore(index)"
              :icon="visible && indexSelected === index ? 'close' : 'more'"
              style="min-width: 24px"
            />
          </a-popover>
          <!-- <a-popover v-model="visible" title="Title" trigger="click">
            <a slot="content" @click="hide">Close</a>
            <a-button type="primary" @click="visible = true">
              Click me
            </a-button>
          </a-popover> -->
        </div>
      </div>

      <!-- add more -->
    </div>
    <div
      v-else
      style="display: flex; justify-content: center; margin-top: 50px"
    >
      <a-spin />
    </div>
    <div class="containerFormRoute__button" v-if="listStationProps.length > 0">
      <ButtonVue
        :iconHeader="iconHeader"
        :titleButton="titleButton"
        :handleClickButton="handleClickButton"
      />
    </div>
  </div>
</template>

<script>
import ButtonVue from "@/components/commons/Button";
import { notification } from "@/utils/notification";
import { confirmDeleteDialog } from "@/utils/confirmDialog";

export default {
  name: "FormVue",
  components: {
    ButtonVue,
  },
  props: {
    getStation: {
      type: Array,
      default: () => [],
    },
    listStationProps: {
      type: Array,
      default: () => [],
    },
    handleSave: {
      type: Function,
      default: () => {},
    },
    iconSave: {
      type: String,
      default: "save",
    },
    handleChangeName: {
      type: Function,
      default: () => {},
    },
    handleChangeCode: {
      type: Function,
      default: () => {},
    },
    handleAddMore: {
      type: Function,
      default: () => {},
    },
    handleChangeValueAuto: {
      type: Function,
      default: () => {},
    },
    handlechangePosition: {
      type: Function,
      default: () => {},
    },
    handleInsertAbove: {
      type: Function,
      default: () => {},
    },
    handleInsertBelow: {
      type: Function,
      default: () => {},
    },
    handleDeleteStation: {
      type: Function,
      default: () => {},
    },
    handleDeleteRoute: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      value: "",
      dataSource: this.getStation,
      stations: this.getStation,
      iconHeader: "plus",
      titleButton: "Add more",
      visible: false,
      indexSelected: 0,
      listStation: this.listStationProps,
      titleSave: "Save",
      iconDelete: "delete",
      titleDelete: "Delete route",
      showDelete: false,
      position: 0,
    };
  },
  methods: {
    onSearch(searchText) {
      let dataTmp = [];
      for (const station of this.getStation) {
        const index = station.Name.toLowerCase().search(
          searchText.toLowerCase()
        );
        if (index !== -1) {
          dataTmp.push({
            Code: station.Code,
            Name: station.Name,
          });
        }
      }
      this.dataSource = dataTmp;
    },
    onSelect(value, index) {
      this.dataSource = this.getStation;
      this.handleChangeName(value, index);
    },
    handleClickButton() {
      this.handleAddMore();
    },
    handleOpenMore(index) {
      this.visible = !this.visible;
      this.indexSelected = index;
      this.position = index + 1;
    },

    handleChangeCodeStation(index) {
      this.handleChangeCode(index);
    },
    handleClickButtonSave() {
      this.handleSave();
    },
    handleChangeValue(value, index) {
      this.handleChangeValueAuto(value, index);
    },
    // eslint-disable-next-line
    handleChangePositionValue(index) {
      if (this.position > this.listStationProps.length || this.position < 1) {
        notification(
          this,
          "warn",
          `Position must be lager than 0 and smaller than ${this.listStationProps.length}`,
          ""
        );
        return;
      } else {
        this.handlechangePosition(index, this.position - 1);
        this.visible = false;
      }
    },
    handleInsertStationAbove(index) {
      this.handleInsertAbove(index);
      this.visible = false;
    },
    handleInsertStationBelow(index) {
      this.handleInsertBelow(index);
      this.visible = false;
    },
    // eslint-disable-next-line
    handleDeleteStationRoute(index) {
      this.visible = false;
      confirmDeleteDialog(
        this,
        "Are you sure delete this station?",
        "",
        () => {
          this.handleDeleteStation(index);
        },
        () => {
          this.visible = true;
        }
      );
      // this.handleDeleteStation(index);
      // this.visible = false;
    },
    handleDeleteRouteByCode() {
      this.handleDeleteRoute();
    },
  },
  mounted() {
    // get name url
    const name = this.$router.currentRoute.name;
    if (name === "RouteDetail") this.showDelete = true;
  },
};
</script>

<style lang="scss">
@import "@/theme/commons/variable.scss";
.containerFormSave {
  margin-top: -30px;
  display: flex;
  justify-content: flex-end;
  margin-right: 16px;
  gap: 16px;
}
.containerFormRoute {
  margin-top: 75px;
  margin-right: 16px;
  max-height: calc(100vh - 64px - 16px - 40px - 100px);
  overflow-y: auto;
  &__box {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    &__input {
      width: calc((100% - 40px - 40px - 20px - 34px) / 2);
      .ant-input {
        // height: 40px;
        height: 35px;
        // border-radius: 5px;
        &:focus {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
        }
        &:hover {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
        }
      }
      .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
        border-color: $green40 !important;
        box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2) !important;
      }
      .ant-select {
        width: 100%;
      }
      .ant-select-auto-complete.ant-select .ant-input {
        // height: 40px;
        // border-radius: 10px;
        height: 35px;
        &:focus {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
        }
        &:hover {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
        }
      }
    }
    &__button {
      width: 40px;
      .ant-btn {
        // width: 40px;
        // height: 40px;
        &:hover {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
          color: $green50;
        }
        &:focus {
          border-color: $green40;
          box-shadow: 0 0 0 2px rgba(49, 176, 87, 0.2);
          color: $green50;
        }
      }
    }
    &__order {
      width: 24px;
      display: flex;
      justify-content: center;
    }
  }
  &__button {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 55px;
    align-items: center;
    margin-top: 10px;
  }
}
.box_popover_route {
  height: 52px;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
</style>
