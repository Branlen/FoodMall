import request from '@/utils/request'

export function getDataInfo(data) {
  return request({
    url: `/o2o/admin/data/list?startTime=${data.startTime}&endTime=${data.endTime}`,
    method: 'get',

  })
}
export function getBaseData(data) {
  return request({
    url: `/o2o/admin/data/getBaseData`,
    method: 'get',

  })
}
