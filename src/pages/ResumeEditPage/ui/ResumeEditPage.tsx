import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { fetchResumeData } from 'pages/ResumePage/requests/getResume';
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Page } from 'shared/ui/Page/Page';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ResumeEditPage.module.scss';
import { updateResume } from '../requests/updateResume';

interface ResumeEditPageProps {
    className?: string;
}

const ResumeEditPage = memo((props: ResumeEditPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const user = useSelector(getUserData);
    const admin = user?.role === 'ADMIN';

    const [updatePhone, setPhone] = useState<string>('');
    const [updateMail, setMail] = useState<string>('');
    const [updateTelegram, setTelegram] = useState<string>('');
    const [updateSummary, setSummary] = useState<string>('');
    const [updateSkills, setSkills] = useState<string>('');
    const [updateLanguages, setLanguages] = useState<string>('');

    const loadResumeDataEng = useCallback(async () => {
        try {
            const data = await fetchResumeData(1);
            setPhone(data.phone);
            setMail(data.mail);
            setTelegram(data.telegram);
            setSummary(data.summary);
            setSkills(data.skills.join(', '));
            setLanguages(data.languages.join(', '));
        } catch (error) {
            console.error('Error loading resume data:', error);
        }
    }, []);

    const loadResumeDataRus = useCallback(async () => {
        try {
            const data = await fetchResumeData(2);
            setPhone(data.phone);
            setMail(data.mail);
            setTelegram(data.telegram);
            setSummary(data.summary);
            setSkills(data.skills.join(', '));
            setLanguages(data.languages.join(', '));
        } catch (error) {
            console.error('Error loading resume data:', error);
        }
    }, []);

    const onPhoneChange = useCallback((value: string) => {
        setPhone(value);
    }, []);

    const onMailChange = useCallback((value: string) => {
        setMail(value);
    }, []);

    const onTelegramChange = useCallback((value: string) => {
        setTelegram(value);
    }, []);

    const onSummaryChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setSummary(event.currentTarget.value);
    }, []);

    const onSkillsChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setSkills(event.currentTarget.value);
    }, []);

    const onLanguagesChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setLanguages(event.currentTarget.value);
    }, []);

    const sendDataEng = useCallback(async () => {
        const updatedResumeData = {
            phone: updatePhone,
            mail: updateMail,
            telegram: updateTelegram,
            summary: updateSummary,
            skills: updateSkills.split(', '),
            languages: updateLanguages.split(', '),

        };

        updateResume(1, updatedResumeData, user?.token)
            .then((data) => {
                console.log('Resume updated successfully:', data);
            })
            .catch((error) => {
                console.error('Error updating resume:', error.message);
            });
    }, [updateLanguages, updateMail, updatePhone, updateSkills, updateSummary, updateTelegram, user?.token]);

    const sendDataRu = useCallback(async () => {
        const updatedResumeData = {
            phone: updatePhone,
            mail: updateMail,
            telegram: updateTelegram,
            summary: updateSummary,
            skills: updateSkills.split(', '),
            languages: updateLanguages.split(', '),

        };

        updateResume(2, updatedResumeData, user?.token)
            .then((data) => {
                console.log('Resume updated successfully:', data);
            })
            .catch((error) => {
                console.error('Error updating resume:', error.message);
            });
    }, [updateLanguages, updateMail, updatePhone, updateSkills, updateSummary, updateTelegram, user?.token]);

    if (user !== undefined) {
        if (!admin) {
            return (
                <Navigate to={RoutePath.main} />
            );
        }
    }

    return (
        <Page className={classNames(cls.ResumeEditPage, {}, [className])}>
            <div className={cls.langBtns}>
                <div
                    className={cls.btn}
                    onClick={loadResumeDataEng}
                >
                    {t('eng')}
                </div>
                <div
                    className={cls.btn}
                    onClick={loadResumeDataRus}
                >
                    {t('ru')}
                </div>
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Phone')}
                </p>
                <Input
                    value={updatePhone}
                    onChange={onPhoneChange}
                />
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Mail')}
                </p>
                <Input
                    value={updateMail}
                    onChange={onMailChange}
                />
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Telegram')}
                </p>
                <Input
                    value={updateTelegram}
                    onChange={onTelegramChange}
                />
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Summary')}
                </p>
                <TextArea
                    value={updateSummary}
                    onChange={onSummaryChange}
                    className={cls.textArea}
                />
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Skills')}
                </p>
                <TextArea
                    value={updateSkills}
                    onChange={onSkillsChange}
                    className={cls.textArea}
                />
            </div>
            <div className={cls.resumeField}>
                <p className={cls.resumeFieldTitle}>
                    {t('Languages')}
                </p>
                <TextArea
                    value={updateLanguages}
                    onChange={onLanguagesChange}
                    className={cls.textArea}
                />
            </div>
            <Button
                theme={ButtonTheme.BACKGROUND_INVERTED}
                onClick={sendDataEng}
            >
                {t('Send english')}
            </Button>
            <Button
                onClick={sendDataRu}
            >
                {t('Send russian')}
            </Button>
        </Page>
    );
});

export default ResumeEditPage;
