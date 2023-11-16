import { useEffect, useState } from "react";
import styles from "./Employees.module.css";

export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        fetch("/employees.json")
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
                setEmployees(res);
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
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>
                                    {employee.name} {employee.last_name}
                                </td>
                                <td>{employee.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
