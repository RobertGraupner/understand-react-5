import { useEffect, useState } from "react";
import styles from "./Stocks.module.css";

export function Stocks() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        fetch("/stocks.json")
            .then((res) => {
                if (res.ok) {
                    setError(null);
                    return res.json();
                }

                throw new Error("Coś poszło nie tak...");
            })
            .then((res) => {
                if (isCancelled) {
                    return;
                }
                setStocks(res);
            })
            .catch((e) => {
                setError(e);
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <section className={styles.section}>
            {error ? (
                <span className={styles.error}>{error.message}</span>
            ) : (
                <ul className={styles.list}>
                    {stocks.map((stock) => (
                        <li key={stock.company_name} className={styles.item}>
                            <div className={styles.wrapper}>
                                <span className={styles.logo}>
                                    {stock.company_name[0]}
                                </span>
                                <strong className={styles.fullName}>
                                    {stock.stock_short_name}
                                </strong>
                                <span className={styles.shortName}>
                                    {stock.company_name}
                                </span>
                                <span className={styles.price}>
                                    Price: {stock.market_price}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
