import React from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format'

export const formatDateAsRuFull = (date: string) =>
    format(new Date(date), 'dd.MM.yyyy')

export type CreatedAtProps = {
    created_at: string;
}
export const CreatedAt = (props: CreatedAtProps) => {
    const { t } = useTranslation()

    return (
        <span>
            {t('Created at', { date: formatDateAsRuFull(props.created_at) })}
        </span>
    );
}

export type UpdatedAtProps = {
    updated_at: string;
}

export const UpdatedAt = (props: UpdatedAtProps) => {
    const { t } = useTranslation()

    return (
        <span>
            {t('Updated at', { date: formatDateAsRuFull(props.updated_at) })}
        </span>
    );
}

