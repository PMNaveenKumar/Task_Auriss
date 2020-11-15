export interface UserProfile {
    userName: string,
    password: string,
    email: string,
    type?: string,
    address: {
        address1: string,
        address2: string,
        pincode: number
    }
}