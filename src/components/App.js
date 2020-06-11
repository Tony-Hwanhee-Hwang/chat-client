import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import MakeUser from "../routes/MakeUser";
import ChatRoom from "../routes/ChatRoom";

function App() {
	return (
		<Router>
			<Route exact path='/' component={Home}></Route>
			<Route path='/MakeUser' component={MakeUser}></Route>
			<Route path='/ChatRoom' component={ChatRoom}></Route>
		</Router>
	);
}

export default App;
