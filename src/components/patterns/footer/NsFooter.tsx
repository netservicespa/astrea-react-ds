import React from 'react';
import {ILink} from "src/util/types";
import FooterMultiColumn from "./footers/FooterMultiColumn";
import FooterSimple from "./footers/FooterSimple";

/**
 * Footer components
 * @author vadim.chilinciuc, mustapha.aoussar
 *
 */

export interface FooterProps {
	/**
	 * Defines the type of the footer: simple or multi-column.
	 */
	type: 'simple' | 'multiColumn';

	/**
	 * The path to the logo displayed in the footer.
	 */
	logoPath: string;

	/**
	 * An array of clickable link items for the footer.
	 */
	links?: ILink[] | any;

	/**
	 * An array of columns used to display multiple columns .
	 */
	columns?: any | undefined;

	/**
	 * Specifies the number of rows in which you want to divide your columns.
	 */
	rowSize?: number | undefined;
}

export const NsFooter = ({type = "simple", logoPath, links, columns, rowSize}: FooterProps) => {
	if (type === "simple") {
		return (
			<FooterSimple logoPath={logoPath} links={links} type={type}/>
		);
	}
	return (
		<FooterMultiColumn logoPath={logoPath} columns={columns} rowSize={rowSize} type={type}/>
	);
};
