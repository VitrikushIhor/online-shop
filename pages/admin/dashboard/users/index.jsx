import {UsersPage} from "../../../../app/screens/Admin/UsersPage";
import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {userService} from "../../../../app/services/user/user-service";

const Users = ({users}) => {
	return (
		 <Meta
				title="User Page"
		 >
			 <AdminLayout>
				 <UsersPage rows={users}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default Users;

export async function getServerSideProps() {
	const data = await userService.getAllUsers()
	return {
		props: {users: data}
	}
}
