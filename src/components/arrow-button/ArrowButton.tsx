import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				!props.isOpen
					? styles.container
					: `${styles.container} ${styles.container_open}`
			}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					!props.isOpen ? styles.arrow : `${styles.arrow} ${styles.arrow_open}`
				}
				onClick={props.onClick}
			/>
		</div>
	);
};
