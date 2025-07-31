

function Background (props)
{
    return (
        <div className="min-h-screen flex justify-center bg-[#282828]">
            <div className=" max-h-screen w-[28em] md:w-[40em] my-4 grid grid-rows-10">
                {props.children}
            </div>
        </div>
    )
}
export default Background