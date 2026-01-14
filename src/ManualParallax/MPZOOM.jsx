//src/ManualParallax/M.jsx
import { useEffect, useRef } from "react";
import "./MPZOOM.css";

// importa las imágenes para que el bundler las maneje
import img1 from "../assets/images/vinedobarriles.jpg";
import img2 from "../assets/images/vinedo-barril-de-vino-sobre-fondo-de-marmol.jpg";
import img3 from "../assets/images/vinedo-botella-oscura.jpg";

export function MPZOOM () {
// useRef es como una "cajita" donde guardamos algo que no queremos que se pierda 
// pero que no necesita redibujar la pantalla cada vez que cambia.
const parallaxElementsRef = useRef(null); // Para guardar el contenedor principal.
const tickingRef = useRef(false);         // Un interruptor para no cansar al navegador con tantos cálculos.
const observerRef = useRef(null);         // La "cámara" que vigilará si los elementos aparecen en pantalla.

  useEffect(() => {
    const parallaxElements = Array.from(document.querySelectorAll(".parallax-block"));
    const fadeElements = document.querySelectorAll(".fade");

const updateParallax = () => {
  parallaxElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Solo calculamos si el bloque está visible en la ventana
    if (rect.top <= vh && rect.bottom >= 0) {
      // Calculamos el progreso (0 cuando entra por abajo, 1 cuando sale por arriba)
      const progress = (vh - rect.top) / (vh + rect.height);
      
      // 1. Zoom: de 1 a 1.2
      const scale = 1 + (progress * 0.2);
      el.style.setProperty("--zoom-scale", scale.toFixed(3));

      // 2. Parallax Texto: se desplaza de 50px a -50px
      const textMove = 50 - (progress * 100);
      el.style.setProperty("--text-y", `${textMove}px`);

      // 3. Opacidad: de 0.8 a 0.2
      const opacity = 0.8 - (progress * 0.6);
      el.style.setProperty("--overlay-opacity", opacity.toFixed(3));
    }
  });
  tickingRef.current = false;
};
    // Optimización (Ticking)
    // No queremos que el ordenador explote intentando calcular 100 veces por segundo. 
    // Por eso usamos requestAnimationFrame. Es como decirle al navegador: 
    // "Cuando tengas un huequito libre antes de pintar el siguiente frame, haz este cálculo".
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateParallax);
        tickingRef.current = true;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Si el elemento entra en el visor (isIntersecting), le ponemos la clase "visible"
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.15 }); // Se activa cuando vemos el 15% del elemento.

    observerRef.current = observer;
    fadeElements.forEach(el => observer.observe(el));
    updateParallax();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateParallax);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [parallaxElementsRef, tickingRef, observerRef]);

return (
    <div ref={parallaxElementsRef}>
      <div
        className="parallax-block"
        style={{ "--bg-image": `url(${img1})` }} // Cambiamos backgroundImage por esta variable
      >
        <div className="caption fade">
          <h1 className="border">BODEGAS PERRIO</h1>
        </div>
      </div>

      <div className="section fade">
        <h3 className="section-title">Bodegas con estilo único en Urdaibai</h3>
        <p className="parrafo">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquid.
        </p>
      </div>

      <div
        className="parallax-block"
        style={{ "--bg-image": `url(${img2})` }} // Variable para la segunda imagen
      >
        <div className="caption fade">
          <span className="border">Bizkaiko Txakolina</span>
        </div>
      </div>

      <div className="section fade">
        <h3 className="section-title">En el corazón de la naturaleza</h3>
        <p className="parrafo">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div
        className="parallax-block"
        style={{ "--bg-image": `url(${img3})` }} // Variable para la tercera imagen
      >
        <div className="caption fade">
          <span className="border">Eskerrik asko</span>
        </div>
      </div>

      <div className="section fade">
        <h3 className="section-title">Contacta con nosotros</h3>
        <p className="parrafo">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquid.
        </p>
      </div>
    </div>
  );
}