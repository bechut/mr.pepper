import React, { useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CommonComponent: React.FC<any> = (props) => {
    const { i18n, t } = useTranslation();

    const { locale } = useParams();

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [])

    return <div>{props.children}: {t("sample.title")}</div>
}

export default CommonComponent