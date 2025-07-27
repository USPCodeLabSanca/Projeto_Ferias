import logo from "../assets/images/logo.png"
import Grid from "./components/Grid";

function App() {
  return (
    <>
      <header className="p-3 flex justify-center items-center">
        <img className="w-[80px] h-[80px]" src={logo} alt="" />
        <h1 className="text-white font-bold text-4xl">CODLE</h1>
      </header>
      <main className="">
        <div className="flex justify-center items-center text-white">
          <Grid />
        </div>
      </main>
    </>
  );
}

export default App;
