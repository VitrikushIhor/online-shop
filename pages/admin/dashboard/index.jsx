import {DashboardPage} from "../../../app/screens/Admin/DashboardPage";
import {AdminLayout} from "../../../app/components/adminLayout";
import Meta from "../../../app/components/meta";

const Dashboard = () => {
	return (
		 <Meta
				title="Dashboard Page"
		 >
			 <AdminLayout>
				 <DashboardPage/>
			 </AdminLayout>
		 </Meta>

	);
};

export default Dashboard;
