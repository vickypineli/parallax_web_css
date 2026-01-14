//src/ManualParallax/M.jsx
import { useEffect, useRef } from "react";
import "./MPV.css";

// importa las imágenes para que el bundler las maneje
import img1 from "../assets/images/vinedobarriles.jpg";
import img2 from "../assets/images/vinedo-barril-de-vino-sobre-fondo-de-marmol.jpg";
import img3 from "../assets/images/vinedo-botella-oscura.jpg";

export function MPV () {
// useRef es como una "cajita" donde guardamos algo que no queremos que se pierda 
// pero que no necesita redibujar la pantalla cada vez que cambia.
const parallaxElementsRef = useRef(null); // Para guardar el contenedor principal.
const tickingRef = useRef(false);         // Un interruptor para no cansar al navegador con tantos cálculos.
const observerRef = useRef(null);         // La "cámara" que vigilará si los elementos aparecen en pantalla.

  useEffect(() => {
    const parallaxElements = Array.from(document.querySelectorAll(".parallax-block"));
    const fadeElements = document.querySelectorAll(".fade");

const updateParallax = () => {
      const vh = window.innerHeight;
  parallaxElements.forEach(el => {
    // 1. Obtenemos la velocidad (puedes probar con 0.5 para que se note más)
    const speed = parseFloat(el.dataset.speed) || 0.2;
    const rect = el.getBoundingClientRect();

    // 2. Calculamos el desplazamiento. 
    // Al multiplicar por 'speed', la imagen se mueve más lento que el scroll.
    // Sumamos un pequeño margen inicial (ej. -200px) para que la imagen empiece ya un poco desplazada
    const offset = (-rect.top * speed) - 200;

    // 3. ¡Aquí está el truco! 
    // El primer valor es X (horizontal) y el segundo es Y (vertical).
    // Dejamos vertical en 'center' y movemos la 'X'.
    el.style.backgroundPosition = `${offset}px center`;

        // === ACLARAR SOLO CUANDO SUBE / OSCURECER CUANDO BAJA (Overlay) ===
        let progress = 1 - (rect.top / (vh * 0.5));

        // limitar entre 0 y 1
        progress = Math.min(Math.max(progress, 0), 1);

        // inicio muy oscuro (0.9) → claridad al subir
        const opacity = 0.9 - progress * 0.9;
        el.style.setProperty("--overlay-opacity", opacity.toFixed(3)); // Enviamos este valor a CSS.
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
        data-speed="0.2"
        style={{ backgroundImage: `url(${img1})`, backgroundPosition: "center 0px" }}
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
        data-speed="0.25"
        style={{ backgroundImage: `url(${img2})`, backgroundPosition: "center 0px" }}
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
        data-speed="0.2"
        style={{ backgroundImage: `url(${img3})`, backgroundPosition: "center 0px" }}
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