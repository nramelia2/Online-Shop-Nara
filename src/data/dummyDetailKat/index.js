import {
    ShoeN,
    ShoeNa,
    ShoeNara,
    ClothesN,
    ClothesNa,
    ClothesNara,
    ThousersN,
    ThousersNa,
    ThousersNara,
    BagN,
    BagNa,
    BagNara,
    Shoe,
    Clothes,
    Thousers,
    Bag,
    ClothesNara4,
    BagNara4,
    ThouseersNara4,
    ShoeNara4
} from '../../assets'

export const dummyDetailKat = [
    {
        id: 1,
        nama: ['BLOUSE OFFICE A1\n', 'Rp 300000'],
        gambar: [ClothesN, ClothesNa, ClothesNara, ClothesNara4],
        jeniss: {
            id: 2,
            nama: 'Clothes',
            gambar: Clothes
        },
        harga: 300000,
        berat: 0.25,
        deskripsi: 'This product is a product whose ingredients come from Indonesia, made of smooth, comfortable in pake and simple.',
        bahan: 'Cotton',
        warna: ["BLACK", "WHITE"],
        ukuran: ["S", "M", "L", "XL", "XXL"],
        ready: true
    },
    {
        id: 2,
        nama: ['PASHMINA NARA A2\n', 'Rp 50000'],
        gambar: [ShoeN, ShoeNa, ShoeNara, ShoeNara4],
        jeniss: {
            id: 1,
            nama: 'Shoe',
            gambar: Shoe
        },
        harga: 50000,
        bahan: 'Bubble Pop',
        deskripsi: 'This product is a product whose ingredients come from Indonesia, made of smooth, comfortable in pake and simple.',
        berat: 0.25,
        warna: ["GREY", "PINK"],
        ukuran: ["S", "M", "L", "XL", "XXL"],
        ready: true
    },
    {
        id: 3,
        nama: ['BAG NARA Z1\n', 'Rp 269999'],
        gambar: [BagN, BagNa, BagNara, BagNara4],
        jeniss: {
            id: 4,
            nama: 'Bag',
            gambar: Bag
        },
        harga: 269999,
        bahan: 'Leather',
        berat: 0.5,
        deskripsi: 'This product is a product whose ingredients come from Indonesia, made of smooth, comfortable in pake and simple.',
        warna: ["BLACK", "WHITE"],
        ukuran: ["SMALL", "BIG"],
        ready: true
    },
    {
        id: 4,
        nama: ['JEANS NARA A1\n', 'Rp 200000'],
        gambar: [ThousersN, ThousersNa, ThousersNara, ThouseersNara4],
        jeniss: {
            id: 3,
            nama: 'Thousers',
            gambar: Thousers
        },
        harga: 200000,
        bahan: 'Poly Denim',
        berat: 0.5,
        deskripsi: 'This product is a product whose ingredients come from Indonesia, made of smooth, comfortable in pake and simple.',
        warna: ["BLACK", "GREY"],
        ukuran: ["S", "M", "L", "XL", "XXL"],
        ready: true
    },
]