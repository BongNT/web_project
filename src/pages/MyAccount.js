import { Box } from "@mui/material";
import React from "react";

export default function MyAccount() {
	return <Box sx={{  }}>{
<table width="100%" cellspacing="0">
		<tbody>
			<tr>
				<td align="left" width="10%"><nobr>Mã Người dùng </nobr>&nbsp;</td>
				<td colspan="3">
					<input  type="text" maxlength="11" value="60" size="20" ></input><input type="hidden"  value="00000011370"></input> </td>
	   		</tr>
	   <tr><td align="left" nowrap=""><nobr>Họ và tên </nobr>&nbsp;</td>
		   <td colspan="3" width="60%"><input  type="text"  maxlength="30" value="001HHManager" size="20" ></input></td>
	   </tr>
	   <tr><td align="left" nowrap=""><nobr>Ngày sinh</nobr>&nbsp;</td>
		   <td width="20%"><input type="text" maxlength="10" value="2001-08-21" ></input>	 </td>
		</tr>
		<tr><td width="20%" align="left"><nobr>Giới tính</nobr>&nbsp;</td>
		   <td width="20%"> <select>
					   <option value="1">Nam</option>
					   <option value="2">Nữ</option>
					   <option value="3">Khác</option>
					   </select></td>
		</tr>
		<tr><td align="left">Số điện thoại &nbsp;</td>
			<td colspan="3"><input type="text" maxlength="10"   value="12345678" size="20"></input></td></tr>
		<tr><td align="left">Địa chỉ&nbsp;</td>
			<td colspan="3"><input type="text" maxlength="100"   value="Việt Nam" size="20"></input></td></tr>
		<tr><td align="left">Địa bàn quản lý&nbsp;</td>
			<td colspan="3"><input type="text" maxlength="100"   value="Quận Ba Đình" size="20"></input></td></tr>
	</tbody></table>
	}
	</Box>;
}
