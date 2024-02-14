import productimage1 from '../../assets/products/product1.jpg';
import productimage2 from '../../assets/products/product2.jpg';
import productimage3 from '../../assets/products/product3.jpg';
import productimage5 from '../../assets/products/product5.jpg';
import { Place } from '../../domain/places/Place';

// Api mock Places

export const Places: Place[] = [{
    id: "1",
    photo: productimage1,
    price: 100,
    title: "Beautiful place"
},{
    id: "2",
    photo: productimage2,
    price: 200,
    title: "Beautiful place 2"
},{
    id: "3",
    photo: productimage3,
    price: 300,
    title: "Beautiful place 3"
},{
    id: "4",
    photo: productimage5,
    price: 400,
    title: "Beautiful place 4"
}]

export const getProductById = (productId: string) => Places.find(place => place.id === productId)