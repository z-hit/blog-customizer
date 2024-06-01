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
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	function handleChange(type: keyof ArticleStateType, value: OptionType) {
		setFormState((prev) => ({
			...prev,
			[type]: value,
		}));
	}

	function handleSubmit(evt: FormEvent) {
		evt.preventDefault();
		props.onChange(formState);
		console.log('submit works');
		console.log(formState);
	}

	function handleReset(evt: FormEvent) {
		evt.preventDefault();
		props.onChange(defaultArticleState);
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
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isFormOpen,
				})}>
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
						placeholder={formState.fontFamilyOption}
						title='шрифт'
						selected={formState.fontFamilyOption}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<RadioGroup
						type='fontSizeOption'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<Select
						type='fontColor'
						options={fontColors}
						placeholder={formState.fontColor}
						title='цвет шрифта'
						selected={formState.fontColor}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<Separator />
					<Select
						type='backgroundColor'
						options={backgroundColors}
						placeholder={formState.backgroundColor}
						title='цвет фона'
						selected={formState.backgroundColor}
						onChange={(type, selected) => handleChange(type, selected)}
					/>
					<Select
						type='contentWidth'
						options={contentWidthArr}
						placeholder={formState.contentWidth}
						title='ширина контента'
						selected={formState.contentWidth}
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
