import config from "~/config"

import Home from "~/page/Home"
import Following from "~/page/Following"
import Upload from "~/page/Upload"
import Search from "~/page/Search"
import Profile from "~/page/Profile"
import HeaderOnly from "~/layouts/HeaderOnly"

const publicRoutes = [
    { path: config.routes.home,component: Home },
    { path: config.routes.following,component: Following },
    { path: config.routes.profile,component: Profile },
    { path: config.routes.upload,component: Upload, layout: HeaderOnly },
    { path: config.routes.search,component: Search, layout: null },
]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}