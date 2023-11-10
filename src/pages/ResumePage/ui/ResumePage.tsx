import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import cls from './ResumePage.module.scss';

interface ResumePageProps {
    className?: string;
}

const ResumePage = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.ResumePage, {}, [className])}>
            ResumePage
        </Page>
    );
});

export default ResumePage;
