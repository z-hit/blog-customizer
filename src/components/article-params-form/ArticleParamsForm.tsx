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
	const formRef = useRef<HTMLDivElement | null>(null);

	function handleChange(type: keyof ArticleStateType, value: OptionType) {
		setFormState((prev) => ({
			...prev,
			[type]: value,
		}));
	}

	function handleSubmit(evt: FormEvent) {
		evt.preventDefault();
		props.onChange(formState);
	}

	function handleReset(evt: FormEvent) {
		evt.preventDefault();
		props.onChange(defaultArticleState);
		setFormState(defaultArticleState);
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
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
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
						placeholder={formState.fontFamilyOption.title}
						title='шрифт'
						selected={formState.fontFamilyOption}
						onChange={(selected) => handleChange('fontFamilyOption', selected)}
					/>
					<RadioGroup
						type='fontSizeOption'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={(selected) => handleChange('fontSizeOption', selected)}
					/>
					<Select
						type='fontColor'
						options={fontColors}
						placeholder={formState.fontColor.title}
						title='цвет шрифта'
						selected={formState.fontColor}
						onChange={(selected) => handleChange('fontColor', selected)}
					/>
					<Separator />
					<Select
						type='backgroundColor'
						options={backgroundColors}
						placeholder={formState.backgroundColor.title}
						title='цвет фона'
						selected={formState.backgroundColor}
						onChange={(selected) => handleChange('backgroundColor', selected)}
					/>
					<Select
						type='contentWidth'
						options={contentWidthArr}
						placeholder={formState.contentWidth.title}
						title='ширина контента'
						selected={formState.contentWidth}
						onChange={(selected) => handleChange('contentWidth', selected)}
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
