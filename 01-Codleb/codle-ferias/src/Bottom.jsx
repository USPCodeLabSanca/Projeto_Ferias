const keyStatusStyles = 
{
    padrão: "bg-[#333333]",
    correto: "bg-[#5dc8ae]",
    quase: "bg-ambar-700 ",
    incorreto: "bg-black",
}

function Key({ value, status, onClick }) 
{
    const keyStyle = `rounded text-white text-xl flex justify-center items-center hover:-translate-y-0.5 duration-200 cursor-pointer ${keyStatusStyles[status] || keyStatusStyles['padrão']}`;
    let specialClasses = '';

    if (value === 'ENTER') 
    {
        specialClasses = 'ml-7 md:ml-9 w-26 md:w-33';
    } 
    else if (value === '<')
    {
        specialClasses = 'ml-6 md:ml-4 w-10 md:w-12';
    }

    return (
        <div className={`${keyStyle} ${specialClasses}`} onClick={onClick}>
            {value}
        </div>
    );
}

function Bottom ({keyboardStatus, onEnterPress})
{
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<'];
    const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'];

    return (
        <div className="row-span-2 grid grid-rows-3">
            <div className="row-span-1 grid grid-cols-10 gap-1 md:gap-2 mb-2 -mt-2 -translate-x-7">
                {row1.map(key => <Key key={key} value={key} status={keyboardStatus[key]} />)}
            </div>
            <div className="row-span-1 grid grid-cols-10 gap-1 md:gap-2">
                {row2.map(key => <Key key={key} value={key} status={keyboardStatus[key]} />)}
            </div>
            <div className="row-span-1 grid grid-cols-10 gap-1 md:gap-2 mt-2 -mb-2 translate-x-6">
                {row3.map(key => 
                    (
                        <Key 
                            key={key} 
                            value={key} 
                            status={keyboardStatus[key]}
                            onClick={key === 'ENTER' ? onEnterPress : null} 
                        />
                    ))
                }
            </div>
        </div>
    );
}
export default Bottom