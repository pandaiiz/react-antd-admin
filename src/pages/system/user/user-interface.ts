export interface UserModalInit {
    modalVisit?: boolean;
    record?: UserItem;
}

export interface UserModalProps {
    changeEnd: () => void
}

export interface UserModalRef {
    changeModalVisit: (modalType: boolean, record?: UserItem) => void
}

export interface UserItem {
    id?: number;
    username?: string;
    mobile?: string;
    email?: string;
    status?: number;
    platform?: number;
    createdAt?: string;
    updateAt?: string;
};
