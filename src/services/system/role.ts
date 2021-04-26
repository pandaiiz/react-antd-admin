import request from "../../utils/request";

export async function getRoles(options?: { [key: string]: any }) {
  return request('/api/role', {
    method: 'GET',
    ...(options || {}),
  });
}
