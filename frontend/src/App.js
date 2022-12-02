import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import VerifyUser from "./components/VerifyUser";
import {
  Home,
  Profile,
  ExternalApi,
  Search,
  BookDetail,
  BookDetailsView,
} from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <Route path="/search" exact component={Search} />
          <Route path="/verify-user" component={VerifyUser} />
          <ProtectedRoute path="/bookDetails/:bookId" component={BookDetail} />
          <ProtectedRoute
            path="/bookDetailsView/:bookId"
            component={BookDetailsView}
          />
          <Route path="*" element={<p>Nothing to match this path. </p>} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import BookList from "./components/BookList";
// import Heading from "./components/Heading";
// import SearchBox from "./components/SearchBox";
// import { Link, Route, Switch } from "react-router-dom";
// import BookDetails from "./components/BookDetails";
// import { NavBar, Footer, Loading } from "./components";
// import { Home, Profile, ExternalApi } from "./views";
// import ProtectedRoute from "./auth/protected-route";

// const App = () => {
//   const [searchValue, setSearchValue] = useState("");

//   return (
//     <div className="container-fluid book-app">
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/search">Search</Link>
//         <Link to="/profile">Profile</Link>
//       </nav>

//       <Route
//         path="/"
//         element={
//           <>
//             <div className="row d-flex align-items-center mt-4 mb-4">
//               <Heading heading="Books" />
//             </div>
//             <div className="row">
//               <BookList />
//             </div>
//           </>
//         }
//       ></Route>
//       <Route
//         path="/search"
//         element={
//           <SearchBox
//             searchValue={searchValue}
//             setSearchValue={setSearchValue}
//           />
//         }
//       ></Route>

//       <Route path="/bookDetails/:bookId" element={<BookDetails />} />
//       <Route path="*" element={<p>Nothing to match this path. </p>} />
//     </div>
//   );
// };

// export default App;
