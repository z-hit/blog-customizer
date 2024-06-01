import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

export const ArticleParamsForm = () => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement | null>(null);

	function handleChange(type: keyof ArticleStateType, value: OptionType) {
		setFormState((prev) => ({
			...prev,
			[type]: value,
		}));
	}

	function handleSubmit(evt: FormEvent) {
		evt.preventDefault();
		console.log('submit works');
		console.log(formState);
	}

	function handleReset(evt: FormEvent) {
		evt.preventDefault();
		setFormState(defaultArticleState);
		console.log('reset works');
		console.log(formState);
	}

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: formRef,
		onChange: setFormOpen,
	});

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setFormOpen(!isFormOpen)}
			/>
			<aside
				className={
					!isFormOpen
						? styles.container
						: `${styles.container} ${styles.container_open}`
				}>
				<form
					onReset={handleReset}
					onSubmit={handleSubmit}
					className={styles.form}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						type='fontFamilyOption'
						options={fontFamilyOptions}
						placeholder={fontFamilyOptions[0].title}
						title='шрифт'
						selected={null}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title='размер шрифта'
					/>
					<Select
						type='fontColor'
						options={fontColors}
						placeholder={fontColors[0].title}
						title='цвет шрифта'
						selected={null}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<Separator />
					<Select
						type='backgroundColor'
						options={backgroundColors}
						placeholder={backgroundColors[0].title}
						title='цвет фона'
						selected={null}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<Select
						type='contentWidth'
						options={contentWidthArr}
						placeholder={contentWidthArr[0].title}
						title='ширина контента'
						selected={null}
						onChange={(type, selected) => handleChange(type, selected)}
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
