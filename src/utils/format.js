import store from "@/store";

/** 停车场类型 */
export function parkingType(value) {
  const data = store.state.config.parking_type_json[value];
  if (data) {
    return data.label;
  }
}

/** 年检 */
export function yearCheckType(value) {
  const data = store.state.config.year_check;
  const filterData = data.filter(item => item.subValue === value);
  if (filterData.length > 0) {
    return filterData[0].label;
  }
  return "";
}

/** 能源类型 */
export function energyType(value) {
  const data = store.state.config.energyType;
  const filterData = data.filter(item => item.value === parseInt(value)); //=== 结果值是否一致以及值类型，== 结果值是否一致
  if (filterData.length > 0) {
    return filterData[0].label;
  }
  return "";
}

/** 格式化请求数据的参数  */
// 有时候请求获得的数据比较多，我们只取指定需要的部分即可
export function formatRequestData(keyData, requestData) {
  const data = {};
  for (let key in keyData) {
    if (Object.keys(requestData).includes(key)) {
      data[key] = requestData[key];
    }
  }
  return data;
}
