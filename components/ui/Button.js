import Link from "next/link";
import style from "./Button.module.css";

function Button({ link, children, onClick }) {
  if (link) {
    return (
      <Link className={style.btn} href={link}>
        {children}
      </Link>
    );
  }

  return (
    <button className={style.btn} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
