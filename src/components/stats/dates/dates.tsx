import React from 'react';
import format from 'date-fns/format'

export const formatDateAsRuFull = (date: string) =>
    format(new Date(date), 'dd.mm.yyyy')

export type CreatedAtProps = {
    created_at: string;
}
export const CreatedAt = (props: CreatedAtProps) =>
    <span>
        {`Created at ${formatDateAsRuFull(props.created_at)}`}
    </span>

export type UpdatedAtProps = {
    updated_at: string;
}
export const UpdatedAt = (props: UpdatedAtProps) =>
    <span>
        {`Updated at ${formatDateAsRuFull(props.updated_at)}`}
    </span>

