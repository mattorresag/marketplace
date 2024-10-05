import ArrowDown from "./arrowDown.svg?svgr";
import Vegetables from "./vegetables.svg?svgr";
import Drink from "./drink.svg?svgr";
import NotFoundIcon from "./404.svg?svgr";
import ArrowLeft from "./arrowLeft.svg?svgr";
import ArrowRight from "./arrowRight.svg?svgr";
import CheckCircle from "./check_circle.svg?svgr";
import ChevronLeft from "./chevronLeft.svg?svgr";
import ChevronRight from "./chevronRight.svg?svgr";
import Dislike from "./dislike.svg?svgr";
import Instagram from "./instagram.svg?svgr";
import Like from "./like.svg?svgr";
import Linkedin from "./linkedin.svg?svgr";
import Paste from "./paste.svg?svgr";
import Replace from "./replace.svg?svgr";
import SearchIcon from "./searchIcon.svg?svgr";
import SquareArrowLeft from "./squareArrowLeft.svg?svgr";
import SquareArrowRight from "./squareArrowRight.svg?svgr";
import Car from "./car.svg?svgr";
import Milk from "./milk.svg?svgr";
import Dog from "./dog.svg?svgr";
import Fridge from "./fridge.svg?svgr";
import Bread from "./bread.svg?svgr";
import Meat from "./meat.svg?svgr";
import Cigarrete from "./cigarrete.svg?svgr";
import Medicine from "./medicine.svg?svgr";
import withIconStyles from "./wrapper";
import PaintBrush from "./paintBrush.svg?svgr";
import PaperClip from "./paperClip.svg?svgr";
import House from "./house.svg?svgr";
import Freeze from "./freeze.svg?svgr";
import Broom from "./broom.svg?svgr";
import Perfume from "./perfume.svg?svgr";
import Baby from "./baby.svg?svgr";
import Supplement from "./supplement.svg?svgr";
import TeddyBear from "./teddyBear.svg?svgr";
import ToiletPaper from "./toiletPaper.svg?svgr";
import Basket from "./basket.svg?svgr";
import Products from "./products.svg?svgr";
import Candy from "./candy.svg?svgr";
import Cart from "./cart.svg?svgr";
import MapPin from "./mapPin.svg?svgr";
import Truck from "./truck.svg?svgr";
import Trash from "./trash.svg?svgr";

const rawIcons = {
  Truck,
  MapPin,
  Cart,
  Candy,
  Products,
  Basket,
  ToiletPaper,
  TeddyBear,
  Supplement,
  Baby,
  Perfume,
  Broom,
  House,
  Freeze,
  PaperClip,
  PaintBrush,
  Medicine,
  Cigarrete,
  Meat,
  Bread,
  Dog,
  Milk,
  ArrowDown,
  Vegetables,
  Car,
  Drink,
  NotFoundIcon,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Dislike,
  Instagram,
  Like,
  Linkedin,
  Paste,
  Replace,
  SearchIcon,
  SquareArrowLeft,
  SquareArrowRight,
  Fridge,
  Trash,
};

const Icons = Object.fromEntries(
  Object.entries(rawIcons).map(([key, IconComponent]) => {
    return [key, withIconStyles(IconComponent)];
  })
);

export default Icons;
