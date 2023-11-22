import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { CodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlock.module.scss';
import IconCopy from '../../../../shared/assets/icons/icon-copy.svg';
import IconDone from '../../../../shared/assets/icons/icon-done.svg';

interface ArticleCodeBlockProps {
    className?: string;
    block?: CodeBlock;
}

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
    const {
        className,
        block,
    } = props;

    const [copyFlag, setCopyFlag] = useState(false);

    const onCopyText = useCallback(() => {
        const code = block?.code;
        if (code !== undefined) {
            navigator.clipboard.writeText(code);
            setCopyFlag(true);
            setTimeout(() => {
                setCopyFlag(false);
            }, 900);
        }
    }, [block]);

    return (
        <div className={cls.codeBlock}>
            <pre className={classNames(cls.ArticleCodeBlock, {}, [className])}>
                {block?.code}
            </pre>
            <Button
                theme={ButtonTheme.CLEAR}
                className={cls.button}
                onClick={onCopyText}
                disabled={copyFlag}
            >
                {!copyFlag && (
                    <Icon
                        Svg={IconCopy}
                        className={cls.icon}
                    />
                )}
                {copyFlag && (
                    <Icon
                        Svg={IconDone}
                        className={cls.icon}
                    />
                )}
            </Button>
        </div>
    );
});
