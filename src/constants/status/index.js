export const STATUS_DRIVER = {
  0: {
    color: "red",
    status: "Blocked",
  },
  1: {
    color: "green",
    status: "Working",
  },
  2: {
    color: "orange",
    status: "Pendding",
  },
  3: {
    color: "red",
    status: "Reject",
  },
  Inactive: 0,
  Active: 1,
  Pending: 2,
  Rejected: 3,
};

export const STATUS_REPORT = {
  1: {
    color: "orange",
    status: "Pendding",
  },
  2: {
    color: "green",
    status: "Processed",
  },
  3: {
    color: "red",
    status: "Processing Denied",
  },
  Pendding: 1,
  Processed: 2,
  ProcessingDenied: 3,
};

export const STATUS_BOOKING_DETAIL = {
  1: {
    status: "Finding driver",
    color: "orange",
  },
  2: {
    status: "Ready",
    color: "cyan",
  },
  3: {
    status: "Started",
    color: "blue",
  },
  4: {
    status: "Completed",
    color: "green",
  },
  5: {
    status: "Pending Refund",
    color: "orange",
  },
  6: {
    status: "Completed Refund",
    color: "green",
  },
};

export const STATUS_BOOKING_DETAIL_DRIVER = {
  "-1": {
    color: "red",
    status: "Cancelled",
  },
  0: {
    color: "orange",
    status: "Not Yet",
  },
  1: {
    color: "cyan",
    status: "Started",
  },
  2: {
    color: "blue",
    status: "Picked Up",
  },
  3: {
    color: "green",
    status: "Completed",
  },
};

export const STATUS_PROMOTION = {
  0: {
    color: "red",
    status: "Inactive",
  },
  1: {
    color: "green",
    status: "Active",
  },
};
