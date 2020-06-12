import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { WRITE_CHAT } from "../graphqls/Queries";
import { AppBar, Toolbar, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const useStyles = makeStyles((theme) => ({
	input: {
		width: "100%",
	},
	appBar: {
		top: "auto",
		bottom: 0,
		backgroundColor: theme.palette.grey[100],
	},
}));

export default ({ id }) => {
	const classes = useStyles();
	const [msg, setMsg] = useState("");
	const [sendMsg] = useMutation(WRITE_CHAT, {
		variables: {
			senderId: parseInt(id),
			message: msg,
		},
	});

	return (
		<AppBar position='fixed' color='primary' className={classes.appBar}>
			<Toolbar>
				<InputBase
					type='text'
					value={msg}
					placeholder='Start typing your message'
					className={classes.input}
					onChange={(e) => {
						setMsg(e.target.value);
					}}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							sendMsg();
							setMsg("");
						}
					}}
				/>
				<Button
					variant='contained'
					color='primary'
					endIcon={<SendRoundedIcon />}
					onClick={(e) => {
						sendMsg();
						setMsg("");
					}}>
					Send
				</Button>
			</Toolbar>
		</AppBar>
	);
};
