import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MAKE_USER } from "../graphqls/Queries";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	item: {
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
	const avatarArr = ["/images/avatar1.jpg", "/images/avatar2.jpg", "/images/avatar3.jpg", "/images/avatar4.jpg", "/images/avatar5.jpg"];

	const [avatar, setAvatar] = useState({ avatarUrl: avatarArr[0], nickName: "" });
	const classes = useStyles();

	const client = useApolloClient();
	const [makeUser] = useMutation(MAKE_USER, {
		onCompleted: ({ makeUser }) => {
			const loginUser = makeUser;
			//save result data to cache
			client.writeData({ data: { isLoggedIn: true, loginUser } });
			history.push("/ChatRoom");
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
	};

	return (
		<>
			<Paper>
				<Grid container direction='column' justify='center' alignItems='center' className={classes.root}>
					<Grid item>
						<Typography variant='h4'>Make a Chatting Avatar</Typography>
					</Grid>
					<Grid item>
						<div className={classes.item}>
							{avatarArr.map((avatarUrl, idx) => {
								return <Avatar key={idx} className={avatar.avatarUrl === avatarUrl ? `${classes.avatar} ${classes.active}` : classes.avatar} onClick={() => handleClick(avatarUrl)} src={avatarUrl} />;
							})}
						</div>
					</Grid>
					<Grid item>
						<div className={classes.item}>
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
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};

export default MakeUser;
