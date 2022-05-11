import React from "react";
import { Link } from "react-router-dom";

function List(prop) {
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

function LinkList(prop) {
	const list = prop.list.map((item) => (
		<li key={item.id} className={prop.classLi}>
			<Link to={item.link} className={prop.classA}>
				<i className={prop.classIcon}></i>
				{item.name}
			</Link>
		</li>
	));
	return <ul className={prop.classUl}>{list}</ul>;
}

export { List, LinkList };
