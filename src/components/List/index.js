import React from "react";

export default function List(prop) {
	const list = prop.list.map((item) => (
		<li className={prop.classLi}>
			<a className={prop.classA}>
				<i className={prop.classIcon}></i>
				{item}
			</a>
		</li>
	));
	return <ul className={prop.classUl}>{list}</ul>;
}
