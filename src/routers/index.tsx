import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

export const router = createBrowserRouter(routes);
const Routers = () => {
    return <RouterProvider router={router} />
}
export default Routers;