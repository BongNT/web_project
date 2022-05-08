import React from "react";
import List from "../List";
import "./index.css";

export default function Sidebar() {
	const objs = [
		{
			key: 1,
			name: "Cơ sở sản xuất",
			items: ["Cấp giấy", "Thanh, kiểm tra"],
		},
		{
			key: 2,
			name: "Phân quyền",
			items: ["Chuyên viên", "???"],
		},
	];

	const list = objs.map((obj) => (
		<li className="accordion accordion-flush list-group-item accordion-item p-0">
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
					{obj.name}
				</button>
			</h2>
			<div
				id={"flush-collapse" + obj.key}
				className="accordion-collapse collapse"
				aria-labelledby={"flush-heading" + obj.key}
			>
				<div className="accordion-body">
					<List
						list={obj.items}
						classUl="list-group"
						classLi="list-group-item list-group-item-action border-0"
						classIcon="fa-solid fa-caret-right pe-2"
					/>
				</div>
			</div>
		</li>
	));

	return <ul className="list-group">{list}</ul>;
}
