import sla from './assets/images/sla.png'; 

function Logo() {
  return (
    <div className="codle">
      <img src={sla} width={80} height={80} />
      <h1>CODLE</h1>
    </div>
  );
}

export default Logo;