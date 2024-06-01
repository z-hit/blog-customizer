import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { Text } from 'components/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;
	type: keyof ArticleStateType;
	options: OptionType[];
	placeholder?: OptionType;
	onChange?: (type: keyof ArticleStateType, selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title, type } =
		props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (
		type: keyof ArticleStateType,
		option: OptionType
	) => {
		setIsOpen(false);
		onChange?.(type, option);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				<img
					src={arrowDown}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
				<div
					className={clsx(
						styles.placeholder,
						styles[selected?.optionClassName || '']
					)}
					data-status={status}
					data-selected={!!selected?.value}
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder?.title}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(type, option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
