import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import openSocket from 'socket.io-client';
import { withRouter } from 'react-router'
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history'
import { getCookie } from './helper/Common';
import Header from './views/header/Header';
import Fooder from './views/fooder/Fooder';
import Sidebar from './views/sidebar/Sidebar';
import SignIn from './views/manage/SignIn';
import SignInNew from './views/manage/SignInNew';
import SignUp from './views/manage/SignUp';
import LandingPage from './views/manage/LandingPage';
import VerifyAccount from './views/manage/VerifyAccount';
import ForgotPassword from './views/manage/ForgotPassword';
import UpdatePassword from './views/manage/UpdatePassword';
import Trip from './views/trip/Trip';
import TripView from './views/dashboard/TripView';
import BookMarkDetails from './views/trip/BookMarkDetails';
import BookMarkMapView from './views/trip/BookMarkMapView';
import BookMark from './views/bookmark/BookMark';
import Dashboard from './views/dashboard/Dashboard';
// import CreateItinerary from './views/trip/CreateItinerary';
import CreateItinerary from './views/trip/CreateItineraryNew';
import Recommendations from './views/recommendations/Recommendations';
import AddTripActivity from './views/activity/AddTripActivity';
import Profile from './views/profile/Profile';
import EditProfile from './views/profile/EditProfile';
import ChangePassword from './views/manage/ChangePassword';
import EditEmailAddress from './views/manage/EditEmailAddress';
import AddFeedback from './views/manage/AddFeedback';
import AddUserReport from './views/manage/AddUserReport';
import EditBirthDay from './views/manage/EditBirthDay';
import Search from './views/manage/Search';
import RecommendedTripographers from './views/manage/RecommendedTripographers';
import ViewUserProfile from './views/profile/ViewUserProfile';
import BlockedUserList from './views/profile/BlockedUserList';
import AdminDashboard from './views/admin/AdminDashboard';
import CustomTags from './views/admin/CustomTags';
import AdminScreens from './views/admin/AdminScreensNew';
import UIScreens from './views/admin/UIScreens.js';
import UIManager from './views/admin/UIManager';
import UIMessages from './views/admin/UIMessages';
import CategoryKeywordMapping from './views/admin/CategoryKeywordMapping';

import AdminHeader from './views/header/AdminHeader';
import UsersList from './views/admin/UsersList';
import UserPreference from './views/manage/UserPreference';
import SessionCheck from './views/manage/SessionCheck';
//import UserPreference from './views/manage/UserPreferenceOld';
import Notification from './views/manage/Notification';
import Comment from './views/comment/Comment';
import EditUserProfile from './views/admin/EditUserProfile';
import UserPostsList from './views/admin/UserPostsList';
import ChangeAdminPassword from './views/admin/ChangeAdminPassword';
import AdminForgotPassword from './views/admin/AdminForgotPassword';
import AdminUpdatePassword from './views/admin/AdminUpdatePassword';
import CropImage from './views/manage/CropImage';
import FollowersAndFollowingsList from './views/profile/FollowersAndFollowingsList';



import './fonts/EQUIVALENT.ttf';
import './fonts/comfortaa/Comfortaa_Regular.ttf';
import './fonts/open-sans/OpenSans-Light.ttf';
import './index.css';
import AdminLogin from './views/admin/Login';
import CookieLogin from './views/admin/CookieLogin';
import './all.css';

import Config from '../src/helper/Config';
import Cql from '../src/helper/Cql';
import {auth} from "./redux/actions/authActions";
import {connect} from "react-redux";
// const history = createHistory();
const history = createBrowserHistory();
const projectUrl = Config.projectUrl;

/*var socket = openSocket(Config.socketUrl, {
    path : Config.socketPath,
    reconnection: true,
    reconnectionDelay: 50,
    reconnectionDelayMax: 100,
    reconnectionAttempts: Infinity,
    transports: ['websocket']
});*/

var socket = null;

/*socket.on('connect', function(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+ " " + today.getMilliseconds();
    console.log("mmmm-> connected" + time)
});
socket.on('event', function(data){
    console.log("mmmm->  event")
});
socket.on('disconnect', function(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " " +today.getMilliseconds();
    console.log("mmmm->  disconnect" + time)
    // socket.connect()
});*/

class RouterApp extends React.Component {

    componentDidMount(){
        /*socket.emit('PING', " hai mathan 123");
        socket.on('PONG', function (jsonData) {
            console.log("Ping Message sent and testing : PING Response --> " +jsonData)
        });*/
    }

    async UNSAFE_componentWillMount() {
        this.props.reduxAuth("auth", false)
        var getemail = await getCookie("user_email");
        if (getemail != null && getemail != undefined && getemail != "") {
            this.props.reduxAuth("auth", true);
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.auth ?
                        <Router>
                            <Route exact path={"/"}  history={history} render={(props) =>
                                <SignIn socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/signup"}  history={history} render={(props) =>
                                <SignUp socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/admin"}  history={history} render={(props) =>
                                <AdminLogin socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/admin/dashboard"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <AdminDashboard  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/customtags"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <CustomTags  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/screens"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <AdminScreens  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/ui"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <UIScreens  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/uimanager"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <UIManager  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/uimessages"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <UIMessages  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/category-keyword-mapping"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <CategoryKeywordMapping  socket={socket} {...props}/>
                                </div>
                            } />

                            <Route exact path={projectUrl+"/admin/users"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <UsersList  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/changeAdminPassword"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <ChangeAdminPassword  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/adminForgotPassword"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminForgotPassword  socket={socket} {...props}/>
                                </div>
                            } />

                            <Route exact path={projectUrl+"/admin/editUserProfile/:userId"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <EditUserProfile  socket={socket} {...props}/>
                                </div>
                            } />

                            <Route exact path={projectUrl+"/admin/userPostsList/:userId"}  history={history} render={(props) =>
                                <div className="app">
                                    <AdminHeader  socket={socket} {...props}/>
                                    <UserPostsList  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/admin/adminUpdatepassword/:emailId?/:otp?"}  history={history} render={(props) =>
                                <AdminUpdatePassword  socket={socket} {...props}/>
                            } />

                            <Route exact path={projectUrl+"/signin"}  history={history} render={(props) =>
                                <SignIn  socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/signinnew"}  history={history} render={(props) =>
                                <SignInNew  socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/verifyaccount/:userId?/:id?/:eotp?"}  history={history} render={(props) =>
                                <VerifyAccount  socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/forgotpassword"}  history={history} render={(props) =>
                                <ForgotPassword  socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/updatepassword/:userId?/:id?"}  history={history} render={(props) =>
                                <UpdatePassword  socket={socket} {...props}/>
                            } />
                            <Route exact path={projectUrl+"/"}  history={history} render={(props) =>
                                <div className="app">
                                    <SignIn  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/dashboard"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Dashboard  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/CropImage"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <CropImage  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/trip/:id?"}  history={history} render={(props) =>
                                <div className="app">
                                    <Trip  socket={socket} {...props}/>
                                    <Fooder  socket={socket} {...props} pageIndex={"trip"}/>

                                </div>
                            } />
                            <Route exact path={projectUrl+"/bookmark"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <BookMark  socket={socket} {...props}/>
                                    <Fooder  socket={socket} {...props} pageIndex={"bookmark"}/>

                                </div>
                            } />
                            <Route exact path={projectUrl+"/footer"}  history={history} render={(props) =>
                                <div className="app">
                                    <Fooder  socket={socket} {...props} />
                                </div>
                            } />
                            <Route exact path={projectUrl+"/profile"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Profile  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/followersAndFollowingsList/:tabIndex?/:userId?"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <FollowersAndFollowingsList  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/editProfile"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <EditProfile  socket={socket} {...props}/>
                                    {/*<Fooder  socket={socket} {...props} pageIndex={"profile"}/>*/}
                                </div>
                            } />
                            <Route exact path={projectUrl+"/changepassword"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <ChangePassword  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/editEmailAddress"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <EditEmailAddress  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/addFeedBack"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <AddFeedback socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/addUserReport"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <AddUserReport socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/editbirthday"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <EditBirthDay  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/profileview/:userId"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <ViewUserProfile  socket={socket} {...props}/>
                                </div>
                            } /><Route exact path={projectUrl+"/blockedusers"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <BlockedUserList  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/tripview/:tripId/:userId"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <TripView  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/comment/:objectType/:objectId/:createdUserId?"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Comment  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/bookmarkDetails/:bookmarkId"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <BookMarkDetails {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/bookMarkMapView/:bookmarkId"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <BookMarkMapView {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/createitinerary/:tripId?/:userId?"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <CreateItinerary  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/addactivity"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <CreateItinerary index={2} socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/userpreference"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <UserPreference  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/askforrecommendations/:recommendationId?/:userId?"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Recommendations  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/explore"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Search  socket={socket} {...props}/>
                                    <Fooder  socket={socket} {...props} pageIndex={"explore"}/>

                                </div>
                            } />
                            <Route exact path={projectUrl+"/recommendedtripographers"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <RecommendedTripographers  socket={socket} {...props}/>
                                    <Fooder  socket={socket} {...props} pageIndex={"explore"}/>

                                </div>
                            } />
                            <Route exact path={projectUrl+"/notification"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <Notification  socket={socket} {...props}/>
                                </div>
                            } />
                            <Route exact path={projectUrl+"/addTripActivity"}  history={history} render={(props) =>
                                <div className="app">
                                    <SessionCheck history={history} />
                                    <AddTripActivity  socket={socket} {...props}/>
                                </div>
                            } />
                        </Router>
                        :
                        <CookieLogin />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        reduxAuth: (key, value) => dispatch(auth(key, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RouterApp);

