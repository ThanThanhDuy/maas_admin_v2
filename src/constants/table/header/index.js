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

export const HEADER_DRIVER = [
  {
    dataIndex: "Code",
    key: "Code",
    title: "Code",
    width: "20%",
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: "15%",
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
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
    width: "10%",
  },
  {
    title: "Email",
    key: "Email",
    dataIndex: "Email",
    width: "20%",
  },
  {
    title: "Birthdate",
    key: "Birthdate",
    dataIndex: "Birthdate",
    width: "10%",
  },
  {
    title: "Status",
    key: "StatusDriver",
    dataIndex: "StatusDriver",
    scopedSlots: { customRender: "StatusDriver" },
    width: "10%",
    align: "left",
  },
];

export const HEADER_PROBLEM = [
  {
    dataIndex: "CodeReport",
    key: "CodeReport",
    title: "Code Ticket",
    width: "20%",
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Title Ticket",
    dataIndex: "TitleReport",
    key: "TitleReport",
    width: "20%",
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
    title: "User Code",
    dataIndex: "UserCode",
    key: "UserCode",
    width: "20%",
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Name",
    key: "UserName",
    dataIndex: "UserName",
    width: "10%",
  },
  {
    title: "Date",
    key: "DateReport",
    dataIndex: "DateReport",
    width: "7%",
  },
  {
    title: "Status",
    key: "StatusReport",
    dataIndex: "StatusReport",
    scopedSlots: { customRender: "StatusReport" },
    width: "5%",
    align: "left",
  },
];
