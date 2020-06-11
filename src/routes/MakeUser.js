import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MAKE_USER } from "../graphqls/Queries";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"align-items": "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	active: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		border: "1px solid black;",
	},
}));

const MakeUser = ({ history }) => {
	const [avatar, setAvatar] = useState({ avatarUrl: "", nickName: "" });
	const classes = useStyles();

	const avatarArr = ["/images/avatar1.jpg", "/images/avatar2.jpg", "/images/avatar3.jpg", "/images/avatar4.jpg", "/images/avatar5.jpg"];

	const client = useApolloClient();
	const [makeUser, { data }] = useMutation(MAKE_USER, {
		onCompleted({ makeUser }) {
			const loginUser = makeUser;
			//save result data to cache
			client.writeData({ data: { isLoggedIn: true, loginUser } });
		},
	});

	const handleClick = (url) => {
		//console.log(url);
		setAvatar({ avatarUrl: url, nickName: avatar.nickName });
	};

	const handleConfirm = () => {
		makeUser({
			variables: { ...avatar },
		});
		history.push("/ChatRoom");
	};

	return (
		<>
			<h1>Make a Chatting Avatar</h1>
			<div className={classes.root}>
				{avatarArr.map((avatarUrl, idx) => {
					return <Avatar key={idx} className={avatar.avatarUrl === avatarUrl ? `${classes.avatar} ${classes.active}` : classes.avatar} onClick={() => handleClick(avatarUrl)} src={avatarUrl} />;
				})}
			</div>
			<div className={classes.root}>
				<TextField
					label='Nick Name'
					variant='outlined'
					color='primary'
					size='small'
					onChange={(e) => setAvatar({ ...avatar, nickName: e.target.value })}
					onKeyPress={(e) => {
						if (e.key === "Enter") handleConfirm();
					}}
				/>
				<Button variant='outlined' color='primary' onClick={handleConfirm}>
					Confirm
				</Button>
			</div>
		</>
	);
};

export default MakeUser;
