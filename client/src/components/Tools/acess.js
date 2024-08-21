


const Access = ({message}) => {
    return (
        <>
            <div className="bg-neutral-200 w-full h-screen p-32">
                <p className="flex justify-center items-center text-3xl text-red-500" style={{fontFamily:"Titr"}}>
                    {message}
                </p>
                <img src="/images/accessDenied.png" className="w-96 m-auto" alt="" />
            </div>
        </>
    );
  }

  export default Access;