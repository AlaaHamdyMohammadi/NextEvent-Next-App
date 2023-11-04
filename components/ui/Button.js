import Link from "next/link"
import style from './Button.module.css';

function Button({link, children}) {
    return (
      <Link className={style.btn} href={link}>
        {children}
      </Link>
    );
}

export default Button


