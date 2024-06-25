import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div>
      <ul className="flex gap-3 text-base font-bold text-primary-darker justify-end mr-10 p-5">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/about">Nosotros</Link>
        </li>
        <li>
          <Link href="/faq">Preguntas y Respuestas</Link>
        </li>
        <li>
          <Link href="/dashboard">Perfil</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
