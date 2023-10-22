import React from "react";
import { IconEditProfile, IconHistory, IconInfo, IconPassword, IconSignOut } from "../../assets";

export const dummyMenu = [
    {
        id: 1,
        nama: "Edit Profile",
        gambar: <IconEditProfile />,
        halaman: "EditProfile"
    },
    {
        id: 2,
        nama: "Change Password",
        gambar: <IconPassword />,
        halaman: "ChangePassword"
    },
    {
        id: 3,
        nama: "Booking History",
        gambar: <IconHistory />,
        halaman: "History"
    },
    {
        id: 4,
        nama: "About",
        gambar: <IconInfo />,
        halaman: "About"
    },
    {
        id: 5,
        nama: "Sign Out",
        gambar: <IconSignOut />,
        halaman: "Login"
    },

]