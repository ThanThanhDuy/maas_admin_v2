<template>
  <div>
    <div class="containerFormSave" v-if="listStationProps.length > 0">
      <ButtonVue
        v-if="showDelete"
        :iconHeader="iconDelete"
        :titleButton="titleDelete"
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
            :v-model="visible && indexSelected === index ? true : false"
            trigger="click"
          >
            <template slot="content">
              <p>Change position station</p>
              <p>insert station above</p>
              <p>insert station below</p>
              <p>delete station</p>
            </template>
            <a-button
              @click="() => handleOpenMore(index)"
              icon="more"
              style="min-width: 24px"
            />
          </a-popover>
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
      this.visible = true;
      this.indexSelected = index;
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
  margin-top: -35px;
  display: flex;
  justify-content: flex-end;
  margin-right: 16px;
  gap: 16px;
}
.containerFormRoute {
  margin-top: 20px;
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
        height: 40px;
        border-radius: 10px;
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
        height: 40px;
        border-radius: 10px;
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
        width: 40px;
        height: 40px;
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
</style>
