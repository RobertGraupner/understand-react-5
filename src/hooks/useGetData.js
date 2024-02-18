import { useState, useEffect } from 'react';
//  hook do pobierania danych z serwera. Nazwa custom hooka musi zaczynać się od słowa use
export function useGetData(url) {
	// stan przechowujący dane. Domyślnie jest to pusta tablica []
	// stan ten tworzy się w komponencie, który wykorzystuje ten hook. Stany są lokalne dla komponentów
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isCancelled = false;

		fetch(url)
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
				setData(res);
			})
			.catch((e) => {
				setError(e);
			});

		return () => {
			isCancelled = true;
		};
	}, [url]);
	// zwracamy tablicę z danymi i błędem
	return [data, error];
}
