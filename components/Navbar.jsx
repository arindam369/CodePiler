import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Navbar(){
    return (
        <div className={styles.navContainer}>
            <h2>CodePiler</h2>

            <div className={styles.rightPart}>
                <Link href="/" className="linkTag">Submit Code</Link>
                <Link href="/submissions" className="linkTag">Submissions</Link>
            </div>
        </div>
    )
}