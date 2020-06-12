import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { WRITE_CHAT } from "../graphqls/Queries";

export default ({ id }) => {
	const [msg, setMsg] = useState("");
	const [sendMsg] = useMutation(WRITE_CHAT, {
		variables: {
			senderId: parseInt(id),
			message: msg,
		},
	});
	return (
		<div>
			<input
				type='text'
				value={msg}
				placeholder='내용을 입력하세요'
				onChange={(e) => {
					setMsg(e.target.value);
				}}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						sendMsg();
						setMsg("");
						e.target.focus();
					}
				}}
			/>
			<button
				onClick={(e) => {
					sendMsg();
					setMsg("");
					e.target.focus();
				}}>
				Send
			</button>
		</div>
	);
};
