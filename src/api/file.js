import request from '@/utils/request'

export function uploadPic(formData) {
  return request({
    url: '/o2o/sys/file/uploadPic',
    method: 'post',
    data:formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
