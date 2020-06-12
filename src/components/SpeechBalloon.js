import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
	},
	leftRow: {
		borderTopRightRadius: theme.spacing(2.5),
		borderBottomRightRadius: theme.spacing(2.5),
		borderBottomLeftRadius: theme.spacing(2.5),
		backgroundColor: theme.palette.grey[100],
	},
	rightRow: {
		borderTopLeftRadius: theme.spacing(2.5),
		borderBottomRightRadius: theme.spacing(2.5),
		borderBottomLeftRadius: theme.spacing(2.5),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	msg: {
		padding: theme.spacing(1, 2),
		borderRadius: 4,
		marginBottom: 4,
		display: "inline-block",
		wordBreak: "break-word",
	},
	date: {
		alignSelf: "flex-end",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
}));

export default ({ chat, side }) => {
	const classes = useStyles();
	const getDateTime = () => {
		const date = new Date(chat.date);
		let h = date.getHours();
		const ampm = h >= 12 ? "p.m. " : "a.m. ";
		h = h % 12 ? h % 12 : 12; // the hour '0' should be '12'
		let m = date.getMinutes();

		if (m < 10) m = "0" + m;

		return ampm + [h, m].join(":");
	};

	return (
		<>
			<Grid container spacing={2} justify={side === "right" ? "flex-end" : "flex-start"} className={classes.root}>
				{side !== "right" && (
					<Grid item>
						<Avatar src={chat.sender.avatarUrl}></Avatar>
					</Grid>
				)}
				<Grid item xs={8}>
					<Grid container direction='column'>
						{side !== "right" && <Typography variant='subtitle2'>{chat.sender.nickName}</Typography>}
						<Grid container direction={side === "right" ? "row-reverse" : "row"}>
							<div>
								<Typography variant='body2' className={`${classes.msg} ${side === "right" ? classes.rightRow : classes.leftRow}`}>
									{chat.message}
								</Typography>
							</div>
							<Typography variant='caption' color='textSecondary' className={classes.date}>
								{getDateTime()}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
