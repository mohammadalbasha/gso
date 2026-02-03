import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const LocalizedArrowIcon = ({locale  }:{locale:string}) => {
const ArrowIcon = locale === "ar" ? IoIosArrowBack : IoIosArrowForward;

return <ArrowIcon />
}

export default LocalizedArrowIcon;
