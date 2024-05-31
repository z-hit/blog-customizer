import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

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
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder={fontFamilyOptions[0].title}
						title='шрифт'
						selected={null}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						placeholder={fontColors[0].title}
						title='цвет шрифта'
						selected={null}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder={backgroundColors[0].title}
						title='цвет фона'
						selected={null}
					/>
					<Select
						options={contentWidthArr}
						placeholder={contentWidthArr[0].title}
						title='ширина контента'
						selected={null}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
