import { Box } from "@mui/material";
import React from "react";

export default function MyAccount() {
	return <Box sx={{ height: 550 }}>
	<fieldset style="width:95%;">
			<legend><b>Thông tin cá nhân</b></legend>
	<table class="fieldbox" width="100%" cellspacing="0">
		<tbody>
			<tr>
				<td align="left" width="10%"><nobr>Mã Người dùng </nobr>&nbsp;</td>
				<td colspan="3">
					<input name="UserCode" type="text" id="UserCode" maxlength="11" style="width:100%" value="19021282" size="20" disabled="disabled"></input><input type="hidden" name="hidStdID" value="00000011370"></input> </td>
	   		</tr>
	   <tr><td align="left" nowrap=""><nobr>Họ và tên </nobr>&nbsp;</td>
		   <td colspan="3" width="60%"><input name="StdName" type="text" id="StdName" maxlength="30" style="width:100%" value="Phạm Minh Hoàng" size="20" disabled="disabled"></input></td>
	   </tr>
	   <tr><td align="left" nowrap=""><nobr>Ngày sinh</nobr>&nbsp;</td>
		   <td width="20%"><input name="StdDob" type="text" id="StdDob" maxlength="10" value="17/11/2001" style="width:100%" onkeyup="javascript:chuanhoangay(this,this.value)" disabled="disabled"></input>	 </td>
		   <td width="20%" align="left"><nobr>Giới tính</nobr>&nbsp;</td>
		   <td width="20%"> <select style="width:100%" name="StdSx" disabled="disabled">
					   <option value="">-- Lựa chọn giới tính --</option>
					   <option value="0" selected="">Nam</option>
					   <option value="1">Nữ</option>
					   </select></td>
		</tr>
		<tr><td align="left">Số điện thoại <font color="#FF0000">*</font> &nbsp;</td>
			<td colspan="3"><input name="phoneNumber" type="text" id="phoneNumber" maxlength="10" style="width:100%" value="0123456789" size="20"></input></td></tr>
		<tr><td align="left">Địa chỉ Email<font color="#FF0000">*</font>&nbsp;</td>
			<td colspan="3"><input name="StdEmail" type="text" id="StdEmail" maxlength="100" style="width:100%" value="kingsama1711@gmail.com" size="20"></input></td></tr>
		  
	</tbody></table>
	</fieldset>
	</Box>;
}
