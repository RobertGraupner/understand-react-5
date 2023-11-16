import { useEffect, useState } from 'react';
import styles from './Results.module.css';

export function Results() {
	const [results, setResults] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isCancelled = false;

		fetch('/results.json')
			.then((res) => {
				if (res.ok) {
					setError(null);
					return res.json();
				}

				throw new Error('Coś poszło nie tak...');
			})
			.then((res) => {
				if (isCancelled) {
					return;
				}
				setResults(res);
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
				error.message
			) : (
				<ul className={styles.list}>
					{results.map((result) => (
						<li key={result.name} className={styles.item}>
							<strong>{result.name}</strong>
							<span> - {result.score}</span>
							<div className={styles.progressContainer}>
								<div
									className={styles.progress}
									style={{ width: `${result.score}%` }}></div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
