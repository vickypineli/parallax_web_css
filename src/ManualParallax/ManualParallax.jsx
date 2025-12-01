import "./manualParallax.css";

export default function ManualParallax() {
  return (
    <div>
      <div className="bgimg-1">
        <div className="caption">
          <span className="border">BODEGAS PERRIO</span>
        </div>
      </div>  

      <div className="section">
        <h3 className="section-title">Bodegas con estilo único en Urdaibai</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquid, eaque        
          doloremque officia quos quae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      
      <div className="bgimg-2">
        <div className="caption">
          <span className="border">Bizkaiko Txakolina</span>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">En el corazón de la naturaleza</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquid, eaque        
          doloremque officia quos quae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="bgimg-3">
        <div className="caption">
          <span className="border">Eskerrik asko</span>
        </div>
      </div>
    </div>
  );
}
