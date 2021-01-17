const state = {
  parking_status: [
    { label: "禁用", value: 1 },
    { label: "启用", value: 2 }
  ],
  radio_disabled: [
    { label: "禁用", value: false },
    { label: "启用", value: true }
  ],
  parking_type: [
    { label: "室内", value: 1 },
    { label: "室外", value: 2 }
  ]
};

export default {
  namespaced: true,
  state
};
