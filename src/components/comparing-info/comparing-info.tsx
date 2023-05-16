import { reposStore } from "components/repos/repos.store";
import { observer } from "mobx-react-lite";
import React from "react";

export const ComparingInfo = observer(() => {
    const contributors = reposStore.comparingItems;

    return <div>{JSON.stringify(contributors)}</div>;
});

