
/** UTC Date-like string such as "2025-05-07T14:23:53Z" */
type TDate = string;
/** Url-like string. */
type THref = string;
type TAuthorAssociation = 'OWNER' | 'CONTRIBUTOR' | 'NONE';
type TPullRequestsState = 'open';

export type RepoPullRequestResponse = {
    id: number;
    number: number;
    state: TPullRequestsState;
    title: string;
    body: string;
    draft: boolean;
    created_at: TDate | null,
    updated_at: TDate | null,
    closed_at: TDate | null,
    merged_at: TDate | null,
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
    author_association: TAuthorAssociation;
}

export type GetRepoPullRequestsResponse = {
    data: RepoPullRequestResponse[];
}
export type GetRepoPullRequestsConfig = unknown;
