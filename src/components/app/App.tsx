import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

import clsx from 'clsx';

export const App = () => {
	const [params, setParams] = useState(defaultArticleState);
	function handleChange(newParams: ArticleStateType) {
		setParams(newParams);
	}
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': params.fontFamilyOption.value,
					'--font-size': params.fontSizeOption.value,
					'--font-color': params.fontColor.value,
					'--container-width': params.contentWidth.value,
					'--bg-color': params.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={handleChange} />
			<Article />
		</div>
	);
};
