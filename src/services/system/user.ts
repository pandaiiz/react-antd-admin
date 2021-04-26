import request from "../../utils/request";

export async function getUsers(options?: { [key: string]: any }) {
    return request('/api/account', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function getUserInfo(options?: { [key: string]: any }): Promise<any> {
    return request('/api/account/currentUser', {
        method: 'GET',
        ...(options || {}),
    });
}


export async function modifyAccountById(id: any, data: any, options?: { [key: string]: any }): Promise<any> {
    return request(`/api/account/${ id }`, {
        method: 'PATCH',
        data,
        ...(options || {}),
    });
}

export async function createAccount(data: any, options?: { [key: string]: any }): Promise<any> {
    return request(`/api/account`, {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

// async deleteAccountById(id: number): Promise<string> {
//     return await this.delete<string>('/account', id);
// }
export async function deleteAccountById(id: any, options?: { [key: string]: any }): Promise<any> {
    return request(`/api/account/${ id }`, {
        method: 'DELETE',
        ...(options || {}),
    });
}
