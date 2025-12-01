//src/ManualParallax/ManualParallax.jsx
import { useEffect, useRef } from "react";
import "./manualParallax.css";

// importa las imágenes para que el bundler las maneje
import img1 from "../assets/images/vinedopaisaje.jpg";
import img2 from "../assets/images/vinedo-uvas-rojas-y-vino.jpg";
import img3 from "../assets/images/vinedo-botella-oscura.jpg";

export default function ManualParallax() {
  // eslint-disable-next-line no-unused-vars
  const parallaxElementsRef = useRef(null);
  const tickingRef = useRef(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const parallaxElements = Array.from(document.querySelectorAll(".parallax-block"));
    const fadeElements = document.querySelectorAll(".fade");

    const updateParallax = () => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.2;
        const rect = el.getBoundingClientRect();

        const offset = -rect.top * speed;
        el.style.backgroundPosition = `center ${offset}px`;

      // === ACLARAR SOLO CUANDO SUBE / OSCURECER CUANDO BAJA ===
      const vh = window.innerHeight;

      // progreso basado en el centro del viewport
      // 0 = oscuro total (mitad hacia abajo)
      // 1 = claro total (mitad hacia arriba)
      let progress = 1 - (rect.top / (vh * 0.5));

      // limitar entre 0 y 1
      progress = Math.min(Math.max(progress, 0), 1);

      // inicio muy oscuro (0.9) → claridad al subir
      const opacity = 0.9 - progress * 0.9;

      el.style.setProperty("--overlay-opacity", opacity.toFixed(3));
      });

      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => updateParallax());
        tickingRef.current = true;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.15 });

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
  }, []);

  return (
    <div>
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
        <h3 className="section-title">BContacta con nosotros</h3>
        <p className="parrafo">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquid.
        </p>
      </div>
    </div>
  );
}
