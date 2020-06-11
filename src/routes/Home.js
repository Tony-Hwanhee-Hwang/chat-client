import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphqls/Queries";

const Home = ({ history }) => {
	const { data } = useQuery(GET_USER);

	const rediredPage = (data) => {
		console.log(data);
		if (!data.isLoggedIn) history.push("/MakeUser");
		else history.push("/ChatRoom");
	};

	return <>{rediredPage(data)}</>;
};

export default Home;
