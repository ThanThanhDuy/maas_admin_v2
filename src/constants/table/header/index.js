export const HEADER_ROUTE = [
  {
    dataIndex: "code",
    key: "code",
    title: "Code",
    width: "25%",
    // sorter: (a, b) => a.code - b.code,
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    width: "25%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    width: "25%",
    // sorter: (a, b) => {
    //   if (a.to < b.to) {
    //     return -1;
    //   }
    //   if (a.to > b.to) {
    //     return 1;
    //   }
    //   return 0;
    // },
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
    // sorter: (a, b) => a.distance - b.distance,
  },
  {
    title: "Station",
    key: "station",
    dataIndex: "station",
    width: "8.2%",
    align: "center",
    // sorter: (a, b) => a.station - b.station,
  },
];

export const HEADER_DRIVER = [
  {
    dataIndex: "Code",
    key: "Code",
    title: "Code",
    width: "20%",
    // sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: "15%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "Phone",
    dataIndex: "PhoneNumber",
    key: "PhoneNumber",
    width: "10%",
  },
  {
    title: "Email",
    key: "Gmail",
    dataIndex: "Gmail",
    width: "20%",
  },
  {
    title: "Birthdate",
    key: "DateOfBirth",
    dataIndex: "DateOfBirth",
    scopedSlots: { customRender: "DateOfBirth" },
    width: "10%",
  },
  // {
  //   title: "Status",
  //   key: "StatusDriver",
  //   dataIndex: "StatusDriver",
  //   scopedSlots: { customRender: "StatusDriver" },
  //   width: "10%",
  //   align: "left",
  // },
];

export const HEADER_PROBLEM = [
  {
    dataIndex: "Code",
    key: "Code",
    title: "Code Report",
    width: "20%",
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "Title",
    width: "15%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "User Code",
    dataIndex: "UserCode",
    key: "UserCode",
    width: "20%",
    // sorter: (a, b) => a.code - b.code,
  },
  {
    title: "User Name",
    key: "UserName",
    dataIndex: "UserName",
    width: "10%",
  },
  {
    title: "Date",
    key: "DateTime",
    dataIndex: "DateTime",
    scopedSlots: { customRender: "DateTime" },
    width: "10%",
  },
  {
    title: "Status",
    key: "StatusReport",
    dataIndex: "StatusReport",
    scopedSlots: { customRender: "StatusReport" },
    width: "10%",
    align: "left",
  },
];

export const HEADER_STATION = [
  {
    dataIndex: "Code",
    key: "Code",
    title: "Code",
    width: "20%",
    // sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: "15%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "Address",
    key: "Address",
    dataIndex: "Address",
    width: "25%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "Latitude",
    key: "Latitude",
    dataIndex: "Latitude",
    width: "10%",
  },
  {
    title: "Longitude",
    key: "Longitude",
    dataIndex: "Longitude",
    width: "10%",
  },
];

export const HEADER_BANNER = [
  {
    dataIndex: "Priority",
    key: "Priority",
    title: "Priority",
    width: "5%",
    // sorter: (a, b) => a.code - b.code,
  },
  {
    title: "Title",
    dataIndex: "Title",
    key: "Title",
    width: "20%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
  {
    title: "Content",
    key: "Content",
    dataIndex: "Content",
    scopedSlots: { customRender: "Content" },
    width: "35%",
    // sorter: (a, b) => {
    //   if (a.from < b.from) {
    //     return -1;
    //   }
    //   if (a.from > b.from) {
    //     return 1;
    //   }
    //   return 0;
    // },
  },
];

export const HEADER_PROMOTION = [
  {
    dataIndex: "Code",
    key: "Code",
    title: "Code",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    width: "20%",
  },
  {
    title: "Discount Percentage",
    key: "DiscountPercentage",
    dataIndex: "DiscountPercentage",
    scopedSlots: { customRender: "DiscountPercentage" },
    width: "10%",
  },
  {
    title: "Max Decrease",
    key: "MaxDecrease",
    dataIndex: "MaxDecrease",
    width: "10%",
  },
  {
    title: "Type",
    key: "Type",
    dataIndex: "Type",
    scopedSlots: { customRender: "Type" },
    width: "10%",
  },
  {
    title: "Status",
    key: "StatusPromotion",
    dataIndex: "StatusPromotion",
    scopedSlots: { customRender: "StatusPromotion" },
    width: "10%",
  },
];
