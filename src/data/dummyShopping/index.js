import {
    ShoeN,
    ShoeNa,
    ShoeNara,
    ThousersN,
    ThousersNa,
    ThousersNara,
    ClothesN,
    ClothesNa,
    ClothesNara,
    BagN,
    BagNa,
    BagNara,
    Shoe,
    Clothes,
    Thousers,
    Bag,
    ShoeNara4,
    BagNara4,
    ThouseersNara4
} from '../../assets'

export const dummyShopping = [
    {
        id: 1,
        tanggalPemesanan: 'Saturday, 18 December 2021',
        status: 'SHOPPING CART',
        totalHarga: 319999,
        berat: 0.75,
        shopping: [
            {
                id: 1,
                product: {
                    id: 2,
                    nama: ['SHOE NARA A1\n', 'Rp 50000'],
                    gambar: [ShoeN, ShoeNa, ShoeNara, ShoeNara4],
                    jeniss: {
                        id: 1,
                        nama: 'Shoe',
                        gambar: Shoe
                    },
                    harga: 50000,
                    bahan: 'Bubble Pop',
                    berat: 0.25,
                    warna: ["GREY", "PINK"],
                    ukuran: ["37", "38", "39", "40"],
                    ready: true
                },
                jumlahPesan: 1,
                totalHarga: 50000,
                keterangan: null,
                warna: "GREY",
                ukuran: "38"
            },
            {
                id: 2,
                product: {
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
                    berat: 0.25,
                    warna: ["BLACK", "WHITE"],
                    ukuran: ["SMALL", "BIG"],
                    ready: true
                },
                jumlahPesan: 1,
                totalHarga: 319999,
                keterangan: null,
                warna: "BLACK",
                ukuran: "SMALL"
            },
            {
                id: 3,
                product: {
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
                    berat: 0.25,
                    warna: ["BLACK", "WHITE"],
                    ukuran: ["SMALL", "BIG"],
                    ready: true
                },
                jumlahPesan: 1,
                totalHarga: 319999,
                keterangan: null,
                warna: "BLACK",
                ukuran: "SMALL"
            }
        ]
    },
    {
        id: 2,
        tanggalPemesanan: 'Monday, 22 September 2020',
        status: 'MOONS',
        totalHarga: 200000,
        berat: 0.5,
        shopping: [
            {
                id: 1,
                product: {
                    id: 4,
                    nama: ['JEANS NARA A1\n', 'Rp 200000'],
                    gambar: [ThousersN, ThousersNa, ThousersNa, ThousersNara],
                    jeniss: {
                        id: 3,
                        nama: 'Thousers',
                        gambar: Thousers
                    },
                    harga: 200000,
                    bahan: 'Poly Denim',
                    berat: 0.25,
                    warna: ["BLACK", "GREY"],
                    ukuran: ["S", "M", "L", "XL", "XXL"],
                    ready: true
                },
                jumlahPesan: 1,
                totalHarga: 200000,
                keterangan: "Please write a romantic birthday greeting card for my girlfriend",
                ukuran: "L"
            },
        ]
    }
];
