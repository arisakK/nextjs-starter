import { provinces } from './provinces';
export type NavLink = {
    href: string;
    label: string;
};


export type ActionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>;

export type LandmarkCardProps = {
    id: string
    name: string
    description: string
    image: string
    category: string
    province: string
    price: number
    lat: number
    lng: number
}
