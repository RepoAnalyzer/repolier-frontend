import { TDate, THref } from "types/general";

import { ContributorSimplified } from "./contributors.mapper";

export type TAuthorAssociation = 'OWNER' | 'CONTRIBUTOR' | 'NONE';
export type TPullRequestsState = 'open';

export type RepoPullRequest = {
    id: number;
    number: number;
    state: TPullRequestsState | null;
    author: ContributorSimplified | null;
    title: string;
    body: string | null;
    draft: boolean;
    createdAt: TDate | null,
    updatedAt: TDate | null,
    closedAt: TDate | null,
    mergedAt: TDate | null,
    _links: {
        self: {
            href: THref;
        },
        html: {
            href: THref;
        },
        issue: {
            href: THref;
        },
        comments: {
            href: THref;
        },
        review_comments: {
            href: THref;
        },
        review_comment: {
            href: THref;
        },
        commits: {
            href: THref;
        },
        statuses: {
            href: THref;
        }
    },
    authorAssociation: TAuthorAssociation;
}

export type TRepoPullRequestScore = {
    author: number;
    abandonRate: number;
    toxicity: number;
    general: number;
}
