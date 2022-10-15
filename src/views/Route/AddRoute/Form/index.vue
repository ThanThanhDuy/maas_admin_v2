<template>
  <div>
    <div class="containerFormSave">
      <ButtonVue
        :iconHeader="iconSave"
        :titleButton="titleSave"
        :handleClickButton="handleClickButtonSave"
      />
    </div>
    <div class="containerFormRoute">
      <div
        class="containerFormRoute__box"
        v-for="(station, index) in listStation"
        :key="index"
      >
        <div class="containerFormRoute__box__order">
          <span>#{{ index + 1 }}</span>
        </div>
        <div class="containerFormRoute__box__input">
          <a-input
            placeholder="Code Station"
            v-model="station.code"
            :maxLength="36"
            @change="() => handleChangeCodeStation(index)"
          ></a-input>
        </div>
        <div class="containerFormRoute__box__input">
          <a-auto-complete
            v-model="station.name"
            :data-source="dataSource"
            placeholder="Name Station"
            @select="value => onSelect(value, index)"
            @search="onSearch"
          >
            <template slot="dataSource">
              <!-- <a-select-opt-group v-for="group in dataSource" :key="group.code"> -->
              <a-select-option
                v-for="group in dataSource"
                :value="group.name"
                :key="group.code"
              >
                {{ group.name }}
              </a-select-option>
              <!-- </a-select-opt-group> -->
            </template>
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
      <div class="containerFormRoute__button">
        <ButtonVue
          :iconHeader="iconHeader"
          :titleButton="titleButton"
          :handleClickButton="handleClickButton"
        />
      </div>
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
  },
  data() {
    return {
      value: "",
      dataSource: [],
      stations: this.getStation,
      iconHeader: "plus",
      titleButton: "Add more",
      visible: false,
      indexSelected: 0,
      listStation:
        this.listStationProps.length > 0
          ? this.listStationProps
          : [
              {
                code: "",
                name: "",
              },
            ],

      titleSave: "Save",
    };
  },
  methods: {
    onSearch(searchText) {
      let dataTmp = [];
      for (const station of this.stations) {
        const index = station.Name.toLowerCase().search(
          searchText.toLowerCase()
        );
        if (index !== -1) {
          dataTmp.push({
            code: station.Code,
            name: station.Name,
          });
        }
      }
      this.dataSource = dataTmp;
    },
    onSelect(value, index) {
      this.dataSource = this.stations;
      console.log("onSelect", value, index);
      this.listStation[index].code = this.stations.find(
        station => station.Name === value
      ).Code;
      this.listStation[index].name = value;
    },
    handleClickButton() {
      this.listStation.push({
        code: "",
        name: "",
      });
    },
    handleOpenMore(index) {
      this.visible = true;
      this.indexSelected = index;
    },
    handleChangeCodeStation(index) {
      if (this.listStation[index].code) {
        const station = this.stations.find(
          station => station.Code === this.listStation[index].code
        );
        if (station) {
          this.listStation[index].name = station.Name;
        } else {
          this.listStation[index].name = "";
        }
      }
    },
    handleClickButtonSave() {
      this.handleSave(this.listStation);
    },
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
}
.containerFormRoute {
  margin-top: 20px;
  margin-right: 16px;
  &__box {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    &__input {
      width: calc((100% - 40px - 40px - 20px - 24px) / 2);
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
      width: 20px;
      display: flex;
      justify-content: center;
    }
  }
  &__button {
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
