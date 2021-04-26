import request from "../../utils/request";

export async function login(options?: { [key: string]: any }): Promise<{ token: string }> {
    return request.post('/api/login', { ...(options || {}) });
}
