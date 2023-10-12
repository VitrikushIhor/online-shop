import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {CouponsPage} from "../../../../app/screens/Admin/CouponsPage";
import {CouponsService} from "../../../../app/services/coupons/coupons-service";
import {getSession} from "next-auth/react";

const Coupons = ({coupons}) => {
	return (
		 <Meta
				title="SubCategories Page"
		 >
			 <AdminLayout>
				 <CouponsPage coupons={coupons}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default Coupons;


export async function getServerSideProps(Context) {

	const session = await getSession(Context);

	if (!session || (session && session.user.role !== "admin")) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	const {data} = await CouponsService.getAll();
	return {
		props: {
			coupons: data
		}
	}
}
