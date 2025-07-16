export default function Bloco({ letra, cor }) {
    const corClasses = {
      cinza: 'bg-gray-500 border-gray-500 text-white',
      verde: 'bg-green-500 border-green-500 text-white',
      amarelo: 'bg-yellow-500 border-yellow-500 text-white',
      default: 'border-gray-400'
    };
  
    const blocoClasses = `w-16 h-16 border-2 rounded-lg flex items-center justify-center text-3xl font-bold uppercase ${corClasses[cor] || corClasses.default}`;

    return (
      <div className={blocoClasses}>
        {letra}
      </div>
    );
  }