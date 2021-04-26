import request from "../../utils/request";

export async function getAccessByParentId(data: any, options?: { [key: string]: any }) {
    return request('/api/access', {
        method: 'GET',
        ...(options || {}),
    });
}
