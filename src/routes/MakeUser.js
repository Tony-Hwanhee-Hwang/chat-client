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
import { resolveFieldValueOrError } from "graphql/execution/execute";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	item: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	active: {
		animation: "$scale 0.5s forwards",
		border: `2px solid ${theme.palette.primary.light};`,
	},
	"@keyframes scale": {
		"0%": {
			transform: "scale(1)",
		},
		"100%": {
			transform: "scale(1.2)",
		},
	},
}));

const MakeUser = ({ history }) => {
	const avatarArr = ["/images/avatar1.png", "/images/avatar2.png", "/images/avatar3.png", "/images/avatar4.png", "/images/avatar5.png"];

	const [avatar, setAvatar] = useState({ avatarUrl: avatarArr[0], nickName: "" });
	const [isError, setIsError] = useState(false);
	const [helperText, setHelperText] = useState("");
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

	const checkValidation = () => {
		let result = false;
		if (avatar.nickName === "") {
			setIsError(true);
			setHelperText("Required value");
		} else {
			setIsError(false);
			setHelperText("");
			result = true;
		}
		return result;
	};
	const handleConfirm = () => {
		if (checkValidation()) {
			makeUser({
				variables: { ...avatar },
			});
		}
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
								error={isError}
								helperText={helperText}
								onChange={(e) => {
									setAvatar({ ...avatar, nickName: e.target.value });
								}}
								onKeyUp={checkValidation}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										handleConfirm();
									}
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
