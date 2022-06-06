import { Link } from "react-router-dom";

export default function Missing() {
	return (
		<article style={{ padding: "100px" }}>
			<h1>Oops!</h1>
			<p>Không tìm thấy trang</p>
			<div className="flexGrow">
				<Link to="/">Trở về trang chủ</Link>
			</div>
		</article>
	);
}
