import { Button, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const NotFoundPage = () => {
 

  const navigate = useNavigate();

  const handleBack = ()=>{
    navigate(-1);
  }
    return (
      <div className="test bg-cover h-full w-full flex flex-col justify-center items-center">
        <div className='bg-cover h-[60%] w-[60%]'  style={{backgroundImage : `url("images/NotFounded.png")`}}>
        </div>
        <p className='text-3xl p-5' style={{fontFamily : "Negaar-Bold"}}>.متاسفانه پیج مورد نظر شما یافت نشد</p>

          <ConfigProvider
            theme={{
              token: {
                  fontFamily: 'Vanilla',
              },
            }}
          >
              <Button type="primary" size="large" icon={<IoMdArrowRoundBack/>} onClick={handleBack}>
                بازگشت
              </Button>
          </ConfigProvider>
      </div>
        
    );
  }

  export default NotFoundPage;