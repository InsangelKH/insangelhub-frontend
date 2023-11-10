import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Burger } from 'shared/ui/Burger/Burger';
import { SidebarLinks } from '../links/SidebarLinks';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const [collapsed, setCollapsed] = useState(false);
    const [collapsing, setCollapsing] = useState(false);

    const onFold = useCallback(() => {
        setCollapsed((prev) => !prev);
        setCollapsing(true);
        setTimeout(() => {
            setCollapsing(false);
        }, 300);
    }, []);

    const mods = {
        [cls.collapsed]: collapsed,
        [cls.collapsing]: collapsing,
    };

    return (
        <aside className={classNames(cls.Sidebar, mods, [className])}>
            <Burger
                className={cls.foldWrapper}
                onClick={onFold}
            />
            <SidebarLinks collapsed={collapsed} collapsing={collapsing} />
        </aside>
    );
});
