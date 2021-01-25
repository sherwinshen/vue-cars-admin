const state = {
  radio_disabled: [
    { label: "禁用", value: false },
    { label: "启用", value: true }
  ],
  parking_type: [
    { label: "室内", value: 1 },
    { label: "室外", value: 2 }
  ],
  parking_type_json: {
    1: { label: "室内", value: 1 },
    2: { label: "室外", value: 2 }
  }
};

export default {
  namespaced: true,
  state
};
