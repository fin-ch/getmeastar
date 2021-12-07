const spriteList = [
  "lad00",
  "lad99",
  "bas00",
  "bas01",
  "bas02",
  "bas03",
  "bas04",
  "bas05",
  "bas10",
  "bas11",
  "bas12",
  "bas13",
  "bas14",
  "bas15",
  "bas16",
  "bas20",
  "sky00",
  "sky01",
  "sky02",
  "sky03",
  "sky04",
  "sky05",
  "sky06",
  "sky07",
  "sky08",
  "sky09",
  "sky10",
  "sky11",
  "sky12",
  "sky13",
  "sky14",
  "sky15",
  "sky20",
  "sky21",
  "sky22",
  "sky23",
  "sky24",
  "sky25",
  "sky26",
  "sky27",
  "sky28",
  "sky29",
  "sky30",
  "sky40",
  "sky41",
  "sky42",
  "sky43",
  "sky44",
  "sky45",
  "sky46",
  "sky47",
  "sky48",
  "sky49",
  "sky50",
  "sky60",
  "gir00",
  "boy00",
  "boy01",
  "boy10",
  "boy11",
  "sty00",
  "sty01",
  "sty02",
  "sty03",
  "sty04",
  "sty05",
  "sty06",
  "sty07",
  "stb00",
  "stb01",
  "stb02",
  "stb03",
  "stb04",
  "stb05",
  "stb06",
  "stb07",
  "stp00",
  "stp01",
  "stp02",
  "stp03",
  "stp04",
  "stp05",
  "stp06",
  "stp07",
  "ast00",
  "tel00",
  "tel01",
  "tel02",
  "tel03",
  "tel04",
  "tel05",
  "tel06",
  "tel07",
  "tel08",
  "tel09",
  "tel10",
  "tel20",
  "tel21",
  "tel22",
  "tel23",
  "tel24",
  "tel25",
  "tel26",
  "tel27",
  "tel28",
  "tel29",
  "tel30",
  "ali00",
  "sps01",
  "sps02",
  "sps03",
  "sps04",
  "sps05",
  "sps07",
  "sps08",
  "sps09",
  "sps10",
  "sps11",
  "sps12",
  "sps13",
  "sps14",
  "sps15",
  "sps16",
  "sps17",
  "sps18",
  "sps19",
  "sps20",
  "sps21",
  "sps22",
  "sps23",
  "sps24",
  "sps25",
  "sps26",
  "sps27",
  "sps29",
  "sps30",
  "sps31",
  "sps32",
  "sps33",
  "sps38",
  "sps45",
  "sps50",
  "sps51",
  "sps52",
  "sps53",
  "sps54",
];

const ballonList = [
  "bal00",
  "bal01",
  "bal02",
  "bal03",
  "bal04",
  "bal10",
  "bal11",
];

const sfxList = [
  "00_gameover",
  "01_crash",
  "02_moveladder",
  "03_rotateladder",
  "04_addgrid",
  "05_getstar",
  "06_losestar",
  "07_movechar",
  "08_getitemA",
  "09_getitemB",
  "10_meetalien",
];

const bgmList = [
  "00_intro",
  "01_stage1",
  "02_stage2",
  "03_stage3",
  "04_stage4",
  "05_ending0",
  "06_ending1",
  "07_ending2",
  "99_forall",
];

const __blank__ = null;
const __gri00__ = "#ddd";
const __lad00__ = "lad00";
const __lad99__ = "lad99";
const __sta00__ = "#fb0";
const __obs00__ = "#111";

// grass
const __bas00__ = "bas00";
const __bas01__ = "bas01";
const __bas02__ = "bas02";
const __bas03__ = "bas03";
const __bas04__ = "bas04";
const __bas05__ = "bas05";
const bas0_list = [
  __bas00__,
  __bas01__,
  __bas02__,
  __bas03__,
  __bas04__,
  __bas05__,
];
const __bas10__ = "bas10";
const __bas11__ = "bas11";
const __bas12__ = "bas12";
const __bas13__ = "bas13";
const __bas14__ = "bas14";
const __bas15__ = "bas15";
const __bas16__ = "bas16";
const bas1_list = [
  __bas10__,
  __bas11__,
  __bas12__,
  __bas13__,
  __bas14__,
  __bas15__,
  __bas16__,
];
const __bas20__ = "bas20";

// sky
const __sky00__ = "sky00";
const __sky01__ = "sky01";
const __sky02__ = "sky02";
const __sky03__ = "sky03";
const __sky04__ = "sky04";
const __sky05__ = "sky05";
const __sky06__ = "sky06";
const __sky07__ = "sky07";
const __sky08__ = "sky08";
const __sky09__ = "sky09";
const __sky10__ = "sky10";
const __sky11__ = "sky11";
const __sky12__ = "sky12";
const __sky13__ = "sky13";
const __sky14__ = "sky14";
const __sky15__ = "sky15";
const sky0_list = [
  __sky01__,
  __sky02__,
  __sky03__,
  __sky04__,
  __sky05__,
  __sky06__,
  __sky07__,
  __sky08__,
  __sky09__,
  __sky10__,
  __sky11__,
  __sky12__,
  __sky13__,
  __sky14__,
  __sky15__,
];
const __sky20__ = "sky20";
const __sky21__ = "sky21";
const __sky22__ = "sky22";
const __sky23__ = "sky23";
const __sky24__ = "sky24";
const __sky25__ = "sky25";
const __sky26__ = "sky26";
const __sky27__ = "sky27";
const __sky28__ = "sky28";
const __sky29__ = "sky29";
const __sky30__ = "sky30";
const sky2_list = [
  __sky21__,
  __sky22__,
  __sky23__,
  __sky24__,
  __sky25__,
  __sky26__,
  __sky27__,
  __sky28__,
  __sky29__,
  __sky30__,
];
const __sky40__ = "sky40";
const __sky41__ = "sky41";
const __sky42__ = "sky42";
const __sky43__ = "sky43";
const __sky44__ = "sky44";
const __sky45__ = "sky45";
const __sky46__ = "sky46";
const __sky47__ = "sky47";
const __sky48__ = "sky48";
const __sky49__ = "sky49";
const __sky50__ = "sky50";
const sky4_list = [
  __sky41__,
  __sky42__,
  __sky43__,
  __sky44__,
  __sky45__,
  __sky46__,
  __sky47__,
  __sky48__,
  __sky49__,
  __sky50__,
];
const __sky60__ = "sky60";

// chars
const __boy00__ = "boy00";
const __boy01__ = "boy01";
const __boy10__ = "boy10";
const __boy11__ = "boy11";

// ballons
const __bal00__ = "bal00";
const __bal01__ = "bal01";
const __bal02__ = "bal02";
const __bal03__ = "bal03";
const __bal04__ = "bal04";
const __bal10__ = "bal10";
const __bal11__ = "bal11";

// stars
const __stb00__ = "stb00";
const __stb01__ = "stb01";
const __stb02__ = "stb02";
const __stb03__ = "stb03";
const __stb04__ = "stb04";
const __stb05__ = "stb05";
const __stb06__ = "stb06";
const __stb07__ = "stb07";
const stb0_list = [
  __stb00__,
  __stb01__,
  __stb02__,
  __stb03__,
  __stb04__,
  __stb05__,
  __stb06__,
  __stb07__,
];
const __stp00__ = "stp00";
const __stp01__ = "stp01";
const __stp02__ = "stp02";
const __stp03__ = "stp03";
const __stp04__ = "stp04";
const __stp05__ = "stp05";
const __stp06__ = "stp06";
const __stp07__ = "stp07";
const stp0_list = [
  __stp00__,
  __stp01__,
  __stp02__,
  __stp03__,
  __stp04__,
  __stp05__,
  __stp06__,
  __stp07__,
];
const __sty00__ = "sty00";
const __sty01__ = "sty01";
const __sty02__ = "sty02";
const __sty03__ = "sty03";
const __sty04__ = "sty04";
const __sty05__ = "sty05";
const __sty06__ = "sty06";
const __sty07__ = "sty07";
const sty0_list = [
  __sty00__,
  __sty01__,
  __sty02__,
  __sty03__,
  __sty04__,
  __sty05__,
  __sty06__,
  __sty07__,
];

// obstacles
const __ast00__ = "ast00";

// objects
const __gir00__ = "gir00";
const __ali00__ = "ali00";
const __tel00__ = "tel00";
const __tel01__ = "tel01";
const __tel02__ = "tel02";
const __tel03__ = "tel03";
const __tel04__ = "tel04";
const __tel05__ = "tel05";
const __tel06__ = "tel06";
const __tel07__ = "tel07";
const __tel08__ = "tel08";
const __tel09__ = "tel09";
const __tel10__ = "tel10";
const tel0_list = [
  __tel00__,
  __tel01__,
  __tel02__,
  __tel03__,
  __tel04__,
  __tel05__,
  __tel06__,
  __tel07__,
  __tel08__,
  __tel09__,
  __tel10__,
]
const __tel20__ = "tel20";
const __tel21__ = "tel21";
const __tel22__ = "tel22";
const __tel23__ = "tel23";
const __tel24__ = "tel24";
const __tel25__ = "tel25";
const __tel26__ = "tel26";
const __tel27__ = "tel27";
const __tel28__ = "tel28";
const __tel29__ = "tel29";
const __tel30__ = "tel30";
const tel2_list = [
  __tel20__,
  __tel21__,
  __tel22__,
  __tel23__,
  __tel24__,
  __tel25__,
  __tel26__,
  __tel27__,
  __tel28__,
  __tel29__,
  __tel30__,
]

const __sps01__ = "sps01";
const __sps02__ = "sps02";
const __sps03__ = "sps03";
const __sps04__ = "sps04";
const __sps05__ = "sps05";
const __sps07__ = "sps07";
const __sps08__ = "sps08";
const __sps09__ = "sps09";
const __sps10__ = "sps10";
const __sps11__ = "sps11";
const __sps12__ = "sps12";
const __sps13__ = "sps13";
const __sps14__ = "sps14";
const __sps15__ = "sps15";
const __sps16__ = "sps16";
const __sps17__ = "sps17";
const __sps18__ = "sps18";
const __sps19__ = "sps19";
const __sps20__ = "sps20";
const __sps21__ = "sps21";
const __sps22__ = "sps22";
const __sps23__ = "sps23";
const __sps24__ = "sps24";
const __sps25__ = "sps25";
const __sps26__ = "sps26";
const __sps27__ = "sps27";
const __sps29__ = "sps29";
const __sps30__ = "sps30";
const __sps31__ = "sps31";
const __sps32__ = "sps32";
const __sps33__ = "sps33";
const __sps38__ = "sps38";
const __sps45__ = "sps45";
const __sps50__ = "sps50";
const __sps51__ = "sps51";
const __sps52__ = "sps52";
const __sps53__ = "sps53";
const __sps54__ = "sps54";