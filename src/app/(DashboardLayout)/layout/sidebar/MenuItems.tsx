import {
  IconAperture,
  IconBuildingBank,
  IconCoinPound,
  IconCopy,
  IconCurrencyDollar,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconWeight,
  IconMap ,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Master",
  },
  {
    id: uniqueId(),
    title: "Accident",
    icon: IconBuildingBank,
    href: "/master/accident",
  },
  {
    id: uniqueId(),
    title: "Class",
    icon: IconCurrencyDollar,
    href: "/master/class",
  },
  {
    id: uniqueId(),
    title: "Country",
    icon: IconCoinPound,
    href: "/master/country",
  },
  {
    id: uniqueId(),
    title: "Education Level",
    icon: IconCopy,
    href: "/master/edulevel",
  },
  {
    id: uniqueId(),
    title: "Grade",
    icon: IconTypography,
    href: "/master/grade",
  },
  {
    id: uniqueId(),
    title: "Institute",
    icon: IconBuildingBank,
    href: "/master/institute",
  },
  {
    id: uniqueId(),
    title: "Program",
    icon: IconAperture,
    href: "/master/program",
  },
  {
    id: uniqueId(),
    title: "Schedule",
    icon: IconBuildingBank,
    href: "/master/schedule",
  },
  {
    id: uniqueId(),
    title: "Student",
    icon: IconUserPlus,
    href: "/master/student",
  },
  {
    id: uniqueId(),
    title: "Teacher",
    icon: IconMoodHappy,
    href: "/master/teacher",
  },
  {
    id: uniqueId(),
    title: "Unit",
    icon: IconWeight,
    href: "/master/unit",
  },
  {
    id: uniqueId(),
    title: "Province",
    icon: IconMap,
    href: "/master/province",
   },

  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
