import React from "react";

import {
  TopBar,
} from "@skbkontur/react-ui";
import {
  Bookmark,
} from "@skbkontur/react-icons";
import { Link } from "react-router-dom";

// const GET_USER = gql`
//   query GetUser($id: ID!){
//     user(id: $id){
//       id
//       login
//       avatar
//     }
//   }
// `;

export const Header = () => (
  <div className="header">
    <div className="header_inner">
      <TopBarLeftSide />
      {/* <TopBarRightSide isAuth={useContext(UserContext).user.userID != null} /> */}
    </div>
  </div>
);

// const TopBarRightSide:React.FC<{isAuth:boolean}> = ({ isAuth }) => {
//   const [isRegistrationOpened, setIsRegistrationOpened] = useState(false);
//   const [isLogInOpened, setIsLogInOpened] = useState(false);
//   // const { data, loading } = useQuery<Query>(GET_USER, {
//   //   variables: { id: useContext(UserContext).user.userID }, //
//   // });
//   function renderRegistrationModal() {
//     return (
//       <RegistrationModal
//         onClose={() => setIsRegistrationOpened(false)}
//       />
//     );
//   }
//   function renderLogInModal() {
//     return (
//       <LogInModal
//         onClose={() => setIsLogInOpened(false)}
//       />
//     );
//   }
//   // if (loading) {
//   //   return <Loading />;
//   // }
//   return (
//     <TopBar.End>
//       {/* {isAuth && data! */}
//       {/*  ? <TopBarUserMenu user={data!.user!} /> */}
//       {/*  : ( */}
//       <Gapped vertical={false} gap={20}>
//         <div onClick={() => setIsLogInOpened(true)} className="top-bar-button">
//           <div style={{ margin: "auto" }}>
//             LOG IN
//           </div>
//         </div>
//         <div onClick={() => setIsRegistrationOpened(true)} className="top-bar-button">
//           <div style={{ margin: "auto" }}>
//             <Hint text="registration">SIGN UP</Hint>
//           </div>
//         </div>
//         {/* <Button onClick={() => setIsLogInOpened(true)}>log in</Button> */}
//         {isLogInOpened && renderLogInModal()}
//         {/* <Button onClick={() => setIsRegistrationOpened(true)}><Hint text="registration">SIGN UP</Hint></Button> */}
//         {isRegistrationOpened && renderRegistrationModal()}
//       </Gapped>
//       {/* )} */}
//     </TopBar.End>
//   );
// };

const TopBarLeftSide = () => (
  <TopBar.Start>
    <TopBar.ItemStatic>
      <Link to="/">
        <div className="logo">Book catalogue</div>
      </Link>
    </TopBar.ItemStatic>
    <TopBar.Divider />
    <TopBar.Item use="default">
      <Link to="/catalogue">
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Bookmark />
          <div style={{ marginLeft: "8px" }}>Catalogue</div>
        </div>
      </Link>
    </TopBar.Item>
    {/* <TopBar.Divider /> */}
    {/* <TopBar.Item use="default"> */}
    {/*  <Link to="/training"> */}
    {/*    <div style={{ display: "flex", flexWrap: "nowrap" }}> */}
    {/*      <Education /> */}
    {/*      <div style={{ marginLeft: "8px" }}>Training</div> */}
    {/*    </div> */}
    {/*  </Link> */}
    {/* </TopBar.Item> */}
  </TopBar.Start>
);
//
// const TopBarUserMenu:React.FC<{user:User}> = ({ user }) => (
//   <DropdownMenu
//     caption={(
//       <div style={{
//         display: "flex", flexWrap: "nowrap", alignItems: "center", cursor: "pointer",
//       }}
//       >
//         <div className="logo" style={{ marginRight: "8px" }}>{user.login}</div>
//         <img
//           alt="Фотография профиля"
//           src={user.avatar}
//         />
//       </div>
//         )}
//   >
//     <MenuItem>
//       <div style={{ display: "flex", flexWrap: "nowrap" }}>
//         <NotificationBellNone color="#666" />
//         {/* USER */}
//         {" "}
//         <div style={{ color: "#666", marginLeft: "4px" }}>Профиль</div>
//       </div>
//     </MenuItem>
//     <MenuItem>
//       <div style={{ display: "flex", flexWrap: "nowrap" }}>
//         <NotificationBellNone color="#666" />
//         {" "}
//         <div style={{ color: "#666", marginLeft: "4px" }}>Оповещения</div>
//       </div>
//     </MenuItem>
//     <MenuSeparator />
//     <MenuItem>
//       <div style={{ display: "flex", flexWrap: "nowrap" }}>
//         <Settings color="#666" />
//         {" "}
//         <div style={{ color: "#666", marginLeft: "4px" }}>Настройки</div>
//       </div>
//     </MenuItem>
//     <MenuItem onClick={() => {
//       localStorage.removeItem("userID");
//       document.location.reload();
//     }}
//     >
//       <div style={{ display: "flex", flexWrap: "nowrap" }}>
//         <Logout color="#666" />
//         {" "}
//         <div style={{ color: "#666", marginLeft: "4px" }}>Выйти</div>
//       </div>
//     </MenuItem>
//   </DropdownMenu>
// );
