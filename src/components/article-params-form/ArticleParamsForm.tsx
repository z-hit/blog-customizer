import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);
	function toggleOpen() {
		setOpen(!open);
	}

	return (
		<>
			<ArrowButton isOpen={open} toggleIsOpen={toggleOpen} />
			<aside
				className={
					!open
						? styles.container
						: `${styles.container} ${styles.container_open}`
				}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
