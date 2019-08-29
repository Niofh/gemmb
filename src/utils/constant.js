// 设备状态
export const SeverityStatus = {
  0: "Critical",
  1: "Major",
  2: "Minor",
  3: "Warning",
  4: "Normal",
  5: "Informational",
  6: "Calculating",
  7: "Symptom",
  8: "Unknown",
  9: "Monitoring"
}

export const Severity = {
  Critical: {
    color: "#d9534f",
    code: 0
  },
  Major: {
    color: "#F0AD4E",
    code: 1
  },
  Minor: {
    color: "#E9d310",
    code: 2
  },
  Warning: {
    color: "#31B0D5",
    code: 3
  },
  Normal: {
    color: "#5cb85c",
    code: 4
  },
  Informational: {
    color: "#C0C0C0",
    code: 5
  },
  Calculating: {
    color: "#9370DB",
    code: 6
  },
  Symptom: {
    color: "#D3D3D3",
    code: 7
  },
  Unknown: {
    color: "#A9A9A9",
    code: 8
  },
  Monitoring: {
    color: "#6495ed",
    code: 9
  },

}


export const selectOptions = [];

for (let key of Object.keys(Severity)) {
  selectOptions.push({
    name: key,
    id: Severity[key].code
  })
}


// 故障状态
export const BUG_STATUS_CODE = {
  0: 'Registered',
  1: 'InProgress',
  2: 'PendingCustomer',
  3: 'PendingSupplier',
  4: 'Resolved',
  5: 'Closed'
}

// 变更工单类型
export const CHANGE_TYPE_CODE = {
  0: 'Standard',
  1: 'Normal',
  2: 'Emergency',
}
// 变更工单类型
export const CHANGE_STATUS_CODE = {
  0: 'Unapproved',
  1: 'Approved',
  2: 'Rejected',
  3: 'Completed',
  4: 'Withdrawn',
  5: 'Aborted',
  6: 'Started',
  7: 'Ended',
}


// 历史工单 工单类型
export const HISTORY_WORK_STATUS = {
  0: 'Incident',
  1: 'Problem',
  2: 'Change',
  3: 'Request',
}

// 优先级
export const PRIORITY_CODE = [
  {id: 1, name: 'P1'},
  {id: 2, name: 'P2'},
  {id: 3, name: 'P3'},
  {id: 4, name: 'P4'},
]

