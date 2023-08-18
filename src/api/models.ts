interface IUser {
    _id: string;
    user: string;
    username: string;
    roles: {
        User: number;
        Editor: number;
        Admin: number;
    };
    password: string;
    image: string;
    name: string;
    sex: string;
    borndate: Date;
    street: string;
    city: string;
    country: string;
    zip: number
    mod: string;
    email: string;
    phone: string;
    courses: string[];
    refreshToken: string;
}

interface IAuth {
    user?: string;
    pwd?: string;
    roles?: number[];
    accessToken?: string;
  }

export type { IUser, IAuth };