import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphqls/Queries";

const Home = ({ history }) => {
	useQuery(GET_USER, {
		onCompleted: ({ isLoggedIn }) => {
			if (!isLoggedIn) history.push("/MakeUser");
			else history.push("/ChatRoom");
		},
	});

	return <></>;
};

export default Home;
