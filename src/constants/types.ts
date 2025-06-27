import type { ChangeEvent } from "react";

export interface PathItem {
	[k: string]: {
		PATH: string;
		LABEL: string;
		BREADCRUMB: Array<string>;
	};
}

export interface InputSearchProps {
	handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
