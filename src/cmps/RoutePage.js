import React from "react";

import { Route, Switch } from "react-router-dom";
import AdminPanel from "../pages/AdminPanel";
import MusicPlayer from "../pages/MusicPlayer";

class RoutePage extends React.Component {
  render() {
    return (
      <div className="router-page">
        <main>
          <Switch>
            <Route path="/" exact component={AdminPanel} />
            <Route path="/player/:id" exact component={MusicPlayer} />
            {/* <Route
              path="/room/:id"
              exact
              render={(routerProps) => (
                <RoomPage
                  {...routerProps}
                  showNotification={this.props.showNotification}
                />
              )}
            /> */}
            {/* <Route path="/room/:id" component={RoomPage} showNotification={this.props.showNotification} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default RoutePage;
