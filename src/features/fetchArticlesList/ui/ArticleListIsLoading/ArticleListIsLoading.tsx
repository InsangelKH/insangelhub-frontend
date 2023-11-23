import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleView } from '../../model/types/articlesList';
import cls from './ArticleListIsLoading.module.scss';

interface ArticleListIsLoadingProps {
    className?: string;
    view?: ArticleView;
}

export const ArticleListIsLoading = memo((props: ArticleListIsLoadingProps) => {
    const {
        className,
        view,
    } = props;

    const arraySmall = [0, 1, 2, 3, 4, 5, 6, 7];
    const arrayBig = [0, 1, 2, 3];

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(cls.isLoadingBig, {}, [className])}>
                {arrayBig.map((component, index) => (
                    <Skeleton
                        width="100%"
                        height={350}
                        border="15px"
                        key={index}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleListIsLoading, {}, [className])}>
            {arraySmall.map((component, index) => (
                <Skeleton
                    width={200}
                    height={250}
                    border="15px"
                    key={index}
                />
            ))}
        </div>
    );
});
