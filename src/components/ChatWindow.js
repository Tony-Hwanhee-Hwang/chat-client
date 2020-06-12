import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHATTING, NEW_CHAT_SUBSCRIPTION } from "../graphqls/Queries";

import { Paper, Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import SpeachBalloon from "./SpeechBalloon";

const useStyles = makeStyles((theme) => ({
	paper: {
		paddingBottom: 50 + theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default () => {
	const classes = useStyles();
	const { loading, data, subscribeToMore } = useQuery(GET_CHATTING);

	useEffect(() => {
		subscribeToMore({
			document: NEW_CHAT_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;

				const { newChat } = subscriptionData.data;

				return {
					...prev,
					chatting: [...prev.chatting, newChat],
				};
			},
		});
	}, []);

	useEffect(() => {
		document.body.scrollIntoView(false);
	});

	if (loading) {
		return (
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
		);
	} else {
		return (
			<div>
				<Paper className={classes.paper}>
					{data?.chatting?.map((chat) => {
						return <SpeachBalloon key={chat.id} chat={chat} side={chat.sender.id === data.loginUser.id ? "right" : "left"} />;
					})}
				</Paper>
				<Input id={data.loginUser.id} />
			</div>
		);
	}
};
