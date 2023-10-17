import {ProfilePage} from "../../app/screens/ProfilePages/ProfilePage";
import {getSession} from "next-auth/react";
import Meta from "../../app/components/meta";
import {Footer} from "../../app/components/footer";
import {Header} from "../../app/components/header";

const Profile = ({user, tab}) => {
	debugger
	return (

		 <Meta
				title="Profile"
				description="Profile Page"
		 >
			 <Header/>
			 <ProfilePage user={user} tab={tab}/>
			 <Footer/>
		 </Meta>
	);
};

export default Profile

export async function getServerSideProps(ctx) {
	const {query, req} = ctx;
	const session = await getSession({req});

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
			props: {},
		};
	}


	const tab = query.tab || 0;
	return {
		props: {user: session, tab},
	};
}


