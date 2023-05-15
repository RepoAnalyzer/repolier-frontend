import React from 'react';

const MAX_DESCRIPTION_SIZE = 320;

export type DescriptionProps = {
    className?: string;
    description: string;
    truncateDescriptionAt?: number
}

export const Description = (props: DescriptionProps) =>
    <p className={props.className}>
        {props.description.length <= MAX_DESCRIPTION_SIZE
            ? props.description
            : `${props.description.slice(0, props.truncateDescriptionAt || MAX_DESCRIPTION_SIZE)}...`}
    </p>
