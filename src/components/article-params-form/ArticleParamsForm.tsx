import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isFormOpen, setOpen] = useState(false);
	//const [formState, setFormState] = useState({});
	const formRef = useRef<HTMLDivElement | null>(null);

	function toggleOpen() {
		setOpen(!isFormOpen);
	}

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: formRef,
		onChange: setOpen,
	});

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleOpen} />
			<aside
				className={
					!isFormOpen
						? styles.container
						: `${styles.container} ${styles.container_open}`
				}>
				<form className={styles.form}>
					<Separator />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
