import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './ArticleCard.module.scss';

interface ArticleCardProps {
    className?: string;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    const big = true;

    if (big) {
        return (
            <div className={cls.cardBig}>
                <div className={cls.authorDate}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                        alt="img"
                        className={cls.avatarBig}
                    />
                    <div className={cls.authorBig}>
                        Insangel
                    </div>
                    <div className={cls.dateBig}>
                        21.02.2023
                    </div>
                </div>
                <h2 className={cls.titleBig}>
                    Как разработать телеграмм бота для генерации сложных паролей
                </h2>
                <div className={cls.subtitleBig}>
                    Что нового в JS?
                </div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                    alt="img"
                    className={cls.imageBig}
                />
                <div className={cls.textBig}>
                    Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!, или другую подобную, средствами некоего языка.
                    JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
                    Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:
                </div>
                <Button className={cls.btnBig}>
                    {t('read more')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.cardSmall, {}, [className])}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                alt="img"
                className={cls.imageSmall}
            />
            <div className={cls.typeSmall}>
                IT
            </div>
            <div className={cls.titleSmall}>
                JAVASCRIPT NEWS JAVA NEWS NODE JS NEW
            </div>
        </div>
    );
});
