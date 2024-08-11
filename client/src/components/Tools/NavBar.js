import { Link } from "react-router-dom";


const Navigation = () => {
  const token = localStorage.getItem('token');
    return (
      <div className="NavigationBar w-full bg-neutral-700 text-neutral-100 h-14 px-3" dir="rtl" style={{fontFamily : 'Negaar-Regular'}}>
        <ul className="flex h-full text-xl font-bold pt-1 relative">
            <li className="px-3 h-10 pt-3 w-10 bg-cover" style={{ backgroundImage: `url(".././images/Favicon.png")` }}></li>
            <li className="px-5 h-full pt-2 pr-10 hover:text-neutral-400 transtion-all duration-300"><Link to="/home">خانه</Link></li>
            <li className="px-5 h-full pt-2 hover:text-neutral-400 transtion-all duration-300"><Link to="#">رزومه ساز</Link></li>
            <li className="px-5 h-full pt-2 hover:text-neutral-400 transtion-all duration-300"><Link to="#">مشاهده روزمه ها</Link></li>
            <li className="px-5 h-full pt-2 hover:text-neutral-400 transtion-all duration-300"><Link to="#">دیگر</Link></li>
            { !token &&
              <ul className="flex absolute left-4 top-2 mb-3 h-10 gap-2">
                <Link to="/Login" className="flex px-5 bg-red-500 hover:bg-red-700 rounded-sm items-center duration-300 transition-all"><li>ورود</li></Link>
                <span className="flex items-center text-4xl cursor-default">/</span>
                <Link to="/Register" className="flex px-5 border-2 border-solid border-emerald-400 text-emerald-400 hover:bg-neutral-500 rounded-sm items-center transition-all duration-300"><li>ثبت نام</li></Link>
              </ul>
            }
            { token &&
              <ul className="flex absolute left-4 top-2 mb-3 h-10 gap-2">
                <Link to="/Dashboard" className="flex px-5 border-2 border-solid border-emerald-400 text-emerald-400 hover:bg-neutral-500 rounded-sm items-center transition-all duration-300"><li>داشبورد</li></Link>
              </ul>
            }
        </ul>

      </div>
        
    );
  }

  export default Navigation;