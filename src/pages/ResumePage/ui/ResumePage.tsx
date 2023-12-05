import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { Page } from 'shared/ui/Page/Page';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ResumePage.module.scss';
import { fetchResumeData } from '../requests/getResume';
import { ResumeResponse } from '../types/ResumeResponse.interface';

interface ResumePageProps {
    className?: string;
}

const ResumePage = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    const { t, i18n } = useTranslation('resume');

    const user = useSelector(getUserData);
    const [resumeData, setResumeData] = useState<ResumeResponse | null>(null);

    const navigate = useNavigate();

    const onEditClick = useCallback(() => {
        navigate(RoutePath.resume_update);
    }, [navigate]);

    useEffect(() => {
        if (i18n.language === 'en') {
            const loadResumeData = async () => {
                try {
                    const data = await fetchResumeData(1);
                    setResumeData(data);
                } catch (error) {
                    console.error('Error loading resume data:', error);
                }
            };
            loadResumeData();
        } else {
            const loadResumeData = async () => {
                try {
                    const data = await fetchResumeData(2);
                    setResumeData(data);
                } catch (error) {
                    console.error('Error loading resume data:', error);
                }
            };
            loadResumeData();
        }
    }, [i18n.language]);

    return (
        <Page className={classNames(cls.ResumePage, {}, [className])}>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('name')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {t('ibragim')}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('phone')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.phone}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('mail')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.mail}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('telegram')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.telegram}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('summary')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.summary}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('skills')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.skills.join(', ')}
                </p>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('languages')}
                </p>
                <p className={cls.resumeFieldValue}>
                    {resumeData?.languages.join(', ')}
                </p>
            </div>
            {user?.role === 'ADMIN'
            && (
                <Button
                    className={cls.changeBtn}
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    onClick={onEditClick}
                >
                    {t('change resume')}
                </Button>
            )}
        </Page>
    );
});

export default ResumePage;
