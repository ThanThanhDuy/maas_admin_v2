export const HEADER_ROUTE = [
  {
    dataIndex: "code",
    key: "code",
    title: "Code",
    width: "25%",
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    width: "25%",
    sorter: (a, b) => {
      if (a.from < b.from) {
        return -1;
      }
      if (a.from > b.from) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    width: "25%",
    sorter: (a, b) => {
      if (a.to < b.to) {
        return -1;
      }
      if (a.to > b.to) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    scopedSlots: { customRender: "status" },
    width: "8.2%",
    align: "center",
  },
  {
    title: "Distance",
    key: "distance",
    dataIndex: "distance",
    scopedSlots: { customRender: "distance" },
    width: "8.2%",
    align: "center",
    sorter: (a, b) => a.distance - b.distance,
  },
  {
    title: "Station",
    key: "station",
    dataIndex: "station",
    width: "8.2%",
    align: "center",
    sorter: (a, b) => a.station - b.station,
  },
];
