import React from "react";
import { LinkList } from "../List";
import "./index.css";

export default function Sidebar() {
	const objs = [
		{
			key: 1,
			title: "Cơ sở sản xuất",
			items: [
				{ id: 1, name: "Cấp giấy", link: "/home" },
				{ id: 2, name: "Thanh tra", link: "/certificate" },
			],
		},
		{
			key: 2,
			title: "Phân quyền",
			items: [
				{ id: 1, name: "Cơ cấu", link: "/home" },
				{ id: 2, name: "Tổ chức cán bộ", link: "/certificate" },
			],
		},
	];

	const list = objs.map((obj) => (
		<li
			key={obj.key}
			className="accordion accordion-flush list-group-item accordion-item p-0"
		>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					id={"flush-heading" + obj.key}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={"#flush-collapse" + obj.key}
					aria-expanded="false"
					aria-controls={"flush-collapse" + obj.key}
				>
					{obj.title}
				</button>
			</h2>
			<div
				id={"flush-collapse" + obj.key}
				className="accordion-collapse collapse"
				aria-labelledby={"flush-heading" + obj.key}
			>
				<div className="accordion-body">
					<LinkList
						list={obj.items}
						classUl="list-group"
						classLi="list-group-item list-group-item-action border-0"
						classIcon="fa-solid fa-caret-right pe-2"
					/>
				</div>
			</div>
		</li>
	));
	return <ul className="list-group list-group-flush">{list}</ul>;
}
